import z from 'zod';
import { createTRPCRouter, adminProcedure } from '../init';
import { auth } from '@/external-services/better-auth/auth';
import { TRPCError } from '@trpc/server';

export const usersRouter = createTRPCRouter({
  getUsers: adminProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return users;
  }),
  createUser: adminProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string(), role: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const livreur = await auth.api.signUpEmail({
          body: {
            name: input.name,
            email: input.email,
            password: input.password,
          },
        });

        if (livreur?.user) {
          await ctx.prisma.user.update({
            where: { id: livreur.user.id },
            data: { role: input.role },
          });
        }

        return { success: true, livreur: livreur?.user };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors de la création du livreur',
        });
      }
    }),
});
