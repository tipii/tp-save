'use client';

import { DateNavigationComponent } from '@/components/admin/shared/date-navigation-example';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import React, { useState, useMemo } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { DroppableLivreur } from './dnd/droppable';
import { PriorityZone } from './dnd/priority-zone';
import { Priority } from '@/generated/prisma';

export default function ChargementDnd() {
  const trpc = useTRPC();
  const { data: livraisons } = useQuery(trpc.livraisons.getPendingLivraisons.queryOptions());
  const { data: livreurs } = useQuery(trpc.livreurs.getLivreurs.queryOptions());

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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // Check if dropping on a livreur droppable zone
    if (overId.startsWith('droppable-')) {
      // Extract the command id from the draggable id (remove 'draggable-' prefix)
      const commandId = activeId.replace('draggable-', '');

      setDroppedItems((prev) => {
        const newDroppedItems = { ...prev };

        // Remove the command from all previous droppable zones
        Object.keys(newDroppedItems).forEach((droppableId) => {
          newDroppedItems[droppableId] = newDroppedItems[droppableId].filter(
            (id) => id !== commandId,
          );
        });

        // Add the command to the new droppable zone
        newDroppedItems[overId] = [...(newDroppedItems[overId] || []), commandId];

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
        <DateNavigationComponent />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 border-b border-gray-200 px-4 pb-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold">Commande Drag Zone</h2>
            </div>
            <div className="m-0 flex h-full min-h-64 gap-x-4">
              <PriorityZone
                title="Priorité"
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
                  livraisons={livraisons}
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
