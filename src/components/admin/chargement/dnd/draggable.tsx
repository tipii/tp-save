import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Priority } from '@/generated/prisma';
import { TrpcLivraison } from '@/types/trpc-types';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { priorityToBadge } from '@/components/ui/enum-to-ui';

export default function DraggableLot({ livraison }: { livraison: TrpcLivraison }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-${livraison.id}`,
  });

  const items = livraison.items as { name: string; quantity: number }[];

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 100 : 10,
      }}
      {...listeners}
      {...attributes}
      id={`draggable-${livraison.id}`}
      className={cn(
        'z-50 flex w-full flex-col gap-1 rounded-sm border bg-white px-2 py-1',
        livraison.priority === Priority.URGENT && 'border-red-200',
        livraison.priority === Priority.NORMAL && 'border-yellow-300',
        livraison.priority === Priority.ILES && 'border-blue-200',
        isDragging ? 'z-100 max-w-lg' : 'w-full',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold">{livraison.commande.ref} </div>
        {priorityToBadge(livraison.priority)}
      </div>
      <div className="flex items-center justify-between">
        {livraison.commande.client?.name || 'Sans client'}
        {livraison.priority === Priority.ILES && livraison.commande.docVente?.expedit && (
          <div className="text-sm font-medium">{livraison.commande.docVente?.expedit}</div> //TODO: Add expedition name from Maxime table
        )}
      </div>
    </div>
  );
}
