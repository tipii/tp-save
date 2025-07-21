/*
  Warnings:

  - A unique constraint covering the columns `[DO_Piece]` on the table `raw_commande_sage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `raw_commande_sage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "raw_commande_sage" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "raw_commande_sage_DO_Piece_key" ON "raw_commande_sage"("DO_Piece");

-- CreateIndex
CREATE INDEX "raw_commande_sage_DO_Piece_idx" ON "raw_commande_sage"("DO_Piece");
