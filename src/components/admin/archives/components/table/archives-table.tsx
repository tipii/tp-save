import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmptyState } from './empty-state';
import { ArchiveRow } from './archive-row';
import { Pagination } from './pagination';
import { ArchiveFiltersActions } from '../../hooks/use-archive-filters';
import { TrpcArchivedChargement } from '@/types/trpc-types';
import { ArchivesTableSkeleton } from './skeleton';
import { Calendar, Package, Truck, User } from 'lucide-react';

export interface ArchivesTableProps {
  chargements: TrpcArchivedChargement[];
  filters: ArchiveFiltersActions & {
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

export function ArchivesTable({
  chargements,
  filters,
  pagination,
  isPending,
  refetch,
}: ArchivesTableProps) {
  if (isPending) {
    return <ArchivesTableSkeleton />;
  }

  if (chargements.length === 0) {
    return <EmptyState hasActiveFilters={filters.hasActiveFilters} />;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-green-50">
              <TableHead>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-green-600" />
                  <span>Nom</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span>Livreur</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-purple-600" />
                  <span>Livraisons</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span>Date création</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span>Date livraison</span>
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b">
            {chargements.map((chargement) => (
              <ArchiveRow key={chargement.id} chargement={chargement} refetch={refetch} />
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="border-t bg-background p-4">
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
