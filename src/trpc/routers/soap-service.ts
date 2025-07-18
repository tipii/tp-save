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

    try {
      const client = await createClientAsync('http://localhost:3000/WebServ_EasyTablet.wsdl', {
        endpoint:
          'http://tallinpi.dyndns.org:8095/WEBSERV_EASYTABLET_WEB/awws/WebServ_EasyTablet.awws',
      });

      const bonsPrepaData = await client.Liste_BonLiv_SAGEAsync({
        P_DateRef: new Date().toLocaleDateString('fr-FR'),
        P_Statut: '',
        P_Type: '2',
      });
      const bonsPrepa = parseSoapLivraisonList(String(bonsPrepaData[0].Liste_BonLiv_SAGEResult));

      /**
       *
       * Traitement des bons de préparation
       * Get unique id -> store in db if no matching id
       *
       */

      bonsPrepa.forEach(async (bon) => {
        // Separate alpha and numerical parts of DO_Piece
        const alphaPart = bon.DO_Piece.replace(/\d/g, ''); // Extract only letters
        const numericalPart = bon.DO_Piece.replace(/\D/g, ''); // Extract only numbers
        const uniqueId = numericalPart; // Keep using numerical part as unique ID for now

        const existingBon = await ctx.prisma.commande.findUnique({
          where: {
            sageUniqueId: uniqueId,
          },
        });
      });

      const bonsLivraisonData = await client.Liste_BonLiv_SAGEAsync({
        P_DateRef: new Date().toLocaleDateString('fr-FR'),
        P_Statut: '',
        P_Type: '2',
      });

      const bonsLivraison = parseSoapLivraisonList(
        String(bonsLivraisonData[0].Liste_BonLiv_SAGEResult),
      );

      // const res3 = await client.Liste_BonLivLignes_SAGEAsync({
      //   P_NumBonLiv: 'BL25070726',
      // });
      // console.log(res2);
      // console.log(res3);

      // if (res3[0].Liste_BonLivLignes_SAGEResult) {
      //   console.log(parseSoapLivraisonLignes(String(res3[0].Liste_BonLivLignes_SAGEResult)));
      // }
    } catch (error) {
      console.error(error);
    }
    return {};
  }),
});
