import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type CommandesTableProps } from './types';
import { EmptyState } from './empty-state';
import { CommandeRow } from './commande-row';
import { Pagination } from './pagination';

export function CommandesTable({ commandes, filters, pagination }: CommandesTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (commandeId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commandeId)) {
        newSet.delete(commandeId);
      } else {
        newSet.add(commandeId);
      }
      return newSet;
    });
  };

  if (commandes.length === 0) {
    return <EmptyState hasActiveFilters={filters.hasActiveFilters} />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Bon Préparation</TableHead>
              <TableHead>Bon Livraison</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Livraison(s)</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Articles totaux</TableHead>
              <TableHead>Date création</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commandes.map((commande) => (
              <CommandeRow
                key={commande.id}
                commande={commande}
                isExpanded={expandedRows.has(commande.id)}
                onToggle={toggleRow}
              />
            ))}
          </TableBody>
        </Table>
      </div>

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
  );
}
