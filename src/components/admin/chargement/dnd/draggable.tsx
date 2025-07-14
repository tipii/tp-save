import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import React from 'react';

export interface Commande {
  id: string;
  ref: string;
  client: string;
  items: number;
  priority: string;
}

export default function DraggableCommande({ commande }: { commande: Commande }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-${commande.id}`,
  });

  const getBadgeColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return <Badge variant="priorityUrgent">Urgent</Badge>;
      case 'Normal':
        return <Badge variant="priorityNormal">Normal</Badge>;
      case 'Îles':
        return <Badge variant="priorityIsles">Îles</Badge>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 100 : 10,
      }}
      {...listeners}
      {...attributes}
      id={`draggable-${commande.id}`}
      className={cn(
        'z-50 flex w-full flex-col gap-1 rounded-sm border bg-white px-2 py-1',
        commande.priority === 'Urgent' && 'border-red-200',
        commande.priority === 'Normal' && 'border-yellow-300',
        commande.priority === 'Îles' && 'border-blue-200',
        isDragging ? 'z-100 max-w-sm' : 'w-full',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">{commande.ref}</div>
        {getBadgeColor(commande.priority)}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{commande.client}</div>
        <div className="text-sm font-medium">{commande.items} items</div>
      </div>
    </div>
  );
}
