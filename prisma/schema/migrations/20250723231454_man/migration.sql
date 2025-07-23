/*
  Warnings:

  - The `status` column on the `chargement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `numeroDevis` on the `commande` table. All the data in the column will be lost.
  - You are about to drop the column `numeroFacture` on the `commande` table. All the data in the column will be lost.
  - Made the column `name` on table `commande` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `livraison` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "chargement" DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "commande" DROP COLUMN "numeroDevis",
DROP COLUMN "numeroFacture",
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'Commande';

-- AlterTable
ALTER TABLE "livraison" ADD COLUMN     "notes" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'Livraison';
