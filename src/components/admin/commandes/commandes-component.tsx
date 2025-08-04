'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getQueryParams, useCommandeFilters } from './use-commande-filters';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';
import { useTRPC } from '@/trpc/client';
import { CommandesTable } from './table/commandes-table';
import { CommandeFilters } from './commande-filters';
import { TrpcCommande } from '@/types/trpc-types';
import CommandeItems from './commande-items';

export default function CommandesComponent() {
  const { setBreadcrumb } = useBreadcrumb();

  // Use the filters hook
  const filters = useCommandeFilters();

  useEffect(() => {
    setBreadcrumb([], 'Commandes');
  }, [setBreadcrumb]);

  const trpc = useTRPC();

  // Get commandes with filters
  const { data: commandesData, isPending } = useQuery(
    trpc.commandes.getCommandes.queryOptions(getQueryParams(filters)),
  );

  const [selectedCommande, setSelectedCommande] = useState<TrpcCommande | null>(null);
  const commandes = commandesData?.commandes || [];
  const pagination = commandesData?.pagination;

  return (
    <div className="m-2 flex h-[98%] min-h-0 flex-col gap-2">
      <Card className="flex min-h-0 flex-1 flex-col rounded-sm">
        <CardHeader className="flex-shrink-0">
          <CardTitle>Commandes</CardTitle>
        </CardHeader>
        <CardContent className="min-h-0 flex-1">
          <CommandesTable commandes={commandes} filters={filters} pagination={pagination} />
        </CardContent>
      </Card>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">
        <Card className="flex min-h-0 flex-col rounded-sm">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-y-auto">
            <CommandeItems />
          </CardContent>
        </Card>

        <CommandeFilters pagination={pagination} />
      </div>
    </div>
  );
}
