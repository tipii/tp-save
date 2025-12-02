import z from 'zod';
import { createTRPCRouter, secretariatOrAdminProcedure } from '../init';
import { Prisma, Status, Priority } from '@/generated/prisma';
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
        // Use a transaction to prevent race conditions
        const result = await ctx.prisma.$transaction(async (tx) => {
          const dayStart = getTahitiDayStart(input.dateLivraison);
          const dayEnd = getTahitiDayEnd(input.dateLivraison);

          // Lock the existing tmp chargement if it exists using SELECT FOR UPDATE semantics
          // Find all PENDING chargements for this livreur on this day
          const existingTmpChargements = await tx.chargement.findMany({
            where: {
              livreurId: input.livreurId,
              status: Status.PENDING,
              dateLivraison: {
                gte: dayStart,
                lte: dayEnd,
              },
            },
            orderBy: {
              createdAt: 'asc',
            },
          });

          // If multiple tmp chargements exist (race condition artifact), merge them
          if (existingTmpChargements.length > 1) {
            const primaryChargement = existingTmpChargements[0];
            const duplicates = existingTmpChargements.slice(1);

            // Move all livraisons from duplicates to the primary chargement
            for (const duplicate of duplicates) {
              await tx.livraison.updateMany({
                where: { chargementId: duplicate.id },
                data: { chargementId: primaryChargement.id },
              });

              // Delete the duplicate
              await tx.chargement.delete({
                where: { id: duplicate.id },
              });
            }

            // Add the new livraison to the primary chargement
            await tx.chargement.update({
              where: { id: primaryChargement.id },
              data: {
                livraisons: {
                  connect: { id: input.livraisonId },
                },
              },
            });

            return {
              success: true,
              chargement: primaryChargement,
              error: null,
              message: 'Livraison ajoutée au chargement temporaire (doublons fusionnés)',
            };
          } else if (existingTmpChargements.length === 1) {
            // Normal case: one tmp chargement exists
            const existingTmpChargement = existingTmpChargements[0];

            await tx.chargement.update({
              where: { id: existingTmpChargement.id },
              data: {
                livraisons: {
                  connect: { id: input.livraisonId },
                },
              },
            });

            return {
              success: true,
              chargement: existingTmpChargement,
              error: null,
              message: 'Livraison ajoutée au chargement temporaire',
            };
          } else {
            // No tmp chargement exists, create one
            const livreur = await tx.user.findUnique({
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

            const chargement = await tx.chargement.create({
              data: {
                name: 'Tmp Chargement ' + livreur.name,
                livreurId: input.livreurId,
                status: Status.PENDING,
                dateLivraison: input.dateLivraison,
                livraisons: {
                  connect: { id: input.livraisonId },
                },
              },
            });

            return {
              success: true,
              chargement,
              message: 'Chargement temporaire créé avec succès',
              error: null,
            };
          }
        });

        return result;
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
        newPriority: z.nativeEnum(Priority).optional(), // For optimistic UI updates
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
    .input(
      z.object({
        id: z.string(),
        action: z.enum(['transfer_to_tmp', 'reset_and_delete']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await ctx.prisma.$transaction(async (tx) => {
          const chargement = await tx.chargement.findUnique({
            where: { id: input.id },
            include: {
              livraisons: true,
            },
          });

          if (!chargement) {
            return {
              success: false,
              error: 'Chargement non trouvé',
              chargement: null,
            };
          }

          if (input.action === 'transfer_to_tmp') {
            // Option 1: Transfer livraisons to current tmp chargement (or create one)
            if (!chargement.livreurId) {
              return {
                success: false,
                error: 'Chargement sans livreur assigné',
                chargement: null,
              };
            }

            if (!chargement.dateLivraison) {
              return {
                success: false,
                error: 'Chargement sans date de livraison',
                chargement: null,
              };
            }

            const dayStart = getTahitiDayStart(chargement.dateLivraison);
            const dayEnd = getTahitiDayEnd(chargement.dateLivraison);

            // Find existing tmp chargement for this livreur on this day
            let tmpChargement = await tx.chargement.findFirst({
              where: {
                livreurId: chargement.livreurId,
                status: Status.PENDING,
                dateLivraison: {
                  gte: dayStart,
                  lte: dayEnd,
                },
                id: { not: input.id }, // Exclude the chargement being deleted
              },
            });

            // Create tmp chargement if it doesn't exist
            if (!tmpChargement) {
              const livreur = await tx.user.findUnique({
                where: { id: chargement.livreurId },
              });

              if (!livreur) {
                return {
                  success: false,
                  error: 'Livreur non trouvé',
                  chargement: null,
                };
              }

              tmpChargement = await tx.chargement.create({
                data: {
                  name: 'Tmp Chargement ' + livreur.name,
                  livreurId: chargement.livreurId,
                  status: Status.PENDING,
                  dateLivraison: chargement.dateLivraison,
                },
              });
            }

            // Transfer all livraisons to tmp chargement
            await tx.livraison.updateMany({
              where: { chargementId: input.id },
              data: {
                chargementId: tmpChargement.id,
                status: Status.PENDING,
              },
            });

            // Delete the chargement
            await tx.chargement.delete({
              where: { id: input.id },
            });

            return {
              success: true,
              chargement,
              message: 'Chargement supprimé et livraisons transférées au chargement temporaire',
              error: null,
            };
          } else {
            // Option 2: Reset livraisons to PENDING and delete chargement
            await tx.livraison.updateMany({
              where: { chargementId: input.id },
              data: { chargementId: null, status: Status.PENDING },
            });

            await tx.chargement.delete({
              where: { id: input.id },
            });

            return {
              success: true,
              chargement,
              message: 'Chargement supprimé et livraisons réinitialisées',
              error: null,
            };
          }
        });

        return result;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors de la suppression du chargement',
        });
      }
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
