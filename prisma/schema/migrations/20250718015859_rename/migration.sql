/*
  Warnings:

  - You are about to drop the `lot` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "status" ADD VALUE 'CANCELLED';

-- DropForeignKey
ALTER TABLE "lot" DROP CONSTRAINT "lot_chargementId_fkey";

-- DropForeignKey
ALTER TABLE "lot" DROP CONSTRAINT "lot_commandeId_fkey";

-- DropForeignKey
ALTER TABLE "lot" DROP CONSTRAINT "lot_livreurId_fkey";

-- DropTable
DROP TABLE "lot";

-- CreateTable
CREATE TABLE "livraison" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "items" JSONB NOT NULL,
    "commandeId" TEXT NOT NULL,
    "priority" "priority" NOT NULL DEFAULT 'UNDEFINED',
    "status" "status" NOT NULL DEFAULT 'PENDING',
    "chargementId" TEXT,
    "livreurId" TEXT,
    "expectedDeliveryDate" TIMESTAMP(3),
    "deliveryDate" TIMESTAMP(3),
    "deliveryMode" TEXT,
    "bonLivraison" TEXT,

    CONSTRAINT "livraison_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "livraison_commandeId_idx" ON "livraison"("commandeId");

-- CreateIndex
CREATE INDEX "livraison_livreurId_idx" ON "livraison"("livreurId");

-- AddForeignKey
ALTER TABLE "livraison" ADD CONSTRAINT "livraison_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livraison" ADD CONSTRAINT "livraison_chargementId_fkey" FOREIGN KEY ("chargementId") REFERENCES "chargement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livraison" ADD CONSTRAINT "livraison_livreurId_fkey" FOREIGN KEY ("livreurId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
