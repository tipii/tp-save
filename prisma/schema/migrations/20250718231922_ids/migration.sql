/*
  Warnings:

  - A unique constraint covering the columns `[sageUniqueId]` on the table `commande` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rawSageData` to the `commande` table without a default value. This is not possible if the table is not empty.
  - Made the column `sageUniqueId` on table `commande` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "commande" ADD COLUMN     "rawSageData" JSONB NOT NULL,
ADD COLUMN     "sageType" TEXT,
ALTER COLUMN "originalItems" DROP NOT NULL,
ALTER COLUMN "sageUniqueId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "commande_sageUniqueId_key" ON "commande"("sageUniqueId");
