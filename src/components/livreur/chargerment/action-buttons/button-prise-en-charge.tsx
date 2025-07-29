import { Button } from '@/components/ui/button';
import { Status } from '@/generated/prisma';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { Truck } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { useCurrentChargement } from '../../hooks/queries';

export default function ButtonPriseEnCharge() {
  const trpc = useTRPC();
  const { data: chargement, refetch } = useCurrentChargement();
  const { mutate: updateChargementStatus, isPending } = useMutation(
    trpc.livreursChargements.updateChargementStatus.mutationOptions(),
  );

  const handleClick = () => {
    updateChargementStatus(
      { id: chargement?.id ?? '', status: Status.DELIVERING },
      {
        onSuccess: () => {
          toast.success('Chargement pris en charge');
          refetch();
        },
        onError: () => {
          toast.error('Erreur lors de la prise en charge du chargement');
        },
      },
    );
  };

  return (
    <Button
      className="h-12 w-full text-base font-medium"
      onClick={handleClick}
      disabled={isPending}
    >
      <Truck className="mr-2 h-5 w-5" />
      Prendre en charge
    </Button>
  );
}
