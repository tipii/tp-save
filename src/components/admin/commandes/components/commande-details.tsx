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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { dateStringToTahitiDate, formatDateForTahiti } from '@/lib/date-utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

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

  const onPlannedDeliveryDateChange = (plannedDeliveryDate: Date | undefined) => {
    if (!selectedCommandeId) return;

    updateMutation.mutate(
      {
        id: selectedCommandeId,
        plannedDeliveryDate: plannedDeliveryDate ?? undefined,
      },
      {
        onSuccess: () => {
          toast.success('Date de livraison prévue modifiée avec succès');
          refetch();
          refetchCommande();
        },
        onError: (error) => {
          console.error(error);
          toast.error('Erreur lors de la modification de la date de livraison prévue');
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
          <Select onValueChange={onPriorityChange} value={selectedCommande?.priority}>
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                {selectedCommande?.plannedDeliveryDate ? (
                  formatDateForTahiti(selectedCommande?.plannedDeliveryDate)
                ) : (
                  <span className="text-muted-foreground">Sélectionner une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={
                  selectedCommande?.plannedDeliveryDate
                    ? new Date(selectedCommande?.plannedDeliveryDate)
                    : undefined
                }
                onSelect={(date) => onPlannedDeliveryDateChange(date ?? undefined)}
                disabled={(date) => date < new Date('1900-01-01')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {selectedCommande.docVente && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Infos</label>
            <div className="flex flex-col gap-2">
              <p>BC Client: {selectedCommande.docVente.bcClient}</p>
              <p>Créneau: {selectedCommande.docVente.obs1}</p>
              <p>Obs1: {selectedCommande.docVente.obs1}</p>
              <p>Obs2: {selectedCommande.docVente.obs2}</p>
              <p>Obs3: {selectedCommande.docVente.obs3}</p>
              <p>Obs4: {selectedCommande.docVente.obs4}</p>
              <p>Personne: {selectedCommande.docVente.personneContact}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
