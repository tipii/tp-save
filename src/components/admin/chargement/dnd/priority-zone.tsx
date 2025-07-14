import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';
import DraggableCommande, { Commande } from './draggable';
import CommandeModal from '@/components/modals/commande-modal/commande-modal';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface PriorityZoneProps {
  title: string;
  priority: string;
  backgroundColor: string;
  commandes: Commande[];
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
      <div className="flex h-full w-full flex-col gap-2">
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
    </div>
  );
};
