import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { parseISO, formatISO } from 'date-fns';
import { fromZonedTime, toZonedTime, formatInTimeZone } from 'date-fns-tz';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter, X, Calendar as CalendarIcon } from 'lucide-react';
import { useCommandeFilters } from './use-commande-filters';
import { Priority, Status } from '@/generated/prisma';
import { priorityToText, statusToText } from '@/components/ui/enum-to-ui';
import { Combobox } from '@/components/ui/combobox';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface FilterSheetProps {
  children: React.ReactNode;
  pagination?: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
}

const TAHITI_TIMEZONE = 'Pacific/Tahiti';

export function FilterSheet({ children, pagination }: FilterSheetProps) {
  const trpc = useTRPC();
  const filters = useCommandeFilters();

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
            Filtrez et organisez vos commandes selon vos critères
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

            {/* Quick Filters Section */}
            <div className="px-6 py-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                Filtres rapides
              </h3>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={filters.noExpectedDeliveryDate}
                    onChange={(e) => filters.setNoExpectedDeliveryDate(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Sans date de livraison prévue</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={filters.expectedDeliveryDatePassed}
                    onChange={(e) => filters.setExpectedDeliveryDatePassed(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Date de livraison dépassée</span>
                </label>
              </div>
            </div>

            <Separator />
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
                      <SelectItem value="createdAt">Date de création</SelectItem>
                      <SelectItem value="updatedAt">Dernière mise à jour</SelectItem>
                      <SelectItem value="ref">Référence</SelectItem>
                      <SelectItem value="priority">Priorité</SelectItem>
                      <SelectItem value="status">Statut</SelectItem>
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
                {/* Client Filter */}
                <div className="flex flex-col space-y-2">
                  <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Client
                  </label>
                  <Combobox
                    options={[
                      { label: 'Tous les clients', value: 'all' },
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
                  <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Priorité
                  </label>
                  <Select value={filters.priority} onValueChange={filters.setPriority}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Toutes" />
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
                  <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Statut
                  </label>
                  <Select value={filters.status} onValueChange={filters.setStatus}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Tous" />
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

            <Separator />

            {/* Date Range Section */}
            <div className="px-6 py-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                Période de création
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

            <Separator />

            {/* Expected Delivery Date Range Section */}
            <div className="px-6 py-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                Date de livraison prévue
              </h3>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Du
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'h-9 w-full justify-start text-left font-normal',
                          !filters.expectedDeliveryFrom && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.expectedDeliveryFrom ? (
                          formatDateForTahiti(filters.expectedDeliveryFrom)
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={parseDateForCalendar(filters.expectedDeliveryFrom)}
                        onSelect={(date) => {
                          filters.setExpectedDeliveryFrom(date ? convertTahitiToUTC(date) : '');
                        }}
                        disabled={(date) => {
                          const minDate = toZonedTime(new Date('1900-01-01'), TAHITI_TIMEZONE);
                          return date < minDate;
                        }}
                        initialFocus
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Au
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'h-9 w-full justify-start text-left font-normal',
                          !filters.expectedDeliveryTo && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.expectedDeliveryTo ? (
                          formatDateForTahiti(filters.expectedDeliveryTo)
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={parseDateForCalendar(filters.expectedDeliveryTo)}
                        onSelect={(date) => {
                          filters.setExpectedDeliveryTo(date ? convertTahitiToUTC(date) : '');
                        }}
                        disabled={(date) => {
                          const minDate = toZonedTime(new Date('1900-01-01'), TAHITI_TIMEZONE);
                          return date < minDate;
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
