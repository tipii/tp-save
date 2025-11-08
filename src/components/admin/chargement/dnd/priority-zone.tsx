import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { TrpcLivraison } from '@/types/trpc-types';
import DraggableLot from './draggable';
import LivraisonModal from '@/components/modals/livraison-modal';
import { useDroppable } from '@dnd-kit/core';

interface PriorityZoneProps {
  title: string;
  priority: string;
  backgroundColor: string;
  livraisons: TrpcLivraison[];
  droppedItems: Record<string, string[]>;
}

export const PriorityZone = ({
  title,
  priority,
  backgroundColor,
  livraisons,
  droppedItems,
}: PriorityZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `priority-${priority}`,
  });

  const availableLots = useMemo(() => {
    return livraisons.filter((livraison) => {
      // Check if this command is already dropped in any livreur zone
      const isDropped = Object.values(droppedItems).some((items) => items.includes(livraison.id));
      return !isDropped && livraison.priority === priority;
    });
  }, [livraisons, droppedItems, priority]);

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 rounded-lg border ${backgroundColor} p-4 text-2xl font-bold ${isOver ? 'ring-2 ring-blue-400' : ''}`}
    >
      <div className="flex justify-between">
        <div className="">{title}</div>
        {/* <div className="text-sm text-gray-500">Filter zone</div> */}
      </div>
      {availableLots.length > 0 ? (
        <div className={`flex flex-col gap-1 ${backgroundColor}`}>
          {availableLots.map((livraison) => (
            <div key={livraison.id} className="flex items-center gap-2">
              <DraggableLot key={livraison.id} livraison={livraison} />
              <LivraisonModal livraison={livraison}>
                <Button variant="ghost" className="h-5 w-5">
                  <Eye size={16} />
                </Button>
              </LivraisonModal>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <p className="text-sm text-gray-500">Aucune commande à traiter</p>
          <p className="text-sm text-gray-500">Voir les commandes en attentes</p>
        </div>
      )}
    </div>
  );
};
