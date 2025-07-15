-- CreateTable
CREATE TABLE "Chargement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "livreurId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chargement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChargementHistory" (
    "id" TEXT NOT NULL,
    "chargementId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChargementHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "items" INTEGER NOT NULL,
    "priority" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chargementId" TEXT,
    "lockedBy" TEXT,
    "lockedUntil" TIMESTAMP(3),

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommandeHistory" (
    "id" TEXT NOT NULL,
    "commandeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommandeHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chargement" ADD CONSTRAINT "Chargement_livreurId_fkey" FOREIGN KEY ("livreurId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargementHistory" ADD CONSTRAINT "ChargementHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargementHistory" ADD CONSTRAINT "ChargementHistory_chargementId_fkey" FOREIGN KEY ("chargementId") REFERENCES "Chargement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_chargementId_fkey" FOREIGN KEY ("chargementId") REFERENCES "Chargement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeHistory" ADD CONSTRAINT "CommandeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeHistory" ADD CONSTRAINT "CommandeHistory_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;
