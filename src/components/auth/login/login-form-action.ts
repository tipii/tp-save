'use server';

import { headers } from 'next/headers';
import { auth, User } from '@/external-services/better-auth/auth';
import { loginFormSchema } from './login-form-schema';
import { secureLogger } from '@/lib/logger';
import { actionClient } from '@/lib/safe-action';
import { getComprehensiveFrenchErrorMessage } from '../utils/errors';

// Safe action for login
export const submitLoginAction = actionClient
  .inputSchema(loginFormSchema)
  .action(async ({ parsedInput: validatedData }) => {
    try {
      secureLogger.info('Login attempt started', {
        email: validatedData.email,
        rememberMe: Boolean(validatedData.rememberMe),
        timestamp: new Date().toISOString(),
      });

      // Attempt to sign in with Better Auth
      const result = await auth.api.signInEmail({
        body: {
          email: validatedData.email,
          password: validatedData.password,
          rememberMe: validatedData.rememberMe || false,
        },
        headers: await headers(),
      });

      // Check if authentication was successful
      if (result?.user) {
        secureLogger.info('User login successful', {
          userId: result.user.id,
          email: result.user.email,
          userRole: (result.user as User).role,
          timestamp: new Date().toISOString(),
        });

        // Determine redirect based on user role
        const userRole = (result.user as User).role;
        const redirectPath = userRole === 'admin' ? '/admin/dashboard' : '/';

        return {
          success: true,
          message: 'Connexion réussie! Bienvenue.',
          redirectTo: redirectPath,
        };
      } else {
        secureLogger.warn('Login failed - no user returned', {
          email: validatedData.email,
          timestamp: new Date().toISOString(),
        });

        throw new Error('INVALID_CREDENTIALS');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      secureLogger.error('Login authentication error', {
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
