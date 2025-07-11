import { z } from 'zod';

// Schema de validation pour les variables d'environnement côté client uniquement
const clientEnvSchema = z.object({
  // Next.js
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Application URLs (disponibles côté client)
  NEXT_PUBLIC_APP_URL: z.string().url('NEXT_PUBLIC_APP_URL must be a valid URL'),
  NEXT_PUBLIC_DOMAIN: z.string().optional(),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

class ClientEnvValidator {
  private static instance: ClientEnvValidator | null = null;
  private validatedEnv: ClientEnv | null = null;

  private constructor() {}

  static getInstance(): ClientEnvValidator {
    if (!ClientEnvValidator.instance) {
      ClientEnvValidator.instance = new ClientEnvValidator();
    }
    return ClientEnvValidator.instance;
  }

  validate(): ClientEnv {
    if (this.validatedEnv) {
      return this.validatedEnv;
    }

    try {
      this.validatedEnv = clientEnvSchema.parse(process.env);
      return this.validatedEnv;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // @ts-expect-error: 'errors' does exist on ZodError at runtime
        const missingVars = (error.errors as Array<{ path: (string | number)[]; message: string }>)
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join('\n');

        throw new Error(
          `Client environment validation failed. Missing or invalid environment variables:\n${missingVars}\n\nPlease check your .env file and ensure all required NEXT_PUBLIC_ variables are set.`,
        );
      }
      throw error;
    }
  }

  get(): ClientEnv {
    if (!this.validatedEnv) {
      return this.validate();
    }
    return this.validatedEnv;
  }

  // Helper methods
  isDevelopment(): boolean {
    return this.get().NODE_ENV === 'development';
  }

  isProduction(): boolean {
    return this.get().NODE_ENV === 'production';
  }

  getAppUrl(): string {
    return this.get().NEXT_PUBLIC_APP_URL;
  }
}

// Export singleton instance
export const clientEnvValidator = ClientEnvValidator.getInstance();

// Export validated env for direct access
export const clientEnv = clientEnvValidator.get();
