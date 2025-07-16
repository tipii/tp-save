import z from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';

export const lotsRouter = createTRPCRouter({
  getPendingLots: protectedProcedure.query(async ({ ctx }) => {
    const lots = await ctx.prisma.lot.findMany({
      where: {
        status: 'pending',
      },
      include: {
        commande: {
          include: {
            client: true,
            lots: true,
          },
        },
      },
    });

    console.log(lots);
    return lots;
  }),
  changePriority: protectedProcedure
    .input(
      z.object({
        lotId: z.string(),
        priority: z.enum(['Urgent', 'Normal', 'Îles']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { lotId, priority } = input;
      const lot = await ctx.prisma.lot.update({
        where: { id: lotId },
        data: { priority },
      });

      return lot;
    }),
});
