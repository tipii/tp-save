import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import { Priority, SortOrder, Status } from '@/types/enums';
import { Prisma } from '@/generated/prisma';

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
        lots: {
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
        offset: z.number().min(0).default(0),

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
        offset,
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
        where.priority = priority;
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
      if (sortBy === 'ref' || sortBy === 'priority' || sortBy === 'status') {
        orderBy[sortBy] = sortOrder;
      } else if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        orderBy[sortBy] = sortOrder;
      }

      // Get total count for pagination
      const totalCount = await ctx.prisma.commande.count({ where });

      // Get commandes with filters and pagination
      const commandes = await ctx.prisma.commande.findMany({
        where,
        include: {
          lots: {
            include: {
              chargement: true,
            },
          },
          client: true,
        },
        orderBy,
        take: limit,
        skip: offset,
      });

      return {
        commandes,
        pagination: {
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: Math.floor(offset / limit) + 1,
          hasNextPage: offset + limit < totalCount,
          hasPrevPage: offset > 0,
        },
      };
    }),
});
