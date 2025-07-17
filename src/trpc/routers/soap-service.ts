import { createClientAsync } from '@/external-services/soap-service/generated/webserveasytablet/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import {
  parseSoapLivraisonLignes,
  parseSoapLivraisonList,
} from '@/external-services/soap-service/parsing/parsing';

export const soapServiceRouter = createTRPCRouter({
  refreshDatabase: protectedProcedure.mutation(async ({ ctx }) => {
    // The WSDL content is now available as a string

    try {
      const client = await createClientAsync('http://localhost:3000/WebServ_EasyTablet.wsdl', {
        endpoint:
          'http://tallinpi.dyndns.org:8095/WEBSERV_EASYTABLET_WEB/awws/WebServ_EasyTablet.awws',
      });

      const result = await client.Liste_BonLiv_SAGEAsync({
        P_DateRef: '17/07/2025',
        P_Statut: '',
        P_Type: '',
      });

      const res2 = await client.Liste_BacsPrepaAsync({});

      const res3 = await client.Liste_BonLivLignes_SAGEAsync({
        P_NumBonLiv: 'L25070726',
      });

      console.log(parseSoapLivraisonList(String(result[0].Liste_BonLiv_SAGEResult)));
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
