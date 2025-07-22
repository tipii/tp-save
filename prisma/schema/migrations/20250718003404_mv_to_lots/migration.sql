/*
  Warnings:

  - You are about to drop the column `cdePreteDepot` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `commandeEmbarquee` on the `commande` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "commande" DROP COLUMN "cdePreteDepot",
DROP COLUMN "commandeEmbarquee";
