import { PrismaClient } from '../../src/generated/prisma';
import { usersData } from './data/users-data';
import { seedUsers } from './seeders/users-seeder';

const prisma = new PrismaClient();

// Configuration for seeding
interface SeedConfig {
  users: boolean;
  // Add other seeders here as they're created
  // posts: boolean;
  // comments: boolean;
}

// Default configuration - can be overridden via environment variables
const defaultConfig: SeedConfig = {
  users: true,
};

// Parse environment variables for seeding configuration
function getSeedConfig(): SeedConfig {
  const config = { ...defaultConfig };

  // Allow selective seeding via environment variables
  if (process.env.SEED_USERS === 'false') config.users = false;

  return config;
}

// Main seeding function
async function main() {
  const config = getSeedConfig();

  console.log('🚀 Starting database seeding...');
  console.log('📋 Seeding configuration:', config);

  try {
    // Seed users
    if (config.users) {
      await seedUsers(usersData);
    } else {
      console.log('⏭️  Skipping users seeding');
    }

    // Add other seeders here as they're created
    // if (config.posts) {
    //   await seedPosts();
    // }

    console.log('\n🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('💥 Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Utility functions for advanced seeding scenarios
export async function seedWithTransaction<T>(
  seedFunction: (
    prisma: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
  ) => Promise<T>,
): Promise<T> {
  return prisma.$transaction(seedFunction, {
    maxWait: 5000, // 5 seconds
    timeout: 10000, // 10 seconds
  });
}

export async function clearDatabase() {
  console.log('🧹 Clearing database...');

  // Clear in reverse order of dependencies
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Database cleared');
}

// Run seeding if this file is executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
}

export { main as seed, getSeedConfig };
export type { SeedConfig };
