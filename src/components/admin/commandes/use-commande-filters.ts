import { SortBy, SortOrder } from '@/types/enums';
import { Priority, Status } from '@/generated/prisma';
import { useQueryState, parseAsString, parseAsInteger } from 'nuqs';

export interface CommandeFilters {
  search: string;
  clientId: string;
  priority: string;
  status: string;
  dateFrom: string;
  dateTo: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  limit: number;
}

export interface CommandeFiltersActions {
  setSearch: (value: string) => void;
  setClientId: (value: string) => void;
  setPriority: (value: string) => void;
  setStatus: (value: string) => void;
  setDateFrom: (value: string) => void;
  setDateTo: (value: string) => void;
  setSortBy: (value: string) => void;
  setSortOrder: (value: string) => void;
  setPage: (value: number) => void;
  setLimit: (value: number) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function useCommandeFilters(): CommandeFilters & CommandeFiltersActions {
  // URL state management with nuqs
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [clientId, setClientId] = useQueryState('clientId', parseAsString.withDefault('all'));
  const [priority, setPriority] = useQueryState('priority', parseAsString.withDefault('all'));
  const [status, setStatus] = useQueryState('status', parseAsString.withDefault('all'));
  const [dateFrom, setDateFrom] = useQueryState('dateFrom', parseAsString.withDefault(''));
  const [dateTo, setDateTo] = useQueryState('dateTo', parseAsString.withDefault(''));
  const [sortBy, setSortBy] = useQueryState('sortBy', parseAsString.withDefault('createdAt'));
  const [sortOrder, setSortOrder] = useQueryState('sortOrder', parseAsString.withDefault('desc'));
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(20));

  // Wrapper functions that reset page to 1 when filters change
  const setSearchWithPageReset = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const setClientIdWithPageReset = (value: string) => {
    setClientId(value);
    setPage(1);
  };

  const setPriorityWithPageReset = (value: string) => {
    setPriority(value);
    setPage(1);
  };

  const setStatusWithPageReset = (value: string) => {
    setStatus(value);
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
    setClientId('all');
    setPriority('all');
    setStatus('all');
    setDateFrom('');
    setDateTo('');
    setSortBy('createdAt');
    setSortOrder('desc');
    setPage(1);
  };

  const hasActiveFilters =
    !!search ||
    clientId !== 'all' ||
    priority !== 'all' ||
    status !== 'all' ||
    !!dateFrom ||
    !!dateTo;

  return {
    // Filter values
    search,
    clientId,
    priority,
    status,
    dateFrom,
    dateTo,
    sortBy,
    sortOrder,
    page,
    limit,
    // Filter actions
    setSearch: setSearchWithPageReset,
    setClientId: setClientIdWithPageReset,
    setPriority: setPriorityWithPageReset,
    setStatus: setStatusWithPageReset,
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
export function getQueryParams(filters: CommandeFilters) {
  return {
    search: filters.search || undefined,
    clientId: filters.clientId === 'all' ? undefined : filters.clientId,
    priority: filters.priority === 'all' ? undefined : (filters.priority as Priority),
    status: filters.status === 'all' ? undefined : (filters.status as Status),
    dateFrom: filters.dateFrom || undefined,
    dateTo: filters.dateTo || undefined,
    sortBy: filters.sortBy as SortBy,
    sortOrder: filters.sortOrder as SortOrder,
    limit: filters.limit,
    page: filters.page,
  };
}
