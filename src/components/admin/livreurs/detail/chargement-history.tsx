'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Package, Calendar, ChevronDown, ChevronUp, Truck, MapPin, History } from 'lucide-react';
import { statusToBadge } from '@/components/ui/enum-to-ui';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Status } from '@/generated/prisma';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TrpcLivreurChargmenent } from '@/types/trpc-types';

interface ChargementHistoryProps {
  chargements: TrpcLivreurChargmenent[];
}

export function ChargementHistory({ chargements }: ChargementHistoryProps) {
  const [expandedChargements, setExpandedChargements] = useState<Set<string>>(new Set());

  const toggleChargement = (id: string) => {
    setExpandedChargements((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (chargements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historique des Chargements</CardTitle>
          <CardDescription>Liste de tous les chargements effectués</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex flex-col items-center justify-center py-12">
            <Truck className="mb-4 h-12 w-12 opacity-50" />
            <p className="text-sm">Aucun chargement trouvé</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des Chargements</CardTitle>
        <CardDescription>
          {chargements.length} chargement{chargements.length > 1 ? 's' : ''} au total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {chargements.map((chargement, index) => {
            const isExpanded = expandedChargements.has(chargement.id);

            return (
              <div key={chargement.id}>
                {index > 0 && <Separator className="my-4" />}

                <Collapsible open={isExpanded} onOpenChange={() => toggleChargement(chargement.id)}>
                  {/* Chargement Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <h3 className="font-semibold">{chargement.name}</h3>
                        {statusToBadge(chargement.status)}
                      </div>

                      <div className="text-muted-foreground space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>
                            Créé le{' '}
                            {format(new Date(chargement.createdAt), 'dd MMM yyyy à HH:mm', {
                              locale: fr,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="h-3 w-3" />
                          <span>
                            {chargement.livraisons.length} livraison
                            {chargement.livraisons.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  {/* Chargement Details */}
                  <CollapsibleContent className="mt-4">
                    <div className="bg-muted/50 space-y-4 rounded-lg border p-4">
                      {/* Livraisons List */}
                      <div>
                        <h4 className="mb-3 text-sm font-semibold">Livraisons</h4>
                        <div className="space-y-2">
                          {chargement.livraisons.map((livraison) => (
                            <div
                              key={livraison.id}
                              className="bg-background flex items-center justify-between rounded-md border p-3"
                            >
                              <div className="flex-1">
                                <div className="mb-1 flex items-center gap-2">
                                  <span className="font-medium">{livraison.name}</span>
                                  {statusToBadge(livraison.status)}
                                </div>
                                <div className="text-muted-foreground text-sm">
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-3 w-3" />
                                    <span>
                                      {livraison.commande.client?.name || 'Client inconnu'} -{' '}
                                      {livraison.commande.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* History */}
                      {/* {chargement.history && chargement.history.length > 0 && (
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                            <History className="h-4 w-4" />
                            Historique des actions
                          </h4>
                          <div className="space-y-2">
                            {chargement.history.map((historyItem) => (
                              <div
                                key={historyItem.id}
                                className="bg-background flex items-start gap-3 rounded-md border p-3 text-sm"
                              >
                                <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-600" />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium capitalize">
                                      {historyItem.action.replace('_', ' ')}
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                      {format(new Date(historyItem.timestamp), 'dd/MM à HH:mm', {
                                        locale: fr,
                                      })}
                                    </span>
                                  </div>
                                  <p className="text-muted-foreground">
                                    Par {historyItem.user.name}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )} */}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
