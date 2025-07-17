/*
  Warnings:

  - You are about to drop the column `type` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `commande` table. All the data in the column will be lost.
  - The `status` column on the `commande` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `priority` column on the `lot` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `lot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'READY', 'DELIVERING', 'DELIVERED', 'TO_RETURN', 'RETURNED', 'MIXED');

-- CreateEnum
CREATE TYPE "priority" AS ENUM ('URGENT', 'NORMAL', 'ILES', 'UNDEFINED');

-- AlterTable
ALTER TABLE "client" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "commande" DROP COLUMN "priority",
DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "lot" DROP COLUMN "priority",
ADD COLUMN     "priority" "priority" NOT NULL DEFAULT 'UNDEFINED',
DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'PENDING';
