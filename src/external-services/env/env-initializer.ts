import { secureLogger } from '@/lib/logger';
import { envValidator } from './env-validation';

/**
 * Initialise et valide les variables d'environnement au démarrage de l'application
 * Doit être appelé le plus tôt possible dans le cycle de vie de l'app
 */
export function initializeEnvironment() {
  try {
    // Force la validation des variables d'environnement
    envValidator.validate();

    // Log des informations utiles (sans données sensibles)
    const env = envValidator.get();
    secureLogger.info('Environment initialized', {
      nodeEnv: env.NODE_ENV,
      hasDatabase: !!env.DATABASE_URL,
    });

    return true;
  } catch (error) {
    // En cas d'erreur, log et crash l'application (fail fast)
    secureLogger.error('Environment initialization failed', error);

    if (error instanceof Error) {
      console.error('\n❌ ENVIRONMENT VALIDATION FAILED\n');
      console.error(error.message);
      console.error('\nPlease check your .env file and ensure all required variables are set.');
      console.error('Refer to .env.example for the complete list of required variables.\n');
    }

    // Crash l'application en mode développement pour forcer la correction
    if (envValidator.isDevelopment()) {
      process.exit(1);
    }

    throw error;
  }
}

/**
 * Vérifie si l'environnement est correctement configuré sans crasher
 * Utile pour les health checks
 */
export function checkEnvironmentHealth(): {
  healthy: boolean;
  issues: string[];
  missingOptional: string[];
} {
  try {
    const env = envValidator.get();
    const issues: string[] = [];
    const missingOptional: string[] = [];

    // Vérifications de santé
    if (!env.DATABASE_URL) issues.push('DATABASE_URL');

    return {
      healthy: issues.length === 0,
      issues,
      missingOptional,
    };
  } catch (error) {
    secureLogger.error('Environment health check failed', error);
    return {
      healthy: false,
      issues: ['Environment validation failed'],
      missingOptional: [],
    };
  }
}
