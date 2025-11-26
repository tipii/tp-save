import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { Status } from '@/generated/prisma';
import { itemSchema } from '../livraisons';
import { Item } from '@/types/types';

export const livreursLivraisonsRouter = createTRPCRouter({
  deliverLivraison: protectedProcedure
    .input(z.object({ id: z.string(), receptionInfo: z.string(), chargementId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        let livraison = await ctx.prisma.livraison.findUnique({
          where: { id: input.id },
        });

        if (!livraison) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Livraison non trouvée' });
        }

        if (livraison.status === Status.DELIVERED) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Livraison déjà livrée' });
        }

        livraison = await ctx.prisma.livraison.update({
          where: { id: input.id },
          data: {
            status: Status.DELIVERED,
            deliveryDate: new Date(),
            receptionInfo: input.receptionInfo,
          },
        });

        const chargement = await ctx.prisma.chargement.findUnique({
          where: { id: input.chargementId },
          include: {
            livraisons: true,
          },
        });

        let allLivraisonsDelivered = false;
        if (
          chargement?.livraisons.every(
            (livraison) =>
              livraison.status === Status.DELIVERED || livraison.status === Status.RETURNED,
          )
        ) {
          await ctx.prisma.chargement.update({
            where: { id: input.chargementId },
            data: { status: Status.DELIVERED },
          });
          allLivraisonsDelivered = true;
        }

        return { livraison, allLivraisonsDelivered };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors de la validation de la livraison ' + error,
        });
      }
    }),
  returnLivraison: protectedProcedure
    .input(z.object({ id: z.string(), returnInfo: z.string(), chargementId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const livraison = await ctx.prisma.livraison.update({
          where: { id: input.id },
          data: { status: Status.TO_RETURN, receptionInfo: input.returnInfo },
        });

        return livraison;
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors de la retour de la livraison',
        });
      }
    }),
  returnLivraisonToDepot: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        chargementId: z.string(),
        depotComment: z.string().min(1, 'Le commentaire est obligatoire'),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const livraison = await ctx.prisma.livraison.update({
          where: { id: input.id },
          data: {
            status: Status.RETURNED,
            depotComment: input.depotComment,
          },
        });

        const chargement = await ctx.prisma.chargement.findUnique({
          where: { id: input.chargementId },
          include: {
            livraisons: true,
          },
        });

        let allLivraisonsToReturn = false;
        if (
          chargement?.livraisons.every(
            (livraison) =>
              livraison.status === Status.RETURNED || livraison.status === Status.DELIVERED,
          )
        ) {
          await ctx.prisma.chargement.update({
            where: { id: input.chargementId },
            data: { status: Status.DELIVERED },
          });
          allLivraisonsToReturn = true;
        }
        return { livraison, allLivraisonsToReturn };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors de la retour de la livraison au depot',
        });
      }
    }),
  returnItems: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        chargementId: z.string(),
        items: z.array(itemSchema.extend({ returnQuantity: z.string() })),
        returnComment: z.string().min(1, 'Le commentaire de retour est obligatoire'),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const livraison = await ctx.prisma.livraison.findUnique({
        where: { id: input.id },
      });

      const livraisonItems = livraison?.items as Item[];

      if (!livraison || !livraison.items) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Livraison non trouvée' });
      }

      // Prepare items for the return livraison with specified quantities
      const itemsToReturn = input.items.map((item) => {
        const { returnQuantity, ...itemData } = item;
        return { ...itemData, DL_QTEBL: returnQuantity };
      });

      // Check if there's already a return livraison for this commande in the same chargement
      const existingReturnLivraison = await ctx.prisma.livraison.findFirst({
        where: {
          commandeId: livraison.commandeId,
          chargementId: input.chargementId,
          status: Status.TO_RETURN,
        },
      });

      let returnLivraison;

      if (existingReturnLivraison) {
        // Add items to existing return livraison
        const existingItems = (existingReturnLivraison.items as Item[]) || [];

        // Merge items: if item exists, add quantities; otherwise add new item
        const mergedItems = [...existingItems];

        for (const newItem of itemsToReturn) {
          const existingItemIndex = mergedItems.findIndex((item) => item.AR_REF === newItem.AR_REF);

          if (existingItemIndex !== -1) {
            // Item exists, add quantities
            mergedItems[existingItemIndex].DL_QTEBL = (
              Number(mergedItems[existingItemIndex].DL_QTEBL) + Number(newItem.DL_QTEBL)
            ).toString();
          } else {
            // New item, add to array
            mergedItems.push(newItem);
          }
        }

        // Append new comment to existing comments
        const updatedComment = existingReturnLivraison.returnComment
          ? `${existingReturnLivraison.returnComment}\n---\n${input.returnComment}`
          : input.returnComment;

        returnLivraison = await ctx.prisma.livraison.update({
          where: { id: existingReturnLivraison.id },
          data: {
            items: mergedItems,
            returnComment: updatedComment,
          },
        });
      } else {
        // Create a new return livraison
        returnLivraison = await ctx.prisma.livraison.create({
          data: {
            commandeId: livraison.commandeId,
            name: `Retour ${livraison.name}`,
            status: Status.TO_RETURN,
            chargementId: input.chargementId,
            items: itemsToReturn,
            returnComment: input.returnComment,
          },
        });
      }

      if (returnLivraison) {
        // Update quantities in the original livraison
        const updatedItems = livraisonItems.map((item) => {
          const returnedItem = input.items.find((i) => i.AR_REF === item.AR_REF);
          if (returnedItem) {
            const newQuantity = Number(item.DL_QTEBL) - Number(returnedItem.returnQuantity);
            return { ...item, DL_QTEBL: newQuantity.toString() };
          }
          return item;
        });

        // Remove items with 0 quantity
        const firstLivraisonItems = updatedItems.filter((item) => Number(item.DL_QTEBL) > 0);

        await ctx.prisma.livraison.update({
          where: { id: input.id },
          data: { items: firstLivraisonItems },
        });
      } else {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Erreur lors de la création de la nouvelle livraison',
        });
      }

      return returnLivraison;
    }),
});
