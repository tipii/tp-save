-- CreateEnum
CREATE TYPE "public"."status" AS ENUM ('PENDING', 'READY', 'DELIVERING', 'DELIVERED', 'TO_RETURN', 'RETURNED', 'MIXED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."priority" AS ENUM ('URGENT', 'NORMAL', 'ILES', 'UNDEFINED');

-- CreateTable
CREATE TABLE "public"."chargement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "livreurId" TEXT,
    "status" "public"."status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "chargement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chargementHistory" (
    "id" TEXT NOT NULL,
    "chargementId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chargementHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."client" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "phoneSecond" TEXT,
    "contactPerson" TEXT,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "country" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."commande" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Commande',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."status" NOT NULL DEFAULT 'PENDING',
    "lockedBy" TEXT,
    "lockedUntil" TIMESTAMP(3),
    "clientId" TEXT,
    "orderReceivedById" TEXT,
    "orderTransmittedById" TEXT,
    "orderReceptionMode" TEXT,
    "orderReceptionDate" TIMESTAMP(3),
    "quote_number" TEXT,
    "bc_number" TEXT,
    "bp_number" TEXT,
    "bl_number" TEXT,
    "cf_bl_ou_rq_number" TEXT,
    "facture_number" TEXT,
    "bonPrepaGesco" TEXT,
    "docGesco" TEXT,
    "docGescoImp" TEXT,
    "receptionBlFactSignee" TEXT,
    "commercial" TEXT,
    "entreprises" TEXT,
    "lieu" TEXT,
    "originalItems" JSONB,
    "commentaires" TEXT,

    CONSTRAINT "commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."commandeHistory" (
    "id" TEXT NOT NULL,
    "commandeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commandeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."livraison" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Livraison',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "items" JSONB NOT NULL,
    "notes" TEXT,
    "commandeId" TEXT NOT NULL,
    "priority" "public"."priority" NOT NULL DEFAULT 'UNDEFINED',
    "status" "public"."status" NOT NULL DEFAULT 'PENDING',
    "chargementId" TEXT,
    "livreurId" TEXT,
    "expectedDeliveryDate" TIMESTAMP(3),
    "deliveryDate" TIMESTAMP(3),
    "deliveryMode" TEXT,
    "bonLivraison" TEXT,
    "receptionInfo" TEXT,

    CONSTRAINT "livraison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."raw_commande_sage" (
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "raw_commande_sage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT,
    "banned" BOOLEAN,
    "banReason" TEXT,
    "banExpires" TIMESTAMP(3),
    "username" TEXT,
    "displayUsername" TEXT,
    "phoneNumber" TEXT,
    "phoneNumberVerified" BOOLEAN,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_code_key" ON "public"."client"("code");

-- CreateIndex
CREATE INDEX "client_code_idx" ON "public"."client"("code");

-- CreateIndex
CREATE INDEX "client_name_idx" ON "public"."client"("name");

-- CreateIndex
CREATE INDEX "client_city_idx" ON "public"."client"("city");

-- CreateIndex
CREATE UNIQUE INDEX "commande_bc_number_key" ON "public"."commande"("bc_number");

-- CreateIndex
CREATE UNIQUE INDEX "commande_bp_number_key" ON "public"."commande"("bp_number");

-- CreateIndex
CREATE UNIQUE INDEX "commande_bl_number_key" ON "public"."commande"("bl_number");

-- CreateIndex
CREATE INDEX "commande_clientId_idx" ON "public"."commande"("clientId");

-- CreateIndex
CREATE INDEX "livraison_commandeId_idx" ON "public"."livraison"("commandeId");

-- CreateIndex
CREATE INDEX "livraison_livreurId_idx" ON "public"."livraison"("livreurId");

-- CreateIndex
CREATE UNIQUE INDEX "raw_commande_sage_DO_Piece_key" ON "public"."raw_commande_sage"("DO_Piece");

-- CreateIndex
CREATE INDEX "raw_commande_sage_DO_Piece_idx" ON "public"."raw_commande_sage"("DO_Piece");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "public"."user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_phoneNumber_key" ON "public"."user"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- AddForeignKey
ALTER TABLE "public"."chargement" ADD CONSTRAINT "chargement_livreurId_fkey" FOREIGN KEY ("livreurId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargementHistory" ADD CONSTRAINT "chargementHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chargementHistory" ADD CONSTRAINT "chargementHistory_chargementId_fkey" FOREIGN KEY ("chargementId") REFERENCES "public"."chargement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."commande" ADD CONSTRAINT "commande_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."commande" ADD CONSTRAINT "commande_orderReceivedById_fkey" FOREIGN KEY ("orderReceivedById") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."commande" ADD CONSTRAINT "commande_orderTransmittedById_fkey" FOREIGN KEY ("orderTransmittedById") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."commandeHistory" ADD CONSTRAINT "commandeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."commandeHistory" ADD CONSTRAINT "commandeHistory_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "public"."commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."livraison" ADD CONSTRAINT "livraison_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "public"."commande"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."livraison" ADD CONSTRAINT "livraison_chargementId_fkey" FOREIGN KEY ("chargementId") REFERENCES "public"."chargement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."livraison" ADD CONSTRAINT "livraison_livreurId_fkey" FOREIGN KEY ("livreurId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
