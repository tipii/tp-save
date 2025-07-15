import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';
import DraggableCommande from './draggable';
import CommandeModal from '@/components/modals/commande-modal/commande-modal';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { TrpcCommandes } from '@/trpc/types/types';

interface PriorityZoneProps {
  title: string;
  priority: string;
  backgroundColor: string;
  commandes: TrpcCommandes[];
  droppedItems: Record<string, string[]>;
}

export const PriorityZone = ({
  title,
  priority,
  backgroundColor,
  commandes,
  droppedItems,
}: PriorityZoneProps) => {
  const availableCommandes = useMemo(() => {
    return commandes.filter((commande) => {
      // Check if this command is already dropped in any livreur zone
      const isDropped = Object.values(droppedItems).some((items) => items.includes(commande.id));
      return !isDropped && commande.priority === priority;
    });
  }, [commandes, droppedItems, priority]);

  return (
    <div className={`flex-1 rounded-lg border ${backgroundColor} p-4 text-2xl font-bold`}>
      <div className="flex justify-between">
        <div className="">{title}</div>
        <div className="text-sm text-gray-500">Filter zone</div>
      </div>
      {availableCommandes.length > 0 ? (
        <div className={`grid grid-cols-1 gap-2 2xl:grid-cols-2 ${backgroundColor}`}>
          {availableCommandes.map((commande) => (
            <div key={commande.id} className="flex items-center gap-2">
              <DraggableCommande key={commande.id} commande={commande} />
              <CommandeModal commande={commande}>
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
