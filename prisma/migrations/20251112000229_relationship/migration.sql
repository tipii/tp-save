/*
  Warnings:

  - A unique constraint covering the columns `[commandeId]` on the table `raw_doc_vente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "raw_doc_vente" ADD COLUMN     "commandeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "raw_doc_vente_commandeId_key" ON "raw_doc_vente"("commandeId");

-- AddForeignKey
ALTER TABLE "raw_doc_vente" ADD CONSTRAINT "raw_doc_vente_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "commande"("id") ON DELETE SET NULL ON UPDATE CASCADE;
