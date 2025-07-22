/*
  Warnings:

  - You are about to drop the column `rawSageData` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `sageType` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `sageUniqueId` on the `commande` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bc_number]` on the table `commande` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bl_number]` on the table `commande` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bc_number` to the `commande` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "commande_sageUniqueId_key";

-- AlterTable
ALTER TABLE "commande" DROP COLUMN "rawSageData",
DROP COLUMN "sageType",
DROP COLUMN "sageUniqueId",
ADD COLUMN     "bc_number" TEXT NOT NULL,
ADD COLUMN     "bl_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "commande_bc_number_key" ON "commande"("bc_number");

-- CreateIndex
CREATE UNIQUE INDEX "commande_bl_number_key" ON "commande"("bl_number");
