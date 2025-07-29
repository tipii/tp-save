'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { statusToBadge } from '@/components/ui/enum-to-ui';
import { RotateCcw, MapPin, Calendar } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { Status } from '@/generated/prisma';

export default function ReturnsLivraisonsSection() {
  const trpc = useTRPC();

  const { data: returnedLivraisons, isLoading } = useQuery(
    trpc.dashboard.getLivraisonsByStatus.queryOptions(
      { status: Status.RETURNED },
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
            <RotateCcw className="h-5 w-5" />
            Derniers retours
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
          <RotateCcw className="h-5 w-5" />
          Derniers retours
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-y-auto">
        <div className="space-y-3">
          {returnedLivraisons?.map((livraison) => (
            <div
              key={livraison.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {livraison.commande?.client?.name || 'Client inconnu'}
                  </span>
                  {statusToBadge(livraison.status)}
                </div>
                <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{livraison.commande?.ref}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(livraison.updatedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {(!returnedLivraisons || returnedLivraisons.length === 0) && (
            <div className="py-6 text-center text-gray-500">
              <RotateCcw className="mx-auto mb-2 h-8 w-8 text-gray-300" />
              <p>Aucun retour récent</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
