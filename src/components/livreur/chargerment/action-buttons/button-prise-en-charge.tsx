import { Button } from '@/components/ui/button';
import { Status } from '@/generated/prisma';
import { Truck } from 'lucide-react';
import React from 'react';
import { useAvailableChargements } from '../../hooks/queries';
import { useUpdateChargementStatusMutation } from '../../hooks/mutations';

export default function ButtonPriseEnCharge() {
  const { data: chargements } = useAvailableChargements();
  const chargement = chargements?.[0]; // Get first available chargement
  const { mutate: updateChargementStatus, isPending } = useUpdateChargementStatusMutation();

  const handleClick = () => {
    if (!chargement?.id) return;
    updateChargementStatus({ id: chargement.id, status: Status.DELIVERING });
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
