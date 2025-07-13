import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { TrpcLivreurs } from '@/trpc/types/types';
import { useDroppable } from '@dnd-kit/core';
import DraggableCommande, { Commande } from './draggable';
import { X } from 'lucide-react';
import { useMemo } from 'react';

export const DroppableLivreur = ({
  livreur,
  droppedItems,
  commandes,
  onRemoveCommande,
}: {
  livreur: TrpcLivreurs;
  droppedItems: Record<string, string[]>;
  commandes: Commande[];
  onRemoveCommande: (commandeId: string) => void;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${livreur.id}`,
  });

  const droppedCommandes = useMemo(() => {
    const droppedCommandIds = droppedItems[`droppable-${livreur.id}`] || [];
    return droppedCommandIds
      .map((commandId: string) => commandes.find((c) => c.id === commandId))
      .filter((commande): commande is Commande => commande !== undefined);
  }, [droppedItems, livreur.id, commandes]);

  return (
    <Card
      key={livreur.id}
      className="m-2 flex w-md flex-col gap-4 rounded-2xl border border-gray-200 p-2"
    >
      <CardHeader className="flex items-center gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium">{livreur.name}</p>
        </div>
      </CardHeader>
      <div
        ref={setNodeRef}
        className="mx-2 flex flex-1 flex-col justify-between gap-2 rounded-md bg-gray-100 p-2"
      >
        <h3 className="text-sm font-medium">Chargement</h3>
        <div className="flex flex-col items-center justify-center gap-1 pb-4">
          {droppedCommandes.map((commande) => (
            <div key={commande.id} className="flex w-full items-center gap-2">
              <Button
                variant="ghost"
                className="h-5 w-5"
                onClick={() => onRemoveCommande(commande.id)}
              >
                <X size={16} />
              </Button>
              <DraggableCommande key={commande.id} commande={commande} />
            </div>
          ))}
          {droppedCommandes.length === 0 && (
            <div className="text-sm text-gray-400">Drop commands here</div>
          )}
        </div>

        <Button variant="outline">Valider</Button>
      </div>
    </Card>
  );
};
