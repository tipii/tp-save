import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { statusToBadge, priorityToBadge, statusToTailwindColor } from '@/components/ui/enum-to-ui';
import {
  Package,
  User,
  MapPin,
  Calendar,
  Clock,
  Building,
  Building2,
  UserPlus,
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Item } from '@/types/types';
import { TrpcChargement, TrpcLivraison } from '@/types/trpc-types';
import { Livraison } from '@/generated/prisma';
import Documentation from './documentation';

export default function ChargementModal({
  children,
  chargementId,
}: {
  children: React.ReactNode;
  chargementId: string;
}) {
  const trpc = useTRPC();
  const { data: chargement, refetch: refetchChargement } = useQuery(
    trpc.chargements.getChargementById.queryOptions(
      { id: chargementId },
      {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 10, // 10 seconds
        refetchIntervalInBackground: false,
      },
    ),
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
  const returnedLivraisons = chargement.livraisons.filter((l) => l.status === 'RETURNED');

  //group livraison by reference
  const livraisonsByReference = chargement.livraisons.reduce(
    (acc, livraison) => {
      acc[livraison.commande.ref] = acc[livraison.commande.ref] || [];
      acc[livraison.commande.ref].push(livraison);
      return acc;
    },
    {} as Record<string, TrpcChargement['livraisons'][0][]>,
  );

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
              Assigné à : {chargement.livreur?.name || 'Aucun livreur assigné'}
            </div>
            {chargement.history.length > 0 && (
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Créé par : {chargement.history[0].user.name}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              {totalLivraisons} livraison{totalLivraisons > 1 ? 's' : ''}
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

              {returnedLivraisons.length > 0 && (
                <div className="text-muted-foreground mt-1 text-center text-xs">
                  {returnedLivraisons.length} livraison{returnedLivraisons.length > 1 ? 's ' : ' '}
                  retournée{returnedLivraisons.length > 1 ? 's' : ''}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Livraisons List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Livraisons ({totalLivraisons})</h3>
            <div className="flex flex-col gap-2">
              {Object.entries(livraisonsByReference).map(([reference, livraisons]) => {
                return (
                  <div key={reference} className="">
                    <h4 className="text-lg font-semibold">{livraisons[0].commande.client?.name}</h4>
                    {livraisons.map((livraison) => {
                      const items: Item[] =
                        typeof livraison.items === 'string'
                          ? JSON.parse(livraison.items)
                          : livraison.items;
                      const itemCount = items.reduce(
                        (total, item) => total + Number(item.DL_QTEBL),
                        0,
                      );

                      return (
                        <div key={livraison.id} className="flex items-center gap-2">
                          <Link
                            href={`/app/commandes/${livraison.commandeId}`}
                            key={livraison.id}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                          >
                            <Card
                              key={livraison.id}
                              className={`mb-2 border ${statusToTailwindColor(livraison.status).border} ${statusToTailwindColor(livraison.status).background} p-0`}
                            >
                              <CardContent className="py-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    {/* {livraison.commande.client?.name} */}
                                    {livraison.commande.ref}

                                    {priorityToBadge(livraison.priority)}
                                    {statusToBadge(livraison.status)}
                                  </div>
                                  <div className="text-muted-foreground text-xs">
                                    {itemCount} article{itemCount > 1 ? 's' : ''}
                                  </div>
                                </div>
                                <div className="text-muted-foreground mt-1 text-xs"></div>
                              </CardContent>
                            </Card>
                          </Link>
                          {livraison.status === 'DELIVERED' && (
                            <Documentation
                              livraisonId={livraison.id}
                              documentation={livraison.documentation}
                              refetch={refetchChargement}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
