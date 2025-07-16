import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';
import CommandeModal from '@/components/modals/commande-modal/commande-modal';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { TrpcCommande, TrpcLot } from '@/types/trpc-types';
import DraggableLot from './draggable';

interface PriorityZoneProps {
  title: string;
  priority: string;
  backgroundColor: string;
  lots: TrpcLot[];
  droppedItems: Record<string, string[]>;
}

export const PriorityZone = ({
  title,
  priority,
  backgroundColor,
  lots,
  droppedItems,
}: PriorityZoneProps) => {
  const availableLots = useMemo(() => {
    return lots.filter((lot) => {
      // Check if this command is already dropped in any livreur zone
      const isDropped = Object.values(droppedItems).some((items) => items.includes(lot.id));
      return !isDropped && lot.priority === priority;
    });
  }, [lots, droppedItems, priority]);

  return (
    <div className={`flex-1 rounded-lg border ${backgroundColor} p-4 text-2xl font-bold`}>
      <div className="flex justify-between">
        <div className="">{title}</div>
        <div className="text-sm text-gray-500">Filter zone</div>
      </div>
      {availableLots.length > 0 ? (
        <div className={`flex flex-col gap-1 ${backgroundColor}`}>
          {availableLots.map((lot) => (
            <div key={lot.id} className="flex items-center gap-2">
              <DraggableLot key={lot.id} lot={lot} />
              <CommandeModal commande={lot.commande as TrpcCommande}>
                <Button variant="ghost" className="h-5 w-5">
                  <Eye size={16} />
                </Button>
              </CommandeModal>
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
