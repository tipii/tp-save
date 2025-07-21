import { createClientAsync } from '@/external-services/soap-service/generated/webserveasytablet/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import {
  parseSoapLivraisonLignes,
  parseSoapLivraisonList,
} from '@/external-services/soap-service/parsing/parsing';

/**
 * Data gathering flow
 *
 * Get all the livraisons
 *
 */

export const soapServiceRouter = createTRPCRouter({
  refreshDatabase: protectedProcedure.mutation(async ({ ctx }) => {
    // The WSDL content is now available as a string
  }),
});
