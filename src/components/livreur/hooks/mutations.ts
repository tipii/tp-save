import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Status } from '@/generated/prisma';
import { toast } from 'sonner';

export function useUpdateChargementStatusMutation() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation({
    ...trpc.livreursChargements.updateChargementStatus.mutationOptions(),
    onSuccess: (_data, variables) => {
      if (variables.status === Status.DELIVERING) {
        toast.success('Chargement pris en charge');
      }
      // Invalidate both active and available chargements
      queryClient.invalidateQueries({
        queryKey: trpc.livreursChargements.getActiveChargement.queryKey(),
      });
      queryClient.invalidateQueries({
        queryKey: trpc.livreursChargements.getAvailableChargements.queryKey(),
      });
    },
    onError: () => {
      toast.error('Erreur lors de la mise à jour du chargement');
    },
  });
}

export function useDeliverLivraisonMutation() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation({
    ...trpc.livreursLivraisons.deliverLivraison.mutationOptions(),
    onSuccess: (data) => {
      if (data.allLivraisonsDelivered) {
        toast.success('Chargement terminé');
      } else {
        toast.success('Livraison validée avec succès');
      }
      // Refetch active chargement to get updated livraisons
      queryClient.invalidateQueries({
        queryKey: trpc.livreursChargements.getActiveChargement.queryKey(),
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useReturnLivraisonMutation() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation({
    ...trpc.livreursLivraisons.returnLivraison.mutationOptions(),
    onSuccess: () => {
      toast.success('Livraison à retourner au depot');
      queryClient.invalidateQueries({
        queryKey: trpc.livreursChargements.getActiveChargement.queryKey(),
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useReturnLivraisonToDepotMutation() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation({
    ...trpc.livreursLivraisons.returnLivraisonToDepot.mutationOptions(),
    onSuccess: () => {
      toast.success('Livraison retournée au dépôt');
      queryClient.invalidateQueries({
        queryKey: trpc.livreursChargements.getActiveChargement.queryKey(),
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useReturnItemsMutation() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation({
    ...trpc.livreursLivraisons.returnItems.mutationOptions(),
    onSuccess: () => {
      toast.success('Articles retournés');
      queryClient.invalidateQueries({
        queryKey: trpc.livreursChargements.getActiveChargement.queryKey(),
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
