import { Status } from '@/generated/prisma';
import { getTahitiDayEnd, getTahitiNow, getTahitiDayStart } from '@/lib/date-utils';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { z } from 'zod';

export const livreursChargementsRouter = createTRPCRouter({
  getActiveChargement: protectedProcedure.query(async ({ ctx }) => {
    const activeChargement = await ctx.prisma.chargement.findFirst({
      where: { livreurId: ctx.user.id, status: Status.DELIVERING },
      include: {
        livraisons: {
          include: {
            commande: {
              include: {
                client: true,
                livraisons: true,
              },
            },
          },
        },
      },
    });

    return activeChargement;
  }),
  getAvailableChargements: protectedProcedure.query(async ({ ctx }) => {
    const dayStart = getTahitiDayStart(getTahitiNow());
    const dayEnd = getTahitiDayEnd(getTahitiNow());

    const availableChargements = await ctx.prisma.chargement.findMany({
      where: {
        livreurId: ctx.user.id,
        status: Status.READY,
        dateLivraison: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      include: {
        livraisons: {
          include: {
            commande: {
              include: {
                client: true,
                livraisons: true,
              },
            },
          },
        },
      },
    });

    return availableChargements;
  }),
  updateChargementStatus: protectedProcedure
    .input(z.object({ id: z.string(), status: z.enum(Status) }))
    .mutation(async ({ ctx, input }) => {
      const chargement = await ctx.prisma.chargement.update({
        where: { id: input.id },
        data: { status: input.status },
      });

      // update livraisons associated to the chargement
      if (input.status === Status.DELIVERING) {
        await ctx.prisma.livraison.updateMany({
          where: { chargementId: input.id },
          data: { status: Status.DELIVERING },
        });
      }
    }),
});
