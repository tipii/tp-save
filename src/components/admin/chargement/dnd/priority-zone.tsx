import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';
import CommandeModal from '@/components/modals/commande-modal/commande-modal';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { TrpcCommande, TrpcLivraison } from '@/types/trpc-types';
import DraggableLot from './draggable';

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
  const availableLots = useMemo(() => {
    return livraisons.filter((livraison) => {
      // Check if this command is already dropped in any livreur zone
      const isDropped = Object.values(droppedItems).some((items) => items.includes(livraison.id));
      return !isDropped && livraison.priority === priority;
    });
  }, [livraisons, droppedItems, priority]);

  console.log(livraisons, availableLots);
  return (
    <div className={`flex-1 rounded-lg border ${backgroundColor} p-4 text-2xl font-bold`}>
      <div className="flex justify-between">
        <div className="">{title}</div>
        <div className="text-sm text-gray-500">Filter zone</div>
      </div>
      {availableLots.length > 0 ? (
        <div className={`flex flex-col gap-1 ${backgroundColor}`}>
          {availableLots.map((livraison) => (
            <div key={livraison.id} className="flex items-center gap-2">
              <DraggableLot key={livraison.id} livraison={livraison} />
              <CommandeModal commande={livraison.commande as TrpcCommande}>
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
