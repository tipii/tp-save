import { Status, Priority } from '@/generated/prisma';
import { createTRPCRouter, protectedProcedure } from '../init';
import z from 'zod';
import { getTahitiToday, getTahitiDayEnd, toTahitiTime, TAHITI_TIMEZONE } from '@/lib/date-utils';
import { toZonedTime } from 'date-fns-tz';

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

    const [
      commandesRecuesToday,
      livraisonsEnCours,
      livraisonsEffectuees,
      retoursEnCours,
      commandesEnRetard,
    ] = await Promise.all([
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
      ctx.prisma.livraison.count({
        where: {
          AND: {
            expectedDeliveryDate: {
              lt: toTahitiTime(new Date()),
            },
            status: {
              notIn: [Status.DELIVERED, Status.CANCELLED, Status.RETURNED],
            },
          },
        },
      }),
    ]);

    return {
      commandesRecuesToday,
      livraisonsEnCours,
      livraisonsEffectuees,
      retoursEnCours,
      commandesEnRetard,
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

      // Calculate start and end of month in Tahiti timezone
      // Create a date at the start of the month in Tahiti timezone
      const startOfMonthTahiti = toZonedTime(new Date(year, month, 1, 0, 0, 0, 0), TAHITI_TIMEZONE);

      // Create a date at the end of the month in Tahiti timezone
      const endOfMonthTahiti = toZonedTime(
        new Date(year, month + 1, 0, 23, 59, 59, 999),
        TAHITI_TIMEZONE,
      );

      // Get all livraisons for the month
      const livraisons = await ctx.prisma.livraison.findMany({
        where: {
          expectedDeliveryDate: {
            gte: startOfMonthTahiti,
            lte: endOfMonthTahiti,
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
        // Create date in Tahiti timezone for this specific day
        const dayDate = toZonedTime(new Date(year, month, day, 0, 0, 0, 0), TAHITI_TIMEZONE);

        // Filter livraisons for this specific day in Tahiti timezone
        const dayLivraisons = livraisons.filter((livraison) => {
          if (!livraison.expectedDeliveryDate) return false;

          // Convert the livraison date to Tahiti timezone for comparison
          const livraisonDateTahiti = toZonedTime(livraison.expectedDeliveryDate, TAHITI_TIMEZONE);

          return (
            livraisonDateTahiti.getDate() === day &&
            livraisonDateTahiti.getMonth() === month &&
            livraisonDateTahiti.getFullYear() === year
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
