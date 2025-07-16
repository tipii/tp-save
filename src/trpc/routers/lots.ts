import z from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';

const itemSchema = z.object({
  name: z.string(),
  quantity: z.number().min(0),
});

export const lotsRouter = createTRPCRouter({
  getPendingLots: protectedProcedure.query(async ({ ctx }) => {
    const lots = await ctx.prisma.lot.findMany({
      where: {
        status: 'pending',
      },
      include: {
        commande: {
          include: {
            client: true,
            lots: true,
          },
        },
      },
    });

    console.log(lots);
    return lots;
  }),
  changePriority: protectedProcedure
    .input(
      z.object({
        lotId: z.string(),
        priority: z.enum(['Urgent', 'Normal', 'Îles']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { lotId, priority } = input;
      const lot = await ctx.prisma.lot.update({
        where: { id: lotId },
        data: { priority },
      });

      return lot;
    }),

  createLot: protectedProcedure
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
        throw new Error('You must unlock the commande before creating lots');
      }

      // Create the new lot
      const lot = await ctx.prisma.lot.create({
        data: {
          commandeId,
          name: name || `Lot ${new Date().toLocaleDateString()}`,
          items: items,
          status: 'pending',
        },
      });

      return lot;
    }),

  updateLotItems: protectedProcedure
    .input(
      z.object({
        lotId: z.string(),
        items: z.array(itemSchema),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { lotId, items } = input;

      console.log(items);

      // Check if user has permission to edit this lot's commande
      const lot = await ctx.prisma.lot.findUnique({
        where: { id: lotId },
        include: { commande: { select: { lockedBy: true } } },
      });

      if (lot?.commande?.lockedBy !== ctx.user.id) {
        throw new Error('You must unlock the commande before editing lots');
      }

      // Update the lot items
      const updatedLot = await ctx.prisma.lot.update({
        where: { id: lotId },
        data: {
          items: items,
          updatedAt: new Date(),
        },
      });

      return updatedLot;
    }),

  transferItems: protectedProcedure
    .input(
      z.object({
        sourceLotId: z.string(),
        targetLotId: z.string(),
        items: z.array(itemSchema),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { sourceLotId, targetLotId, items } = input;

      // Get both lots with their commande data
      const [sourceLot, targetLot] = await Promise.all([
        ctx.prisma.lot.findUnique({
          where: { id: sourceLotId },
          include: { commande: { select: { lockedBy: true } } },
        }),
        ctx.prisma.lot.findUnique({
          where: { id: targetLotId },
          include: { commande: { select: { lockedBy: true } } },
        }),
      ]);

      if (!sourceLot || !targetLot) {
        throw new Error('One or both lots not found');
      }

      // Check permissions for both lots
      if (
        sourceLot.commande?.lockedBy !== ctx.user.id ||
        targetLot.commande?.lockedBy !== ctx.user.id
      ) {
        throw new Error('You must unlock the commande before transferring items');
      }

      // Parse current items
      const sourceItems = (
        typeof sourceLot.items === 'string' ? JSON.parse(sourceLot.items) : sourceLot.items
      ) as Array<{
        name: string;
        quantity: number;
      }>;

      const targetItems = (
        typeof targetLot.items === 'string' ? JSON.parse(targetLot.items) : targetLot.items
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

      // Update both lots
      await Promise.all([
        ctx.prisma.lot.update({
          where: { id: sourceLotId },
          data: { items: updatedSourceItems },
        }),
        ctx.prisma.lot.update({
          where: { id: targetLotId },
          data: { items: updatedTargetItems },
        }),
      ]);

      return { success: true };
    }),

  transferSingleItem: protectedProcedure
    .input(
      z.object({
        sourceLotId: z.string(),
        targetLotId: z.string(),
        itemName: z.string(),
        quantity: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { sourceLotId, targetLotId, itemName, quantity } = input;

      // Get both lots with their commande data
      const [sourceLot, targetLot] = await Promise.all([
        ctx.prisma.lot.findUnique({
          where: { id: sourceLotId },
          include: { commande: { select: { lockedBy: true } } },
        }),
        ctx.prisma.lot.findUnique({
          where: { id: targetLotId },
          include: { commande: { select: { lockedBy: true } } },
        }),
      ]);

      if (!sourceLot || !targetLot) {
        throw new Error('One or both lots not found');
      }

      // Check permissions for both lots
      if (
        sourceLot.commande?.lockedBy !== ctx.user.id ||
        targetLot.commande?.lockedBy !== ctx.user.id
      ) {
        throw new Error('You must unlock the commande before transferring items');
      }

      // Parse current items
      const sourceItems = (
        typeof sourceLot.items === 'string' ? JSON.parse(sourceLot.items) : sourceLot.items
      ) as Array<{
        name: string;
        quantity: number;
      }>;

      const targetItems = (
        typeof targetLot.items === 'string' ? JSON.parse(targetLot.items) : targetLot.items
      ) as Array<{
        name: string;
        quantity: number;
      }>;

      // Find the source item
      const sourceItemIndex = sourceItems.findIndex((item) => item.name === itemName);
      if (sourceItemIndex === -1) {
        throw new Error(`Item "${itemName}" not found in source lot`);
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

      // Update both lots
      await Promise.all([
        ctx.prisma.lot.update({
          where: { id: sourceLotId },
          data: { items: updatedSourceItems },
        }),
        ctx.prisma.lot.update({
          where: { id: targetLotId },
          data: { items: updatedTargetItems },
        }),
      ]);

      return { success: true };
    }),

  deleteLot: protectedProcedure
    .input(z.object({ lotId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { lotId } = input;

      // Check if user has permission to delete this lot
      const lot = await ctx.prisma.lot.findUnique({
        where: { id: lotId },
        include: { commande: { select: { lockedBy: true } } },
      });

      if (lot?.commande?.lockedBy !== ctx.user.id) {
        throw new Error('You must unlock the commande before deleting lots');
      }

      // Delete the lot
      await ctx.prisma.lot.delete({
        where: { id: lotId },
      });

      return { success: true };
    }),
});
