'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getQueryParams, useCommandeFilters } from './use-commande-filters';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';
import { useTRPC } from '@/trpc/client';
import { CommandesTable } from './table/commandes-table';
import { FilterSheet } from './filter-sheet';
import { TrpcCommande } from '@/types/trpc-types';
import CommandeItems from './commande-items';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, RefreshCcw } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';

export default function CommandesComponent() {
  const { setBreadcrumb } = useBreadcrumb();
  const filters = useCommandeFilters();
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 500);

  // Update the URL search parameter when debounced value changes
  useEffect(() => {
    filters.setSearch(debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    setBreadcrumb([], 'Commandes');
  }, [setBreadcrumb]);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const trpc = useTRPC();

  // Get commandes with filters
  const { data: commandesData, isPending } = useQuery(
    trpc.commandes.getCommandes.queryOptions(getQueryParams(filters)),
  );

  const commandes = commandesData?.commandes || [];
  const pagination = commandesData?.pagination;

  return (
    <div className="m-2 flex h-[98%] min-h-0 flex-col gap-2">
      <Card className="flex min-h-0 flex-1 flex-col rounded-sm">
        <CardHeader className="mb-2 flex flex-row items-center justify-between">
          <CardTitle>Commandes</CardTitle>
          <div className="flex items-center gap-2">
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
            <Button variant="outline" size="icon">
              <RefreshCcw />
            </Button>
          </div>
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

        <Card className="flex min-h-0 flex-col rounded-sm">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Détails</CardTitle>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-y-auto">
            <div className="text-muted-foreground flex h-full items-center justify-center">
              Sélectionnez une commande pour voir les détails
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
