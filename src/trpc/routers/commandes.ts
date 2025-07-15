import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';

export const commandesRouter = createTRPCRouter({
  getCommandes: protectedProcedure.query(async ({ ctx }) => {
    const commandes = await ctx.prisma.commande.findMany({
      where: {
        status: {
          equals: 'pending',
        },
      },
      include: {
        client: true,
      },
    });
    return commandes;
  }),
});
