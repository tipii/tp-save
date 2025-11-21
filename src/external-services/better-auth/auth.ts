import { betterAuth, z } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { admin as adminPlugin, phoneNumber, username } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';
// import { sendEmail } from '@/external-services/email/email-service';
import { clientEnv } from '@/external-services/env/client';
import { Role } from '@/lib/constants';
import { createAccessControl } from 'better-auth/plugins/access';

// ROLES STATEMENTS
export const statement = {
  user: ['create', 'list', 'set-role', 'ban', 'impersonate', 'delete', 'set-password'],
} as const;

const ac = createAccessControl(statement);

export const secretariat = ac.newRole({ user: [] });
export const admin = ac.newRole({
  user: ['create', 'list', 'set-role', 'ban', 'impersonate', 'delete', 'set-password'],
});
export const livreur = ac.newRole({ user: [] });

export const auth = betterAuth({
  trustedOrigins: [clientEnv.NEXT_PUBLIC_APP_URL],
  baseURL: clientEnv.NEXT_PUBLIC_APP_URL,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    // add more user fields here
  },
  plugins: [
    nextCookies(),
    adminPlugin({ roles: { secretariat, admin, livreur } }),
    username(),
    phoneNumber(),
  ],
  emailAndPassword: {
    enabled: true,
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
