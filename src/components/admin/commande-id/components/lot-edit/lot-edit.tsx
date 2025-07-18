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
import { EditableLotCard } from './editable-lot-card';
import { TransferItemModal, TransferItemForm } from './transfer-item-modal';

interface LotEditProps {
  commandeId: string;
}

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
        name: `Livraison ${lots.length + 1}`,
        items: [],
      });
      refetchCommande();
      setShowCreateDialog(false);
      toast.success('Livraison créée', {
        description: 'La nouvelle livraison a été créée avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de créer la livraison',
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
      toast.success('Livraison mise à jour', {
        description: 'Les éléments de la livraison ont été mis à jour avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description:
          error instanceof Error ? error.message : 'Impossible de mettre à jour la livraison',
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
      toast.success('Livraison supprimée', {
        description: 'La livraison a été supprimée avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description:
          error instanceof Error ? error.message : 'Impossible de supprimer la livraison',
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
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gestion des livraisons</h3>
        {canEdit && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" onClick={handleCreateLot} disabled={createLotMutation.isPending}>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle livraison
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Créer une nouvelle livraison</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {parsedLots.map((lot, index) => (
          <EditableLotCard
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
  );
}
