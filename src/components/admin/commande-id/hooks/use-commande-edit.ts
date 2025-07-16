'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useUser } from '@/hooks/use-user';
import { toast } from 'sonner';
import { Priority, Status } from '@/types/enums';
import { Item } from '@/types/types';

export function useCommandeEdit(commandeId: string) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTimer, setEditTimer] = useState<number | null>(null);

  const trpc = useTRPC();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: commande, refetch: refetchCommande } = useQuery(
    trpc.commandes.getCommandeById.queryOptions({ id: commandeId }),
  );

  // Sync isEditing state with server state when commande data changes
  useEffect(() => {
    if (commande && user) {
      const isUnlockedByCurrentUser = commande.lockedBy === user.id;
      const hasValidLock = commande.lockedUntil && new Date(commande.lockedUntil) > new Date();
      setIsEditing(isUnlockedByCurrentUser && Boolean(hasValidLock));
    } else {
      setIsEditing(false);
    }
  }, [commande, user]);

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
          refetchCommande();
        }
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    } else {
      setEditTimer(null);
    }
  }, [commande?.lockedUntil, commande?.lockedBy, user?.id, refetchCommande]);

  const enableEdit = async () => {
    await enableEditMutation.mutateAsync(
      { id: commandeId },
      {
        onError: (error) => {
          toast.error('Erreur', {
            description:
              error instanceof Error ? error.message : 'Impossible de déverrouiller la commande',
          });
        },
        onSuccess: () => {
          setIsEditing(true);
          refetchCommande();
          toast.success('Commande déverrouillée', {
            description: 'Vous pouvez maintenant modifier cette commande.',
          });
        },
      },
    );
  };

  const disableEdit = async () => {
    await disableEditMutation.mutateAsync(
      { id: commandeId },
      {
        onError: (error) => {
          toast.error('Erreur', {
            description:
              error instanceof Error ? error.message : 'Impossible de verrouiller la commande',
          });
        },
        onSuccess: () => {
          setIsEditing(false);
          refetchCommande();
          toast.success('Commande verrouillée', {
            description: "Le mode d'édition a été désactivé.",
          });
        },
      },
    );
  };

  const updateCommande = async (data: { ref?: string; priority?: Priority; status?: Status }) => {
    await updateMutation.mutateAsync(
      {
        id: commandeId,
        ...data,
      },
      {
        onError: (error) => {
          toast.error('Erreur', {
            description:
              error instanceof Error ? error.message : 'Impossible de mettre à jour la commande',
          });
        },
        onSuccess: () => {
          refetchCommande();
          toast.success('Commande mise à jour', {
            description: 'Les modifications ont été enregistrées avec succès.',
          });
        },
      },
    );
  };

  const isUnlockedByCurrentUser = commande?.lockedBy === user?.id;
  const isUnlockedByOther = commande?.lockedBy && !isUnlockedByCurrentUser;
  const canEdit = isUnlockedByCurrentUser && isEditing;

  return {
    commande,
    refetchCommande,
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
