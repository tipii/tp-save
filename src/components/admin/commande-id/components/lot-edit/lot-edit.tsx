'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { toast } from 'sonner';
import { Item } from '@/types/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus } from 'lucide-react';
import { useCommandeEdit } from '../../hooks/use-commande-edit';
import { LotCard } from './lot-card';
import { TransferItemModal } from './transfer-item-modal';
import { LotEditProps, TransferItemForm } from './types';

export function LotEdit({ commandeId }: LotEditProps) {
  const { commande, canEdit, refetchCommande } = useCommandeEdit(commandeId);
  const [editingLot, setEditingLot] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [transferModal, setTransferModal] = useState<{
    isOpen: boolean;
    item: Item | null;
    sourceLotId: string | null;
  }>({
    isOpen: false,
    item: null,
    sourceLotId: null,
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createLotMutation = useMutation(trpc.lots.createLot.mutationOptions());
  const updateLotMutation = useMutation(trpc.lots.updateLotItems.mutationOptions());
  const transferItemMutation = useMutation(trpc.lots.transferSingleItem.mutationOptions());
  const deleteLotMutation = useMutation(trpc.lots.deleteLot.mutationOptions());

  const lots = commande?.lots || [];
  const parsedLots = lots.map((lot) => ({
    ...lot,
    items:
      typeof lot.items === 'string' ? (JSON.parse(lot.items) as Item[]) : (lot.items as Item[]),
  }));

  const handleCreateLot = async () => {
    try {
      await createLotMutation.mutateAsync({
        commandeId,
        name: `Lot ${lots.length + 1}`,
        items: [],
      });
      refetchCommande();
      setShowCreateDialog(false);
      toast.success('Lot créé', {
        description: 'Le nouveau lot a été créé avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de créer le lot',
      });
    }
  };

  const handleUpdateLotItems = async (lotId: string, items: Item[]) => {
    try {
      await updateLotMutation.mutateAsync({
        lotId,
        items,
      });
      refetchCommande();
      setEditingLot(null);
      toast.success('Lot mis à jour', {
        description: 'Les éléments du lot ont été mis à jour avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de mettre à jour le lot',
      });
    }
  };

  const handleTransferItem = async (data: TransferItemForm) => {
    if (!transferModal.item || !transferModal.sourceLotId) return;

    try {
      await transferItemMutation.mutateAsync({
        sourceLotId: transferModal.sourceLotId,
        targetLotId: data.targetLotId,
        itemName: transferModal.item.name,
        quantity: data.quantity,
      });
      refetchCommande();
      setTransferModal({ isOpen: false, item: null, sourceLotId: null });
      toast.success('Élément transféré', {
        description: "L'élément a été transféré avec succès.",
      });
    } catch (error) {
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : "Impossible de transférer l'élément",
      });
    }
  };

  const handleDeleteLot = async (lotId: string) => {
    const lot = parsedLots.find((l) => l.id === lotId);
    if (lot && lot.items.length > 0) {
      toast.error('Impossible de supprimer', {
        description:
          "Le lot contient des éléments. Veuillez les transférer ou les supprimer d'abord.",
      });
      return;
    }

    try {
      await deleteLotMutation.mutateAsync({ lotId });
      refetchCommande();
      toast.success('Lot supprimé', {
        description: 'Le lot a été supprimé avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de supprimer le lot',
      });
    }
  };

  const openTransferModal = (item: Item, sourceLotId: string) => {
    setTransferModal({
      isOpen: true,
      item,
      sourceLotId,
    });
  };

  if (!commande) {
    return <div>Chargement...</div>;
  }

  return (
    <TooltipProvider>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Gestion des lots</h3>
          {canEdit && (
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Nouveau lot
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Créer un nouveau lot vide</p>
                  </TooltipContent>
                </Tooltip>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer un nouveau lot</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Un nouveau lot vide sera créé. Vous pourrez y ajouter des éléments après sa
                    création.
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateLot} disabled={createLotMutation.isPending}>
                      Créer le lot
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {parsedLots.map((lot, index) => (
            <LotCard
              key={lot.id}
              lot={lot}
              index={index}
              canEdit={canEdit}
              isEditing={editingLot === lot.id}
              onEdit={() => setEditingLot(lot.id)}
              onSave={(items) => handleUpdateLotItems(lot.id, items)}
              onCancel={() => setEditingLot(null)}
              onDelete={() => handleDeleteLot(lot.id)}
              onTransferItem={(item) => openTransferModal(item, lot.id)}
              availableLots={parsedLots.filter((l) => l.id !== lot.id)}
            />
          ))}
        </div>

        <TransferItemModal
          isOpen={transferModal.isOpen}
          onClose={() => setTransferModal({ isOpen: false, item: null, sourceLotId: null })}
          item={transferModal.item}
          sourceLotId={transferModal.sourceLotId}
          availableLots={parsedLots.filter((l) => l.id !== transferModal.sourceLotId)}
          onTransfer={handleTransferItem}
        />
      </div>
    </TooltipProvider>
  );
}
