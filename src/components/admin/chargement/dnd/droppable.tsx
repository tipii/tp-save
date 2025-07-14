import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { TrpcLivreurs } from '@/trpc/types/types';
import { useDroppable } from '@dnd-kit/core';
import DraggableCommande, { Commande } from './draggable';
import { Eye, X } from 'lucide-react';
import { useMemo } from 'react';
import CommandeModal from '@/components/modals/commande-modal/commande-modal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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

  const livreurInitials = livreur.name
    .split(' ')
    .map((name) => name.charAt(0))
    .join('');
  return (
    <div
      key={livreur.id}
      className="m-2 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-2"
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-slate-100 text-slate-700">{livreurInitials}</AvatarFallback>
        </Avatar>
        <p className="font-bold text-slate-900">{livreur.name}</p>
      </div>
      <div
        ref={setNodeRef}
        className="rounded-lg border-2 border-dashed border-slate-200 p-2 text-center"
      >
        <h3 className="mb-1 text-sm font-medium text-slate-900">Chargement</h3>
        <div className="flex flex-col items-center justify-center gap-1 pb-4">
          {droppedCommandes.map((commande) => (
            <div key={commande.id} className="flex w-full items-center gap-2">
              <DraggableCommande key={commande.id} commande={commande} />
              <CommandeModal commande={commande}>
                <Button variant="ghost" className="h-5 w-5">
                  <Eye size={16} />
                </Button>
              </CommandeModal>
              <Button
                variant="ghost"
                className="h-5 w-5"
                onClick={() => onRemoveCommande(commande.id)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
          {droppedCommandes.length === 0 && (
            <div className="text-xs text-slate-500">Drop commands here</div>
          )}
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          Valider
        </Button>
      </div>
    </div>
  );
};
