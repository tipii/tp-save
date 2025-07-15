/*
  Warnings:

  - You are about to drop the column `client` on the `commande` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "commande" DROP COLUMN "client",
ADD COLUMN     "clientId" TEXT;

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'particulier',
    "email" TEXT,
    "phone" TEXT,
    "phoneSecond" TEXT,
    "contactPerson" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'France',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_code_key" ON "client"("code");

-- CreateIndex
CREATE INDEX "client_code_idx" ON "client"("code");

-- CreateIndex
CREATE INDEX "client_name_idx" ON "client"("name");

-- CreateIndex
CREATE INDEX "client_city_idx" ON "client"("city");

-- CreateIndex
CREATE INDEX "commande_clientId_idx" ON "commande"("clientId");

-- AddForeignKey
ALTER TABLE "commande" ADD CONSTRAINT "commande_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
