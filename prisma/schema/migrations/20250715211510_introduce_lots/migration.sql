/*
  Warnings:

  - You are about to drop the column `chargementId` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `commande` table. All the data in the column will be lost.
  - Added the required column `originalItems` to the `commande` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "commande" DROP CONSTRAINT "commande_chargementId_fkey";

-- AlterTable
ALTER TABLE "commande" DROP COLUMN "chargementId",
DROP COLUMN "items",
ADD COLUMN     "originalItems" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "lot" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "items" JSONB NOT NULL,
    "commandeId" TEXT NOT NULL,
    "priority" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "chargementId" TEXT,

    CONSTRAINT "lot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lot" ADD CONSTRAINT "lot_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot" ADD CONSTRAINT "lot_chargementId_fkey" FOREIGN KEY ("chargementId") REFERENCES "chargement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
