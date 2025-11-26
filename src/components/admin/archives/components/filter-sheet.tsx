'use client';

import React, { ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useArchiveFilters } from '../hooks/use-archive-filters';
import { X, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { parseISO, formatISO } from 'date-fns';
import { fromZonedTime, toZonedTime, formatInTimeZone } from 'date-fns-tz';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const TAHITI_TIMEZONE = 'Pacific/Tahiti';

export function FilterSheet({
  children,
  pagination,
}: {
  children: ReactNode;
  pagination?: { totalCount: number };
}) {
  const filters = useArchiveFilters();
  const trpc = useTRPC();

  // Get livreurs for filter dropdown
  const { data: livreurs } = useQuery(trpc.livreurs.getLivreurs.queryOptions());

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

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[500px]">
        <SheetHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50">
                <Filter className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-lg font-semibold">Filtres</span>
            </SheetTitle>
          </div>
          <SheetDescription className="text-muted-foreground text-sm">
            Filtrez et organisez vos archives selon vos critères
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 flex-1 overflow-y-auto">
          <div className="space-y-0">
            {filters.hasActiveFilters && (
              <div className="px-6 pb-4">
                <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50/50 px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                    <span className="text-sm font-medium text-amber-800">Filtres actifs</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={filters.clearFilters}
                    className="h-7 border-amber-300 bg-white text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                  >
                    <X className="mr-1 h-3 w-3" />
                    Réinitialiser
                  </Button>
                </div>
              </div>
            )}

            {/* Sorting Section */}
            <div className="px-6 py-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                Tri et ordre
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Trier par
                  </label>
                  <Select value={filters.sortBy} onValueChange={filters.setSortBy}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="updatedAt">Date de livraison</SelectItem>
                      <SelectItem value="createdAt">Date de création</SelectItem>
                      <SelectItem value="name">Nom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Ordre
                  </label>
                  <Select value={filters.sortOrder} onValueChange={filters.setSortOrder}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">↓ Décroissant</SelectItem>
                      <SelectItem value="asc">↑ Croissant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Filters Section */}
            <div className="px-6 py-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                Filtres
              </h3>
              <div className="space-y-5">
                {/* Livreur Filter */}
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Livreur
                  </label>
                  <Select value={filters.livreurId} onValueChange={filters.setLivreurId}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Tous les livreurs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les livreurs</SelectItem>
                      {livreurs?.map((livreur) => (
                        <SelectItem key={livreur.id} value={livreur.id}>
                          {livreur.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Date Range Section */}
            <div className="px-6 py-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                Période de livraison
              </h3>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Date de début
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'h-9 w-full justify-start text-left font-normal',
                          !filters.dateFrom && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateFrom ? (
                          formatDateForTahiti(filters.dateFrom)
                        ) : (
                          <span>Sélectionner une date</span>
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
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Date de fin
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'h-9 w-full justify-start text-left font-normal',
                          !filters.dateTo && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateTo ? (
                          formatDateForTahiti(filters.dateTo)
                        ) : (
                          <span>Sélectionner une date</span>
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
      </SheetContent>
    </Sheet>
  );
}
