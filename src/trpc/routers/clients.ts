import { createTRPCRouter, protectedProcedure } from '../init';

export const clientsRouter = createTRPCRouter({
  getClients: protectedProcedure.query(async ({ ctx }) => {
    const clients = await ctx.prisma.client.findMany({
      include: {
        commandes: {
          include: {
            livraisons: {
              include: {
                chargement: true,
              },
            },
          },
        },
      },
    });
    return clients;
  }),
});
