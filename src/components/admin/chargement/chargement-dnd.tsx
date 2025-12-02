'use client';

import React, { useMemo, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useQueryState, parseAsIsoDateTime, parseAsStringEnum } from 'nuqs';
import { DroppableLivreur } from './dnd/droppable';
import { PriorityZone } from './dnd/priority-zone';
import { Priority } from '@/generated/prisma';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';
import { getTahitiToday, normalizeToTahitiDay } from '@/lib/date-utils';
import { DateNavigation } from '../shared/date-navigation';
import {
  usePendingLivraisons,
  useLivraisonsEnRetard,
  useLivreurs,
} from './hooks/use-chargement-queries';
import { useRemoveFromTmpMutation } from './hooks/use-chargement-mutations';
import { useChargementDrag } from './hooks/use-chargement-drag';
import { PriorityZonesSkeleton, LivreurCardsSkeleton } from './skeletons';

export default function ChargementDnd() {
  // Use URL state for date with shallow routing to prevent full page reload
  const [dateFromUrl] = useQueryState(
    'date',
    parseAsIsoDateTime.withDefault(getTahitiToday()).withOptions({ shallow: false }),
  );
  const selectedDate = normalizeToTahitiDay(dateFromUrl);

  // Use URL state for sort order
  const [sortOrder, setSortOrder] = useQueryState(
    'sort',
    parseAsStringEnum<'asc' | 'desc' | 'none'>(['asc', 'desc', 'none']).withDefault('none'),
  );

  // Queries with loading states
  const { data: livraisons, isLoading: isLoadingLivraisons } = usePendingLivraisons(selectedDate);
  const { data: livraisonsEnRetard, isLoading: isLoadingEnRetard } = useLivraisonsEnRetard(selectedDate);
  const { data: livreurs, isLoading: isLoadingLivreurs } = useLivreurs(selectedDate);

  // Mutations
  const removeFromTmpMutation = useRemoveFromTmpMutation(selectedDate);

  // Drag and drop logic
  const { handleDragStart, handleDragEnd } = useChargementDrag(
    selectedDate,
    livraisons,
    livraisonsEnRetard,
    livreurs,
  );

  // Breadcrumb
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([], 'Chargement');
  }, [setBreadcrumb]);

  // Sort livreurs
  const sortedLivreurs = useMemo(() => {
    if (!livreurs || sortOrder === 'none') return livreurs;

    const sorted = [...livreurs].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

    return sorted;
  }, [livreurs, sortOrder]);

  function handleSort() {
    setSortOrder((prev) => {
      if (prev === 'none') return 'asc';
      if (prev === 'asc') return 'desc';
      return 'none';
    });
  }

  function getSortIcon() {
    if (sortOrder === 'asc') return <ArrowUp className="h-4 w-4" />;
    if (sortOrder === 'desc') return <ArrowDown className="h-4 w-4" />;
    return <ArrowUpDown className="h-4 w-4" />;
  }

  const isLoading = isLoadingLivraisons || isLoadingEnRetard || isLoadingLivreurs;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4">
        <DateNavigation className="bg-card flex w-full justify-between border-b border-gray-200 p-4" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 border-b border-gray-200 px-4 pb-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">Commande Drag Zone</h2>
            </div>
            <div className="m-0 flex h-full min-h-64 gap-x-4">
              {isLoading ? (
                <PriorityZonesSkeleton />
              ) : (
                <>
                  <PriorityZone
                    title="Urgent"
                    priority={Priority.URGENT}
                    backgroundColor="bg-red-50 shadow-none border-red-200"
                    livraisons={livraisons ?? []}
                  />
                  <PriorityZone
                    title="Normal"
                    priority={Priority.NORMAL}
                    backgroundColor="bg-yellow-50 shadow-none border-yellow-300"
                    livraisons={livraisons ?? []}
                  />
                  <PriorityZone
                    title="Îles"
                    priority={Priority.ILES}
                    backgroundColor="bg-blue-50 shadow-none border-blue-200"
                    livraisons={livraisons ?? []}
                  />
                  <PriorityZone
                    title="En retard"
                    priority={'LATE'}
                    backgroundColor="bg-orange-50 shadow-none border-orange-300"
                    livraisons={livraisonsEnRetard ?? []}
                  />
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-b border-gray-200 px-4 pb-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">Zône de chargement</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSort}
                  className="flex items-center gap-1"
                  title={`Trier par nom ${sortOrder === 'asc' ? '(A-Z)' : sortOrder === 'desc' ? '(Z-A)' : '(Pas de tri)'}`}
                >
                  {getSortIcon()}
                  <span className="text-sm">Trier par nom</span>
                </Button>
              </div>
            </div>
            <div className="grid min-h-64 grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {isLoading ? (
                <LivreurCardsSkeleton count={8} />
              ) : (
                <>
                  {sortedLivreurs?.map((livreur) => (
                    <DroppableLivreur
                      key={livreur.id}
                      livreur={livreur}
                      livraisons={[...(livraisons ?? []), ...(livraisonsEnRetard ?? [])]}
                      selectedDate={selectedDate}
                      onRemove={(livraisonId) => {
                        removeFromTmpMutation.mutate({
                          livraisonId,
                          livreurId: livreur.id,
                          dateLivraison: selectedDate,
                        });
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
