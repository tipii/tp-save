import { PrismaClient } from '../../../src/generated/prisma';
import { auth } from '../../../src/external-services/better-auth/auth';
import { type UserSeedData } from '../data/users-data';

const prisma = new PrismaClient();

/**
 * Seed users using Better Auth and fallback to direct database creation
 * This is now used by the main seeder in index.ts
 */
export async function seedUsers(usersToCreate: UserSeedData[], batchSize = 5): Promise<void> {
  console.log(`🌱 Starting to seed ${usersToCreate.length} users...`);

  const batches = [];
  for (let i = 0; i < usersToCreate.length; i += batchSize) {
    batches.push(usersToCreate.slice(i, i + batchSize));
  }

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const [batchIndex, batch] of batches.entries()) {
    console.log(
      `📦 Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} users)...`,
    );

    // Process each user in the batch
    const batchPromises = batch.map(async (userData) => {
      try {
        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: userData.email },
              { username: userData.username },
              { phoneNumber: userData.phoneNumber },
            ],
          },
        });

        if (existingUser) {
          console.log(`⚠️  User already exists: ${userData.email}`);
          return { status: 'skipped', email: userData.email };
        }

        // Try to create user with Better Auth first
        try {
          if (userData.password) {
            await auth.api.signUpEmail({
              body: {
                name: userData.name,
                email: userData.email,
                password: userData.password,
              },
            });

            console.log(
              `✅ Created user with Better Auth: ${userData.email} (${userData.role || 'user'})`,
            );

            // Update user role if needed
            if (userData.role) {
              await prisma.user.update({
                where: { email: userData.email },
                data: { role: userData.role },
              });
            }

            return { status: 'created', email: userData.email };
          }
        } catch (authError: unknown) {
          const errorMessage = authError instanceof Error ? authError.message : String(authError);

          if (errorMessage.includes('cookies') || errorMessage.includes('request scope')) {
            console.log(`🤙  Cookie context error for ${userData.email} - using fallback method`);
          } else if (
            errorMessage.includes('User already exists') ||
            errorMessage.includes('Unique constraint')
          ) {
            console.log(`⚠️  User already exists: ${userData.email}`);
            return { status: 'skipped', email: userData.email };
          } else {
            console.warn(`⚠️  Auth error for ${userData.email}: ${errorMessage}`);
          }

          // Fallback: Create user directly in database
          const now = new Date();
          const userCreateData = {
            name: userData.name,
            email: userData.email,
            emailVerified: userData.emailVerified,
            createdAt: now,
            updatedAt: now,
            role: userData.role,
            banned: userData.banned,
            banReason: userData.banReason,
            banExpires: userData.banExpires,
            username: userData.username,
            displayUsername: userData.displayUsername,
            phoneNumber: userData.phoneNumber,
            phoneNumberVerified: userData.phoneNumberVerified,
            image: userData.image,
          };

          await prisma.user.upsert({
            where: { email: userData.email },
            update: userCreateData,
            create: userCreateData,
          });

          console.log(
            `✅ Created user via fallback: ${userData.email} (${userData.role || 'user'})`,
          );
          return { status: 'created', email: userData.email };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`❌ Error creating user ${userData.email}:`, errorMessage);
        return { status: 'error', email: userData.email, error: errorMessage };
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

  console.log(`\n📈 Users seeding summary:`);
  console.log(`   ✅ Created: ${totalCreated}`);
  console.log(`   ⚠️  Skipped: ${totalSkipped}`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log(`   📊 Total: ${totalCreated + totalSkipped + totalErrors}`);

  // Don't disconnect here - let the main seeder handle it
}

export default seedUsers;
