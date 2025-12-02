import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Priority } from '@/generated/prisma';
import { toast } from 'sonner';
import { TrpcLivraison } from '@/types/trpc-types';

export function useChangePriorityMutation(selectedDate: Date) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.livraisons.changePriority.mutationOptions({
      onMutate: async (variables) => {
        const queryKey = trpc.livraisons.getPendingLivraisons.queryKey({
          expectedDeliveryDate: selectedDate,
        });

        await queryClient.cancelQueries({ queryKey });

        const previousLivraisons = queryClient.getQueryData(queryKey);

        queryClient.setQueryData(queryKey, (old) => {
          return old?.map((livraison) => {
            if (livraison.id === variables.livraisonId) {
              return { ...livraison, priority: variables.priority };
            }
            return livraison;
          });
        });

        return { previousLivraisons };
      },
      onSuccess: () => {
        toast.success('Priorité modifiée avec succès');
      },
      onError: (error, variables, context) => {
        toast.error('Erreur lors de la modification de la priorité');
        console.error(error);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.livraisons.getPendingLivraisons.queryKey({
            expectedDeliveryDate: selectedDate,
          }),
        });
      },
    }),
  );
}

export function useAddToTmpMutation(selectedDate: Date) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation({
    ...trpc.chargements.addToTmpChargement.mutationOptions(),
    onMutate: async (variables) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({
        queryKey: trpc.livraisons.getPendingLivraisons.queryKey({
          expectedDeliveryDate: selectedDate,
        }),
      });
      await queryClient.cancelQueries({
        queryKey: trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      });

      // Get previous data for rollback
      const previousLivraisons = queryClient.getQueryData(
        trpc.livraisons.getPendingLivraisons.queryKey({ expectedDeliveryDate: selectedDate }),
      );
      const previousLivreurs = queryClient.getQueryData(
        trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      );

      // Optimistic update 1: Remove from priority zones
      queryClient.setQueryData(
        trpc.livraisons.getPendingLivraisons.queryKey({ expectedDeliveryDate: selectedDate }),
        (old) => old?.filter((l) => l.id !== variables.livraisonId),
      );

      // Optimistic update 2: Add to livreur's tmp chargement
      queryClient.setQueryData(
        trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
        (old) => {
          if (!old) return old;

          return old.map((livreur) => {
            if (livreur.id !== variables.livreurId) return livreur;

            // Find the livraison to add
            const livraison = previousLivraisons?.find((l) => l.id === variables.livraisonId);
            if (!livraison) return livreur;

            // Find or create tmp chargement
            const tmpChargement = livreur.chargements.find((c) => c.status === 'PENDING');

            if (tmpChargement) {
              // Add to existing tmp chargement
              return {
                ...livreur,
                chargements: livreur.chargements.map((c) =>
                  c.id === tmpChargement.id
                    ? { ...c, livraisons: [...c.livraisons, livraison] }
                    : c,
                ),
              };
            } else {
              // Create new tmp chargement
              return {
                ...livreur,
                chargements: [
                  {
                    id: 'temp-' + Date.now(),
                    name: 'Tmp Chargement ' + livreur.name,
                    status: 'PENDING' as const,
                    dateLivraison: selectedDate,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    livreurId: livreur.id,
                    livraisons: [livraison],
                  },
                  ...livreur.chargements,
                ],
              };
            }
          });
        },
      );

      return { previousLivraisons, previousLivreurs };
    },
    onSuccess: () => {
      toast.success('Livraison ajoutée au chargement');
    },
    onError: (_error, _variables, context) => {
      toast.error("Erreur lors de l'ajout au chargement");
      // Rollback on error
      if (context?.previousLivraisons) {
        queryClient.setQueryData(
          trpc.livraisons.getPendingLivraisons.queryKey({ expectedDeliveryDate: selectedDate }),
          context.previousLivraisons,
        );
      }
      if (context?.previousLivreurs) {
        queryClient.setQueryData(
          trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
          context.previousLivreurs,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.livraisons.getPendingLivraisons.queryKey({
          expectedDeliveryDate: selectedDate,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      });
    },
  });
}

