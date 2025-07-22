import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import { Priority, Status, Prisma } from '@/generated/prisma';
import { SortOrder } from '@/types/enums';
import { TRPCError } from '@trpc/server';

export const commandesRouter = createTRPCRouter({
  getPendingCommandes: protectedProcedure.query(async ({ ctx }) => {
    const commandes = await ctx.prisma.commande.findMany({
      where: {
        livraisons: {
          some: {
            status: {
              equals: Status.PENDING,
            },
          },
        },
      },
      include: {
        client: true,
        livraisons: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            chargement: true,
          },
        },
      },
    });
    return commandes;
  }),
  getCommandes: protectedProcedure
    .input(
      z.object({
        // Search and filters
        search: z.string().optional(), // Search in ref and client name
        clientId: z.string().optional(),
        priority: z.enum(Priority).optional(),
        status: z.enum(Status).optional(),
        dateFrom: z.string().optional(), // ISO date string
        dateTo: z.string().optional(), // ISO date string

        // Pagination
        limit: z.number().min(1).max(100).default(20),
        page: z.number().min(1).default(1),

        // Sorting
        sortBy: z
          .enum(['ref', 'createdAt', 'updatedAt', 'priority', 'status'])
          .default('createdAt'),
        sortOrder: z.enum(SortOrder).default(SortOrder.DESC),
      }),
    )
    .query(async ({ ctx, input }) => {
      const {
        search,
        clientId,
        priority,
        status,
        dateFrom,
        dateTo,
        limit,
        page,
        sortBy,
        sortOrder,
      } = input;

      // Build where clause
      const where: Prisma.CommandeWhereInput = {};

      // Search in ref and client name
      if (search) {
        where.OR = [
          {
            ref: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            client: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ];
      }

      // Filter by client
      if (clientId) {
        where.clientId = clientId;
      }

      // Filter by priority
      if (priority) {
        where.livraisons = {
          some: {
            priority: priority,
          },
        };
      }

      // Filter by status
      if (status) {
        where.status = status;
      }

      // Date range filter
      if (dateFrom || dateTo) {
        where.createdAt = {};
        if (dateFrom) {
          where.createdAt.gte = new Date(dateFrom);
        }
        if (dateTo) {
          // Add one day to include the entire day
          const endDate = new Date(dateTo);
          endDate.setDate(endDate.getDate() + 1);
          where.createdAt.lt = endDate;
        }
      }

      // Build orderBy clause
      const orderBy: Prisma.CommandeOrderByWithRelationInput = {};
      if (sortBy === 'ref' || sortBy === 'createdAt' || sortBy === 'updatedAt') {
        orderBy[sortBy] = sortOrder;
      } else if (sortBy === 'priority' || sortBy === 'status') {
        orderBy.livraisons = {
          [sortBy]: sortOrder,
        };
      }

      // Get total count for pagination
      const totalCount = await ctx.prisma.commande.count({ where });

      try {
        // Get commandes with filters and pagination
        const commandes = await ctx.prisma.commande.findMany({
          where,
          include: {
            livraisons: {
              orderBy: {
                createdAt: 'asc',
              },
              include: {
                chargement: true,
              },
            },
            client: true,
          },
          orderBy,
          take: limit,
          skip: (page - 1) * limit,
        });

        return {
          commandes,
          pagination: {
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            hasNextPage: page * limit < totalCount,
            hasPrevPage: page > 1,
          },
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch commandes',
        });
      }
    }),
  getCommandeById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const commande = await ctx.prisma.commande.findUnique({
        where: { id },
        include: {
          client: true,
          history: {
            include: {
              user: true,
            },
          },
          livraisons: {
            orderBy: {
              createdAt: 'asc',
            },
            include: {
              chargement: true,
            },
          },
        },
      });
      return commande;
    }),

  enableEdit: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const userId = ctx.user.id;

      // Check if commande is already unlocked for editing by someone else
      const existing = await ctx.prisma.commande.findUnique({
        where: { id },
        select: { lockedBy: true, lockedUntil: true },
      });

      if (existing?.lockedBy && existing.lockedBy !== userId) {
        const isUnlockExpired = existing.lockedUntil && new Date() > existing.lockedUntil;
        if (!isUnlockExpired) {
          throw new Error('Commande is already being edited by another user');
        }
      }

      // Unlock for editing for 15 minutes
      const lockedUntil = new Date(Date.now() + 15 * 60 * 1000);

      return await ctx.prisma.commande.update({
        where: { id },
        data: {
          lockedBy: userId,
          lockedUntil,
        },
      });
    }),

  disableEdit: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const userId = ctx.user.id;

      return await ctx.prisma.commande.update({
        where: { id },
        data: {
          lockedBy: null,
          lockedUntil: null,
        },
      });
    }),

  updateCommande: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        ref: z.string().optional(),
        priority: z.enum(Priority).optional(),
        status: z.enum(Status).optional(),
        orderReceivedById: z.string().optional(),
        orderTransmittedById: z.string().optional(),
        orderReceptionMode: z.string().optional(),
        orderReceptionDate: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;
      const userId = ctx.user.id;

      // Check if user has unlocked the commande for editing
      const existing = await ctx.prisma.commande.findUnique({
        where: { id },
        select: { lockedBy: true, lockedUntil: true },
      });

      if (existing?.lockedBy !== userId) {
        throw new Error('You must unlock the commande before editing');
      }

      // Get current state for history
      const currentCommande = await ctx.prisma.commande.findUnique({
        where: { id },
        include: {
          client: true,
          livraisons: {
            include: {
              chargement: true,
            },
          },
        },
      });

      // Update the commande
      const updatedCommande = await ctx.prisma.commande.update({
        where: { id },
        data: {
          ...updateData,
          updatedAt: new Date(),
        },
        include: {
          client: true,
          livraisons: {
            include: {
              chargement: true,
            },
          },
        },
      });

      // Create history entry
      await ctx.prisma.commandeHistory.create({
        data: {
          commandeId: id,
          userId,
          action: 'UPDATE',
          snapshot: JSON.parse(JSON.stringify(currentCommande)),
        },
      });

      return updatedCommande;
    }),
});
