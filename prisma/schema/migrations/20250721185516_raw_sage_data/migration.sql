-- CreateTable
CREATE TABLE "raw_commande_sage" (
    "id" TEXT NOT NULL,
    "DO_Piece" TEXT NOT NULL,
    "DO_DateLiv" TEXT NOT NULL,
    "DO_Tiers" TEXT NOT NULL,
    "DO_Ref" TEXT NOT NULL,
    "DO_Coord01" TEXT NOT NULL,
    "DE_No" TEXT NOT NULL,
    "DO_Imprim" TEXT NOT NULL,
    "DO_TotalTTC" TEXT NOT NULL,
    "DO_NetAPayer" TEXT NOT NULL,
    "BCClient" TEXT NOT NULL,
    "Creneau" TEXT NOT NULL,
    "Personne" TEXT NOT NULL,
    "Obs1" TEXT NOT NULL,
    "Obs2" TEXT NOT NULL,

    CONSTRAINT "raw_commande_sage_pkey" PRIMARY KEY ("id")
);
