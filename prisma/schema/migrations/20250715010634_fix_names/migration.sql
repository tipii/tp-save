/*
  Warnings:

  - You are about to drop the `Chargement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChargementHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Commande` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommandeHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chargement" DROP CONSTRAINT "Chargement_livreurId_fkey";

-- DropForeignKey
ALTER TABLE "ChargementHistory" DROP CONSTRAINT "ChargementHistory_chargementId_fkey";

-- DropForeignKey
ALTER TABLE "ChargementHistory" DROP CONSTRAINT "ChargementHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_chargementId_fkey";

-- DropForeignKey
ALTER TABLE "CommandeHistory" DROP CONSTRAINT "CommandeHistory_commandeId_fkey";

-- DropForeignKey
ALTER TABLE "CommandeHistory" DROP CONSTRAINT "CommandeHistory_userId_fkey";

-- DropTable
DROP TABLE "Chargement";

-- DropTable
DROP TABLE "ChargementHistory";

-- DropTable
DROP TABLE "Commande";

-- DropTable
DROP TABLE "CommandeHistory";

-- CreateTable
CREATE TABLE "chargement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "livreurId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chargement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chargementHistory" (
    "id" TEXT NOT NULL,
    "chargementId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chargementHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commande" (
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

    CONSTRAINT "commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commandeHistory" (
    "id" TEXT NOT NULL,
    "commandeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commandeHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chargement" ADD CONSTRAINT "chargement_livreurId_fkey" FOREIGN KEY ("livreurId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chargementHistory" ADD CONSTRAINT "chargementHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chargementHistory" ADD CONSTRAINT "chargementHistory_chargementId_fkey" FOREIGN KEY ("chargementId") REFERENCES "chargement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commande" ADD CONSTRAINT "commande_chargementId_fkey" FOREIGN KEY ("chargementId") REFERENCES "chargement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commandeHistory" ADD CONSTRAINT "commandeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commandeHistory" ADD CONSTRAINT "commandeHistory_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;
