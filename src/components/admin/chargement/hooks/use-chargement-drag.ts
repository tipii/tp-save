import { useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { Priority } from '@/generated/prisma';
import { TrpcLivraison, TrpcLivreur } from '@/types/trpc-types';
import { toast } from 'sonner';
import {
  useChangePriorityMutation,
  useAddToTmpMutation,
  useRemoveFromTmpMutation,
  useMoveToAnotherTmpMutation,
} from './use-chargement-mutations';

export function useChargementDrag(
  selectedDate: Date,
  livraisons: TrpcLivraison[] | undefined,
  livraisonsEnRetard: TrpcLivraison[] | undefined,
  livreurs: TrpcLivreur[] | undefined,
) {
  const [isDragging, setIsDragging] = useState(false);

  const changePriorityMutation = useChangePriorityMutation(selectedDate);
  const addToTmpMutation = useAddToTmpMutation(selectedDate);
  const removeFromTmpMutation = useRemoveFromTmpMutation(selectedDate);
  const moveToAnotherTmpMutation = useMoveToAnotherTmpMutation(selectedDate);

  function handleDragStart() {
    setIsDragging(true);
  }

  function handlePriorityChange(livraisonId: string, newPriority: Priority) {
    changePriorityMutation.mutate({ livraisonId, priority: newPriority });
  }

  function handleDragEnd(event: DragEndEvent) {
    setIsDragging(false);

    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    const livraisonId = activeId.replace('draggable-', '');

    // Determine source zone
    const isFromLateZone = !!livraisonsEnRetard?.find((l) => l.id === livraisonId);
    const isFromPriorityZone = !isFromLateZone && !!livraisons?.find((l) => l.id === livraisonId);

    // Find which livreur the livraison is currently in (if any)
    const sourceLivreur = livreurs?.find((livreur) =>
      livreur.chargements.some(
        (c) => c.status === 'PENDING' && c.livraisons.some((l) => l.id === livraisonId),
      ),
    );

    // 1. Priority zone drops
    if (overId.startsWith('priority-')) {
      // Prevent dropping non-LATE items into LATE zone
      if (overId === 'priority-LATE' && !isFromLateZone) {
        toast.error('Cette zone est réservée aux livraisons en retard');
        return;
      }

      // Prevent dropping LATE items into other priority zones
      if (isFromLateZone && overId !== 'priority-LATE') {
        toast.error(
          'Les livraisons en retard ne peuvent être déposées que dans les zones de chargement',
        );
        return;
      }

      // If dropping from a livreur zone back to priority zone
      if (sourceLivreur) {
        // Get the new priority if not LATE zone
        const newPriority =
          overId !== 'priority-LATE' ? (overId.replace('priority-', '') as Priority) : undefined;

        // Remove from tmp chargement (with optimistic priority update)
        removeFromTmpMutation.mutate({
          livraisonId,
          livreurId: sourceLivreur.id,
          dateLivraison: selectedDate,
          newPriority,
        });

        // Also call the actual priority change mutation if needed
        if (newPriority) {
          handlePriorityChange(livraisonId, newPriority);
        }

        return;
      }

      // If dropping LATE item back into LATE zone, do nothing
      if (isFromLateZone && overId === 'priority-LATE') {
        return;
      }

      // Regular priority change
      const newPriority = overId.replace('priority-', '') as Priority;
      handlePriorityChange(livraisonId, newPriority);
      return;
    }

    // 2. Livreur zone drops
    if (overId.startsWith('droppable-')) {
      const toLivreurId = overId.replace('droppable-', '');

      // Case A: Dragging FROM priority zones → ADD to tmp chargement
      if (isFromPriorityZone || isFromLateZone) {
        addToTmpMutation.mutate({
          livraisonId,
          livreurId: toLivreurId,
          dateLivraison: selectedDate,
        });
        return;
      }

      // Case B: Dragging FROM another livreur zone → MOVE between tmp chargements
      if (sourceLivreur && sourceLivreur.id !== toLivreurId) {
        moveToAnotherTmpMutation.mutate({
          livraisonId,
          fromLivreurId: sourceLivreur.id,
          toLivreurId: toLivreurId,
          dateLivraison: selectedDate,
        });
        return;
      }

      // Case C: Dragging within same livreur zone → Do nothing
      if (sourceLivreur && sourceLivreur.id === toLivreurId) {
        return;
      }
    }
  }

  return {
    isDragging,
    handleDragStart,
    handleDragEnd,
  };
}
