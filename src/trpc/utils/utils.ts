import { Status, Prisma } from '@/generated/prisma';

export const baseWhereCommande: Prisma.CommandeWhereInput = {
  docVente: {
    statut: '1',
  },
};
