-- AlterTable
ALTER TABLE "commande" ADD COLUMN     "bonPrepaGesco" TEXT,
ADD COLUMN     "cdePreteDepot" BOOLEAN DEFAULT false,
ADD COLUMN     "cfBlDuOuNumeroRq" TEXT,
ADD COLUMN     "commandeEmbarquee" BOOLEAN DEFAULT false,
ADD COLUMN     "commentaires" TEXT,
ADD COLUMN     "commercial" TEXT,
ADD COLUMN     "docGesco" TEXT,
ADD COLUMN     "docGescoImp" TEXT,
ADD COLUMN     "entreprises" TEXT,
ADD COLUMN     "lieu" TEXT,
ADD COLUMN     "numeroBonCommandeBpa" TEXT,
ADD COLUMN     "numeroBonLivraison" TEXT,
ADD COLUMN     "numeroBonPreparationLivraison" TEXT,
ADD COLUMN     "numeroDevis" TEXT,
ADD COLUMN     "numeroFacture" TEXT,
ADD COLUMN     "orderReceivedById" TEXT,
ADD COLUMN     "orderReceptionDate" TIMESTAMP(3),
ADD COLUMN     "orderReceptionMode" TEXT,
ADD COLUMN     "orderTransmittedById" TEXT,
ADD COLUMN     "receptionBlFactSignee" TEXT;

-- AlterTable
ALTER TABLE "lot" ADD COLUMN     "bonLivraison" TEXT,
ADD COLUMN     "deliveryDate" TIMESTAMP(3),
ADD COLUMN     "deliveryMode" TEXT,
ADD COLUMN     "expectedDeliveryDate" TIMESTAMP(3),
ADD COLUMN     "livreurId" TEXT;

-- CreateIndex
CREATE INDEX "lot_commandeId_idx" ON "lot"("commandeId");

-- CreateIndex
CREATE INDEX "lot_livreurId_idx" ON "lot"("livreurId");

-- AddForeignKey
ALTER TABLE "commande" ADD CONSTRAINT "commande_orderReceivedById_fkey" FOREIGN KEY ("orderReceivedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commande" ADD CONSTRAINT "commande_orderTransmittedById_fkey" FOREIGN KEY ("orderTransmittedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot" ADD CONSTRAINT "lot_livreurId_fkey" FOREIGN KEY ("livreurId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
