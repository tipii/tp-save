import { createTRPCRouter, protectedProcedure } from '../init';

export const livreursRouter = createTRPCRouter({
  getLivreurs: protectedProcedure.query(async ({ ctx }) => {
    const livreurs = await ctx.prisma.user.findMany({
      where: {
        role: 'livreur',
      },
      include: {
        chargements: {
          include: {
            commandes: true,
          },
        },
      },
    });
    return livreurs;
  }),
});
