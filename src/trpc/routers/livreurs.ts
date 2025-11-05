import { createTRPCRouter, protectedProcedure } from '../init';
import z from 'zod';

export const livreursRouter = createTRPCRouter({
  getLivreurs: protectedProcedure.query(async ({ ctx }) => {
    const livreurs = await ctx.prisma.user.findMany({
      where: {
        role: 'livreur',
      },
      include: {
        chargements: {
          take: 3,
          orderBy: {
            updatedAt: 'desc',
          },
          include: {
            livraisons: {
              include: {
                commande: true,
              },
            },
          },
        },
      },
    });
    return livreurs;
  }),

  getLivreurById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const livreur = await ctx.prisma.user.findUnique({
        where: { id: input.id },
        include: {
          chargements: {
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
              history: {
                include: {
                  user: true,
                },
                orderBy: {
                  timestamp: 'desc',
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });
      return livreur;
    }),
});
