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
import ChargementModal from '@/components/modals/chargement-modal/chargement-modal';
import DraggableLot from './draggable';
import { statusToIcon, statusToTailwindColor } from '@/components/ui/enum-to-ui';
import LivraisonModal from '@/components/modals/livraison-modal';
import Link from 'next/link';
import { cn, getUserInitials } from '@/lib/utils';
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
import {
  useCreateChargementMutation,
  useDeleteChargementMutation,
} from '../hooks/use-chargement-mutations';

export const DroppableLivreur = ({
  livreur,
  livraisons,
  selectedDate,
  onRemove,
}: {
  livreur: TrpcLivreur;
  livraisons: TrpcLivraison[];
  selectedDate: Date;
  onRemove: (livraisonId: string) => void;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${livreur.id}`,
  });

  // Get tmp chargement (PENDING status) for this livreur
  const tmpChargement = useMemo(() => {
    return livreur.chargements.find((c) => c.status === Status.PENDING);
  }, [livreur.chargements]);

  // Get livraisons from tmp chargement
  const tmpLivraisons = useMemo(() => {
    return tmpChargement?.livraisons || [];
  }, [tmpChargement]);

  const { mutate: deleteChargement } = useDeleteChargementMutation(selectedDate);
  const { mutate: createChargement } = useCreateChargementMutation(selectedDate);

  return (
    <div
      key={livreur.id}
      className="m-2 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-slate-100 text-slate-700">
              {getUserInitials(livreur.name)}
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
        {livreur.chargements
          .filter((c) => c.status === Status.DELIVERING || c.status === Status.READY)
          .map((chargement) => (
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
                          Êtes-vous sûr de vouloir supprimer le chargement "{chargement.name}" ?
                          Cette action est irréversible.
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
            {tmpLivraisons.map((livraison) => (
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
                    onClick={() => onRemove(livraison.id)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            ))}
            {tmpLivraisons.length === 0 && (
              <div className="text-xs text-slate-500">Déposer les commandes ici</div>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full bg-transparent"
          disabled={tmpLivraisons.length === 0}
          onClick={() => {
            createChargement({
              livreurId: livreur.id,
              dateLivraison: selectedDate,
            });
          }}
        >
          Valider
        </Button>
      </div>

      <div className="flex flex-col gap-1">
        {livreur.chargements
          .filter((c) => c.status === Status.DELIVERED)
          .map((chargement) => (
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
                          Êtes-vous sûr de vouloir supprimer le chargement "{chargement.name}" ?
                          Cette action est irréversible.
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
    </div>
  );
};
