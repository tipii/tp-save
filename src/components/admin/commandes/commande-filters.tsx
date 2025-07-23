import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useDebounce } from '@uidotdev/usehooks';
import { parseISO, formatISO } from 'date-fns';
import { fromZonedTime, toZonedTime, formatInTimeZone } from 'date-fns-tz';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X, Calendar as CalendarIcon } from 'lucide-react';
import { useCommandeFilters } from './use-commande-filters';
import { Priority, Status } from '@/generated/prisma';
import { priorityToText, statusToText } from '@/components/ui/enum-to-ui';
import { Combobox } from '@/components/ui/combobox';
import { Card, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CommandeFiltersProps {
  pagination?: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
}

const TAHITI_TIMEZONE = 'Pacific/Tahiti';

export function CommandeFilters({ pagination }: CommandeFiltersProps) {
  const trpc = useTRPC();
  const filters = useCommandeFilters();
  // Local state for search input
  const [searchInput, setSearchInput] = useState(filters.search);

  // Debounce the search input with 500ms delay
  const debouncedSearch = useDebounce(searchInput, 500);

  // Get clients for filter dropdown
  const { data: clients } = useQuery(trpc.clients.getClients.queryOptions());

  // Helper functions for Tahiti timezone handling
  const formatDateForTahiti = (dateString: string | undefined) => {
    if (!dateString) return undefined;
    try {
      const utcDate = parseISO(dateString);
      return formatInTimeZone(utcDate, TAHITI_TIMEZONE, 'dd/MM/yyyy', { locale: fr });
    } catch {
      return undefined;
    }
  };

  const convertTahitiToUTC = (date: Date) => {
    // Convert the selected date (assumed to be in Tahiti timezone) to UTC
    const utcDate = fromZonedTime(date, TAHITI_TIMEZONE);
    return formatISO(utcDate, { representation: 'date' });
  };

  const parseDateForCalendar = (dateString: string | undefined) => {
    if (!dateString) return undefined;
    try {
      const utcDate = parseISO(dateString);
      return toZonedTime(utcDate, TAHITI_TIMEZONE);
    } catch {
      return undefined;
    }
  };

  // Update the URL search parameter when debounced value changes
  useEffect(() => {
    filters.setSearch(debouncedSearch);
  }, [debouncedSearch]);

  // Update local state when URL search parameter changes (e.g., from clearFilters)
  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  return (
    <Card className="bg-background m-4 rounded-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <div className="rounded-lg bg-blue-100 p-2">
              <Filter className="h-5 w-5 text-blue-600" />
            </div>
            Filtres et recherche
          </h2>
          {filters.hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={filters.clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Effacer tous les filtres
            </Button>
          )}
        </div>
      </CardHeader>

      <div className="space-y-4 p-4">
        {/* Search and Sort Section */}
        <div className="flex flex-col gap-4 lg:flex-row">
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
                    <SelectItem value="priority">Priorité livraison(s)</SelectItem>
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
          <div className="flex justify-between gap-4">
            {/* Quick Filters */}
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-medium">
                <Filter className="h-4 w-4" />
                Filtres
              </h3>
              <div className="flex gap-4">
                {/* Client Filter */}
                <div className="flex flex-col justify-end">
                  <label className="text-muted-foreground text-xs">Client</label>
                  <Combobox
                    options={[
                      { label: 'Tout les clients', value: 'all' },
                      ...(clients?.map((client) => ({
                        label: client.name ?? 'Non défini',
                        value: client.id,
                      })) ?? []),
                    ]}
                    value={filters.clientId}
                    onChange={filters.setClientId}
                  />
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
                      <SelectItem value={Priority.UNDEFINED}>
                        {priorityToText(Priority.UNDEFINED)}
                      </SelectItem>
                      <SelectItem value={Priority.URGENT}>
                        {priorityToText(Priority.URGENT)}
                      </SelectItem>
                      <SelectItem value={Priority.NORMAL}>
                        {priorityToText(Priority.NORMAL)}
                      </SelectItem>
                      <SelectItem value={Priority.ILES}>{priorityToText(Priority.ILES)}</SelectItem>
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
                      <SelectItem value={Status.PENDING}>{statusToText(Status.PENDING)}</SelectItem>
                      <SelectItem value={Status.READY}>{statusToText(Status.READY)}</SelectItem>
                      <SelectItem value={Status.DELIVERING}>
                        {statusToText(Status.DELIVERING)}
                      </SelectItem>
                      <SelectItem value={Status.DELIVERED}>
                        {statusToText(Status.DELIVERED)}
                      </SelectItem>
                      <SelectItem value={Status.TO_RETURN}>
                        {statusToText(Status.TO_RETURN)}
                      </SelectItem>
                      <SelectItem value={Status.RETURNED}>
                        {statusToText(Status.RETURNED)}
                      </SelectItem>
                      <SelectItem value={Status.CANCELLED}>
                        {statusToText(Status.CANCELLED)}
                      </SelectItem>
                      <SelectItem value={Status.MIXED}>{statusToText(Status.MIXED)}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <div className="flex gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-muted-foreground text-xs">Date de début</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-40 justify-start text-left font-normal',
                          !filters.dateFrom && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateFrom ? (
                          formatDateForTahiti(filters.dateFrom)
                        ) : (
                          <span>Choisir une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={parseDateForCalendar(filters.dateFrom)}
                        onSelect={(date) => {
                          filters.setDateFrom(date ? convertTahitiToUTC(date) : '');
                        }}
                        disabled={(date) => {
                          const now = toZonedTime(new Date(), TAHITI_TIMEZONE);
                          const minDate = toZonedTime(new Date('1900-01-01'), TAHITI_TIMEZONE);
                          return date > now || date < minDate;
                        }}
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-muted-foreground text-xs">Date de fin</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-40 justify-start text-left font-normal',
                          !filters.dateTo && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateTo ? (
                          formatDateForTahiti(filters.dateTo)
                        ) : (
                          <span>Choisir une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={parseDateForCalendar(filters.dateTo)}
                        onSelect={(date) => {
                          filters.setDateTo(date ? convertTahitiToUTC(date) : '');
                        }}
                        disabled={(date) => {
                          const now = toZonedTime(new Date(), TAHITI_TIMEZONE);
                          const minDate = toZonedTime(new Date('1900-01-01'), TAHITI_TIMEZONE);
                          return date > now || date < minDate;
                        }}
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
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
    </Card>
  );
}
