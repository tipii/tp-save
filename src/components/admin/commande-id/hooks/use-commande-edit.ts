'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useUser } from '@/hooks/use-user';
import { toast } from 'sonner';
import { Priority, Status } from '@/generated/prisma';

export function useCommandeEdit(commandeId: string) {
  const trpc = useTRPC();

  const { data: commande, refetch: refetchCommande } = useQuery(
    trpc.commandes.getCommandeById.queryOptions({ id: commandeId }),
  );

  const updateMutation = useMutation(trpc.commandes.updateCommande.mutationOptions());

  const updateCommande = async (data: {
    name?: string;
    priority?: Priority;
    status?: Status;
    orderReceivedById?: string;
    orderTransmittedById?: string;
    orderReceptionMode?: string;
    orderReceptionDate?: Date;
  }) => {
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
        onSuccess: async () => {
          refetchCommande();
          toast.success('Commande mise à jour', {
            description: 'Les modifications ont été enregistrées avec succès.',
          });
        },
      },
    );
  };

  return {
    commande,
    refetchCommande,
    updateCommande,
    isLoading: !commande,
    mutations: {
      update: updateMutation,
    },
  };
}
