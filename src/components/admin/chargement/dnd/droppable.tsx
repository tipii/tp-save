import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { TrpcCommandes, TrpcLivreurs } from '@/trpc/types/types';
import { useDroppable } from '@dnd-kit/core';
import DraggableCommande from './draggable';
import { Check, CircleQuestionMark, Eye, EyeClosed, Truck, Warehouse, X } from 'lucide-react';
import { useMemo } from 'react';
import CommandeModal from '@/components/modals/commande-modal/commande-modal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export const DroppableLivreur = ({
  livreur,
  droppedItems,
  commandes,
  onRemoveCommande,
  setDroppedItems,
}: {
  livreur: TrpcLivreurs;
  droppedItems: Record<string, string[]>;
  commandes: TrpcCommandes[];
  onRemoveCommande: (commandeId: string) => void;
  setDroppedItems: (items: Record<string, string[]>) => void;
}) => {
  const trpc = useTRPC();
  const { refetch } = useQuery(trpc.livreurs.getLivreurs.queryOptions());
  const { refetch: refetchCommandes } = useQuery(trpc.commandes.getCommandes.queryOptions());

  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${livreur.id}`,
  });

  const droppedCommandes = useMemo(() => {
    const droppedCommandIds = droppedItems[`droppable-${livreur.id}`] || [];
    return droppedCommandIds
      .map((commandId: string) => commandes.find((c) => c.id === commandId))
      .filter((commande): commande is TrpcCommandes => commande !== undefined);
  }, [droppedItems, livreur.id, commandes]);

  const livreurInitials = livreur.name
    .split(' ')
    .map((name) => name.charAt(0))
    .join('');

  const { mutate } = useMutation(
    trpc.chargements.createChargement.mutationOptions({
      onSuccess: (data) => {
        if (data.success) {
          toast.success('Chargement créé avec succès');
          refetch();
          refetchCommandes();
          setDroppedItems({});
        } else {
          toast.error('Erreur lors de la création du chargement');
        }
      },
      onError: (error) => {
        console.error(error);
      },
    }),
  );
  const handleCreateChargement = (commandeIds: string[], livreurId: string) => {
    mutate({
      commandes: commandeIds,
      livreurId,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <Warehouse size={16} />;
      case 'delivering':
        return <Truck size={16} />;
      case 'delivered':
        return <Check size={16} />;
      default:
        return <CircleQuestionMark size={16} />;
    }
  };
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
      <div className="flex flex-col gap-1">
        {livreur.chargements.map((chargement) => (
          <div
            key={chargement.id}
            className="flex items-center justify-between gap-2 rounded-sm border border-emerald-200 bg-emerald-50 px-2"
          >
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-500">{getStatusIcon(chargement.status)}</p>
              <p className="text-sm">{chargement.name}</p>
            </div>
            <Button variant="ghost" size="icon">
              <Eye size={16} />
            </Button>
          </div>
        ))}
      </div>
      <div
        ref={setNodeRef}
        className="rounded-lg border-2 border-dashed border-slate-200 p-2 text-center"
      >
        <h3 className="mb-1 text-sm font-medium text-slate-900">Chargement</h3>
        <div className="flex flex-col items-center justify-center gap-1 pb-4">
          {droppedCommandes.map((commande) => (
            <div key={commande.id} className="flex w-full items-center">
              <DraggableCommande key={commande.id} commande={commande} />
              <div className="">
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
            </div>
          ))}
          {droppedCommandes.length === 0 && (
            <div className="text-xs text-slate-500">Déposer les commandes ici</div>
          )}
        </div>

        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => {
            const commandeIds = droppedCommandes.map((commande) => commande.id);

            handleCreateChargement(commandeIds, livreur.id);
            console.log(
              `Livreur ${livreur.name} (${livreur.id}) - Commandes validées:`,
              commandeIds,
            );
          }}
        >
          Valider
        </Button>
      </div>
    </div>
  );
};