export function useRemoveFromTmpMutation(selectedDate: Date) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation({
    ...trpc.chargements.removeFromTmpChargement.mutationOptions(),
    onMutate: async (variables) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({
        queryKey: trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      });
      await queryClient.cancelQueries({
        queryKey: trpc.livraisons.getPendingLivraisons.queryKey({
          expectedDeliveryDate: selectedDate,
        }),
      });

      // Get previous data for rollback
      const previousLivreurs = queryClient.getQueryData(
        trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      );
      const previousLivraisons = queryClient.getQueryData(
        trpc.livraisons.getPendingLivraisons.queryKey({ expectedDeliveryDate: selectedDate }),
      );

      // Optimistic update 1: Remove from livreur's tmp chargement
      queryClient.setQueryData(
        trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
        (old) => {
          if (!old) return old;

          return old.map((livreur) => {
            if (livreur.id !== variables.livreurId) return livreur;

            return {
              ...livreur,
              chargements: livreur.chargements
                .map((chargement) => {
                  if (chargement.status !== 'PENDING') return chargement;

                  const updatedLivraisons = chargement.livraisons.filter(
                    (l) => l.id !== variables.livraisonId,
                  );

                  // If chargement becomes empty, we'll filter it out below
                  return { ...chargement, livraisons: updatedLivraisons };
                })
                .filter((c) => c.status !== 'PENDING' || c.livraisons.length > 0), // Remove empty tmp chargements
            };
          });
        },
      );

      // Optimistic update 2: Add back to priority zones (with updated priority if provided in variables)
      const removedLivraison = previousLivreurs
        ?.find((l) => l.id === variables.livreurId)
        ?.chargements.find((c) => c.status === 'PENDING')
        ?.livraisons.find((liv) => liv.id === variables.livraisonId);

      if (removedLivraison) {
        // Check if variables has a newPriority field (for optimistic priority update)
        const variablesWithPriority = variables as typeof variables & { newPriority?: Priority };
        const newPriority = variablesWithPriority.newPriority;
        const livraisonWithUpdatedPriority = newPriority
          ? { ...removedLivraison, priority: newPriority }
          : removedLivraison;

        queryClient.setQueryData(
          trpc.livraisons.getPendingLivraisons.queryKey({ expectedDeliveryDate: selectedDate }),
          (old) => (old ? [...old, livraisonWithUpdatedPriority] : [livraisonWithUpdatedPriority]),
        );
      }

      return { previousLivreurs, previousLivraisons };
    },
    onSuccess: () => {
      toast.success('Livraison retirée du chargement');
    },
    onError: (_error, _variables, context) => {
      toast.error('Erreur lors du retrait du chargement');
      // Rollback on error
      if (context?.previousLivreurs) {
        queryClient.setQueryData(
          trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
          context.previousLivreurs,
        );
      }
      if (context?.previousLivraisons) {
        queryClient.setQueryData(
          trpc.livraisons.getPendingLivraisons.queryKey({ expectedDeliveryDate: selectedDate }),
          context.previousLivraisons,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      });
      queryClient.invalidateQueries({
        queryKey: trpc.livraisons.getPendingLivraisons.queryKey({
          expectedDeliveryDate: selectedDate,
        }),
      });
    },
  });
}

export function useMoveToAnotherTmpMutation(selectedDate: Date) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation({
    ...trpc.chargements.moveToAnotherTmpChargement.mutationOptions(),
    onMutate: async (variables) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({
        queryKey: trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      });

      // Get previous data for rollback
      const previousLivreurs = queryClient.getQueryData(
        trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      );

      // Optimistic update: Move livraison between tmp chargements
      queryClient.setQueryData(
        trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
        (old) => {
          if (!old) return old;

          // Find the livraison to move
          let livraisonToMove: TrpcLivraison | undefined;

          return old.map((livreur) => {
            // First pass: find and remove from source livreur
            if (livreur.id === variables.fromLivreurId) {
              const tmpChargement = livreur.chargements.find((c) => c.status === 'PENDING');
              livraisonToMove = tmpChargement?.livraisons.find(
                (l) => l.id === variables.livraisonId,
              );

              return {
                ...livreur,
                chargements: livreur.chargements
                  .map((chargement) => {
                    if (chargement.status !== 'PENDING') return chargement;

                    const updatedLivraisons = chargement.livraisons.filter(
                      (l) => l.id !== variables.livraisonId,
                    );

                    return { ...chargement, livraisons: updatedLivraisons };
                  })
                  .filter((c) => c.status !== 'PENDING' || c.livraisons.length > 0),
              };
            }

            // Second pass: add to destination livreur
            if (livreur.id === variables.toLivreurId && livraisonToMove) {
              const tmpChargement = livreur.chargements.find((c) => c.status === 'PENDING');

              if (tmpChargement) {
                // Add to existing tmp chargement
                return {
                  ...livreur,
                  chargements: livreur.chargements.map((c) =>
                    c.id === tmpChargement.id
                      ? { ...c, livraisons: [...c.livraisons, livraisonToMove!] }
                      : c,
                  ),
                };
              } else {
                // Create new tmp chargement
                return {
                  ...livreur,
                  chargements: [
                    {
                      id: 'temp-' + Date.now(),
                      name: 'Tmp Chargement ' + livreur.name,
                      status: 'PENDING' as const,
                      dateLivraison: selectedDate,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      livreurId: livreur.id,
                      livraisons: [livraisonToMove],
                    },
                    ...livreur.chargements,
                  ],
                };
              }
            }

            return livreur;
          });
        },
      );

      return { previousLivreurs };
    },
    onSuccess: () => {
      toast.success('Livraison déplacée');
    },
    onError: (_error, _variables, context) => {
      toast.error('Erreur lors du déplacement');
      // Rollback on error
      if (context?.previousLivreurs) {
        queryClient.setQueryData(
          trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
          context.previousLivreurs,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      });
    },
  });
}

