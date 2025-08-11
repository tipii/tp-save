import { Status } from '@/generated/prisma';
import { createTRPCRouter, protectedProcedure } from '../init';
import z from 'zod';

export const dashboardRouter = createTRPCRouter({
  getLivraisonsByStatus: protectedProcedure
    .input(z.object({ status: z.enum(Status) }))
    .query(async ({ ctx, input }) => {
      const livraisons = await ctx.prisma.livraison.findMany({
        where: { status: input.status },
        orderBy: {
          updatedAt: 'desc',
        },
        take: 10,
        include: {
          chargement: {
            include: {
              livreur: true,
            },
          },
          commande: {
            include: {
              client: true,
            },
          },
        },
      });

      return livraisons;
    }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    // Compute time window for "today"
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const [commandesRecuesToday, livraisonsEnCours, livraisonsEffectuees, retoursEnCours] =
      await Promise.all([
        ctx.prisma.commande.count({
          where: {
            createdAt: {
              gte: startOfToday,
              lt: startOfTomorrow,
            },
          },
        }),
        ctx.prisma.livraison.count({
          where: { status: Status.DELIVERING },
        }),
        ctx.prisma.livraison.count({
          where: { status: Status.DELIVERED },
        }),
        ctx.prisma.livraison.count({
          where: {
            OR: [
              { status: Status.TO_RETURN },
              { status: Status.RETURNED },
              { status: Status.CANCELLED },
            ],
          },
        }),
      ]);

    return {
      commandesRecuesToday,
      livraisonsEnCours,
      livraisonsEffectuees,
      retoursEnCours,
    };
  }),
});
