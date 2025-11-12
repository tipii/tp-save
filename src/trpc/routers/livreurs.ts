import { auth } from '@/external-services/better-auth/auth';
import { createTRPCRouter, protectedProcedure } from '../init';
import z from 'zod';
import { TRPCError } from '@trpc/server';

export const livreursRouter = createTRPCRouter({
  createLivreur: protectedProcedure
    .input(z.object({ name: z.string(), email: z.string(), password: z.string() }))
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
            data: { role: 'livreur' },
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
  getLivreurs: protectedProcedure.query(async ({ ctx }) => {
    const livreurs = await ctx.prisma.user.findMany({
      where: {
        role: 'livreur',
      },
      include: {
        chargements: {
          take: 3,
          orderBy: {
            updatedAt: 'desc',
          },
          include: {
            livraisons: {
              include: {
                commande: true,
              },
            },
          },
        },
      },
    });
    return livreurs;
  }),

  getLivreurById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const livreur = await ctx.prisma.user.findUnique({
        where: { id: input.id },
        include: {
          chargements: {
            include: {
              livraisons: {
                include: {
                  commande: {
                    include: {
                      client: true,
                    },
                  },
                },
              },
              history: {
                include: {
                  user: true,
                },
                orderBy: {
                  timestamp: 'desc',
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });
      return livreur;
    }),
});
