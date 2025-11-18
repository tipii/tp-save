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
import {
  dateStringToTahitiDate,
  dateToTahitiDateString,
  formatDateForTahiti,
} from '@/lib/date-utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Infos</label>
            <Table className="w-full max-w-full table-fixed">
              <TableHeader>
                <TableRow className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                  <TableHead className="w-1/3">Champ</TableHead>
                  <TableHead>Valeur</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-b">
                <TableRow>
                  <TableCell className="font-medium">Date livraison</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {dateToTahitiDateString(selectedCommande.docVente.dateLivr)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Expedition</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.expedit}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">BC Client</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.bcClient}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Créneau de livraison</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.creneauLivraison}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Personne</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.personneContact}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Adresse livraison</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.adresseLivraison}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Expe: Ile</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.expeIle}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Expe numero CSNT</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.expeNoCsnt}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Obs1</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.obs1}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Obs2</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.obs2}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Obs3</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.obs3}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Obs4</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.obs4}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Code saisi par</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.cdeSaisiePar}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Code transmise par</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.cdeTransmissePar}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Code mode reception</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.cdeModeReception}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Heure début</TableCell>
                  <TableCell className="break-words whitespace-normal">
                    {selectedCommande.docVente.heureDebut}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
