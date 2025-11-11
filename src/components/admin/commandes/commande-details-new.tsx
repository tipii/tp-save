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
import { useCommande } from './commande-context';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { dateStringToTahitiDate, formatDateForTahiti } from '@/lib/date-utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

export default function CommandeDetailsNew({ refetch }: { refetch: () => void }) {
  const { selectedCommande } = useCommande();
  const trpc = useTRPC();
  const updateMutation = useMutation(trpc.commandes.updateCommande.mutationOptions());
  const onPriorityChange = (priority: Priority) => {
    updateMutation.mutate(
      {
        id: selectedCommande?.id ?? '',
        priority,
      },
      {
        onSuccess: () => {
          toast.success('Priorité modifiée avec succès');
        },
        onError: () => {
          toast.error('Erreur lors de la modification de la priorité');
        },
      },
    );
  };

  const onPlannedDeliveryDateChange = (plannedDeliveryDate: string) => {
    updateMutation.mutate(
      {
        id: selectedCommande?.id ?? '',
        plannedDeliveryDate: plannedDeliveryDate
          ? dateStringToTahitiDate(plannedDeliveryDate)
          : undefined,
      },
      {
        onSuccess: () => {
          toast.success('Date de livraison prévue modifiée avec succès');
        },
        onError: () => {
          toast.error('Erreur lors de la modification de la date de livraison prévue');
        },
      },
    );
  };
  return (
    <>
      <Select onValueChange={onPriorityChange} value={selectedCommande?.priority}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner la priorité" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Priority.URGENT}>{priorityToText(Priority.URGENT)}</SelectItem>
          <SelectItem value={Priority.NORMAL}>{priorityToText(Priority.NORMAL)}</SelectItem>
          <SelectItem value={Priority.ILES}>{priorityToText(Priority.ILES)}</SelectItem>
          <SelectItem value={Priority.UNDEFINED}>{priorityToText(Priority.UNDEFINED)}</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
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
            onSelect={(date) => onPlannedDeliveryDateChange(date ? date.toISOString() : '')}
            disabled={(date) => date < new Date('1900-01-01')}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
