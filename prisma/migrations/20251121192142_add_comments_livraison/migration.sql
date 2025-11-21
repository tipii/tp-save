/*
  Warnings:

  - You are about to drop the column `bc_number` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `bl_number` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `bonPrepaGesco` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `bp_number` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `cf_bl_ou_rq_number` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `commercial` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `docGesco` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `docGescoImp` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `entreprises` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `facture_number` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `lieu` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `orderReceivedById` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `orderReceptionDate` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `orderReceptionMode` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `orderTransmittedById` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `quote_number` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `receptionBlFactSignee` on the `commande` table. All the data in the column will be lost.
  - The primary key for the `raw_doc_vente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `commandeId` on the `raw_doc_vente` table. All the data in the column will be lost.
  - You are about to drop the `raw_commande_sage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[docVenteId]` on the table `commande` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `raw_doc_vente` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "commande" DROP CONSTRAINT "commande_orderReceivedById_fkey";

-- DropForeignKey
ALTER TABLE "commande" DROP CONSTRAINT "commande_orderTransmittedById_fkey";

-- DropForeignKey
ALTER TABLE "raw_doc_vente" DROP CONSTRAINT "raw_doc_vente_commandeId_fkey";

-- DropIndex
DROP INDEX "commande_bc_number_key";

-- DropIndex
DROP INDEX "commande_bl_number_key";

-- DropIndex
DROP INDEX "commande_bp_number_key";

-- DropIndex
DROP INDEX "raw_doc_vente_commandeId_key";

-- AlterTable
ALTER TABLE "commande" DROP COLUMN "bc_number",
DROP COLUMN "bl_number",
DROP COLUMN "bonPrepaGesco",
DROP COLUMN "bp_number",
DROP COLUMN "cf_bl_ou_rq_number",
DROP COLUMN "commercial",
DROP COLUMN "docGesco",
DROP COLUMN "docGescoImp",
DROP COLUMN "entreprises",
DROP COLUMN "facture_number",
DROP COLUMN "lieu",
DROP COLUMN "orderReceivedById",
DROP COLUMN "orderReceptionDate",
DROP COLUMN "orderReceptionMode",
DROP COLUMN "orderTransmittedById",
DROP COLUMN "quote_number",
DROP COLUMN "receptionBlFactSignee",
ADD COLUMN     "docVenteId" TEXT;

-- AlterTable
ALTER TABLE "livraison" ADD COLUMN     "depotComment" TEXT,
ADD COLUMN     "returnComment" TEXT;

-- AlterTable
ALTER TABLE "raw_doc_vente" DROP CONSTRAINT "raw_doc_vente_pkey",
DROP COLUMN "commandeId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "raw_doc_vente_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "raw_commande_sage";

-- CreateIndex
CREATE UNIQUE INDEX "commande_docVenteId_key" ON "commande"("docVenteId");

-- AddForeignKey
ALTER TABLE "commande" ADD CONSTRAINT "commande_docVenteId_fkey" FOREIGN KEY ("docVenteId") REFERENCES "raw_doc_vente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
