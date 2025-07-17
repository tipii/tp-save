import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Priority } from '@/generated/prisma';
import { TrpcLot } from '@/types/trpc-types';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

export default function DraggableLot({ lot }: { lot: TrpcLot }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-${lot.id}`,
  });

  const getBadgeColor = (priority: Priority) => {
    switch (priority) {
      case Priority.URGENT:
        return <Badge variant="priorityUrgent">Urgent</Badge>;
      case Priority.NORMAL:
        return <Badge variant="priorityNormal">Normal</Badge>;
      case Priority.ILES:
        return <Badge variant="priorityIsles">Îles</Badge>;
      default:
        return <Badge variant="default">N/A</Badge>;
    }
  };

  const items = lot.items as { name: string; quantity: number }[];

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 100 : 10,
      }}
      {...listeners}
      {...attributes}
      id={`draggable-${lot.id}`}
      className={cn(
        'z-50 flex w-full flex-col gap-1 rounded-sm border bg-white px-2 py-1',
        lot.priority === Priority.URGENT && 'border-red-200',
        lot.priority === Priority.NORMAL && 'border-yellow-300',
        lot.priority === Priority.ILES && 'border-blue-200',
        isDragging ? 'z-100 max-w-sm' : 'w-full',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">{lot.name} </div>
        <div className="text-sm font-bold">
          {lot.commande.ref} (1/{lot.commande.lots.length} lot
          {lot.commande.lots.length > 1 ? 's' : ''})
        </div>
        {getBadgeColor(lot.priority)}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{lot.commande.client?.name || 'Sans client'}</div>
        <div className="text-sm font-medium">{items.length} items</div>
      </div>
    </div>
  );
}
