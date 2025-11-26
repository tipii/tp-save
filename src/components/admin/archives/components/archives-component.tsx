'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getQueryParams, useArchiveFilters } from '../hooks/use-archive-filters';
import { useBreadcrumb } from '../../shared/breadcrumb/breadcrumb-context';
import { useTRPC } from '@/trpc/client';
import { ArchivesTable } from './table/archives-table';
import { FilterSheet } from './filter-sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';
import { ArchiveProvider } from '../context/archive-context';
import { ChargementDetails } from './chargement-details';
import { ChargementLivraisons } from './chargement-livraisons';
import { Badge } from '@/components/ui/badge';

export default function ArchivesComponent() {
  const { setBreadcrumb } = useBreadcrumb();
  const filters = useArchiveFilters();
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 500);

  // Update the URL search parameter when debounced value changes
  useEffect(() => {
    filters.setSearch(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    setBreadcrumb([], 'Archives');
  }, [setBreadcrumb]);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const trpc = useTRPC();

  // Get archived chargements with filters
  const {
    data: archivesData,
    isPending,
    refetch,
  } = useQuery(
    trpc.chargements.getArchivedChargements.queryOptions(getQueryParams(filters), {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 30, // 30 seconds (archives change less frequently)
      refetchIntervalInBackground: true,
    }),
  );

  const chargements = archivesData?.chargements || [];
  const pagination = archivesData?.pagination;

  return (
    <ArchiveProvider>
      <div className="m-2 flex h-[98%] min-h-0 flex-col gap-2">
        <Card className="flex min-h-0 flex-1 flex-col rounded-sm">
          <CardHeader className="mb-2 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Archives</CardTitle>
              {pagination && (
                <Badge variant="outline" className="text-xs">
                  {pagination.totalCount} chargement{pagination.totalCount > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Rechercher (nom, livreur, réf commande, client)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-80"
              />
              <FilterSheet pagination={pagination}>
                <Button variant="outline" size="icon">
                  <Filter />
                </Button>
              </FilterSheet>
            </div>
          </CardHeader>
          <CardContent className="min-h-0 flex-1">
            <ArchivesTable
              chargements={chargements}
              filters={filters}
              pagination={pagination}
              isPending={isPending}
              refetch={refetch}
            />
          </CardContent>
        </Card>

        <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">
          <Card className="flex min-h-0 flex-col rounded-sm">
            <CardContent className="min-h-0 flex-1 overflow-y-auto">
              <ChargementLivraisons />
            </CardContent>
          </Card>

          <Card className="flex min-h-0 flex-col rounded-sm">
            <CardContent className="min-h-0 flex-1 overflow-y-auto">
              <ChargementDetails refetch={refetch} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ArchiveProvider>
  );
}
