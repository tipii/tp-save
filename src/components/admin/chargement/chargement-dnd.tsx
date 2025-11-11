'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { DroppableLivreur } from './dnd/droppable';
import { PriorityZone } from './dnd/priority-zone';
import { Priority } from '@/generated/prisma';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';
import { getTahitiToday, normalizeToTahitiDay } from '@/lib/date-utils';
import { DateNavigation } from '../shared/date-navigation';
import { toast } from 'sonner';

export default function ChargementDnd() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => getTahitiToday());
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: livraisons, refetch: refetchLivraisons } = useQuery(
    trpc.livraisons.getPendingLivraisons.queryOptions(
      {
        expectedDeliveryDate: selectedDate ? selectedDate : undefined,
      },
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 10, // 10 seconds
        refetchIntervalInBackground: true,
      },
    ),
  );

  const { data: livraisonsEnRetard, refetch: refetchLivraisonsEnRetard } = useQuery(
    trpc.livraisons.getLivraisonsEnRetard.queryOptions(
      {
        expectedDeliveryDate: selectedDate ? selectedDate : undefined,
      },
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 10, // 10 seconds
        refetchIntervalInBackground: true,
      },
    ),
  );
  const { data: livreurs } = useQuery(trpc.livreurs.getLivreurs.queryOptions());

  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([], 'Chargement');
  }, [setBreadcrumb]);

  const [droppedItems, setDroppedItems] = useState<Record<string, string[]>>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');

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

  const changePriorityMutation = useMutation(
    trpc.livraisons.changePriority.mutationOptions({
      onMutate: async (variables) => {
        const queryKey = trpc.livraisons.getPendingLivraisons.queryKey({
          expectedDeliveryDate: selectedDate ? selectedDate : undefined,
        });

        await queryClient.cancelQueries({ queryKey: queryKey });

        const previousLivraisons = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (old) => {
          return old?.map((livraison) => {
            if (livraison.id === variables.livraisonId) {
              return { ...livraison, priority: variables.priority };
            }
            return livraison;
          });
        });

        return { previousLivraisons: previousLivraisons };
      },
      onSuccess: () => {
        toast.success('Priorité modifiée avec succès');
      },
      onError: (error, variables, context) => {
        toast.error('Erreur lors de la modification de la priorité');
        console.error(error);
      },
      onSettled: () => {
        refetchLivraisons();
      },
    }),
  );

  function handlePriorityChange(livraisonId: string, newPriority: Priority) {
    changePriorityMutation.mutate({ livraisonId, priority: newPriority });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // Extract the livraison id from the draggable id (remove 'draggable-' prefix)
    const livraisonId = activeId.replace('draggable-', '');

    // Find the livraison to get its current priority
    const livraison = livraisons?.find((l) => l.id === livraisonId);

    // Check if dropping on a priority zone
    if (overId.startsWith('priority-')) {
      if (overId === 'priority-LATE') {
        toast.error('Cette zone est réservée aux livraisons en retard');
        return;
      }

      const newPriority = overId.replace('priority-', '') as Priority;

      handlePriorityChange(livraisonId, newPriority);

      // Remove the livraison from all livreur droppable zones
      setDroppedItems((prev) => {
        const newDroppedItems = { ...prev };

        // Remove the livraison from all previous droppable zones
        Object.keys(newDroppedItems).forEach((droppableId) => {
          newDroppedItems[droppableId] = newDroppedItems[droppableId].filter(
            (id) => id !== livraisonId,
          );
        });

        return newDroppedItems;
      });

      return;
    }

    // Check if dropping on a livreur droppable zone
    if (overId.startsWith('droppable-')) {
      setDroppedItems((prev) => {
        const newDroppedItems = { ...prev };

        // Remove the livraison from all previous droppable zones
        Object.keys(newDroppedItems).forEach((droppableId) => {
          newDroppedItems[droppableId] = newDroppedItems[droppableId].filter(
            (id) => id !== livraisonId,
          );
        });

        // Add the livraison to the new droppable zone
        newDroppedItems[overId] = [...(newDroppedItems[overId] || []), livraisonId];

        return newDroppedItems;
      });
    }
  }

  function handleRemoveLivraison(livraisonId: string) {
    setDroppedItems((prev) => {
      const newDroppedItems = { ...prev };
      Object.keys(newDroppedItems).forEach((droppableId) => {
        newDroppedItems[droppableId] = newDroppedItems[droppableId].filter(
          (id) => id !== livraisonId,
        );
      });
      return newDroppedItems;
    });
  }

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

  if (!livraisons || !livreurs) return null;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4">
        <DateNavigation
          selectedDate={selectedDate}
          onDateChange={(date) => setSelectedDate(normalizeToTahitiDay(date))}
          className="bg-card flex w-full justify-between border-b border-gray-200 p-4"
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 border-b border-gray-200 px-4 pb-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">Commande Drag Zone</h2>
            </div>
            <div className="m-0 flex h-full min-h-64 gap-x-4">
              <PriorityZone
                title="Urgent"
                priority={Priority.URGENT}
                backgroundColor="bg-red-50 shadow-none border-red-200"
                livraisons={livraisons}
                droppedItems={droppedItems}
              />
              <PriorityZone
                title="Normal"
                priority={Priority.NORMAL}
                backgroundColor="bg-yellow-50 shadow-none border-yellow-300"
                livraisons={livraisons}
                droppedItems={droppedItems}
              />
              <PriorityZone
                title="Îles"
                priority={Priority.ILES}
                backgroundColor="bg-blue-50 shadow-none border-blue-200"
                livraisons={livraisons}
                droppedItems={droppedItems}
              />
              <PriorityZone
                title="En retard"
                priority={'LATE'}
                backgroundColor="bg-orange-50 shadow-none border-orange-300"
                livraisons={livraisonsEnRetard ?? []}
                droppedItems={droppedItems}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 border-b border-gray-200 px-4 pb-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">Livreur Drop Zone</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSort}
                  className="flex items-center gap-1"
                  title={`Sort by name ${sortOrder === 'asc' ? '(A-Z)' : sortOrder === 'desc' ? '(Z-A)' : '(No sort)'}`}
                >
                  {getSortIcon()}
                  <span className="text-sm">Sort by name</span>
                </Button>
              </div>
            </div>
            <div className="grid min-h-64 grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {sortedLivreurs?.map((livreur, index) => (
                <DroppableLivreur
                  key={livreur.id}
                  livreur={livreur}
                  droppedItems={droppedItems}
                  livraisons={[...(livraisons ?? []), ...(livraisonsEnRetard ?? [])]}
                  onRemoveLivraison={handleRemoveLivraison}
                  setDroppedItems={setDroppedItems}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
