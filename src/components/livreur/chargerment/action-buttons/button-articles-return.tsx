import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Item } from '@/types/types';
import { ArrowLeftIcon, PackageX } from 'lucide-react';
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

  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const handleItemCheck = (itemIndex: number, checked: boolean) => {
    if (checked) {
      setCheckedItems((prev) => [...prev, itemIndex]);
    } else {
      setCheckedItems((prev) => prev.filter((index) => index !== itemIndex));
    }
  };

  const handleValidation = () => {
    const selectedItems = checkedItems.map((index) => returnableItems[index]);
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
          setCheckedItems([]);
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
            <div key={index} className="flex items-center space-x-3 rounded-lg border p-3">
              <Checkbox
                id={`item-${index}`}
                checked={checkedItems.includes(index)}
                onCheckedChange={(checked) => handleItemCheck(index, !!checked)}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-gray-900">{item.DL_Design}</div>
                <div className="font-mono text-xs text-gray-500">{item.AR_REF}</div>
              </div>
              <Badge variant="outline" className="text-xs">
                {item.DL_QTEBL}
              </Badge>
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button
            onClick={handleValidation}
            disabled={checkedItems.length === 0 || isPending}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Valider ({checkedItems.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
