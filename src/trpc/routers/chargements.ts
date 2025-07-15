import z from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';

export const chargementsRouter = createTRPCRouter({
  getChargements: protectedProcedure.query(async ({ ctx }) => {
    const chargements = await ctx.prisma.chargement.findMany();
    return chargements;
  }),
  createChargement: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        livreurId: z.string(),
        commandes: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const chargement = await ctx.prisma.chargement.create({
        data: {
          name: input.name || 'Chargement ' + new Date().toLocaleDateString(),
          livreurId: input.livreurId,
          status: 'ready',
          commandes: {
            connect: input.commandes.map((commandeId) => ({ id: commandeId })),
          },
        },
      });

      const updatedCommandes = await ctx.prisma.commande.updateMany({
        where: {
          id: { in: input.commandes },
        },
        data: { status: 'ready' },
      });

      if (!chargement) {
        return {
          success: false,
          error: 'Failed to create chargement',
          chargement: null,
        };
      }

      try {
        await ctx.prisma.chargementHistory.create({
          data: {
            chargementId: chargement.id,
            userId: ctx.user.id,
            action: 'create',
            snapshot: chargement,
          },
        });
      } catch (error) {
        console.error(error);
      }

      // await ctx.prisma.commande.updateMany({
      //   where: {
      //     id: { in: input.commandes },
      //   },
      //   data: { chargementId: chargement.id },
      // });
      return {
        success: true,
        chargement,
        error: null,
      };
    }),
});
