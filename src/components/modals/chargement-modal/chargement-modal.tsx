import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTRPC } from '@/trpc/client';
import { TrpcChargement } from '@/types/trpc-types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function ChargementModal({
  children,
  chargementId,
}: {
  children: React.ReactNode;
  chargementId: string;
}) {
  const trpc = useTRPC();
  const { data: chargement } = useQuery(
    trpc.chargements.getChargementById.queryOptions({ id: chargementId }),
  );

  if (!chargement) return null;

  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chargement: {chargement?.name}</DialogTitle>
          <DialogDescription>
            Livreur: {chargement.livreur?.name} - Statut: {chargement.status}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Livraison{chargement.lots.length > 1 ? 's' : ''}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {chargement.lots.map((lot) => (
              <div className="flex items-center justify-between" key={lot.id}>
                <p>Commande: {lot.commande.ref}</p>
                <p>
                  {lot.commande.lots.length} lot{lot.commande.lots.length > 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
