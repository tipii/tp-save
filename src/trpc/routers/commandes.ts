import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import { Priority, Status, Prisma } from '@/generated/prisma';
import { SortOrder } from '@/types/enums';
import { TRPCError } from '@trpc/server';
import { createTahitiDateRange, getTahitiNow, getTahitiToday } from '@/lib/date-utils';

export const commandesRouter = createTRPCRouter({
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
        expectedDeliveryFrom: z.string().optional(), // ISO date string
        expectedDeliveryTo: z.string().optional(), // ISO date string

        //quick filters
        noExpectedDeliveryDate: z.boolean().optional(),
        expectedDeliveryDatePassed: z.boolean().optional(),

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
        expectedDeliveryFrom,
        expectedDeliveryTo,
        limit,
        page,
        sortBy,
        sortOrder,
        noExpectedDeliveryDate,
        expectedDeliveryDatePassed,
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
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            bp_number: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            bl_number: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            cf_bl_ou_rq_number: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            quote_number: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            facture_number: {
              contains: search,
              mode: 'insensitive',
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

      // Filter by no expected delivery date
      if (noExpectedDeliveryDate) {
        where.livraisons = {
          some: {
            expectedDeliveryDate: null,
            priority: Priority.UNDEFINED,
          },
        };
      }
      // Filter by expected delivery date passed (using Tahiti timezone)
      if (expectedDeliveryDatePassed) {
        where.livraisons = {
          some: {
            expectedDeliveryDate: {
              lt: getTahitiToday(),
            },
            status: {
              notIn: [Status.DELIVERED, Status.CANCELLED, Status.RETURNED],
            },
          },
        };
      }
      // Filter by status
      if (status) {
        where.livraisons = {
          some: {
            status: status,
          },
        };
      }

      // Date range filter using Tahiti timezone
      if (dateFrom || dateTo) {
        where.createdAt = createTahitiDateRange(dateFrom, dateTo);
      }

      // Expected delivery date range filter using Tahiti timezone
      if (expectedDeliveryFrom || expectedDeliveryTo) {
        where.livraisons = {
          ...where.livraisons,
          some: {
            ...(where.livraisons?.some || {}),
            expectedDeliveryDate: createTahitiDateRange(expectedDeliveryFrom, expectedDeliveryTo),
          },
        };
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
              livreur: true,
            },
          },
        },
      });
      return commande;
    }),

  updateCommande: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        priority: z.enum(Priority).optional(),
        status: z.enum(Status).optional(),
        orderReceivedById: z.string().optional(),
        orderTransmittedById: z.string().optional(),
        orderReceptionMode: z.string().optional(),
        orderReceptionDate: z.date().optional(),
        plannedDeliveryDate: z.date().optional(),
        cf_bl_ou_rq_number: z.string().optional(),
        quote_number: z.string().optional(),
        bonPrepaGesco: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, priority, status, ...updateData } = input;
      const userId = ctx.user.id;

      try {
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

        // Update the commande with Tahiti timezone timestamp
        const updatedCommande = await ctx.prisma.commande.update({
          where: { id },
          data: {
            ...updateData,
            updatedAt: getTahitiNow(),
            priority: priority,
            status: status,
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

        if (updatedCommande.livraisons.length > 0) {
          for (const livraison of updatedCommande.livraisons) {
            await ctx.prisma.livraison.update({
              where: { id: livraison.id },
              data: {
                priority: priority,
                expectedDeliveryDate: updateData.plannedDeliveryDate,
              },
            });
          }
        }

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
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update commande',
        });
      }
    }),
  getDashboardCommandes: protectedProcedure.query(async ({ ctx }) => {
    const commandes = await ctx.prisma.commande.findMany({
      where: { status: Status.PENDING },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      include: {
        client: true,
        livraisons: {
          include: {
            chargement: true,
          },
        },
      },
    });

    return commandes;
  }),
});
