import { secureLogger } from '@/lib/logger';
import { z } from 'zod';

// Vérifier que nous sommes côté serveur
if (typeof window !== 'undefined') {
  throw new Error(
    'Server environment validation should not be used on the client side. Use client-env-validation.ts instead.',
  );
}

// Schema de validation pour toutes les variables d'environnement
const envSchema = z.object({
  // Next.js
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // Authentication
  BETTER_AUTH_SECRET: z.string().min(1, 'BETTER_AUTH_SECRET is required'),

  // Application URLs
  NEXT_PUBLIC_APP_URL: z.string().url('NEXT_PUBLIC_APP_URL must be a valid URL'),
  NEXT_PUBLIC_DOMAIN: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

class EnvValidator {
  private static instance: EnvValidator | null = null;
  private validatedEnv: Env | null = null;

  private constructor() {}

  static getInstance(): EnvValidator {
    if (!EnvValidator.instance) {
      EnvValidator.instance = new EnvValidator();
    }
    return EnvValidator.instance;
  }

  validate(): Env {
    if (this.validatedEnv) {
      return this.validatedEnv;
    }

    try {
      this.validatedEnv = envSchema.parse(process.env);
      secureLogger.info('Environment variables validated successfully');
      return this.validatedEnv;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // @ts-expect-error: 'errors' does exist on ZodError at runtime
        const missingVars = (error.errors as Array<{ path: (string | number)[]; message: string }>)
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join('\n');

        secureLogger.error('Environment validation failed', {
          missingVariables: missingVars.length,
          errors: missingVars,
        });

        throw new Error(
          `Environment validation failed. Missing or invalid environment variables:\n${missingVars}\n\nPlease check your .env file and ensure all required variables are set.`,
        );
      }
      throw error;
    }
  }

  get(): Env {
    if (!this.validatedEnv) {
      return this.validate();
    }
    return this.validatedEnv;
  }

  // Helper methods pour accéder aux variables validées
  isDevelopment(): boolean {
    return this.get().NODE_ENV === 'development';
  }

  isProduction(): boolean {
    return this.get().NODE_ENV === 'production';
  }

  getAppUrl(): string {
    return this.get().NEXT_PUBLIC_APP_URL;
  }

  getDatabaseUrl(): string {
    return this.get().DATABASE_URL;
  }
}

// Export singleton instance
export const envValidator = EnvValidator.getInstance();

// Export validated env for direct access - CÔTÉ SERVEUR SEULEMENT
export const env = envValidator.get();
