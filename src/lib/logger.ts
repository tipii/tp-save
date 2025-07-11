/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from 'tslog';

const logger = new Logger({
  name: 'devlab-ecommerce-starter',
  minLevel: process.env.NODE_ENV === 'production' ? 3 : 0,
  hideLogPositionForProduction: true,
});

class SecureLogger {
  debug(message: string, data?: any) {
    if (process.env.NODE_ENV !== 'production') {
      if (data !== undefined) {
        logger.debug(message, this.sanitizeData(data));
      } else {
        logger.debug(message);
      }
    }
  }

  info(message: string, data?: any) {
    if (data !== undefined) {
      logger.info(message, this.sanitizeData(data));
    } else {
      logger.info(message);
    }
  }

  warn(message: string, data?: any) {
    if (data !== undefined) {
      logger.warn(message, this.sanitizeData(data));
    } else {
      logger.warn(message);
    }
  }

  error(message: string, error?: any) {
    if (error !== undefined) {
      logger.error(message, this.sanitizeError(error));
    } else {
      logger.error(message);
    }
  }

  private sanitizeData(data: any): any {
    if (!data) return data;

    const sensitiveFields = [
      'password',
      'token',
      'accessToken',
      'refreshToken',
      // "email",
      'payzenOrderId',
      'paymentData',
      'userRoles',
    ];

    if (typeof data === 'object') {
      const sanitized = { ...data };

      sensitiveFields.forEach((field) => {
        if (field in sanitized) {
          sanitized[field] = '[REDACTED]';
        }
      });

      return sanitized;
    }

    return data;
  }

  private sanitizeError(error: any): any {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
      };
    }
    return this.sanitizeData(error);
  }
}

export const secureLogger = new SecureLogger();
