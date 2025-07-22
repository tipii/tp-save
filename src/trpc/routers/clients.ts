import z from 'zod';
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
  getClientById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const client = await ctx.prisma.client.findUnique({
      where: { id: input },
      include: {
        commandes: {
          include: {
            livraisons: true,
          },
        },
      },
    });
    return client;
  }),
  updateClient: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().email().optional().or(z.literal('')),
        phone: z.string().optional(),
        phoneSecond: z.string().optional(),
        contactPerson: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        postalCode: z.string().optional(),
        country: z.string().optional(),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updateData } = input;

      // Remove empty strings to set them as null
      const cleanedData = Object.fromEntries(
        Object.entries(updateData).map(([key, value]) => [key, value === '' ? null : value]),
      );

      const updatedClient = await ctx.prisma.client.update({
        where: { id },
        data: {
          ...cleanedData,
          updatedAt: new Date(),
        },
      });

      return updatedClient;
    }),
});
