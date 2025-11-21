import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Item } from '@/types/types';
import { PackageX } from 'lucide-react';
import React, { useState } from 'react';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCurrentChargement } from '../../hooks/queries';

export default function ButtonArticlesReturn({
  livraisonId,
  items,
  chargementId,
  toggleLivraison,
}: {
  livraisonId: string;
  items: Item[];
  chargementId: string;
  toggleLivraison: () => void;
}) {
  const trpc = useTRPC();
  const { refetch: refetchChargement } = useCurrentChargement();
  const { mutate: returnItems, isPending } = useMutation(
    trpc.livreursLivraisons.returnItems.mutationOptions(),
  );

  // Filter items to only include those with AR_REF
  const returnableItems = items.filter((item) => item.AR_REF);

  const [itemQuantities, setItemQuantities] = useState<Record<number, string>>({});
  const [open, setOpen] = useState(false);

  const handleQuantityChange = (itemIndex: number, quantity: string) => {
    const numQuantity = Number(quantity);
    const maxQuantity = Number(returnableItems[itemIndex].DL_QTEBL);

    if (quantity === '' || (numQuantity >= 0 && numQuantity <= maxQuantity)) {
      setItemQuantities((prev) => ({
        ...prev,
        [itemIndex]: quantity,
      }));
    }
  };

  const handleValidation = () => {
    const selectedItems = Object.entries(itemQuantities)
      .filter(([_, quantity]) => quantity !== '' && Number(quantity) > 0)
      .map(([index, quantity]) => ({
        ...returnableItems[Number(index)],
        returnQuantity: quantity,
      }));

    if (selectedItems.length === 0) {
      toast.error('Veuillez sélectionner au moins un article avec une quantité valide');
      return;
    }

    returnItems(
      {
        id: livraisonId,
        chargementId: chargementId,
        items: selectedItems,
      },
      {
        onSuccess: () => {
          toast.success('Articles retournés avec succès');
          setOpen(false);
          setItemQuantities({});
          refetchChargement();
        },
        onError: () => {
          toast.error('Erreur lors du retour des articles');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-orange-500">
          <PackageX className="h-4 w-4" />
          Retourner des articles
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[10%] max-w-md translate-y-0 sm:top-[50%] sm:-translate-y-1/2">
        <DialogHeader>
          <DialogTitle>Retourner des articles</DialogTitle>
        </DialogHeader>

        <div className="max-h-96 space-y-3 overflow-y-auto">
          {returnableItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 rounded-lg border p-3">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900">{item.DL_Design}</div>
                  <div className="font-mono text-xs text-gray-500">{item.AR_REF}</div>
                </div>
                <div className="text-xs text-gray-500">Max: {item.DL_QTEBL}</div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Quantité à retourner:</label>
                <Input
                  type="number"
                  min="0"
                  max={item.DL_QTEBL}
                  placeholder="0"
                  value={itemQuantities[index] || ''}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  className="h-10 flex-1 text-center text-base"
                />
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
          >
            Annuler
          </Button>
          <Button
            onClick={handleValidation}
            disabled={
              Object.values(itemQuantities).filter((q) => q !== '' && Number(q) > 0).length === 0 ||
              isPending
            }
            className="w-full bg-orange-500 hover:bg-orange-600 sm:w-auto"
          >
            Valider (
            {Object.values(itemQuantities).filter((q) => q !== '' && Number(q) > 0).length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
