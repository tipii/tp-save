'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { statusToBadge } from '@/components/ui/enum-to-ui';
import { Package, Calendar } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function RecentCommandsSection() {
  const trpc = useTRPC();

  const { data: recentCommandes, isLoading } = useQuery(
    trpc.commandes.getDashboardCommandes.queryOptions(undefined, {
      staleTime: 1000 * 60,
    }),
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Dernières Commandes Reçues
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
          <Package className="h-5 w-5" />
          Dernières Commandes Reçues
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-y-auto">
        <div className="space-y-3">
          {recentCommandes?.map((commande) => (
            <Link
              key={commande.id}
              href={`/app/commandes/${commande.id}`}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{commande.ref}</span>
                  <Badge variant="outline" className="text-xs">
                    {commande.client?.name}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {new Date(commande.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {commande.livraisons[0] && statusToBadge(commande.livraisons[0].status)}
              </div>
            </Link>
          ))}
          {(!recentCommandes || recentCommandes.length === 0) && (
            <div className="py-6 text-center text-gray-500">
              <Package className="mx-auto mb-2 h-8 w-8 text-gray-300" />
              <p>Aucune commande récente</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
