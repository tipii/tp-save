'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';
import { FileText } from 'lucide-react';
import { useCommandeFilters, getQueryParams } from './use-commande-filters';
import { CommandeFilters } from './commande-filters';
import { CommandesTable } from './table/commandes-table';

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
    <div className="flex flex-col gap-6">
      {/* Filters Section */}
      <CommandeFilters filters={filters} pagination={pagination} />

      {/* Results Section */}
      <div className="bg-background border shadow-sm">
        <div className="bg-muted/30 border-b px-6 py-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="h-5 w-5" />
            Commandes trouvées
            {pagination && (
              <span className="text-muted-foreground text-sm font-normal">
                (Page {pagination.currentPage} sur {pagination.totalPages})
              </span>
            )}
          </h2>
        </div>
        <div className="p-6">
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
        </div>
      </div>
    </div>
  );
}
