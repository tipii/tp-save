-- AlterTable
ALTER TABLE "chargement" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "commande" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
