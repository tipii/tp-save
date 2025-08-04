import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type CommandesTableProps } from './types';
import { EmptyState } from './empty-state';
import { CommandeRow } from './commande-row';
import { Pagination } from './pagination';

export function CommandesTable({ commandes, filters, pagination }: CommandesTableProps) {
  if (commandes.length === 0) {
    return <EmptyState hasActiveFilters={filters.hasActiveFilters} />;
  }

  return (
    <div className="flex h-full flex-col space-y-4">
      <Table className="min-h-0 flex-1 overflow-y-auto">
        <TableHeader className="sticky top-0 z-10">
          <TableRow className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
            <TableHead>Nom</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Bon Préparation</TableHead>
            <TableHead>Bon Livraison</TableHead>
            <TableHead>Livraison(s)</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Articles totaux</TableHead>
            <TableHead>Date création</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {commandes.map((commande) => (
            <CommandeRow key={commande.id} commande={commande} />
          ))}
        </TableBody>
      </Table>

      <div className="">
        {pagination && (
          <Pagination
            pagination={pagination}
            filters={{
              page: filters.page,
              limit: filters.limit,
              setPage: filters.setPage,
            }}
          />
        )}
      </div>
    </div>
  );
}
