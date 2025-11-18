import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { TrpcCommande, TrpcLivraison, TrpcLivreur } from '@/types/trpc-types';
import { useDroppable } from '@dnd-kit/core';
import DraggableCommande from './draggable';
import {
  Check,
  CircleQuestionMark,
  Eye,
  EyeClosed,
  Trash,
  Truck,
  Warehouse,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import CommandeModal from '@/components/modals/commande-modal/commande-modal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import ChargementModal from '@/components/modals/chargement-modal/chargement-modal';
import DraggableLot from './draggable';
import { statusToIcon, statusToTailwindColor } from '@/components/ui/enum-to-ui';
import LivraisonModal from '@/components/modals/livraison-modal';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Status } from '@/generated/prisma';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { getTahitiToday } from '@/lib/date-utils';

export const DroppableLivreur = ({
  livreur,
  droppedItems,
  livraisons,
  onRemoveLivraison,
  setDroppedItems,
}: {
  livreur: TrpcLivreur;
  droppedItems: Record<string, string[]>;
  livraisons: TrpcLivraison[];
  onRemoveLivraison: (livraisonId: string) => void;
  setDroppedItems: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}) => {
  const trpc = useTRPC();
  const { refetch } = useQuery(
    trpc.livreurs.getLivreurs.queryOptions(undefined, {
      refetchInterval: 1000 * 10, // 30 seconds
    }),
  );
  const { refetch: refetchLots } = useQuery(trpc.livraisons.getPendingLivraisons.queryOptions({}));

  const { data: livraisonsEnRetard, refetch: refetchLivraisonsEnRetard } = useQuery(
    trpc.livraisons.getLivraisonsEnRetard.queryOptions(undefined, {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 10, // 10 seconds
      refetchIntervalInBackground: true,
    }),
  );

  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${livreur.id}`,
  });

  const droppedLivraisons = useMemo(() => {
    const droppedLotIds = droppedItems[`droppable-${livreur.id}`] || [];
    return droppedLotIds
      .map((lotId) => livraisons.find((c) => c.id === lotId))
      .filter((lot): lot is TrpcLivraison => lot !== undefined);
  }, [droppedItems, livreur.id, livraisons]);

  const livreurInitials = livreur.name
    .split(' ')
    .map((name: string) => name.charAt(0))
    .join('');

  const { mutate: deleteChargement } = useMutation(
    trpc.chargements.deleteChargement.mutationOptions({
      onSuccess: () => {
        toast.success('Chargement supprimé avec succès');
      },
      onError: (error) => {
        console.error(error);
        toast.error('Erreur lors de la suppression du chargement');
      },
      onSettled: () => {
        refetchLivraisonsEnRetard();
        refetchLots();
        refetch();
      },
    }),
  );
  const { mutate } = useMutation(
    trpc.chargements.createChargement.mutationOptions({
      onSuccess: (data) => {
        if (data.success) {
          toast.success('Chargement créé avec succès');

          // Only clear items from this droppable zone
          setDroppedItems((prev) => {
            const newItems = { ...prev };
            delete newItems[`droppable-${livreur.id}`];
            return newItems;
          });
        } else {
          toast.error('Erreur lors de la création du chargement');
        }
      },
      onError: (error) => {
        console.error(error);
      },
      onSettled: () => {
        refetchLivraisonsEnRetard();
        refetchLots();
        refetch();
      },
    }),
  );
  const handleCreateChargement = (lotIds: string[], livreurId: string) => {
    mutate(
      {
        livraisons: lotIds,
        livreurId,
      },
      {
        onSuccess: () => {
          refetch();
          refetchLots();
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <div
      key={livreur.id}
      className="m-2 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-slate-100 text-slate-700">
              {livreurInitials}
            </AvatarFallback>
          </Avatar>
          <p className="font-bold text-slate-900">{livreur.name}</p>
        </div>
        <Link href={`/app/livreurs/${livreur.id}`}>
          <Button variant="ghost" size="icon">
            <Eye size={16} />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-1">
        {livreur.chargements.map((chargement) => (
          <div
            key={chargement.id}
            className={cn(
              'flex items-center justify-between gap-2 rounded-sm border px-2',
              statusToTailwindColor(chargement.status).border,
              statusToTailwindColor(chargement.status).background,
            )}
          >
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-500">{statusToIcon(chargement.status)}</p>
              <p className="text-sm">{chargement.name}</p>
            </div>
            <div className="flex items-center">
              {chargement.status === Status.READY && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer le chargement "{chargement.name}" ? Cette
                        action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          deleteChargement({ id: chargement.id });
                        }}
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <ChargementModal chargementId={chargement.id}>
                <Button variant="ghost" size="icon">
                  <Eye size={16} />
                </Button>
              </ChargementModal>
            </div>
          </div>
        ))}
      </div>
      <div
        ref={setNodeRef}
        className="flex flex-1 flex-col items-center rounded-lg border-2 border-dashed border-slate-200 p-2 text-center"
      >
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          <h3 className="mb-1 text-sm font-bold text-slate-900">Chargement</h3>
          <div className="flex w-full flex-col items-center justify-center gap-1 pb-4">
            {droppedLivraisons.map((livraison) => (
              <div key={livraison.id} className="flex w-full items-center">
                <DraggableLot key={livraison.id} livraison={livraison} />
                <div className="">
                  <LivraisonModal livraison={livraison}>
                    <Button variant="ghost" className="h-5 w-5">
                      <Eye size={16} />
                    </Button>
                  </LivraisonModal>
                  <Button
                    variant="ghost"
                    className="h-5 w-5"
                    onClick={() => onRemoveLivraison(livraison.id)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ))}
            {droppedLivraisons.length === 0 && (
              <div className="text-xs text-slate-500">Déposer les commandes ici</div>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => {
            const commandeIds = droppedLivraisons.map((livraison) => livraison.id);

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
