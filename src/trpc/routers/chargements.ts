import z from 'zod';
import { adminProcedure, createTRPCRouter, protectedProcedure } from '../init';
import { Prisma, Status } from '@/generated/prisma';
import {
  formatDateForTahiti,
  getTahitiNow,
  getTahitiDayStart,
  getTahitiDayEnd,
} from '@/lib/date-utils';

export const chargementsRouter = createTRPCRouter({
  getChargements: protectedProcedure.query(async ({ ctx }) => {
    const chargements = await ctx.prisma.chargement.findMany({
      include: {
        livreur: true,
        livraisons: {
          include: {
            userDoc: true,
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
    return chargements;
  }),
  getChargementById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const chargement = await ctx.prisma.chargement.findUnique({
        where: { id: input.id },
        include: {
          history: {
            include: {
              user: true,
            },
            where: {
              action: {
                in: ['create'],
              },
            },
          },
          livreur: true,
          livraisons: {
            include: {
              userDoc: true,
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
  getArchivedChargements: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
        livreurId: z.string().optional(),
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        page: z.number().min(1).default(1),
        sortBy: z.enum(['name', 'createdAt', 'updatedAt']).default('updatedAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, livreurId, dateFrom, dateTo, limit, page, sortBy, sortOrder } = input;

      // Build where clause
      const where: Prisma.ChargementWhereInput = {
        status: Status.DELIVERED,
      };

      // Search filter (by name, livreur name, commande ref, or client name)
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { livreur: { name: { contains: search, mode: 'insensitive' } } },
          {
            livraisons: { some: { commande: { ref: { contains: search, mode: 'insensitive' } } } },
          },
          {
            livraisons: {
              some: { commande: { client: { name: { contains: search, mode: 'insensitive' } } } },
            },
          },
        ];
      }

      // Livreur filter
      if (livreurId) {
        where.livreurId = livreurId;
      }

      // Date range filter (updatedAt - when it was marked as delivered)
      if (dateFrom || dateTo) {
        where.updatedAt = {};
        if (dateFrom) {
          where.updatedAt.gte = getTahitiDayStart(new Date(dateFrom));
        }
        if (dateTo) {
          where.updatedAt.lte = getTahitiDayEnd(new Date(dateTo));
        }
      }

      // Get total count for pagination
      const totalCount = await ctx.prisma.chargement.count({ where });

      // Build orderBy
      const orderBy: Prisma.ChargementOrderByWithRelationInput = {
        [sortBy]: sortOrder,
      };

      // Get paginated results
      const chargements = await ctx.prisma.chargement.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          livreur: true,
          livraisons: {
            include: {
              userDoc: true,
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

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit);

      return {
        chargements,
        pagination: {
          totalCount,
          totalPages,
          currentPage: page,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
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
