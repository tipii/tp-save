import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { PackageX } from 'lucide-react';
import React, { useState } from 'react';
import { useCurrentChargement } from '../../hooks/queries';
import { useTRPC } from '@/trpc/client';
import { toast } from 'sonner';

export default function ButtonLivraisonReturnDepot({
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
    trpc.livreursLivraisons.returnLivraisonToDepot.mutationOptions(),
  );
  const handleReturn = () => {
    if (!chargement?.id) {
      return;
    }

    returnLivraison(
      { id: livraisonId, chargementId: chargement?.id },
      {
        onSuccess: ({ allLivraisonsToReturn }) => {
          refetchChargement();
          if (allLivraisonsToReturn) {
            toast.success('Chargement terminé');
          } else {
            toast.success('Livraison retournée au depot');
          }
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
    <Button onClick={handleReturn} disabled={isPending} className="w-full bg-orange-500">
      <PackageX className="h-4 w-4" />
      Retourner la livraison au depot
    </Button>
  );
}
