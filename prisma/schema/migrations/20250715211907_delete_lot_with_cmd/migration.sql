-- DropForeignKey
ALTER TABLE "lot" DROP CONSTRAINT "lot_commandeId_fkey";

-- AddForeignKey
ALTER TABLE "lot" ADD CONSTRAINT "lot_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;
