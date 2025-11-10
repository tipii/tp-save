import { Status, Priority } from '@/generated/prisma';
import { createTRPCRouter, protectedProcedure } from '../init';
import z from 'zod';
import { getTahitiToday, getTahitiDayEnd } from '@/lib/date-utils';

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
    // Compute time window for "today" in Tahiti timezone
    const startOfToday = getTahitiToday();
    const endOfToday = getTahitiDayEnd(startOfToday);

    const [commandesRecuesToday, livraisonsEnCours, livraisonsEffectuees, retoursEnCours] =
      await Promise.all([
        ctx.prisma.commande.count({
          where: {
            createdAt: {
              gte: startOfToday,
              lte: endOfToday,
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

  getLivraisonsByMonth: protectedProcedure
    .input(
      z.object({
        year: z.number(),
        month: z.number().min(0).max(11), // 0-11 (JavaScript month format)
      }),
    )
    .query(async ({ ctx, input }) => {
      const { year, month } = input;

      // Calculate start and end of month
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);

      // Get all livraisons for the month
      const livraisons = await ctx.prisma.livraison.findMany({
        where: {
          expectedDeliveryDate: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        select: {
          expectedDeliveryDate: true,
          priority: true,
        },
      });

      // Get number of days in month
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Create array of all days in month with delivery counts
      const result = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(year, month, day);

        // Filter livraisons for this specific day
        const dayLivraisons = livraisons.filter((livraison) => {
          if (!livraison.expectedDeliveryDate) return false;
          const livraisonDate = new Date(livraison.expectedDeliveryDate);
          return (
            livraisonDate.getDate() === day &&
            livraisonDate.getMonth() === month &&
            livraisonDate.getFullYear() === year
          );
        });

        // Count by priority
        const priorityCounts: Record<string, number> = {
          [Priority.URGENT]: 0,
          [Priority.ILES]: 0,
          [Priority.NORMAL]: 0,
          [Priority.UNDEFINED]: 0,
        };

        dayLivraisons.forEach((livraison) => {
          priorityCounts[livraison.priority]++;
        });

        // Format output
        const livraisons_data = [
          { priority: Priority.URGENT, count: priorityCounts[Priority.URGENT] },
          { priority: Priority.ILES, count: priorityCounts[Priority.ILES] },
          { priority: Priority.NORMAL, count: priorityCounts[Priority.NORMAL] },
          { priority: Priority.UNDEFINED, count: priorityCounts[Priority.UNDEFINED] },
        ];

        result.push({
          day: dayDate,
          livraisons: livraisons_data,
        });
      }

      return result;
    }),
});
