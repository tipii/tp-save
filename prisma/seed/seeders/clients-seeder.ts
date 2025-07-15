import { PrismaClient } from '../../../src/generated/prisma';

const prisma = new PrismaClient();

export interface ClientSeedData {
  id: string;
  code: string;
  name: string;
  type: string;
  email?: string;
  phone?: string;
  phoneSecond?: string;
  contactPerson?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

/**
 * Seed clients with proper error handling and batch processing
 */
export async function seedClients(clientsToCreate: ClientSeedData[], batchSize = 5): Promise<void> {
  console.log(`🏢 Starting to seed ${clientsToCreate.length} clients...`);

  const batches = [];
  for (let i = 0; i < clientsToCreate.length; i += batchSize) {
    batches.push(clientsToCreate.slice(i, i + batchSize));
  }

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const [batchIndex, batch] of batches.entries()) {
    console.log(
      `📦 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} clients)...`,
    );

    // Process each client in the batch
    const batchPromises = batch.map(async (clientData) => {
      try {
        // Check if client already exists
        const existingClient = await prisma.client.findFirst({
          where: {
            OR: [{ id: clientData.id }, { code: clientData.code }, { email: clientData.email }],
          },
        });

        if (existingClient) {
          console.log(`⚠️  Client already exists: ${clientData.code} - ${clientData.name}`);
          return { status: 'skipped', code: clientData.code };
        }

        // Create client
        const now = new Date();
        const clientCreateData = {
          id: clientData.id,
          code: clientData.code,
          name: clientData.name,
          type: clientData.type,
          email: clientData.email,
          phone: clientData.phone,
          phoneSecond: clientData.phoneSecond,
          contactPerson: clientData.contactPerson,
          address: clientData.address,
          city: clientData.city,
          postalCode: clientData.postalCode,
          country: clientData.country,
          notes: clientData.notes,
          createdAt: now,
          updatedAt: now,
        };

        await prisma.client.create({
          data: clientCreateData,
        });

        console.log(
          `✅ Created client: ${clientData.code} - ${clientData.name} (${clientData.city})`,
        );
        return { status: 'created', code: clientData.code };
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(
          `❌ Error creating client ${clientData.code} - ${clientData.name}:`,
          errorMessage,
        );
        return { status: 'error', code: clientData.code, error: errorMessage };
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

  console.log(`\n📈 Clients seeding summary:`);
  console.log(`   ✅ Created: ${totalCreated}`);
  console.log(`   ⚠️  Skipped: ${totalSkipped}`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log(`   📊 Total: ${totalCreated + totalSkipped + totalErrors}`);

  // Don't disconnect here - let the main seeder handle it
}

export default seedClients;
