import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { PackageX, X } from 'lucide-react';
import React, { useState } from 'react';
import { useActiveChargement } from '../../hooks/queries';
import { useReturnLivraisonMutation } from '../../hooks/mutations';

export default function ButtonLivraisonToReturn({
  livraisonId,
  toggleLivraison,
}: {
  livraisonId: string;
  toggleLivraison: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [returnInfo, setReturnInfo] = useState<string>('');
  const { data: chargement } = useActiveChargement();
  const { mutate: returnLivraison, isPending } = useReturnLivraisonMutation();

  const handleReturn = () => {
    if (!chargement?.id) return;

    returnLivraison(
      { id: livraisonId, returnInfo, chargementId: chargement.id },
      {
        onSuccess: () => {
          setOpen(false);
          toggleLivraison();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-red-500">
          <PackageX className="h-4 w-4" />
          Retourner la livraison
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[10%] translate-y-0 sm:top-[50%] sm:-translate-y-1/2">
        <DialogHeader>
          <DialogTitle>Retourner la livraison</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Informations de retour"
          className="h-48"
          value={returnInfo}
          onChange={(e) => setReturnInfo(e.target.value)}
        />
        <Button
          className="w-full bg-red-500"
          onClick={handleReturn}
          disabled={!returnInfo || returnInfo === '' || isPending}
        >
          <X className="h-4 w-4" />
          Retourner la livraison
        </Button>
      </DialogContent>
    </Dialog>
  );
}
