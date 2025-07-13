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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${commande.id}`,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      id={`draggable-${commande.id}`}
      className={cn(
        'flex w-full cursor-grab items-center justify-between gap-2 border bg-white px-2',
        commande.priority === 'Urgent' && 'bg-red-100',
        commande.priority === 'Normal' && 'bg-yellow-100',
        commande.priority === 'Îles' && 'bg-blue-100',
      )}
    >
      <div className="text-sm font-medium">{commande.ref}</div>
      <div className="text-sm font-medium">{commande.client}</div>
      <div className="text-sm font-medium">{commande.items} items</div>
      <div className="text-sm font-medium">{commande.priority}</div>
    </div>
  );
}
