import { createClientAsync } from '@/external-services/soap-service/generated/webserveasytablet/client';
import {
  parseSoapLivraisonLignes,
  parseSoapLivraisonList,
} from '@/external-services/soap-service/parsing/parsing';
import prisma from '@/lib/prisma';
import { logger, schedules, wait } from '@trigger.dev/sdk/v3';
import { wsdl } from './wsdl';
import { formatDateForTahiti } from '@/lib/date-utils';

export const syncBonsFromSageScheduled = schedules.task({
  id: 'tallin-pi-sync-commandes',

  // Every hour
  cron: '0 * * * *',

  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
  run: async (payload, { ctx }) => {
    logger.log('starting sync');
    try {
      const soapClient = await createClientAsync(wsdl, {
        endpoint:
          'http://tallinpi.dyndns.org:8095/WEBSERV_EASYTABLET_WEB/awws/WebServ_EasyTablet.awws',
      });

      // Get today's date in Tahiti timezone formatted for the SOAP API (DD/MM/YYYY)
      const today = formatDateForTahiti(new Date()) ?? '';

      const bonsNeutreData = await soapClient.Liste_BonLiv_SAGEAsync({
        P_DateRef: today,
        P_Statut: '',
        P_Type: '',
      });
      const bonsNeutre = parseSoapLivraisonList(String(bonsNeutreData[0].Liste_BonLiv_SAGEResult));

      // const bonsCommandeData = await client.Liste_BonLiv_SAGEAsync({
      //   P_DateRef: today,
      //   P_Statut: '',
      //   P_Type: '1',
      // });
      // const bonsCommande = parseSoapLivraisonList(
      //   String(bonsCommandeData[0].Liste_BonLiv_SAGEResult),
      // );

      // const bonsPrepaData = await client.Liste_BonLiv_SAGEAsync({
      //   P_DateRef: today,
      //   P_Statut: '',
      //   P_Type: '2',
      // });
      // const bonsPrepa = parseSoapLivraisonList(String(bonsPrepaData[0].Liste_BonLiv_SAGEResult));

      // const bonsLivraisonData = await client.Liste_BonLiv_SAGEAsync({
      //   P_DateRef: today,
      //   P_Statut: '',
      //   P_Type: '3',
      // });
      // const bonsLivraison = parseSoapLivraisonList(
      //   String(bonsLivraisonData[0].Liste_BonLiv_SAGEResult),
      // );

      // const allBons = [...bonsCommande, ...bonsPrepa, ...bonsLivraison, ...bonsNeutre];
      const allBons = [...bonsNeutre];

      // Create raw bons from data
      await Promise.all(
        allBons.map(async (bon) => {
          await prisma.rawCommandeSage.upsert({
            where: {
              DO_Piece: bon.DO_Piece,
            },
            update: bon,
            create: bon,
          });

          const clientCode = bon.DO_Coord01;

          const client = await prisma.client.findUnique({
            where: {
              code: clientCode,
            },
          });

          if (!client) {
            const newClient = await prisma.client.create({
              data: {
                code: clientCode,
                name: bon.DO_Coord01,
              },
            });

            if (newClient) {
              logger.log(`Created new client ${newClient.code}`);
            } else {
              logger.log(`Failed to create new client ${clientCode}`);
            }
          }
        }),
      );

      // Create commandes from data
      await Promise.all(
        allBons.map(async (bon) => {
          // create a new commande with the bon data
          const existingCommande = await prisma.commande.findUnique({
            where: {
              bp_number: bon.DO_Piece,
            },
          });

          if (!existingCommande) {
            const client = await prisma.client.findUnique({
              where: {
                code: bon.DO_Coord01,
              },
            });

            if (client) {
              const newCommande = await prisma.commande.create({
                data: {
                  bp_number: bon.DO_Piece,
                  ref: bon.DO_Piece,
                  name:
                    'CMD ' +
                    bon.DO_Piece +
                    ' - ' +
                    client.name +
                    ' - ' +
                    formatDate(bon.DO_DateLiv),
                  status: 'PENDING',
                  clientId: client.id,
                },
              });

              if (newCommande) {
                logger.log(`Created new livraison ${newCommande.ref}`);

                // get lines for cmd
                const cmdLignes = await soapClient.Liste_BonLivLignes_SAGEAsync({
                  P_NumBonLiv: bon.DO_Piece,
                });
                const parsedLignes = parseSoapLivraisonLignes(
                  String(cmdLignes[0].Liste_BonLivLignes_SAGEResult),
                );

                const newLivraison = await prisma.livraison.create({
                  data: {
                    commandeId: newCommande.id,
                    items: parsedLignes,
                    name: 'Livraison 1',
                  },
                });

                await prisma.commande.update({
                  where: { id: newCommande.id },
                  data: { livraisons: { connect: { id: newLivraison.id } } },
                });
              } else {
                logger.log(`Failed to create new commande ${bon.DO_Piece}`);
              }
            }
          }
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      logger.log('finished sync');
    }
  },
});

function formatDate(input: string): string {
  const year = input.slice(0, 4);
  const month = input.slice(4, 6);
  const day = input.slice(6, 8);
  return `${day}/${month}/${year}`;
}
