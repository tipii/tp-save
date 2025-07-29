'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { statusToBadge } from '@/components/ui/enum-to-ui';
import { Truck, User } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { Status } from '@/generated/prisma';

export default function DeliveringLivraisonsSection() {
  const trpc = useTRPC();

  const { data: deliveringLivraisons, isLoading } = useQuery(
    trpc.dashboard.getLivraisonsByStatus.queryOptions(
      { status: Status.DELIVERING },
      {
        staleTime: 1000 * 60,
      },
    ),
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Livraisons en cours
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-[300px] overflow-y-auto">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse rounded-lg border p-3">
                <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-3 w-1/2 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Livraisons en cours
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-y-auto">
        <div className="space-y-3">
          {deliveringLivraisons?.map((livraison) => (
            <div
              key={livraison.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {livraison.commande.client?.name}
                  </span>
                  {statusToBadge(livraison.status)}
                </div>
                <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                  {livraison.chargement?.livreur && (
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{livraison.chargement.livreur.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {(!deliveringLivraisons || deliveringLivraisons.length === 0) && (
            <div className="py-6 text-center text-gray-500">
              <Truck className="mx-auto mb-2 h-8 w-8 text-gray-300" />
              <p>Aucun chargement en livraison</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
