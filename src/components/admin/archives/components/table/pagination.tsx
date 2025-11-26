import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    page: number;
    limit: number;
    setPage: (page: number) => void;
  };
}

export function Pagination({ pagination, filters }: PaginationProps) {
  const { currentPage, totalPages, totalCount, hasNextPage, hasPrevPage } = pagination;

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Page {currentPage} sur {totalPages} ({totalCount} résultat{totalCount > 1 ? 's' : ''})
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => filters.setPage(currentPage - 1)}
          disabled={!hasPrevPage}
        >
          <ChevronLeft className="h-4 w-4" />
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => filters.setPage(currentPage + 1)}
          disabled={!hasNextPage}
        >
          Suivant
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
