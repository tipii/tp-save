import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TrpcChargements } from '@/trpc/types/types';
import React from 'react';

export default function ChargementModal({
  children,
  chargement,
}: {
  children: React.ReactNode;
  chargement: TrpcChargements;
}) {
  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chargement: {chargement.name}</DialogTitle>
          <DialogDescription>
            Livreur: {chargement.livreur?.name} - Statut: {chargement.status}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <h2 className="text-lg font-bold">Commandes</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {chargement.commandes.map((commande) => (
              <div className="flex items-center justify-between" key={commande.id}>
                <p>{commande.ref}</p>
                <p>{commande.items} items</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
