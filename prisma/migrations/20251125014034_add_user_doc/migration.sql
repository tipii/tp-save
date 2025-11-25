-- AlterTable
ALTER TABLE "livraison" ADD COLUMN     "userDocId" TEXT;

-- AddForeignKey
ALTER TABLE "livraison" ADD CONSTRAINT "livraison_userDocId_fkey" FOREIGN KEY ("userDocId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
