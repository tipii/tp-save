'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { getQueryParams, useCommandeFilters } from './use-commande-filters';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';
import { useTRPC } from '@/trpc/client';
import { CommandesTable } from './table/commandes-table';
import { CommandeFilters } from './commande-filters';

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

  const commandes = commandesData?.commandes || [];
  const pagination = commandesData?.pagination;

  return (
    <div className="flex h-full flex-col gap-2">
      <Card className="h-1/2 rounded-sm">
        <CardHeader>
          <CardTitle>Commandes</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto">
          <CommandesTable commandes={commandes} filters={filters} pagination={pagination} />
        </CardContent>
      </Card>
      <div className="grid h-1/2 grid-cols-2 gap-2">
        <Card className="col-span-1 rounded-sm">
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
        </Card>

        <CommandeFilters pagination={pagination} />
      </div>
    </div>
  );
}
