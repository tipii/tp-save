'use client';

import React, { useState } from 'react';
import { useArchive } from '../context/archive-context';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Package, ChevronDown, ChevronRight, Building, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { statusToBadge } from '@/components/ui/enum-to-ui';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Item } from '@/types/types';
import Documentation from '../../shared/documentation';

export function ChargementLivraisons() {
  const { selectedChargementId } = useArchive();
  const trpc = useTRPC();
  const [openCommandes, setOpenCommandes] = useState<Set<string>>(new Set());

  const {
    data: chargement,
    isPending,
    refetch: refetchChargement,
  } = useQuery(
    trpc.chargements.getChargementById.queryOptions(
      { id: selectedChargementId! },
      {
        enabled: !!selectedChargementId,
      },
    ),
  );

  if (!selectedChargementId) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-2 h-12 w-12" />
          <p>Sélectionnez un chargement pour voir les livraisons</p>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="space-y-3 p-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!chargement || !chargement.livraisons || chargement.livraisons.length === 0) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        <p>Aucune livraison trouvée</p>
      </div>
    );
  }

  // Group livraisons by commande
  const livraisonsByCommande = chargement.livraisons.reduce(
    (acc, livraison) => {
      const commandeId = livraison.commandeId;
      if (!acc[commandeId]) {
        acc[commandeId] = [];
      }
      acc[commandeId].push(livraison);
      return acc;
    },
    {} as Record<string, typeof chargement.livraisons>,
  );

  const toggleCommande = (commandeId: string) => {
    setOpenCommandes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commandeId)) {
        newSet.delete(commandeId);
      } else {
        newSet.add(commandeId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold">Livraisons</h3>
        <Badge variant="outline" className="text-xs">
          {Object.keys(livraisonsByCommande).length} commande
          {Object.keys(livraisonsByCommande).length > 1 ? 's' : ''}
        </Badge>
      </div>

      <Separator />

      <div className="space-y-2">
        {Object.entries(livraisonsByCommande).map(([commandeId, livraisons]) => {
          const commande = livraisons[0].commande;
          const isOpen = openCommandes.has(commandeId);

          return (
            <Collapsible
              key={commandeId}
              open={isOpen}
              onOpenChange={() => toggleCommande(commandeId)}
            >
              <div className="bg-card rounded-lg border">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hover:bg-muted/50 flex w-full items-center justify-between p-3"
                  >
                    <div className="flex items-center gap-2">
                      {isOpen ? (
                        <ChevronDown className="text-muted-foreground h-4 w-4" />
                      ) : (
                        <ChevronRight className="text-muted-foreground h-4 w-4" />
                      )}
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-orange-600" />
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            {commande?.ref && (
                              <Badge variant="green" className="text-xs">
                                {commande.ref}
                              </Badge>
                            )}
                            {commande?.client?.name && (
                              <span className="text-sm font-medium">{commande.client.name}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {livraisons.length} livraison{livraisons.length > 1 ? 's' : ''}
                    </Badge>
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="space-y-2 border-t p-3">
                    {livraisons.map((livraison) => {
                      const items = livraison.items as Item[];

                      return (
                        <div
                          key={livraison.id}
                          className="rounded-md border border-slate-200 bg-slate-50 p-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 space-y-2">
                              <div className="mb-1 flex items-center gap-2">
                                <span className="text-sm font-medium">{livraison.name}</span>
                                {statusToBadge(livraison.status)}
                              </div>

                              {/* Items Count */}
                              {items.length > 0 && (
                                <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                                  <Package className="h-3 w-3" />
                                  <span>
                                    {items.reduce(
                                      (total, item) => total + Number(item.DL_QTEBL || 0),
                                      0,
                                    )}{' '}
                                    article
                                    {items.reduce(
                                      (total, item) => total + Number(item.DL_QTEBL || 0),
                                      0,
                                    ) > 1
                                      ? 's'
                                      : ''}
                                  </span>
                                </div>
                              )}

                              {/* Documentation */}
                              <div className="bg-muted flex items-center gap-2 rounded-md p-1.5">
                                Documentation:
                                <Documentation
                                  livraisonId={livraison.id}
                                  documentation={livraison.documentation}
                                  userName={livraison.userDoc?.name}
                                  refetch={refetchChargement}
                                />
                              </div>
                              {/* Reception Info */}
                              {livraison.receptionInfo && (
                                <div className="mt-2">
                                  <span className="">Information de réception: </span>
                                  <div className="text-muted-foreground bg-muted mt-2 rounded-md p-1.5 text-xs">
                                    {livraison.receptionInfo}
                                  </div>
                                </div>
                              )}

                              {/* Return Comment */}
                              {livraison.returnComment && (
                                <div className="mt-2 rounded bg-orange-100 p-1.5 text-xs">
                                  <span className="font-medium text-orange-700">
                                    Commentaire de retour:{' '}
                                  </span>
                                  <span className="text-orange-600">{livraison.returnComment}</span>
                                </div>
                              )}

                              {/* Depot Comment */}
                              {livraison.depotComment && (
                                <div className="mt-2 rounded bg-blue-100 p-1.5 text-xs">
                                  <span className="font-medium text-blue-700">
                                    Commentaire de retour au dépôt:{' '}
                                  </span>
                                  <span className="text-blue-600">{livraison.depotComment}</span>
                                </div>
                              )}
                            </div>

                            {/* View Commande Link */}
                            <div className="flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-blue-100 hover:text-blue-700"
                                asChild
                              >
                                <Link href={`/app/commandes/${livraison.commandeId}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
