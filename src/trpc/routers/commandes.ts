import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';

export const commandesRouter = createTRPCRouter({
  getPendingCommandes: protectedProcedure.query(async ({ ctx }) => {
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
  getCommandes: protectedProcedure.query(async ({ ctx }) => {
    const commandes = await ctx.prisma.commande.findMany({
      include: {
        chargement: {
          include: {
            livreur: true,
          },
        },
        client: true,
      },
    });
    return commandes;
  }),
});