export function useDeleteChargementMutation(selectedDate: Date) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation({
    ...trpc.chargements.deleteChargement.mutationOptions(),
    onMutate: async (variables) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({
        queryKey: trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      });
      await queryClient.cancelQueries({
        queryKey: trpc.livraisons.getPendingLivraisons.queryKey({
          expectedDeliveryDate: selectedDate,
        }),
      });

      // Get previous data for rollback
      const previousLivreurs = queryClient.getQueryData(
        trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      );
      const previousLivraisons = queryClient.getQueryData(
        trpc.livraisons.getPendingLivraisons.queryKey({ expectedDeliveryDate: selectedDate }),
      );

      // Find the chargement being deleted
      const chargementToDelete = previousLivreurs
        ?.flatMap((l) => l.chargements)
        .find((c) => c.id === variables.id);

      // Optimistic update 1: Remove chargement from livreurs
      queryClient.setQueryData(
        trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
        (old) => {
          if (!old) return old;

          return old.map((livreur) => ({
            ...livreur,
            chargements: livreur.chargements.filter((c) => c.id !== variables.id),
          }));
        },
      );

      // Optimistic update 2: Add livraisons back to pending list
      if (chargementToDelete?.livraisons && chargementToDelete.livraisons.length > 0) {
        queryClient.setQueryData(
          trpc.livraisons.getPendingLivraisons.queryKey({ expectedDeliveryDate: selectedDate }),
          (old) => (old ? [...old, ...chargementToDelete.livraisons] : chargementToDelete.livraisons),
        );
      }

      return { previousLivreurs, previousLivraisons };
    },
    onSuccess: () => {
      toast.success('Chargement supprimé avec succès');
    },
    onError: (_error, _variables, context) => {
      toast.error('Erreur lors de la suppression du chargement');
      // Rollback on error
      if (context?.previousLivreurs) {
        queryClient.setQueryData(
          trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
          context.previousLivreurs,
        );
      }
      if (context?.previousLivraisons) {
        queryClient.setQueryData(
          trpc.livraisons.getPendingLivraisons.queryKey({ expectedDeliveryDate: selectedDate }),
          context.previousLivraisons,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      });
      queryClient.invalidateQueries({
        queryKey: trpc.livraisons.getPendingLivraisons.queryKey({
          expectedDeliveryDate: selectedDate,
        }),
      });
    },
  });
}

export function useCreateChargementMutation(selectedDate: Date) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation({
    ...trpc.chargements.createChargement.mutationOptions(),
    onMutate: async (variables) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({
        queryKey: trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      });

      // Get previous data for rollback
      const previousLivreurs = queryClient.getQueryData(
        trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      );

      // Optimistic update: Convert PENDING chargement to READY
      queryClient.setQueryData(
        trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
        (old) => {
          if (!old) return old;

          return old.map((livreur) => {
            if (livreur.id !== variables.livreurId) return livreur;

            return {
              ...livreur,
              chargements: livreur.chargements.map((chargement) => {
                if (chargement.status !== 'PENDING') return chargement;

                // Convert tmp chargement to READY
                return {
                  ...chargement,
                  status: 'READY' as const,
                  name: variables.name || chargement.name,
                  livraisons: chargement.livraisons.map((liv) => ({
                    ...liv,
                    status: 'READY' as const,
                    livreurId: variables.livreurId,
                  })),
                };
              }),
            };
          });
        },
      );

      return { previousLivreurs };
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Chargement créé avec succès');
      } else {
        toast.error(data.error || 'Erreur lors de la création du chargement');
      }
    },
    onError: (_error, _variables, context) => {
      toast.error('Erreur lors de la création du chargement');
      // Rollback on error
      if (context?.previousLivreurs) {
        queryClient.setQueryData(
          trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
          context.previousLivreurs,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: trpc.livreurs.getLivreurs.queryKey({ selectedDate }),
      });
    },
  });
}
