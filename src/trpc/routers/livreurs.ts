import { auth } from '@/external-services/better-auth/auth';
import { createTRPCRouter, secretariatOrAdminProcedure } from '../init';
import z from 'zod';
import { TRPCError } from '@trpc/server';

export const livreursRouter = createTRPCRouter({
  getLivreurs: secretariatOrAdminProcedure.query(async ({ ctx }) => {
    try {
      const livreurs = await ctx.prisma.user.findMany({
        where: {
          role: 'livreur',
          OR: [{ banned: false }, { banned: null }],
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
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erreur lors de la récupération des livreurs',
      });
    }
  }),

  getLivreurById: secretariatOrAdminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
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

        if (!livreur) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Livreur non trouvé' });
        }

        return livreur;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors de la récupération du livreur',
        });
      }
    }),
});
