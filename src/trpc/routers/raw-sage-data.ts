import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import { TRPCError } from '@trpc/server';
import { createClientAsync } from '@/external-services/soap-service/generated/webserveasytablet/client';
import { wsdl } from '@/trigger/wsdl';
import { parseSoapLivraisonLignes } from '@/external-services/soap-service/parsing/parsing';

export const rawSageDataRouter = createTRPCRouter({
  getBLByNumber: protectedProcedure
    .input(
      z.object({
        blNumber: z.string(),
        commandeId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { blNumber, commandeId } = input;

      const bl = await ctx.prisma.rawCommandeSage.findUnique({
        where: {
          DO_Piece: blNumber,
        },
      });

      if (!bl) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'BL non trouvé',
        });
      }

      // Import data to commande table
      const client = await createClientAsync(wsdl, {
        endpoint:
          'http://tallinpi.dyndns.org:8095/WEBSERV_EASYTABLET_WEB/awws/WebServ_EasyTablet.awws',
      });

      const blLignes = await client.Liste_BonLivLignes_SAGEAsync({ P_NumBonLiv: bl.DO_Piece });

      const parsedLignes = parseSoapLivraisonLignes(
        String(blLignes[0].Liste_BonLivLignes_SAGEResult),
      );

      const livraison = await ctx.prisma.livraison.create({
        data: {
          commandeId,
          items: parsedLignes,
          name: 'Livraison 1',
        },
      });

      // Update commande table
      await ctx.prisma.commande.update({
        where: { id: commandeId },
        data: { bl_number: bl.DO_Piece, livraisons: { connect: { id: livraison.id } } },
      });

      return bl;
    }),
  unlinkBL: protectedProcedure
    .input(z.object({ commandeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { commandeId } = input;

      const commande = await ctx.prisma.commande.update({
        where: { id: commandeId },
        data: { bl_number: null },
      });

      await ctx.prisma.livraison.deleteMany({
        where: { commandeId },
      });

      return commande;
    }),
});
