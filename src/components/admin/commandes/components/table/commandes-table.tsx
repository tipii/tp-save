import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from './empty-state';
import { CommandeRow } from './commande-row';
import { Pagination } from './pagination';
import { CommandeFiltersActions } from '../../hooks/use-commande-filters';
import { TrpcCommande } from '@/types/trpc-types';
import { CommandesTableSkeleton } from './skeleton';
import { FileText, User, Flag, Activity, Calendar, Check, Ship } from 'lucide-react';

export interface CommandesTableProps {
  commandes: TrpcCommande[];
  filters: CommandeFiltersActions & {
    hasActiveFilters: boolean;
    page: number;
    limit: number;
  };
  pagination?: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  isPending: boolean;
  refetch: () => void;
}

export function CommandesTable({
  commandes,
  filters,
  pagination,
  isPending,
  refetch,
}: CommandesTableProps) {
  if (isPending) {
    return <CommandesTableSkeleton />;
  }

  if (commandes.length === 0) {
    return <EmptyState hasActiveFilters={filters.hasActiveFilters} />;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <TableHead>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Ref</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-indigo-600" />
                  <span>Client</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-red-600" />
                  <span>Priorité</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-600" />
                  <span>Statut</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span>Date livr. prévue</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Date livr. réelle</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Ship className="h-4 w-4 text-cyan-600" />
                  <span>Expé. Île</span>
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b">
            {commandes.map((commande) => (
              <CommandeRow key={commande.id} commande={commande} refetch={refetch} />
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="bg-background border-t p-4">
          <Pagination
            pagination={pagination}
            filters={{
              page: filters.page,
              limit: filters.limit,
              setPage: filters.setPage,
            }}
          />
        </div>
      )}
    </div>
  );
}
