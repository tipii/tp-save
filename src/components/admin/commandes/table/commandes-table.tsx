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
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
            <TableHead>Nom</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Bon Préparation</TableHead>
            <TableHead>Bon Livraison</TableHead>
            <TableHead>Livraison(s)</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Articles totaux</TableHead>
            <TableHead>Date création</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-b">
          {commandes.map((commande) => (
            <CommandeRow key={commande.id} commande={commande} />
          ))}
        </TableBody>
      </Table>

      <div className="px-6 pb-6">
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
