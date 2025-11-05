/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClientAsync } from '@/external-services/soap-service/generated/webserveasytablet/client';
import {
  parseSoapLivraisonLignes,
  parseSoapLivraisonList,
} from '@/external-services/soap-service/parsing/parsing';
import prisma from '@/lib/prisma';
import { logger, schedules, wait } from '@trigger.dev/sdk/v3';
import { wsdl } from './wsdl';
import { formatDateForTahiti } from '@/lib/date-utils';

// ==================== TYPES ====================
interface SyncStats {
  processedCount: number;
  createdCount: number;
  skippedCount: number;
  errorCount: number;
}

interface BonData {
  DO_Piece: string;
  DO_Coord01: string;
  [key: string]: any;
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Process an array of items in batches to limit concurrent operations
 */
async function processBatch<T, R>(
  items: T[],
  batchSize: number,
  processFn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    logger.log(
      `Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(items.length / batchSize)} (${batch.length} items)`,
    );

    const batchResults = await Promise.all(
      batch.map((item, batchIndex) => processFn(item, i + batchIndex)),
    );

    results.push(...batchResults);

    // Small delay between batches to prevent overwhelming the API
    if (i + batchSize < items.length) {
      await wait.for({ seconds: 1 });
    }
  }

  return results;
}

// ==================== SOAP CLIENT FUNCTIONS ====================

/**
 * Initialize SOAP client connection
 */
async function initializeSoapClient() {
  const client = await createClientAsync(wsdl, {
    endpoint: 'http://tallinpi.dyndns.org:8095/WEBSERV_EASYTABLET_WEB/awws/WebServ_EasyTablet.awws',
  });
  logger.log('SOAP client connected successfully');
  return client;
}

/**
 * Fetch all bons from SAGE API
 */
async function fetchBonsFromSage(soapClient: any, today: string): Promise<BonData[]> {
  const bonsNeutreData = await soapClient.Liste_BonLiv_SAGEAsync({
    P_DateRef: today,
    P_Statut: '',
    P_Type: '',
  });

  return parseSoapLivraisonList(String(bonsNeutreData[0].Liste_BonLiv_SAGEResult));
}

/**
 * Fetch livraison lines for a specific bon
 */
async function fetchLivraisonLines(soapClient: any, bonPiece: string) {
  const cmdLignes = await soapClient.Liste_BonLivLignes_SAGEAsync({
    P_NumBonLiv: bonPiece,
  });
  return parseSoapLivraisonLignes(String(cmdLignes[0].Liste_BonLivLignes_SAGEResult));
}

// ==================== DATABASE OPERATIONS ====================

/**
 * Upsert raw bon data to database
 */
async function upsertRawBon(bon: any) {
  return await prisma.rawCommandeSage.upsert({
    where: { DO_Piece: bon.DO_Piece },
    update: bon,
    create: bon,
  });
}

/**
 * Ensure client exists, create if not
 */
async function ensureClientExists(clientCode: string, clientName: string) {
  let client = await prisma.client.findUnique({
    where: { code: clientCode },
  });

  if (!client) {
    client = await prisma.client.create({
      data: {
        code: clientCode,
        name: clientName,
      },
    });
    logger.log(`Created new client: ${client.code}`);
  }

  return client;
}

/**
 * Create new commande with livraison
 */
async function createCommandeWithLivraison(
  soapClient: any,
  bon: BonData,
  clientId: string,
  stats: SyncStats,
) {
  const newCommande = await prisma.commande.create({
    data: {
      bp_number: bon.DO_Piece,
      ref: bon.DO_Piece,
      name: `${bon.DO_Piece} - ${bon.DO_Coord01}`,
      status: 'PENDING',
      clientId,
    },
  });

  logger.log(`Created new commande: ${newCommande.ref}`);
  stats.createdCount++;

  // Fetch and create livraison
  const parsedLignes = await fetchLivraisonLines(soapClient, bon.DO_Piece);

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

  logger.log(`Created livraison for commande: ${newCommande.ref}`);
  return newCommande;
}

/**
 * Process a single bon (upsert, ensure client, create commande if needed)
 */
async function processSingleBon(
  soapClient: any,
  bon: BonData,
  index: number,
  total: number,
  stats: SyncStats,
) {
  const logPrefix = `[${index + 1}/${total}]`;

  try {
    stats.processedCount++;

    // Upsert raw bon data
    await upsertRawBon(bon);

    // Ensure client exists
    const client = await ensureClientExists(bon.DO_Coord01, bon.DO_Coord01);

    // Check if commande already exists
    const existingCommande = await prisma.commande.findUnique({
      where: { bp_number: bon.DO_Piece },
    });

    if (existingCommande) {
      logger.log(`${logPrefix} Commande ${bon.DO_Piece} already exists, skipping`);
      stats.skippedCount++;
      return;
    }

    // Create new commande with livraison
    await createCommandeWithLivraison(soapClient, bon, client.id, stats);
  } catch (error) {
    logger.error(`${logPrefix} Error processing bon ${bon.DO_Piece}:`, { error });
    stats.errorCount++;
  }
}

// ==================== LOGGING ====================

/**
 * Log sync summary statistics
 */
function logSyncSummary(startTime: number, stats: SyncStats) {
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  logger.log('=====================================');
  logger.log('Sync completed!');
  logger.log(`Duration: ${duration}s`);
  logger.log(`Total processed: ${stats.processedCount}`);
  logger.log(`Created: ${stats.createdCount}`);
  logger.log(`Skipped: ${stats.skippedCount}`);
  logger.log(`Errors: ${stats.errorCount}`);
  logger.log('=====================================');
}

// ==================== MAIN TASK ====================

export const syncBonsFromSageScheduled = schedules.task({
  id: 'tallin-pi-sync-commandes',

  // Every hour
  cron: '0 * * * *',

  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
  run: async (payload, { ctx }) => {
    const startTime = Date.now();
    const stats: SyncStats = {
      processedCount: 0,
      createdCount: 0,
      skippedCount: 0,
      errorCount: 0,
    };

    logger.log('Starting SAGE data sync...');

    try {
      // Initialize SOAP client
      const soapClient = await initializeSoapClient();

      // Get today's date in Tahiti timezone
      const today = formatDateForTahiti(new Date()) ?? '';

      // Fetch bons from SAGE
      const allBons = await fetchBonsFromSage(soapClient, today);
      logger.log(`Found ${allBons.length} bons to process`);

      // Process bons in batches of 10 to respect API connection limits
      await processBatch(allBons, 10, async (bon, index) => {
        await processSingleBon(soapClient, bon, index, allBons.length, stats);
      });
    } catch (error) {
      logger.error('Fatal error during sync:', { error });
      throw error; // Re-throw to mark the task as failed
    } finally {
      logSyncSummary(startTime, stats);
    }
  },
});
