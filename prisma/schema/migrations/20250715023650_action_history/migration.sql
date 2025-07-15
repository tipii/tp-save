/*
  Warnings:

  - Added the required column `action` to the `chargementHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `action` to the `commandeHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chargementHistory" ADD COLUMN     "action" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "commandeHistory" ADD COLUMN     "action" TEXT NOT NULL;
