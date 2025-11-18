import z from 'zod';
import { adminProcedure, createTRPCRouter, protectedProcedure } from '../init';
import { Status } from '@/generated/prisma';
import { formatDateForTahiti, getTahitiNow } from '@/lib/date-utils';

export const chargementsRouter = createTRPCRouter({
  getChargements: protectedProcedure.query(async ({ ctx }) => {
    const chargements = await ctx.prisma.chargement.findMany({
      include: {
        livraisons: {
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
      return chargement;
    }),
  createChargement: adminProcedure
    .input(
      z.object({
        name: z.string().optional(),
        livreurId: z.string(),
        livraisons: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const chargement = await ctx.prisma.chargement.create({
        data: {
          name: input.name || 'Chargement ' + formatDateForTahiti(getTahitiNow()),
          livreurId: input.livreurId,
          status: Status.READY,
          livraisons: {
            connect: input.livraisons.map((livraisonId) => ({ id: livraisonId })),
          },
        },
      });

      const updatedLivraisons = await ctx.prisma.livraison.updateMany({
        where: {
          id: { in: input.livraisons },
        },
        data: { status: Status.READY, livreurId: input.livreurId },
      });

      console.log(updatedLivraisons);
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

  deleteChargement: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const chargement = await ctx.prisma.chargement.findUnique({
        where: { id: input.id },
      });
      if (!chargement) {
        return {
          success: false,
          error: 'Chargement non trouvé',
          chargement: null,
        };
      }

      const updatedLivraisons = await ctx.prisma.livraison.updateMany({
        where: { chargementId: input.id },
        data: { chargementId: null, status: Status.PENDING },
      });

      await ctx.prisma.chargement.delete({
        where: { id: input.id },
      });

      return {
        success: true,
        chargement,
        error: null,
      };
    }),

  /**
   *
   * Livreurs procedures
   *
   */
  getChargementsByLivreur: protectedProcedure.query(async ({ ctx }) => {
    const chargements = await ctx.prisma.chargement.findMany({
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
    return chargements;
  }),
});
