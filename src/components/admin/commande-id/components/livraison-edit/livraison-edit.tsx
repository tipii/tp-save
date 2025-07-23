'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
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
import { EditableLivraisonCard } from './editable-livraison-card';
import { TransferItemModal, TransferItemForm } from './transfer-item-modal';
import { Priority, Status } from '@/generated/prisma';

interface LivraisonEditProps {
  commandeId: string;
}

export function LivraisonEdit({ commandeId }: LivraisonEditProps) {
  const { commande, canEdit, refetchCommande } = useCommandeEdit(commandeId);
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

  const createLivraisonMutation = useMutation(trpc.livraisons.createLivraison.mutationOptions());
  const transferItemMutation = useMutation(trpc.livraisons.transferSingleItem.mutationOptions());
  const livraisons = commande?.livraisons || [];
  const parsedLivraisons = livraisons.map((livraison) => ({
    ...livraison,
    items:
      typeof livraison.items === 'string'
        ? (JSON.parse(livraison.items) as Item[])
        : (livraison.items as Item[]),
  }));

  const handleCreateLivraison = async () => {
    try {
      await createLivraisonMutation.mutateAsync({
        commandeId,
        name: `Livraison ${livraisons.length + 1}`,
        items: [],
      });
      refetchCommande();
      toast.success('Livraison créée', {
        description: 'La nouvelle livraison a été créée avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de créer la livraison',
      });
    }
  };

  const handleTransferItem = async (data: TransferItemForm) => {
    if (!transferModal.item || !transferModal.sourceLivraisonId) return;

    try {
      await transferItemMutation.mutateAsync({
        sourceLivraisonId: transferModal.sourceLivraisonId,
        targetLivraisonId: data.targetLivraisonId,
        itemName: transferModal.item.DL_Design,
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
              <Button
                size="sm"
                onClick={handleCreateLivraison}
                disabled={createLivraisonMutation.isPending}
              >
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
        {parsedLivraisons.map((livraison) => (
          <EditableLivraisonCard
            key={livraison.id}
            livraison={livraison}
            canEdit={canEdit}
            onTransferItem={(item) => openTransferModal(item, livraison.id)}
            availableLots={parsedLivraisons.filter((l) => l.id !== livraison.id)}
            refetchCommande={refetchCommande}
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
