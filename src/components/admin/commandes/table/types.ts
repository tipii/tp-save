import { type CommandeFiltersActions } from '../use-commande-filters';
import { type TrpcCommande, type TrpcLivraisonFromCommande } from '@/types/trpc-types';

export interface Livraisontem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface CommandeFilters {
  search: string;
  client: string;
  priority: string;
  status: string;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ExpandedRowProps {
  commande: TrpcCommande;
}

export interface CommandSummaryProps {
  commande: TrpcCommande;
}

export interface PaginationProps {
  pagination: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    page: number;
    limit: number;
    setPage: (page: number) => void;
    setLimit?: (limit: number) => void;
  };
}

export interface EmptyStateProps {
  hasActiveFilters: boolean;
}
