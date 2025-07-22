/*
  Warnings:

  - You are about to drop the column `cfBlDuOuNumeroRq` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `numeroBonCommandeBpa` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `numeroBonLivraison` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `numeroBonPreparationLivraison` on the `commande` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bp_number]` on the table `commande` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "client" ALTER COLUMN "country" DROP DEFAULT;

-- AlterTable
ALTER TABLE "commande" DROP COLUMN "cfBlDuOuNumeroRq",
DROP COLUMN "numeroBonCommandeBpa",
DROP COLUMN "numeroBonLivraison",
DROP COLUMN "numeroBonPreparationLivraison",
ADD COLUMN     "bp_number" TEXT,
ADD COLUMN     "cf_bl_ou_rq_number" TEXT,
ADD COLUMN     "facture_number" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "quote_number" TEXT,
ALTER COLUMN "bc_number" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "commande_bp_number_key" ON "commande"("bp_number");
