'use server';

import { headers } from 'next/headers';
import { auth } from '@/external-services/better-auth/auth';
import { secureLogger } from '@/lib/logger';
import { actionClient } from '@/lib/safe-action';
import { getComprehensiveFrenchErrorMessage } from '../utils/errors';
import { registerFormSchema } from './register-form-schema';

// Safe action for registration
export const submitRegisterAction = actionClient
  .inputSchema(registerFormSchema)
  .action(async ({ parsedInput: validatedData }) => {
    try {
      secureLogger.info('Registration attempt started', {
        email: validatedData.email,
        timestamp: new Date().toISOString(),
      });

      // Register with Better Auth
      const result = await auth.api.signUpEmail({
        body: {
          email: validatedData.email,
          password: validatedData.password,
          name: `${validatedData.firstName} ${validatedData.lastName}`,
          callbackURL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
          phoneNumber: validatedData.phone,
        },
        headers: await headers(),
      });

      // Handle successful registration
      if (result?.user) {
        secureLogger.info('User registration successful', {
          userId: result.user.id,
          email: result.user.email,
          name: result.user.name,
          hasPhone: Boolean(validatedData.phone),
          timestamp: new Date().toISOString(),
        });

        return {
          success: true,
          message: 'Compte créé avec succès! Vous pouvez maintenant vous connecter.',
          redirectTo: '/auth/login',
        };
      } else {
        secureLogger.error('Registration failed - no user returned', {
          email: validatedData.email,
          timestamp: new Date().toISOString(),
        });

        throw new Error('REGISTRATION_FAILED');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      secureLogger.error('Registration error', {
        error: errorMessage,
        email: validatedData.email,
        timestamp: new Date().toISOString(),
      });

      return {
        success: false,
        error: getComprehensiveFrenchErrorMessage(errorMessage),
        email: validatedData.email,
        timestamp: new Date().toISOString(),
      };
    }
  });
