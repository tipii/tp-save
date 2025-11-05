'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { Package, Calendar, User, Truck, MapPin, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { priorityToBadge, statusToBadge } from '@/components/ui/enum-to-ui';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Item } from '@/types/types';

interface LivraisonReadOnlyInfoProps {
  commandeId: string;
}

export function LivraisonReadOnlyInfo({ commandeId }: LivraisonReadOnlyInfoProps) {
  const trpc = useTRPC();
  const [expandedLivraisons, setExpandedLivraisons] = useState<Set<string>>(new Set());

  // Fetch commande data with livraisons
  const { data: commande, isLoading } = useQuery(
    trpc.commandes.getCommandeById.queryOptions({ id: commandeId }),
  );

  const toggleLivraison = (id: string) => {
    setExpandedLivraisons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Informations Livraisons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-center">Chargement...</div>
        </CardContent>
      </Card>
    );
  }

  const livraisons = commande?.livraisons || [];

  if (livraisons.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Informations Livraisons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex flex-col items-center justify-center py-8">
            <Package className="mb-2 h-8 w-8 opacity-50" />
            <p className="text-sm">Aucune livraison</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations Livraisons</CardTitle>
        <CardDescription>
          Détails des {livraisons.length} livraison{livraisons.length > 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {livraisons.map((livraison, index) => (
            <div key={livraison.id}>
              {index > 0 && <Separator className="my-4" />}

              {/* Livraison Header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">{livraison.name || `Livraison ${index + 1}`}</h3>

                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">Statut</span>
                    <span className="font-medium">{statusToBadge(livraison.status)}</span>
                    <span className="text-muted-foreground flex items-center gap-2">Priorité</span>
                    <span className="font-medium">{priorityToBadge(livraison.priority)}</span>
                  </div>
                </div>
              </div>

              {/* Priority & Status */}

              {/* Dates */}
              <div className="mb-4 space-y-2">
                {livraison.expectedDeliveryDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Livraison prévue:</span>
                    <span className="font-medium">
                      {format(new Date(livraison.expectedDeliveryDate), 'dd MMM yyyy', {
                        locale: fr,
                      })}
                    </span>
                  </div>
                )}

                {livraison.deliveryDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Livré le:</span>
                    <span className="font-medium">
                      {format(new Date(livraison.deliveryDate), 'dd MMM yyyy', { locale: fr })}
                    </span>
                  </div>
                )}
              </div>

              {/* Livreur Info */}
              {livraison.livreur && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Livreur:</span>
                    <span className="font-medium">{livraison.livreur.name}</span>
                  </div>
                </div>
              )}

              {/* Chargement Info */}
              {livraison.chargement && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Chargement:</span>
                    <span className="font-medium">{livraison.chargement.name}</span>
                  </div>
                </div>
              )}

              {/* Delivery Mode */}
              {livraison.deliveryMode && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Mode:</span>
                    <span className="font-medium">{livraison.deliveryMode}</span>
                  </div>
                </div>
              )}

              {/* Bon Livraison */}
              {livraison.bonLivraison && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Bon:</span>
                    <span className="font-medium">{livraison.bonLivraison}</span>
                  </div>
                </div>
              )}

              {/* Items Section - Collapsible */}
              <div className="mb-4">
                <Collapsible
                  open={expandedLivraisons.has(livraison.id)}
                  onOpenChange={() => toggleLivraison(livraison.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground">Articles:</span>
                      <span className="font-medium">
                        {Array.isArray(livraison.items) ? livraison.items.length : 0} article
                        {Array.isArray(livraison.items) && livraison.items.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    {Array.isArray(livraison.items) && livraison.items.length > 0 && (
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {expandedLivraisons.has(livraison.id) ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              <span className="ml-1 text-xs">Masquer</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              <span className="ml-1 text-xs">Voir les articles</span>
                            </>
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    )}
                  </div>

                  <CollapsibleContent className="mt-3">
                    {Array.isArray(livraison.items) && livraison.items.length > 0 ? (
                      <div className="rounded-lg border">
                        <Table className="w-full max-w-full table-fixed">
                          <TableHeader>
                            <TableRow className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                              <TableHead className="w-24">Ref</TableHead>
                              <TableHead>Designation</TableHead>
                              <TableHead className="w-24">Quantité</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="border-b">
                            {(livraison.items as Item[])?.map((item: Item, itemIndex: number) => (
                              <TableRow key={itemIndex}>
                                <TableCell className="w-24">{item.AR_REF}</TableCell>
                                <TableCell className="break-words whitespace-normal">
                                  {item.DL_Design}
                                </TableCell>
                                <TableCell className="w-24">{item.DL_QTEBL}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-muted-foreground flex items-center justify-center py-4">
                        <span className="text-sm">Aucun article dans cette livraison</span>
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Notes */}
              {livraison.notes && (
                <div className="bg-muted rounded-md p-3">
                  <p className="text-muted-foreground mb-1 text-xs font-medium">Notes:</p>
                  <p className="text-sm">{livraison.notes}</p>
                </div>
              )}

              {/* Reception Info */}
              {livraison.receptionInfo && (
                <div className="bg-muted rounded-md p-3">
                  <p className="text-muted-foreground mb-1 text-xs font-medium">Info réception:</p>
                  <p className="text-sm">{livraison.receptionInfo}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
