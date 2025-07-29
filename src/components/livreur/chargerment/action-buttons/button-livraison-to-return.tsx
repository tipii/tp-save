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
import { useCurrentChargement } from '../../hooks/queries';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { toast } from 'sonner';

export default function ButtonLivraisonToReturn({
  livraisonId,
  toggleLivraison,
}: {
  livraisonId: string;
  toggleLivraison: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [returnInfo, setReturnInfo] = useState<string>('');
  const trpc = useTRPC();
  const { data: chargement, refetch: refetchChargement } = useCurrentChargement();
  const { mutate: returnLivraison, isPending } = useMutation(
    trpc.livreursLivraisons.returnLivraison.mutationOptions(),
  );
  const handleReturn = () => {
    if (!chargement?.id) {
      return;
    }

    returnLivraison(
      { id: livraisonId, returnInfo, chargementId: chargement?.id },
      {
        onSuccess: () => {
          refetchChargement();
          toast.success('Livraison à retourner au depot');
          setOpen(false);
          toggleLivraison();
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
        <Button className="w-full bg-red-500">
          <PackageX className="h-4 w-4" />
          Retourner la livraison
        </Button>
      </DialogTrigger>
      <DialogContent>
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
