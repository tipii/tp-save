import z from 'zod';
import { createTRPCRouter, secretariatOrAdminProcedure } from '../init';
import { Prisma, Status } from '@/generated/prisma';
import { formatDateForTahiti, getTahitiDayStart, getTahitiDayEnd } from '@/lib/date-utils';
import { TRPCError } from '@trpc/server';

export const chargementsRouter = createTRPCRouter({
  getChargements: secretariatOrAdminProcedure.query(async ({ ctx }) => {
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
  getChargementById: secretariatOrAdminProcedure
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
  getArchivedChargements: secretariatOrAdminProcedure
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
  addToTmpChargement: secretariatOrAdminProcedure
    .input(
      z.object({
        livraisonId: z.string(),
        livreurId: z.string(),
        dateLivraison: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Get livreur info first for the name
        const livreur = await ctx.prisma.user.findUnique({
          where: { id: input.livreurId },
        });

        if (!livreur) {
          return {
            success: false,
            message: 'Livreur non trouvé',
            chargement: null,
            error: 'Livreur non trouvé',
          };
        }

        // Use upsert to atomically create or update tmp chargement
        // The unique constraint on [livreurId, status, dateLivraison] ensures no duplicates
        const chargement = await ctx.prisma.chargement.upsert({
          where: {
            livreurId: input.livreurId,
            status: Status.PENDING,
            dateLivraison: input.dateLivraison,
          },
          create: {
            name: 'Tmp Chargement ' + livreur.name,
            livreurId: input.livreurId,
            status: Status.PENDING,
            dateLivraison: input.dateLivraison,
            livraisons: {
              connect: { id: input.livraisonId },
            },
          },
          update: {
            livraisons: {
              connect: { id: input.livraisonId },
            },
          },
        });

        return {
          success: true,
          chargement,
          message:
            chargement.createdAt.getTime() === chargement.updatedAt.getTime()
              ? 'Chargement temporaire créé avec succès'
              : 'Livraison ajoutée au chargement temporaire',
          error: null,
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "Erreur lors de l'ajout de la livraison au chargement temporaire",
        });
      }
    }),
  removeFromTmpChargement: secretariatOrAdminProcedure
    .input(
      z.object({
        livraisonId: z.string(),
        livreurId: z.string(),
        dateLivraison: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const dayStart = getTahitiDayStart(input.dateLivraison);
        const dayEnd = getTahitiDayEnd(input.dateLivraison);

        const tmpChargement = await ctx.prisma.chargement.findFirst({
          where: {
            livreurId: input.livreurId,
            status: Status.PENDING,
            dateLivraison: {
              gte: dayStart,
              lte: dayEnd,
            },
          },
          include: { livraisons: true },
        });

        if (!tmpChargement) {
          return {
            success: false,
            error: 'Chargement temporaire non trouvé',
          };
        }

        // Disconnect livraison from chargement
        await ctx.prisma.chargement.update({
          where: { id: tmpChargement.id },
          data: {
            livraisons: { disconnect: { id: input.livraisonId } },
          },
        });

        // If chargement has only 1 livraison (the one we just removed), delete it
        if (tmpChargement.livraisons.length === 1) {
          await ctx.prisma.chargement.delete({
            where: { id: tmpChargement.id },
          });
        }

        return {
          success: true,
          message: 'Livraison retirée du chargement temporaire',
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors du retrait de la livraison du chargement temporaire',
        });
      }
    }),
  moveToAnotherTmpChargement: secretariatOrAdminProcedure
    .input(
      z.object({
        livraisonId: z.string(),
        fromLivreurId: z.string(),
        toLivreurId: z.string(),
        dateLivraison: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const dayStart = getTahitiDayStart(input.dateLivraison);
        const dayEnd = getTahitiDayEnd(input.dateLivraison);

        // 1. Remove from source tmp chargement
        const sourceTmpChargement = await ctx.prisma.chargement.findFirst({
          where: {
            livreurId: input.fromLivreurId,
            status: Status.PENDING,
            dateLivraison: { gte: dayStart, lte: dayEnd },
          },
          include: { livraisons: true },
        });

        if (sourceTmpChargement) {
          await ctx.prisma.chargement.update({
            where: { id: sourceTmpChargement.id },
            data: {
              livraisons: { disconnect: { id: input.livraisonId } },
            },
          });

          // Delete source tmp chargement if empty
          if (sourceTmpChargement.livraisons.length === 1) {
            await ctx.prisma.chargement.delete({
              where: { id: sourceTmpChargement.id },
            });
          }
        }

        // 2. Add to destination tmp chargement (find or create)
        const destTmpChargement = await ctx.prisma.chargement.findFirst({
          where: {
            livreurId: input.toLivreurId,
            status: Status.PENDING,
            dateLivraison: { gte: dayStart, lte: dayEnd },
          },
        });

        if (destTmpChargement) {
          // Destination tmp chargement exists - connect livraison
          await ctx.prisma.chargement.update({
            where: { id: destTmpChargement.id },
            data: {
              livraisons: { connect: { id: input.livraisonId } },
            },
          });
        } else {
          // Destination tmp chargement doesn't exist - create it
          const toLivreur = await ctx.prisma.user.findUnique({
            where: { id: input.toLivreurId },
          });

          if (!toLivreur) {
            return {
              success: false,
              error: 'Livreur de destination non trouvé',
            };
          }

          await ctx.prisma.chargement.create({
            data: {
              name: 'Tmp Chargement ' + toLivreur.name,
              livreurId: input.toLivreurId,
              status: Status.PENDING,
              dateLivraison: input.dateLivraison,
              livraisons: {
                connect: { id: input.livraisonId },
              },
            },
          });
        }

        return {
          success: true,
          message: 'Livraison déplacée avec succès',
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors du déplacement de la livraison',
        });
      }
    }),
  createChargement: secretariatOrAdminProcedure
    .input(
      z.object({
        livreurId: z.string(),
        dateLivraison: z.date(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Find tmp chargement for this livreur + date
        const dayStart = getTahitiDayStart(input.dateLivraison);
        const dayEnd = getTahitiDayEnd(input.dateLivraison);

        const tmpChargement = await ctx.prisma.chargement.findFirst({
          where: {
            livreurId: input.livreurId,
            status: Status.PENDING,
            dateLivraison: { gte: dayStart, lte: dayEnd },
          },
          include: { livraisons: true },
        });

        if (!tmpChargement) {
          return {
            success: false,
            error: 'Aucun chargement temporaire trouvé',
            chargement: null,
          };
        }

        if (tmpChargement.livraisons.length === 0) {
          return {
            success: false,
            error: 'Le chargement temporaire est vide',
            chargement: null,
          };
        }

        // Update chargement: PENDING → READY
        const chargement = await ctx.prisma.chargement.update({
          where: { id: tmpChargement.id },
          data: {
            status: Status.READY,
            name: input.name || `Chargement ${formatDateForTahiti(input.dateLivraison)}`,
          },
        });

        // Update all livraisons: status PENDING → READY
        await ctx.prisma.livraison.updateMany({
          where: { id: { in: tmpChargement.livraisons.map((l) => l.id) } },
          data: {
            status: Status.READY,
            livreurId: input.livreurId,
          },
        });

        // Create history entry
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

        return {
          success: true,
          chargement,
          error: null,
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors de la validation du chargement',
        });
      }
    }),

  deleteChargement: secretariatOrAdminProcedure
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
  getChargementsByLivreur: secretariatOrAdminProcedure.query(async ({ ctx }) => {
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
