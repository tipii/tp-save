import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';

import { Check } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useCurrentChargement } from '../../hooks/queries';

export default function ButtonLivraisonDeliver({ livraisonId }: { livraisonId: string }) {
  const [open, setOpen] = useState(false);
  const [receptionInfo, setReceptionInfo] = useState<string>('');
  const trpc = useTRPC();
  const { data: chargement, refetch: refetchChargement } = useCurrentChargement();
  const { mutate: deliverLivraison, isPending } = useMutation(
    trpc.livreursLivraisons.deliverLivraison.mutationOptions(),
  );
  const handleDeliver = () => {
    if (!chargement?.id) {
      return;
    }

    deliverLivraison(
      { id: livraisonId, receptionInfo, chargementId: chargement?.id },
      {
        onSuccess: ({ allLivraisonsDelivered }) => {
          refetchChargement();
          if (allLivraisonsDelivered) {
            toast.success('Chargement terminé');
            setOpen(false);
          } else {
            toast.success('Livraison validée avec succès');
            setOpen(false);
          }
        },
        onError: (error) => {
          toast.error(error.message);
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
      <DialogContent>
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
