import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import { TRPCError } from '@trpc/server';

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

      if (!blNumber.startsWith('LB')) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Le numéro de BL doit commencer par LB',
        });
      }

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

      await ctx.prisma.commande.update({
        where: { id: commandeId },
        data: { bl_number: bl.DO_Piece },
      });

      return bl;
    }),
});
