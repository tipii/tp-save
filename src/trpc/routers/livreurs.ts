import { auth } from '@/external-services/better-auth/auth';
import { createTRPCRouter, secretariatOrAdminProcedure } from '../init';
import z from 'zod';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@/generated/prisma';
import { getTahitiDayStart, getTahitiDayEnd } from '@/lib/date-utils';

export const livreursRouter = createTRPCRouter({
  getLivreurs: secretariatOrAdminProcedure
    .input(
      z
        .object({
          selectedDate: z.date().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      try {
        // Build chargements where clause
        let chargementsWhere: Prisma.ChargementWhereInput = {};

        if (input?.selectedDate) {
          const dayStart = getTahitiDayStart(input.selectedDate);
          const dayEnd = getTahitiDayEnd(input.selectedDate);

          chargementsWhere = {
            dateLivraison: { gte: dayStart, lte: dayEnd },
          };
        }

        const livreurs = await ctx.prisma.user.findMany({
          where: {
            role: 'livreur',
            OR: [{ banned: false }, { banned: null }],
          },
          include: {
            chargements: {
              where: chargementsWhere,
              orderBy: {
                updatedAt: 'desc',
              },
              include: {
                livraisons: {
                  include: {
                    commande: {
                      include: {
                        client: true,
                        docVente: true,
                        livraisons: true,
                      },
                    },
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
