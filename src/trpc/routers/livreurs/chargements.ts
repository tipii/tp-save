import { Status } from '@/generated/prisma';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { z } from 'zod';

export const livreursChargementsRouter = createTRPCRouter({
  getCurrentChargementByLivreur: protectedProcedure.query(async ({ ctx }) => {
    const currentChargement = await ctx.prisma.chargement.findFirst({
      where: { livreurId: ctx.user.id, status: Status.DELIVERING },
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
      },
    });

    if (currentChargement) {
      return currentChargement;
    }

    const availableChargement = await ctx.prisma.chargement.findFirst({
      where: { livreurId: ctx.user.id, status: Status.READY },
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
      },
    });

    return availableChargement;
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
  transferChargement: protectedProcedure
    .input(z.object({ id: z.string(), livreurId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const chargement = await ctx.prisma.chargement.update({
        where: { id: input.id },
        data: { livreurId: input.livreurId, status: Status.READY },
      });
    }),
});
