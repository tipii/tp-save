import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
import { statusToBadge, statusToText, priorityToBadge } from '@/components/ui/enum-to-ui';
import { Package, User, MapPin, Calendar, Clock } from 'lucide-react';
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

  // Calculate totals
  const totalLivraisons = chargement.livraisons.length;
  const totalItems = chargement.livraisons.reduce((total, livraison) => {
    const items =
      typeof livraison.items === 'string' ? JSON.parse(livraison.items) : livraison.items;
    return total + (Array.isArray(items) ? items.length : 0);
  }, 0);

  const deliveredCount = chargement.livraisons.filter((l) => l.status === 'DELIVERED').length;
  const readyCount = chargement.livraisons.filter(
    (l) => l.status === 'READY' || l.status === 'DELIVERING',
  ).length;

  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-4xl overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl">
            {chargement.name} {statusToBadge(chargement.status)}
          </DialogTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {chargement.livreur?.name || 'Aucun livreur assigné'}
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              {totalLivraisons} livraison{totalLivraisons > 1 ? 's' : ''} • {totalItems} article
              {totalItems > 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(chargement.createdAt).toLocaleDateString('fr-FR')}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Overview */}
          <Card>
            <CardContent>
              <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-600 transition-all"
                  style={{
                    width: `${totalLivraisons > 0 ? (deliveredCount / totalLivraisons) * 100 : 0}%`,
                  }}
                />
              </div>
              <div className="text-muted-foreground mt-1 text-center text-xs">
                {totalLivraisons > 0 ? Math.round((deliveredCount / totalLivraisons) * 100) : 0}%
                des livraisons complétées ({deliveredCount} / {totalLivraisons})
              </div>
            </CardContent>
          </Card>

          {/* Livraisons List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Livraisons ({totalLivraisons})</h3>
            <div className="space-y-2">
              {chargement.livraisons.map((livraison) => {
                const items =
                  typeof livraison.items === 'string'
                    ? JSON.parse(livraison.items)
                    : livraison.items;
                const itemCount = Array.isArray(items) ? items.length : 0;

                return (
                  <Card key={livraison.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono text-xs">
                            {livraison.commande.ref}
                          </Badge>
                          {priorityToBadge(livraison.priority)}
                          {statusToBadge(livraison.status)}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {itemCount} article{itemCount > 1 ? 's' : ''}
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="text-muted-foreground h-3 w-3" />
                          <span className="font-medium">
                            {livraison.commande.client?.name || 'Client inconnu'}
                          </span>
                          {livraison.commande.client?.city && (
                            <span className="text-muted-foreground text-xs">
                              • {livraison.commande.client.city}
                            </span>
                          )}
                        </div>

                        {livraison.deliveryDate && (
                          <div className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Calendar className="h-3 w-3" />
                            {new Date(livraison.deliveryDate).toLocaleDateString('fr-FR')}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
