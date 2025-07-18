import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Building } from 'lucide-react';
import React from 'react';
import { TrpcClient, TrpcCommande } from '@/types/trpc-types';
import ClientCard from '@/components/clients/client-card';
import { priorityToBadge } from '@/lib/enum-to-ui';

export default function CommandeModal({
  children,
  commande,
}: {
  children: React.ReactNode;
  commande: TrpcCommande;
}) {
  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Commande: {commande.ref}</DialogTitle>
          <DialogDescription>
            {commande.lots.length} lots - Priorité:{' '}
            <span className="space-x-1">
              {commande.lots.map((lot, index) => (
                <span key={lot.id}>{priorityToBadge(lot.priority)}</span>
              ))}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Client Section */}
          {commande.client ? (
            <ClientCard client={commande.client as TrpcClient} />
          ) : (
            <Card>
              <CardContent className="py-6">
                <div className="text-muted-foreground text-center">
                  <Building className="mx-auto mb-2 h-12 w-12 opacity-50" />
                  <p>Aucun client associé à cette commande</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
