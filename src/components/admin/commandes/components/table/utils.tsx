import { TrpcLivraisonFromCommande } from '@/types/trpc-types';

export const getTotalItems = (livraisons: TrpcLivraisonFromCommande[]) => {
  return livraisons.reduce((total, livraison) => {
    if (Array.isArray(livraison.items)) {
      return (
        total +
        (livraison.items as { name: string; quantity: number }[]).reduce(
          (livraisonTotal: number, item) => livraisonTotal + (item.quantity || 0),
          0,
        )
      );
    }
    return total;
  }, 0);
};
