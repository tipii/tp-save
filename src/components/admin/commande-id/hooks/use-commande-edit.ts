'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useUser } from '@/hooks/use-user';
import { toast } from 'sonner';

export function useCommandeEdit(commandeId: string) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTimer, setEditTimer] = useState<number | null>(null);

  const trpc = useTRPC();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: commande, refetch } = useQuery(
    trpc.commandes.getCommandeById.queryOptions({ id: commandeId }),
  );

  const enableEditMutation = useMutation(trpc.commandes.enableEdit.mutationOptions());
  const disableEditMutation = useMutation(trpc.commandes.disableEdit.mutationOptions());
  const updateMutation = useMutation(trpc.commandes.updateCommande.mutationOptions());

  // Edit timer countdown
  useEffect(() => {
    if (commande?.lockedUntil && commande.lockedBy === user?.id) {
      const updateTimer = () => {
        const now = new Date().getTime();
        const editUntil = new Date(commande.lockedUntil!).getTime();
        const timeLeft = Math.max(0, editUntil - now);
        setEditTimer(timeLeft);

        if (timeLeft === 0) {
          setIsEditing(false);
          refetch();
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    } else {
      setEditTimer(null);
    }
  }, [commande?.lockedUntil, commande?.lockedBy, user?.id, refetch]);

  const enableEdit = async () => {
    try {
      await enableEditMutation.mutateAsync({ id: commandeId });
      setIsEditing(true);
      refetch();
      toast.success('Commande déverrouillée', {
        description: 'Vous pouvez maintenant modifier cette commande.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description:
          error instanceof Error ? error.message : 'Impossible de déverrouiller la commande',
      });
    }
  };

  const disableEdit = async () => {
    try {
      await disableEditMutation.mutateAsync({ id: commandeId });
      setIsEditing(false);
      refetch();
      toast.success('Commande verrouillée', {
        description: "Le mode d'édition a été désactivé.",
      });
    } catch (error) {
      toast.error('Erreur', {
        description:
          error instanceof Error ? error.message : 'Impossible de verrouiller la commande',
      });
    }
  };

  const updateCommande = async (data: any) => {
    try {
      await updateMutation.mutateAsync({
        id: commandeId,
        ...data,
      });
      refetch();
      toast.success('Commande mise à jour', {
        description: 'Les modifications ont été enregistrées avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description:
          error instanceof Error ? error.message : 'Impossible de mettre à jour la commande',
      });
    }
  };

  const isUnlockedByCurrentUser = commande?.lockedBy === user?.id;
  const isUnlockedByOther = commande?.lockedBy && !isUnlockedByCurrentUser;
  const canEdit = isUnlockedByCurrentUser && isEditing;

  return {
    commande,
    isEditing,
    editTimer,
    canEdit,
    isUnlockedByCurrentUser,
    isUnlockedByOther,
    enableEdit,
    disableEdit,
    updateCommande,
    isLoading: !commande,
    mutations: {
      enableEdit: enableEditMutation,
      disableEdit: disableEditMutation,
      update: updateMutation,
    },
  };
}
