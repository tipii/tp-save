/*
  Warnings:

  - You are about to drop the column `lockedBy` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `lockedUntil` on the `commande` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."commande" DROP COLUMN "lockedBy",
DROP COLUMN "lockedUntil";
