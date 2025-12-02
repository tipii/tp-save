import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

import { Check } from 'lucide-react';
import React, { useState } from 'react';
import { useActiveChargement } from '../../hooks/queries';
import { useDeliverLivraisonMutation } from '../../hooks/mutations';

export default function ButtonLivraisonDeliver({
  livraisonId,
  toggleLivraison,
}: {
  livraisonId: string;
  toggleLivraison: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [receptionInfo, setReceptionInfo] = useState<string>('');
  const { data: chargement } = useActiveChargement();
  const { mutate: deliverLivraison, isPending } = useDeliverLivraisonMutation();

  const handleDeliver = () => {
    if (!chargement?.id) return;

    deliverLivraison(
      { id: livraisonId, receptionInfo, chargementId: chargement.id },
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
        <Button className="w-full bg-green-500">
          <Check className="h-4 w-4" />
          Valider la livraison
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[10%] translate-y-0 sm:top-[50%] sm:-translate-y-1/2">
        <DialogHeader>
          <DialogTitle>Valider la livraison</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Informations de réception (contact, heure, etc.)"
          className="h-48"
          value={receptionInfo}
          onChange={(e) => setReceptionInfo(e.target.value)}
        />
        <Button
          className="w-full bg-green-500"
          onClick={handleDeliver}
          disabled={!receptionInfo || receptionInfo === '' || isPending}
        >
          <Check className="h-4 w-4" />
          Valider la livraison
        </Button>
      </DialogContent>
    </Dialog>
  );
}
