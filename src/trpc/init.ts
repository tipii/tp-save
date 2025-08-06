import { auth } from '@/external-services/better-auth/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';
import superjson from 'superjson';
import prisma from '@/lib/prisma';

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return {};
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

// THERE SHOULD NOT BE ANY PUBLIC PROCEDURES
// export const publicProcedure = t.procedure.use(async ({ next }) => {
//   return next({ ctx: { prisma } });
// });

export const protectedProcedure = t.procedure.use(async ({ next }) => {
  try {
    // Get the session from Better Auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource',
      });
    }

    return next({
      ctx: {
        prisma,
        user: session.user,
      },
    });
  } catch (error) {
    // If session retrieval fails, throw unauthorized error
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication failed',
    });
  }
});

export const adminProcedure = t.procedure.use(async ({ next }) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session?.user.role !== 'admin') {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be an admin to access this resource',
      });
    }

    return next({
      ctx: {
        prisma,
        user: session.user,
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication failed',
    });
  }
});
