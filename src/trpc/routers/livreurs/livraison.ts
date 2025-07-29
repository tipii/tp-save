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
        if (chargement?.livraisons.every((livraison) => livraison.status === Status.DELIVERED)) {
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
    .input(z.object({ id: z.string(), chargementId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const livraison = await ctx.prisma.livraison.update({
          where: { id: input.id },
          data: { status: Status.RETURNED },
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
    .input(z.object({ id: z.string(), chargementId: z.string(), items: z.array(itemSchema) }))
    .mutation(async ({ ctx, input }) => {
      const livraison = await ctx.prisma.livraison.findUnique({
        where: { id: input.id },
      });

      const livraisonItems = livraison?.items as Item[];

      if (!livraison || !livraison.items) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Livraison non trouvée' });
      }

      // create a new livraison with the items
      const newLivraison = await ctx.prisma.livraison.create({
        data: {
          commandeId: livraison.commandeId,
          name: `Retour ${livraison.name}`,
          status: Status.TO_RETURN,
          chargementId: input.chargementId,
          items: input.items,
        },
      });

      if (newLivraison) {
        // remove the items from the original livraison
        const itemsToRemove = input.items.map((item) => item.AR_REF);

        const firstLivraisonItems = livraisonItems.filter(
          (item) => !itemsToRemove.includes(item.AR_REF),
        );
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

      return newLivraison;
    }),
});
