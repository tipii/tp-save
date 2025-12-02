import { priorityToText } from '@/components/ui/enum-to-ui';
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from '@/components/ui/select';
import { Priority } from '@/generated/prisma';
import React from 'react';
import { useCommande } from '../context/commande-context';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { formatDateForTahiti } from '@/lib/date-utils';
import { Input } from '@/components/ui/input';
import CommandesDocVenteInfos from '../../shared/commandes-docvente-infos';

export default function CommandeDetailsNew({ refetch }: { refetch: () => void }) {
  const { selectedCommandeId } = useCommande();
  const trpc = useTRPC();

  // Fetch the commande data using React Query - this will automatically update when mutations complete
  const { data: selectedCommande, refetch: refetchCommande } = useQuery({
    ...trpc.commandes.getCommandeById.queryOptions({ id: selectedCommandeId ?? '' }),
    enabled: !!selectedCommandeId,
  });
  const updateMutation = useMutation(trpc.commandes.updateCommande.mutationOptions());

  const onPriorityChange = (priority: Priority) => {
    if (!selectedCommandeId) return;

    updateMutation.mutate(
      {
        id: selectedCommandeId,
        priority,
      },
      {
        onSuccess: () => {
          toast.success('Priorité modifiée avec succès');
          refetch();
          refetchCommande();
        },
        onError: () => {
          toast.error('Erreur lors de la modification de la priorité');
        },
      },
    );
  };

  if (!selectedCommande) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        Sélectionnez une commande pour voir les articles
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-sm font-medium">Priorité</label>
          <Select
            onValueChange={onPriorityChange}
            value={selectedCommande?.livraisons[0]?.priority}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner la priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Priority.URGENT}>{priorityToText(Priority.URGENT)}</SelectItem>
              <SelectItem value={Priority.NORMAL}>{priorityToText(Priority.NORMAL)}</SelectItem>
              <SelectItem value={Priority.ILES}>{priorityToText(Priority.ILES)}</SelectItem>
              <SelectItem value={Priority.UNDEFINED}>
                {priorityToText(Priority.UNDEFINED)}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <label className="text-sm font-medium">Date de livraison prévue</label>
          <Input
            type="text"
            disabled
            value={
              selectedCommande?.docVente?.dateLivr
                ? formatDateForTahiti(selectedCommande?.docVente?.dateLivr)
                : 'Non définie'
            }
            className="bg-muted"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {selectedCommande.docVente && (
          <CommandesDocVenteInfos docVente={selectedCommande.docVente} />
        )}
      </div>
    </div>
  );
}
