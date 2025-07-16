import z from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';

export const chargementsRouter = createTRPCRouter({
  getChargements: protectedProcedure.query(async ({ ctx }) => {
    const chargements = await ctx.prisma.chargement.findMany({
      include: {
        lots: {
          include: {
            commande: true,
          },
        },
        livreur: true,
      },
    });
    return chargements;
  }),
  getChargementById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const chargement = await ctx.prisma.chargement.findUnique({
        where: { id: input.id },
        include: {
          livreur: true,
          lots: {
            include: {
              commande: {
                include: {
                  client: true,
                  lots: true,
                },
              },
            },
          },
        },
      });
      return chargement;
    }),
  createChargement: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        livreurId: z.string(),
        lots: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const chargement = await ctx.prisma.chargement.create({
        data: {
          name: input.name || 'Chargement ' + new Date().toLocaleDateString(),
          livreurId: input.livreurId,
          status: 'ready',
          lots: {
            connect: input.lots.map((lotId) => ({ id: lotId })),
          },
        },
      });

      const updatedLots = await ctx.prisma.lot.updateMany({
        where: {
          id: { in: input.lots },
        },
        data: { status: 'ready' },
      });

      //TODO : update commande

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
