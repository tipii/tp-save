import { betterAuth, z } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { admin, phoneNumber, username } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';
// import { sendEmail } from '@/external-services/email/email-service';
import { clientEnv } from '@/external-services/env/client';

export const auth = betterAuth({
  trustedOrigins: [clientEnv.NEXT_PUBLIC_APP_URL],
  baseURL: clientEnv.NEXT_PUBLIC_APP_URL,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    // add more user fields here
  },
  plugins: [nextCookies(), admin(), username(), phoneNumber()],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // await sendEmail({
      //   to: user.email,
      //   subject: 'Réinitialisation de votre mot de passe',
      //   emailType: 'reset-password',
      //   emailProps: {
      //     userName: user.name || undefined,
      //     resetUrl: url,
      //   },
      // });
    },
  },
  // emailVerification: {
  //   sendOnSignUp: true,
  //   autoSignInAfterVerification: true,
  //   expiresIn: 60 * 60 * 24, // 1 day

  //   sendVerificationEmail: async ({ user, url, token }) => {
  //     await sendEmail({
  //       to: user.email,
  //       subject: 'Vérification de votre adresse e-mail',
  //       emailType: 'verify-email',
  //       emailProps: {
  //         userName: user.name || undefined,
  //         verificationUrl: `${url}?token=${token}`,
  //       },
  //     });
  //   },
  // },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
