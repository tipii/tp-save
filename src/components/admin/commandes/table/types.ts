import { type CommandeFiltersActions } from '../use-commande-filters';
import { type TrpcCommande, type TrpcLivraisonFromCommande } from '@/types/trpc-types';

export interface Commande {
  id: string;
  ref: string;
  clientName: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
  priority: 'URGENT' | 'NORMAL' | 'ILES';
  status: 'pending' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  lots: Livraison[];
}

export interface Livraison {
  id: string;
  ref: string;
  priority: 'URGENT' | 'NORMAL' | 'ILES';
  status: 'pending' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  items: Livraisontem[];
  createdAt: Date;
  updatedAt: Date;
}

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
}

export interface CommandeRowProps {
  commande: TrpcCommande;
  isExpanded: boolean;
  onToggle: (commandeId: string) => void;
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
  };
}

export interface EmptyStateProps {
  hasActiveFilters: boolean;
}
