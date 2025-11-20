'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getQueryParams, useCommandeFilters } from '../hooks/use-commande-filters';
import { useBreadcrumb } from '../../shared/breadcrumb/breadcrumb-context';
import { useTRPC } from '@/trpc/client';
import { CommandesTable } from './table/commandes-table';
import { FilterSheet } from './filter-sheet';
import CommandeItems from './commande-items';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, RefreshCcw } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import CommandeDetailsNew from './commande-details';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CommandesComponent() {
  const { setBreadcrumb } = useBreadcrumb();
  const filters = useCommandeFilters();
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 500);

  // Update the URL search parameter when debounced value changes
  useEffect(() => {
    filters.setSearch(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    setBreadcrumb([], 'Commandes');
  }, [setBreadcrumb]);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const trpc = useTRPC();

  // Get commandes with filters
  const {
    data: commandesData,
    isPending,
    refetch,
  } = useQuery(
    trpc.commandes.getCommandes.queryOptions(getQueryParams(filters), {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 10, // 10 seconds
      refetchIntervalInBackground: true,
    }),
  );

  const { mutate: syncBonsFromSage, isPending: isSyncingBonsFromSage } = useMutation(
    trpc.trigger.syncBonsFromSage.mutationOptions({
      onSuccess: ({ success }) => {
        if (success) {
          toast.success('Commandes synchronisées avec succès');
        } else {
          toast.error('Erreur lors de la synchronisation des commandes');
        }
        refetch();
      },
    }),
  );

  const commandes = commandesData?.commandes || [];
  const pagination = commandesData?.pagination;

  return (
    <div className="m-2 flex h-[98%] min-h-0 flex-col gap-2">
      <Card className="flex min-h-0 flex-1 flex-col rounded-sm">
        <CardHeader className="mb-2 flex flex-row items-center justify-between">
          <CardTitle>Commandes</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="yellow" asChild>
                <Link href="/app/commandes?noExpectedDeliveryDate=true"> En attente</Link>
              </Badge>
              <Badge variant="orange" asChild>
                <Link href="/app/commandes?expectedDeliveryDatePassed=true">En retard</Link>
              </Badge>
            </div>
            <Input
              type="text"
              placeholder="Rechercher"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <FilterSheet pagination={pagination}>
              <Button variant="outline" size="icon">
                <Filter />
              </Button>
            </FilterSheet>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                syncBonsFromSage({});
                console.log('syncBonsFromSage');
              }}
              disabled={isSyncingBonsFromSage}
              className={cn(isSyncingBonsFromSage && 'animate-pulse')}
            >
              <RefreshCcw className={cn(isSyncingBonsFromSage && 'animate-spin')} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="min-h-0 flex-1">
          <CommandesTable
            commandes={commandes}
            filters={filters}
            pagination={pagination}
            isPending={isPending}
          />
        </CardContent>
      </Card>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">
        <Card className="flex min-h-0 flex-col rounded-sm">
          {/* <CardHeader className="shrink-0">
            <CardTitle>Items</CardTitle>
          </CardHeader> */}
          <CardContent className="min-h-0 flex-1 overflow-y-auto">
            <CommandeItems />
          </CardContent>
        </Card>

        <Card className="flex min-h-0 flex-col rounded-sm">
          {/* <CardHeader className="shrink-0">
            <CardTitle>Détails</CardTitle>
          </CardHeader> */}
          <CardContent className="min-h-0 flex-1 overflow-y-auto">
            <CommandeDetailsNew refetch={refetch} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
