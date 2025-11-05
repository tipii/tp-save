/**
 * Custom Prisma extension for Trigger.dev that supports "models" folder
 * Based on @trigger.dev/build/extensions/prisma but fixed for our use case
 */

import assert from 'node:assert';
import { existsSync } from 'node:fs';
import { cp, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import type { BuildManifest, BuildTarget } from '@trigger.dev/core/v3';
import type { BuildContext, BuildExtension } from '@trigger.dev/core/v3/build';
import { binaryForRuntime } from '@trigger.dev/core/v3/build';

type PrismaExtensionOptions = {
  schema: string;
  migrate?: boolean;
  version?: string;
  typedSql?: boolean;
  clientGenerator?: string;
  directUrlEnvVarName?: string;
};

export function customPrismaExtension(options: PrismaExtensionOptions): BuildExtension {
  return new CustomPrismaExtension(options);
}

class CustomPrismaExtension implements BuildExtension {
  moduleExternals = ['@prisma/client', '@prisma/engines'];
  readonly name = 'CustomPrismaExtension';
  private _resolvedSchemaPath?: string;

  constructor(private options: PrismaExtensionOptions) {}

  externalsForTarget(target: BuildTarget): string[] {
    if (target === 'dev') {
      return [];
    }
    return this.moduleExternals;
  }

  async onBuildStart(context: BuildContext): Promise<void> {
    if (context.target === 'dev') {
      return;
    }

    // Resolve the path to the prisma schema
    this._resolvedSchemaPath = resolve(context.workingDir, this.options.schema);
    context.logger.debug(`Resolved the prisma schema to: ${this._resolvedSchemaPath}`);

    // Check that the prisma schema exists
    if (!existsSync(this._resolvedSchemaPath)) {
      throw new Error(
        `CustomPrismaExtension could not find the prisma schema at ${this._resolvedSchemaPath}. Make sure the path is correct: ${this.options.schema}, relative to the working dir ${context.workingDir}`,
      );
    }
  }

  async onBuildComplete(context: BuildContext, manifest: BuildManifest): Promise<void> {
    if (context.target === 'dev') {
      return;
    }

    assert(this._resolvedSchemaPath, 'Resolved schema path is not set');

    context.logger.debug('Looking for @prisma/client in the externals', {
      externals: manifest.externals,
    });

    const prismaExternal = manifest.externals?.find(
      (external) => external.name === '@prisma/client',
    );
    const version = prismaExternal?.version ?? this.options.version;

    if (!version) {
      throw new Error(
        'CustomPrismaExtension could not determine the version of @prisma/client. Please provide a version in the options.',
      );
    }

    context.logger.debug(
      `CustomPrismaExtension is generating the Prisma client for version ${version}`,
    );

    // FIXED: Support both "schema" and "models" folder names
    const parentDir = dirname(this._resolvedSchemaPath);
    const parentDirName = parentDir.split('/').pop() || '';
    const usingSchemaFolder = parentDirName === 'schema' || parentDirName === 'models';

    context.logger.debug('Schema folder detection:', {
      parentDir,
      parentDirName,
      usingSchemaFolder,
    });

    const commands: string[] = [];
    let prismaDir: string;
    const generatorFlags: string[] = [];

    if (this.options.clientGenerator) {
      generatorFlags.push(`--generator=${this.options.clientGenerator}`);
    }

    if (this.options.typedSql) {
      generatorFlags.push('--sql');
      prismaDir = usingSchemaFolder
        ? dirname(dirname(this._resolvedSchemaPath))
        : dirname(this._resolvedSchemaPath);

      const sqlFiles = await readdir(join(prismaDir, 'sql')).then((files) =>
        files.filter((file) => file.endsWith('.sql')),
      );

      const sqlDestinationPath = join(manifest.outputPath, 'prisma', 'sql');
      for (const file of sqlFiles) {
        const destination = join(sqlDestinationPath, file);
        const source = join(prismaDir, 'sql', file);
        context.logger.debug(`Copying SQL from ${source} to ${destination}`);
        await cp(source, destination);
      }
    }

    if (usingSchemaFolder) {
      const schemaDir = dirname(this._resolvedSchemaPath);
      prismaDir = dirname(schemaDir);

      context.logger.log(`Using schema folder: ${schemaDir}`);

      // Find all .prisma files in the schema folder
      const prismaFiles = await readdir(schemaDir).then((files) =>
        files.filter((file) => file.endsWith('.prisma')),
      );

      context.logger.debug('Found prisma files in the schema folder', {
        prismaFiles,
      });

      const schemaDestinationPath = join(manifest.outputPath, 'prisma', 'schema');

      for (const file of prismaFiles) {
        const destination = join(schemaDestinationPath, file);
        const source = join(schemaDir, file);
        context.logger.log(`Copying prisma schema from ${source} to ${destination}`);
        await cp(source, destination);
      }

      // For schema folders in Prisma 6.6+, MUST add --schema flag pointing to directory
      commands.push(
        `${binaryForRuntime(manifest.runtime)} node_modules/prisma/build/index.js generate --schema=./prisma/schema ${generatorFlags.join(' ')}`,
      );
    } else {
      prismaDir = dirname(this._resolvedSchemaPath);

      const schemaDestinationPath = join(manifest.outputPath, 'prisma', 'schema.prisma');

      context.logger.debug(
        `Copying the prisma schema from ${this._resolvedSchemaPath} to ${schemaDestinationPath}`,
      );
      await cp(this._resolvedSchemaPath, schemaDestinationPath);

      commands.push(
        `${binaryForRuntime(manifest.runtime)} node_modules/prisma/build/index.js generate --schema=./prisma/schema.prisma ${generatorFlags.join(' ')}`,
      );
    }

    const env: Record<string, string | undefined> = {};

    if (this.options.migrate) {
      const migrationsDir = join(prismaDir, 'migrations');
      const migrationsDestinationPath = join(manifest.outputPath, 'prisma', 'migrations');
      context.logger.debug(
        `Copying migrations from ${migrationsDir} to ${migrationsDestinationPath}`,
      );
      await cp(migrationsDir, migrationsDestinationPath, { recursive: true });
      commands.push(
        `${binaryForRuntime(manifest.runtime)} node_modules/prisma/build/index.js migrate deploy`,
      );
    }

    env.DATABASE_URL = manifest.deploy.env?.DATABASE_URL;

    if (this.options.directUrlEnvVarName) {
      env[this.options.directUrlEnvVarName] =
        manifest.deploy.env?.[this.options.directUrlEnvVarName] ??
        process.env[this.options.directUrlEnvVarName];

      if (!env[this.options.directUrlEnvVarName]) {
        context.logger.warn(
          `CustomPrismaExtension could not resolve ${this.options.directUrlEnvVarName}`,
        );
      }
    } else {
      env.DIRECT_URL = manifest.deploy.env?.DIRECT_URL;
      env.DIRECT_DATABASE_URL = manifest.deploy.env?.DIRECT_DATABASE_URL;
    }

    if (!env.DATABASE_URL) {
      context.logger.warn('CustomPrismaExtension could not resolve DATABASE_URL');
    }

    // Force Prisma to use npm instead of pnpm (since Docker image uses npm)
    env.PRISMA_CLI_PACKAGE_MANAGER = 'npm';

    context.logger.debug('Adding prisma layer', {
      commands,
      env,
      dependencies: { prisma: version },
    });

    context.addLayer({
      id: 'prisma',
      commands,
      dependencies: {
        prisma: version,
      },
      build: {
        env,
      },
    });
  }
}
