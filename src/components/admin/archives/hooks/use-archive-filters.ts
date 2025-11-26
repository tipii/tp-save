import { useQueryState, parseAsString, parseAsInteger } from 'nuqs';

export interface ArchiveFilters {
  search: string;
  livreurId: string;
  dateFrom: string;
  dateTo: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  limit: number;
}

export interface ArchiveFiltersActions {
  setSearch: (value: string) => void;
  setLivreurId: (value: string) => void;
  setDateFrom: (value: string) => void;
  setDateTo: (value: string) => void;
  setSortBy: (value: string) => void;
  setSortOrder: (value: string) => void;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function useArchiveFilters(): ArchiveFilters & ArchiveFiltersActions {
  // URL state management with nuqs
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [livreurId, setLivreurId] = useQueryState('livreurId', parseAsString.withDefault('all'));
  const [dateFrom, setDateFrom] = useQueryState('dateFrom', parseAsString.withDefault(''));
  const [dateTo, setDateTo] = useQueryState('dateTo', parseAsString.withDefault(''));
  const [sortBy, setSortBy] = useQueryState('sortBy', parseAsString.withDefault('updatedAt'));
  const [sortOrder, setSortOrder] = useQueryState('sortOrder', parseAsString.withDefault('desc'));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(20));

  // Wrapper functions that reset page to 1 when filters change
  const setSearchWithPageReset = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const setLivreurIdWithPageReset = (value: string) => {
    setLivreurId(value);
    setPage(1);
  };

  const setDateFromWithPageReset = (value: string) => {
    setDateFrom(value);
    setPage(1);
  };

  const setDateToWithPageReset = (value: string) => {
    setDateTo(value);
    setPage(1);
  };

  const setSortByWithPageReset = (value: string) => {
    setSortBy(value);
    setPage(1);
  };

  const setSortOrderWithPageReset = (value: string) => {
    setSortOrder(value);
    setPage(1);
  };

  const setLimitWithPageReset = (value: number) => {
    setLimit(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setLivreurId('all');
    setDateFrom('');
    setDateTo('');
    setSortBy('updatedAt');
    setSortOrder('desc');
    setPage(1);
  };

  const hasActiveFilters = !!search || livreurId !== 'all' || !!dateFrom || !!dateTo;

  return {
    // Filter values
    search,
    livreurId,
    dateFrom,
    dateTo,
    sortBy,
    sortOrder,
    page,
    limit,
    // Filter actions
    setSearch: setSearchWithPageReset,
    setLivreurId: setLivreurIdWithPageReset,
    setDateFrom: setDateFromWithPageReset,
    setDateTo: setDateToWithPageReset,
    setSortBy: setSortByWithPageReset,
    setSortOrder: setSortOrderWithPageReset,
    setPage,
    setLimit: setLimitWithPageReset,
    clearFilters,
    hasActiveFilters,
  };
}

// Helper function to convert filter values for tRPC query
export function getQueryParams(filters: ArchiveFilters) {
  return {
    search: filters.search || undefined,
    livreurId: filters.livreurId === 'all' ? undefined : filters.livreurId,
    dateFrom: filters.dateFrom || undefined,
    dateTo: filters.dateTo || undefined,
    sortBy: filters.sortBy as 'name' | 'createdAt' | 'updatedAt',
    sortOrder: filters.sortOrder as 'asc' | 'desc',
    limit: filters.limit,
    page: filters.page,
  };
}
