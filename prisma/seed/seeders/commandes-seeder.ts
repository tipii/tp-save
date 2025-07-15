import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

export interface CommandeSeedData {
  id: string;
  ref: string;
  clientId: string;
  items: number;
  priority: string;
}

/**
 * Seed commandes with proper error handling and batch processing
 */
export async function seedCommandes(
  commandesToCreate: CommandeSeedData[],
  batchSize = 5,
): Promise<void> {
  console.log(`🚚 Starting to seed ${commandesToCreate.length} commandes...`);

  const batches = [];
  for (let i = 0; i < commandesToCreate.length; i += batchSize) {
    batches.push(commandesToCreate.slice(i, i + batchSize));
  }

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const [batchIndex, batch] of batches.entries()) {
    console.log(
      `📦 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} commandes)...`,
    );

    // Process each commande in the batch
    const batchPromises = batch.map(async (commandeData) => {
      try {
        // Check if commande already exists
        const existingCommande = await prisma.commande.findFirst({
          where: {
            OR: [
              { id: commandeData.id },
              { ref: commandeData.ref, clientId: commandeData.clientId },
            ],
          },
        });

        if (existingCommande) {
          console.log(
            `⚠️  Commande already exists: ${commandeData.ref} - Client ${commandeData.clientId}`,
          );
          return { status: 'skipped', ref: commandeData.ref };
        }

        // Create commande
        const now = new Date();
        const commandeCreateData = {
          id: commandeData.id,
          ref: commandeData.ref,
          clientId: commandeData.clientId,
          items: commandeData.items,
          priority: commandeData.priority,
          createdAt: now,
          updatedAt: now,
        };

        await prisma.commande.create({
          data: commandeCreateData,
        });

        console.log(
          `✅ Created commande: ${commandeData.ref} - Client ${commandeData.clientId} (${commandeData.priority})`,
        );
        return { status: 'created', ref: commandeData.ref };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(
          `❌ Error creating commande ${commandeData.ref} - Client ${commandeData.clientId}:`,
          errorMessage,
        );
        return { status: 'error', ref: commandeData.ref, error: errorMessage };
      }
    });

    // Execute batch
    const batchResults = await Promise.all(batchPromises);

    // Count results
    batchResults.forEach((result) => {
      if (result) {
        switch (result.status) {
          case 'created':
            totalCreated++;
            break;
          case 'skipped':
            totalSkipped++;
            break;
          case 'error':
            totalErrors++;
            break;
        }
      }
    });

    console.log(`📊 Batch ${batchIndex + 1} completed`);
  }

  console.log(`\n📈 Commandes seeding summary:`);
  console.log(`   ✅ Created: ${totalCreated}`);
  console.log(`   ⚠️  Skipped: ${totalSkipped}`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log(`   📊 Total: ${totalCreated + totalSkipped + totalErrors}`);

  // Don't disconnect here - let the main seeder handle it
}

export default seedCommandes;
