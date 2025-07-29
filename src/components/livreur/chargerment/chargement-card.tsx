import { TrpcLivreurChargmenent } from '@/types/trpc-types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import React, { useState } from 'react';
import { Item } from '@/types/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ChevronDown,
  MapPin,
  Truck,
  Package,
  Phone,
  User,
  Hash,
  Clock,
  X,
  Check,
  PackageX,
} from 'lucide-react';
import { statusToBadge, statusToTailwindColor } from '@/components/ui/enum-to-ui';
import { Status } from '@/generated/prisma';
import ButtonPriseEnCharge from './action-buttons/button-prise-en-charge';
import ButtonTransfert from './action-buttons/button-transfert';
import { Button } from '@/components/ui/button';
import ButtonLivraisonDeliver from './action-buttons/button-livraison-deliver';
import ButtonLivraisonToReturn from './action-buttons/button-livraison-to-return';
import ButtonLivraisonReturnDepot from './action-buttons/button-livraison-return-depot';
import ButtonArticlesReturn from './action-buttons/button-articles-return';

export default function ChargementCard({ chargement }: { chargement: TrpcLivreurChargmenent }) {
  const [openLivraisons, setOpenLivraisons] = useState<string[]>([]);

  const toggleLivraison = (id: string) => {
    setOpenLivraisons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const totalItems = chargement.livraisons.reduce((total, livraison) => {
    const items = (livraison.items as Item[]) || [];
    return total + items.length;
  }, 0);

  // Priority-based sorting for delivery workflow
  const getStatusPriority = (status: Status): number => {
    const priorities = {
      [Status.DELIVERING]: 1, // Currently being delivered - highest priority
      [Status.TO_RETURN]: 2, // Needs to be returned to depot
      [Status.READY]: 3, // Ready to be picked up/delivered
      [Status.PENDING]: 4, // Waiting to be ready
      [Status.MIXED]: 5, // Mixed status - complex state
      [Status.DELIVERED]: 6, // Successfully completed
      [Status.RETURNED]: 7, // Returned to depot
      [Status.CANCELLED]: 8, // Cancelled - lowest priority
    };
    return priorities[status] || 999; // Default for unknown status
  };

  const sortedLivraisons = chargement.livraisons.sort((a, b) => {
    const priorityA = getStatusPriority(a.status);
    const priorityB = getStatusPriority(b.status);

    // Primary sort: by status priority
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    // Secondary sort: by creation date (newest first) for same priority
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  const deliveredCount = sortedLivraisons.filter((l) => l.status === 'DELIVERED').length;

  return (
    <Card className="overflow-hidden bg-white">
      {/* Header */}
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">{chargement.name}</CardTitle>
          {statusToBadge(chargement.status)}
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-0">
        {/* Quick Stats */}
        <div className="my-3 grid grid-cols-3 gap-4 border-t border-b border-blue-100 py-3">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">{chargement.livraisons.length}</div>
            <div className="text-xs text-gray-500">Livraisons</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">{deliveredCount}</div>
            <div className="text-xs text-gray-500">Livrées</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">{totalItems}</div>
            <div className="text-xs text-gray-500">Articles</div>
          </div>
        </div>

        <div className="space-y-1">
          {sortedLivraisons.map((livraison, index) => {
            const items = (livraison.items as Item[]) || [];
            const statusColors = statusToTailwindColor(livraison.status);
            const isOpen = openLivraisons.includes(livraison.id);

            return (
              <div key={livraison.id} className="border-b border-gray-100 bg-white last:border-b-0">
                {/* Livraison Header */}
                <div
                  className={`cursor-pointer p-4 transition-colors hover:bg-gray-50 ${statusColors.background}/20 border-l-4 ${statusColors.border}`}
                  onClick={() => toggleLivraison(livraison.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 flex-shrink-0 text-gray-500" />
                        <span className="truncate font-medium text-gray-900">
                          {livraison.commande?.client?.name || 'Client inconnu'}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          <span>
                            {items.length} article{items.length > 1 ? 's' : ''}
                          </span>
                        </div>
                        {livraison.commande?.ref && (
                          <div className="flex items-center gap-1">
                            <Hash className="h-3 w-3" />
                            <span className="font-mono text-xs">{livraison.commande.ref}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {statusToBadge(livraison.status)}
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Livraison Details */}
                <Collapsible open={isOpen}>
                  <CollapsibleContent className="py-2">
                    <div className="space-y-3 bg-gray-50/50 px-4 pb-4">
                      {/* Client Info */}
                      <div className="rounded-lg border bg-white p-3">
                        <div className="mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            Informations client
                          </span>
                        </div>

                        <div className="space-y-1 text-sm">
                          {livraison.commande?.client?.contactPerson && (
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-gray-400" />
                              <span>{livraison.commande.client.contactPerson}</span>
                            </div>
                          )}

                          {livraison.commande?.client?.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <a
                                href={`tel:${livraison.commande.client.phone}`}
                                className="text-blue-600 hover:underline"
                              >
                                {livraison.commande.client.phone}
                              </a>
                            </div>
                          )}

                          {livraison.commande?.client?.phoneSecond && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <a
                                href={`tel:${livraison.commande.client.phoneSecond}`}
                                className="text-blue-600 hover:underline"
                              >
                                {livraison.commande.client.phoneSecond}
                              </a>
                            </div>
                          )}

                          {livraison.commande?.client?.address && (
                            <div className="flex items-start gap-2">
                              <MapPin className="mt-0.5 h-3 w-3 text-gray-400" />
                              <span className="text-gray-600">
                                {livraison.commande.client.address}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Items */}
                      {items.length > 0 && (
                        <div className="rounded-lg border bg-white p-3">
                          <div className="mb-3 flex items-center gap-2">
                            <Package className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">
                              Articles ({items.length})
                            </span>
                          </div>

                          <div className="space-y-2">
                            {items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-center justify-between rounded border bg-gray-50 p-2"
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="truncate text-sm font-medium text-gray-900">
                                    {item.DL_Design}
                                  </div>
                                  <div className="font-mono text-xs text-gray-500">
                                    {item.AR_REF}
                                  </div>
                                </div>
                                <div className="ml-2 flex items-center">
                                  <Badge variant="outline" className="text-xs">
                                    {item.DL_QTEBL}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {livraison.status === Status.DELIVERING && (
                        <div className="flex flex-col gap-2">
                          <ButtonLivraisonDeliver
                            livraisonId={livraison.id}
                            toggleLivraison={() => toggleLivraison(livraison.id)}
                          />
                          <ButtonArticlesReturn
                            livraisonId={livraison.id}
                            items={items}
                            chargementId={chargement.id}
                            toggleLivraison={() => toggleLivraison(livraison.id)}
                          />
                          <ButtonLivraisonToReturn
                            livraisonId={livraison.id}
                            toggleLivraison={() => toggleLivraison(livraison.id)}
                          />
                        </div>
                      )}
                      {livraison.status === Status.TO_RETURN && (
                        <div className="flex flex-col gap-2">
                          <ButtonLivraisonReturnDepot
                            livraisonId={livraison.id}
                            toggleLivraison={() => toggleLivraison(livraison.id)}
                          />
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            );
          })}
        </div>
      </CardContent>

      {/* Footer */}
      {chargement.status === Status.READY && (
        <CardFooter className="flex flex-col gap-2 border-t p-4">
          <ButtonPriseEnCharge />
          <ButtonTransfert />
        </CardFooter>
      )}
    </Card>
  );
}
