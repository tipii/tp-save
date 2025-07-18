import { TrpcLotFromCommande } from '@/types/trpc-types';

export const getTotalItems = (lots: TrpcLotFromCommande[]) => {
  return lots.reduce((total, lot) => {
    if (Array.isArray(lot.items)) {
      return (
        total +
        (lot.items as { name: string; quantity: number }[]).reduce(
          (lotTotal: number, item) => lotTotal + (item.quantity || 0),
          0,
        )
      );
    }
    return total;
  }, 0);
};
