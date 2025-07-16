import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useDebounce } from '@uidotdev/usehooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X, Calendar, SortAsc } from 'lucide-react';
import { useCommandeFilters, type CommandeFiltersActions } from './use-commande-filters';

interface CommandeFiltersProps {
  filters: ReturnType<typeof useCommandeFilters>;
  pagination?: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
}

export function CommandeFilters({ filters, pagination }: CommandeFiltersProps) {
  const trpc = useTRPC();

  // Local state for search input
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounce the search input with 500ms delay
  const debouncedSearch = useDebounce(searchInput, 500);

  // Get clients for filter dropdown
  const { data: clients } = useQuery(trpc.clients.getClients.queryOptions());

  // Update the URL search parameter when debounced value changes
  useEffect(() => {
    filters.setSearch(debouncedSearch);
  }, [filters, debouncedSearch, filters.setSearch]);

  // Update local state when URL search parameter changes (e.g., from clearFilters)
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  return (
    <div className="bg-background border shadow-sm">
      <div className="bg-muted/30 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Filter className="h-5 w-5" />
            Filtres et recherche
          </h2>
          {filters.hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={filters.clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Effacer tous les filtres
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4 p-4">
        {/* Search and Sort Section */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          {/* Search */}
          <div className="flex-1 space-y-2">
            <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <Search className="h-4 w-4" />
              Recherche
            </h3>
            <div className="relative max-w-md">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Rechercher par référence ou client..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Sorting Options */}
          <div className="space-y-2">
            <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <SortAsc className="h-4 w-4" />
              Tri
            </h3>
            <div className="flex gap-3">
              <div className="space-y-1">
                <label className="text-muted-foreground text-xs">Trier par</label>
                <Select value={filters.sortBy} onValueChange={filters.setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Date de création</SelectItem>
                    <SelectItem value="updatedAt">Dernière mise à jour</SelectItem>
                    <SelectItem value="ref">Référence</SelectItem>
                    <SelectItem value="priority">Priorité</SelectItem>
                    <SelectItem value="status">Statut</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-muted-foreground text-xs">Ordre</label>
                <Select value={filters.sortOrder} onValueChange={filters.setSortOrder}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Décroissant</SelectItem>
                    <SelectItem value="asc">Croissant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filters and Date Range Section */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            {/* Quick Filters */}
            <div className="space-y-2">
              <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <Filter className="h-4 w-4" />
                Filtres rapides
              </h3>
              <div className="flex gap-4">
                {/* Client Filter */}
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs">Client</label>
                  <Select value={filters.clientId} onValueChange={filters.setClientId}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Tous les clients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les clients</SelectItem>
                      {clients?.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name} ({client.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority Filter */}
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs">Priorité</label>
                  <Select value={filters.priority} onValueChange={filters.setPriority}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Toutes les priorités" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les priorités</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Îles">Îles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs">Statut</label>
                  <Select value={filters.status} onValueChange={filters.setStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="ready">Prêt</SelectItem>
                      <SelectItem value="delivering">En livraison</SelectItem>
                      <SelectItem value="delivered">Livré</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <h3 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Période
              </h3>
              <div className="flex gap-3">
                <div className="space-y-1">
                  <label className="text-muted-foreground text-xs">Date de début</label>
                  <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => filters.setDateFrom(e.target.value)}
                    className="w-40"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-muted-foreground text-xs">Date de fin</label>
                  <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => filters.setDateTo(e.target.value)}
                    className="w-40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {pagination && (
          <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">{pagination.totalCount}</span>
              <span className="text-muted-foreground">
                commande(s) trouvée(s)
                {filters.hasActiveFilters && ' (filtrées)'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">Résultats par page:</span>
              <Select
                value={filters.limit.toString()}
                onValueChange={(value) => filters.setLimit(Number(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
