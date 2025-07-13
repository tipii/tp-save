'use client';

import { DateNavigationComponent } from '@/components/admin/shared/date-navigation-example';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import React, { useState, useMemo } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import DraggableCommande from './dnd/draggable';
import { DroppableLivreur } from './dnd/droppable';
import { PriorityZone } from './dnd/priority-zone';

const commandes = [
  {
    id: '1',
    ref: 'FA256988',
    client: 'Pearl Bora',
    items: 7,
    priority: 'Urgent',
  },
  {
    id: '2',
    ref: 'FA256988',
    client: 'Marie Dubois',
    items: 3,
    priority: 'Normal',
  },
  {
    id: '3',
    ref: 'FA256988',
    client: 'Pierre Martin',
    items: 12,
    priority: 'Urgent',
  },
  {
    id: '4',
    ref: 'FA256988',
    client: 'Jean Technicien',
    items: 5,
    priority: 'Îles',
  },
  {
    id: '5',
    ref: 'FA256988',
    client: 'Sophie Depot',
    items: 9,
    priority: 'Normal',
  },
  {
    id: '6',
    ref: 'FA256988',
    client: 'Marc Livreur',
    items: 2,
    priority: 'Urgent',
  },
  {
    id: '7',
    ref: 'FA256988',
    client: 'Julien Rouleur',
    items: 8,
    priority: 'Îles',
  },
  {
    id: '8',
    ref: 'FA256988',
    client: 'Thomas Coursier',
    items: 4,
    priority: 'Normal',
  },
  {
    id: '9',
    ref: 'FA256988',
    client: 'Antoine Rapide',
    items: 6,
    priority: 'Urgent',
  },
  {
    id: '10',
    ref: 'FA256988',
    client: 'Lucas Vélo',
    items: 10,
    priority: 'Normal',
  },
];

export default function ChargementDnd() {
  const trpc = useTRPC();
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

  function handleRemoveCommande(commandeId: string) {
    setDroppedItems((prev) => {
      const newDroppedItems = { ...prev };
      Object.keys(newDroppedItems).forEach((droppableId) => {
        newDroppedItems[droppableId] = newDroppedItems[droppableId].filter(
          (id) => id !== commandeId,
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

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4">
        <DateNavigationComponent />
        <div className="flex flex-col gap-4">
          <Card className="m-0 h-full">
            <CardHeader className="flex justify-between">
              <CardTitle>Commande Drag Zone</CardTitle>
              <div className="">Filter zone</div>
            </CardHeader>
            <CardContent className="m-0 flex h-full min-h-64 gap-x-4">
              <PriorityZone
                title="Priorité"
                priority="Urgent"
                backgroundColor="bg-red-50"
                commandes={commandes}
                droppedItems={droppedItems}
              />
              <PriorityZone
                title="Normal"
                priority="Normal"
                backgroundColor="bg-yellow-50"
                commandes={commandes}
                droppedItems={droppedItems}
              />
              <PriorityZone
                title="Îles"
                priority="Îles"
                backgroundColor="bg-blue-50"
                commandes={commandes}
                droppedItems={droppedItems}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Livreur Drop Zone</CardTitle>
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
            </CardHeader>
            <CardContent className="flex min-h-64 flex-wrap gap-2">
              {sortedLivreurs?.map((livreur, index) => (
                <DroppableLivreur
                  key={livreur.id}
                  livreur={livreur}
                  droppedItems={droppedItems}
                  commandes={commandes}
                  onRemoveCommande={handleRemoveCommande}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DndContext>
  );
}
