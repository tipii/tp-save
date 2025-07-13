import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';
import DraggableCommande, { Commande } from './draggable';

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
    <Card className={`flex-1 rounded-2xl ${backgroundColor} p-4 text-2xl font-bold`}>
      <CardHeader className="flex justify-between">
        <CardTitle className="">{title}</CardTitle>
        <div className="text-sm text-gray-500">Filter zone</div>
      </CardHeader>
      <CardContent className="flex h-full w-full flex-col gap-x-4">
        {availableCommandes.map((commande) => (
          <DraggableCommande key={commande.id} commande={commande} />
        ))}
      </CardContent>
    </Card>
  );
};
