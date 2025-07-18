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
import { EditableLotCard } from './editable-livraison-card';
import { TransferItemModal, TransferItemForm } from './transfer-item-modal';

interface LivraisonEditProps {
  commandeId: string;
}

export function LivraisonEdit({ commandeId }: LivraisonEditProps) {
  const { commande, canEdit, refetchCommande } = useCommandeEdit(commandeId);
  const [editingLot, setEditingLot] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [transferModal, setTransferModal] = useState<{
    isOpen: boolean;
    item: Item | null;
    sourceLivraisonId: string | null;
  }>({
    isOpen: false,
    item: null,
    sourceLivraisonId: null,
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createLotMutation = useMutation(trpc.livraisons.createLivraison.mutationOptions());
  const updateLotMutation = useMutation(trpc.livraisons.updateLivraisonItems.mutationOptions());
  const transferItemMutation = useMutation(trpc.livraisons.transferSingleItem.mutationOptions());
  const deleteLotMutation = useMutation(trpc.livraisons.deleteLivraison.mutationOptions());

  const livraisons = commande?.livraisons || [];
  const parsedLivraisons = livraisons.map((livraison) => ({
    ...livraison,
    items:
      typeof livraison.items === 'string'
        ? (JSON.parse(livraison.items) as Item[])
        : (livraison.items as Item[]),
  }));

  const handleCreateLot = async () => {
    try {
      await createLotMutation.mutateAsync({
        commandeId,
        name: `Livraison ${livraisons.length + 1}`,
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

  const handleUpdateLotItems = async (livraisonId: string, items: Item[]) => {
    try {
      await updateLotMutation.mutateAsync({
        livraisonId,
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
    if (!transferModal.item || !transferModal.sourceLivraisonId) return;

    try {
      await transferItemMutation.mutateAsync({
        sourceLivraisonId: transferModal.sourceLivraisonId,
        targetLivraisonId: data.targetLivraisonId,
        itemName: transferModal.item.name,
        quantity: data.quantity,
      });
      refetchCommande();
      setTransferModal({ isOpen: false, item: null, sourceLivraisonId: null });
      toast.success('Élément transféré', {
        description: "L'élément a été transféré avec succès.",
      });
    } catch (error) {
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : "Impossible de transférer l'élément",
      });
    }
  };

  const handleDeleteLot = async (livraisonId: string) => {
    const livraison = parsedLivraisons.find((l) => l.id === livraisonId);
    if (livraison && livraison.items.length > 0) {
      toast.error('Impossible de supprimer', {
        description:
          "Le lot contient des éléments. Veuillez les transférer ou les supprimer d'abord.",
      });
      return;
    }

    try {
      await deleteLotMutation.mutateAsync({ livraisonId });
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

  const openTransferModal = (item: Item, sourceLivraisonId: string) => {
    setTransferModal({
      isOpen: true,
      item,
      sourceLivraisonId,
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
        {parsedLivraisons.map((livraison, index) => (
          <EditableLotCard
            key={livraison.id}
            lot={livraison}
            index={index}
            canEdit={canEdit}
            isEditing={editingLot === livraison.id}
            onEdit={() => setEditingLot(livraison.id)}
            onSave={(items) => handleUpdateLotItems(livraison.id, items)}
            onCancel={() => setEditingLot(null)}
            onDelete={() => handleDeleteLot(livraison.id)}
            onTransferItem={(item) => openTransferModal(item, livraison.id)}
            availableLots={parsedLivraisons.filter((l) => l.id !== livraison.id)}
          />
        ))}
      </div>

      <TransferItemModal
        isOpen={transferModal.isOpen}
        onClose={() => setTransferModal({ isOpen: false, item: null, sourceLivraisonId: null })}
        item={transferModal.item}
        sourceLivraisonId={transferModal.sourceLivraisonId}
        availableLivraisons={parsedLivraisons.filter(
          (l) => l.id !== transferModal.sourceLivraisonId,
        )}
        onTransfer={handleTransferItem}
      />
    </div>
  );
}
