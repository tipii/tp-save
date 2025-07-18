import z from 'zod';
import { Priority, Status } from '@/generated/prisma';
import { createTRPCRouter, protectedProcedure } from '../init';

const itemSchema = z.object({
  name: z.string(),
  quantity: z.number().min(0),
});

export const livraisonsRouter = createTRPCRouter({
  getPendingLivraisons: protectedProcedure.query(async ({ ctx }) => {
    const livraisons = await ctx.prisma.livraison.findMany({
      where: {
        status: Status.PENDING,
      },
      include: {
        commande: {
          include: {
            client: true,
            livraisons: true,
          },
        },
      },
    });

    // console.log(livraisons);
    return livraisons;
  }),
  changePriority: protectedProcedure
    .input(
      z.object({
        livraisonId: z.string(),
        priority: z.enum(Priority),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { livraisonId, priority } = input;
      const livraison = await ctx.prisma.livraison.update({
        where: { id: livraisonId },
        data: { priority },
      });

      return livraison;
    }),

  createLivraison: protectedProcedure
    .input(
      z.object({
        commandeId: z.string(),
        name: z.string().optional(),
        items: z.array(itemSchema).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { commandeId, name, items } = input;

      // Check if user has permission to edit this commande
      const commande = await ctx.prisma.commande.findUnique({
        where: { id: commandeId },
        select: { lockedBy: true },
      });

      if (commande?.lockedBy !== ctx.user.id) {
        throw new Error('You must unlock the commande before creating livraisons');
      }

      // Create the new livraison
      const livraison = await ctx.prisma.livraison.create({
        data: {
          commandeId,
          name: name || `Livraison ${new Date().toLocaleDateString()}`,
          items: items,
          status: Status.PENDING,
        },
      });

      return livraison;
    }),

  updateLivraisonItems: protectedProcedure
    .input(
      z.object({
        livraisonId: z.string(),
        items: z.array(itemSchema),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { livraisonId, items } = input;

      console.log(items);

      // Check if user has permission to edit this livraison's commande
      const livraison = await ctx.prisma.livraison.findUnique({
        where: { id: livraisonId },
        include: { commande: { select: { lockedBy: true } } },
      });

      if (livraison?.commande?.lockedBy !== ctx.user.id) {
        throw new Error('You must unlock the commande before editing livraisons');
      }

      // Update the livraison items
      const updatedLivraison = await ctx.prisma.livraison.update({
        where: { id: livraisonId },
        data: {
          items: items,
          updatedAt: new Date(),
        },
      });

      return updatedLivraison;
    }),

  transferItems: protectedProcedure
    .input(
      z.object({
        sourceLivraisonId: z.string(),
        targetLivraisonId: z.string(),
        items: z.array(itemSchema),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { sourceLivraisonId, targetLivraisonId, items } = input;

      // Get both livraisons with their commande data
      const [sourceLivraison, targetLivraison] = await Promise.all([
        ctx.prisma.livraison.findUnique({
          where: { id: sourceLivraisonId },
          include: { commande: { select: { lockedBy: true } } },
        }),
        ctx.prisma.livraison.findUnique({
          where: { id: targetLivraisonId },
          include: { commande: { select: { lockedBy: true } } },
        }),
      ]);

      if (!sourceLivraison || !targetLivraison) {
        throw new Error('One or both livraisons not found');
      }

      // Check permissions for both livraisons
      if (
        sourceLivraison.commande?.lockedBy !== ctx.user.id ||
        targetLivraison.commande?.lockedBy !== ctx.user.id
      ) {
        throw new Error('You must unlock the commande before transferring items');
      }

      // Parse current items
      const sourceItems = (
        typeof sourceLivraison.items === 'string'
          ? JSON.parse(sourceLivraison.items)
          : sourceLivraison.items
      ) as Array<{
        name: string;
        quantity: number;
      }>;

      const targetItems = (
        typeof targetLivraison.items === 'string'
          ? JSON.parse(targetLivraison.items)
          : targetLivraison.items
      ) as Array<{
        name: string;
        quantity: number;
      }>;

      // Process transfer for each item
      const updatedSourceItems = [...sourceItems];
      const updatedTargetItems = [...targetItems];

      for (const transferItem of items) {
        // Find and update source item
        const sourceItemIndex = updatedSourceItems.findIndex(
          (item) => item.name === transferItem.name,
        );
        if (
          sourceItemIndex === -1 ||
          updatedSourceItems[sourceItemIndex].quantity < transferItem.quantity
        ) {
          throw new Error(`Insufficient quantity for item: ${transferItem.name}`);
        }

        // Reduce quantity from source
        updatedSourceItems[sourceItemIndex].quantity -= transferItem.quantity;
        if (updatedSourceItems[sourceItemIndex].quantity === 0) {
          updatedSourceItems.splice(sourceItemIndex, 1);
        }

        // Add to target
        const targetItemIndex = updatedTargetItems.findIndex(
          (item) => item.name === transferItem.name,
        );
        if (targetItemIndex === -1) {
          updatedTargetItems.push(transferItem);
        } else {
          updatedTargetItems[targetItemIndex].quantity += transferItem.quantity;
        }
      }

      // Update both livraisons
      await Promise.all([
        ctx.prisma.livraison.update({
          where: { id: sourceLivraisonId },
          data: { items: updatedSourceItems },
        }),
        ctx.prisma.livraison.update({
          where: { id: targetLivraisonId },
          data: { items: updatedTargetItems },
        }),
      ]);

      return { success: true };
    }),

  transferSingleItem: protectedProcedure
    .input(
      z.object({
        sourceLivraisonId: z.string(),
        targetLivraisonId: z.string(),
        itemName: z.string(),
        quantity: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { sourceLivraisonId, targetLivraisonId, itemName, quantity } = input;

      // Get both livraisons with their commande data
      const [sourceLivraison, targetLivraison] = await Promise.all([
        ctx.prisma.livraison.findUnique({
          where: { id: sourceLivraisonId },
          include: { commande: { select: { lockedBy: true } } },
        }),
        ctx.prisma.livraison.findUnique({
          where: { id: targetLivraisonId },
          include: { commande: { select: { lockedBy: true } } },
        }),
      ]);

      if (!sourceLivraison || !targetLivraison) {
        throw new Error('One or both livraisons not found');
      }

      // Check permissions for both livraisons
      if (
        sourceLivraison.commande?.lockedBy !== ctx.user.id ||
        targetLivraison.commande?.lockedBy !== ctx.user.id
      ) {
        throw new Error('You must unlock the commande before transferring items');
      }

      // Parse current items
      const sourceItems = (
        typeof sourceLivraison.items === 'string'
          ? JSON.parse(sourceLivraison.items)
          : sourceLivraison.items
      ) as Array<{
        name: string;
        quantity: number;
      }>;

      const targetItems = (
        typeof targetLivraison.items === 'string'
          ? JSON.parse(targetLivraison.items)
          : targetLivraison.items
      ) as Array<{
        name: string;
        quantity: number;
      }>;

      // Find the source item
      const sourceItemIndex = sourceItems.findIndex((item) => item.name === itemName);
      if (sourceItemIndex === -1) {
        throw new Error(`Item "${itemName}" not found in source livraison`);
      }

      const sourceItem = sourceItems[sourceItemIndex];
      if (sourceItem.quantity < quantity) {
        throw new Error(`Insufficient quantity for item: ${itemName}`);
      }

      // Update source items
      const updatedSourceItems = [...sourceItems];
      updatedSourceItems[sourceItemIndex].quantity -= quantity;

      // Remove item if quantity becomes 0
      if (updatedSourceItems[sourceItemIndex].quantity === 0) {
        updatedSourceItems.splice(sourceItemIndex, 1);
      }

      // Update target items
      const updatedTargetItems = [...targetItems];
      const targetItemIndex = updatedTargetItems.findIndex((item) => item.name === itemName);

      if (targetItemIndex === -1) {
        updatedTargetItems.push({ name: itemName, quantity });
      } else {
        updatedTargetItems[targetItemIndex].quantity += quantity;
      }

      // Update both livraisons
      await Promise.all([
        ctx.prisma.livraison.update({
          where: { id: sourceLivraisonId },
          data: { items: updatedSourceItems },
        }),
        ctx.prisma.livraison.update({
          where: { id: targetLivraisonId },
          data: { items: updatedTargetItems },
        }),
      ]);

      return { success: true };
    }),

  deleteLivraison: protectedProcedure
    .input(z.object({ livraisonId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { livraisonId } = input;

      // Check if user has permission to delete this livraison
      const livraison = await ctx.prisma.livraison.findUnique({
        where: { id: livraisonId },
        include: { commande: { select: { lockedBy: true } } },
      });

      if (livraison?.commande?.lockedBy !== ctx.user.id) {
        throw new Error('You must unlock the commande before deleting livraisons');
      }

      // Delete the livraison
      await ctx.prisma.livraison.delete({
        where: { id: livraisonId },
      });

      return { success: true };
    }),
});
