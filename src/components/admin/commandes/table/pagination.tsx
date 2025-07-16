import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type PaginationProps } from './types';

export function Pagination({ pagination, filters }: PaginationProps) {
  if (pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground text-sm">
        Affichage de {(filters.page - 1) * filters.limit + 1} à{' '}
        {Math.min(filters.page * filters.limit, pagination.totalCount)} sur {pagination.totalCount}{' '}
        résultats
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => filters.setPage(filters.page - 1)}
          disabled={!pagination.hasPrevPage}
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>
        <span className="text-sm">
          Page {pagination.currentPage} sur {pagination.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => filters.setPage(filters.page + 1)}
          disabled={!pagination.hasNextPage}
        >
          Suivant
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
