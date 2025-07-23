'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';
import { FileText } from 'lucide-react';
import { useCommandeFilters, getQueryParams } from './use-commande-filters';
import { CommandeFilters } from './commande-filters';
import { CommandesTable } from './table/commandes-table';
import { Pagination } from './table/pagination';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CommandePage() {
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
    <div className="flex flex-col">
      {/* Filters Section */}
      <CommandeFilters pagination={pagination} />

      {/* Results Section */}
      <Card className="m-4 gap-0 rounded-sm">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">Commandes trouvées</h3>
            <Badge variant="secondary" className="bg-slate-200 text-slate-700">
              Page 1 sur 2
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isPending ? (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
                <p className="text-muted-foreground mt-2 text-sm">Chargement des commandes...</p>
              </div>
            </div>
          ) : (
            <CommandesTable commandes={commandes} filters={filters} pagination={pagination} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
