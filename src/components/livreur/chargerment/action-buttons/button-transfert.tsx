import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import React, { useState } from 'react';
import { useCurrentChargement } from '../../hooks/queries';
import { toast } from 'sonner';

export default function ButtonTransfert() {
  const [selectedLivreurId, setSelectedLivreurId] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const trpc = useTRPC();
  const { data: chargement } = useCurrentChargement();
  const { data: livreurs } = useQuery(trpc.livreurs.getLivreurs.queryOptions());
  const { mutate: transferChargement, isPending } = useMutation(
    trpc.livreursChargements.transferChargement.mutationOptions(),
  );

  const handleTransfer = () => {
    if (!chargement?.id || !selectedLivreurId) return;
    transferChargement(
      { id: chargement.id, livreurId: selectedLivreurId },
      {
        onSuccess: () => {
          toast.success('Chargement transféré avec succès');
          setOpen(false);
        },
        onError: () => {
          toast.error('Erreur lors du transfert du chargement');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 w-full bg-amber-500 text-base font-medium">
          <Send className="mr-2 h-5 w-5" />
          Transférer
        </Button>
      </DialogTrigger>
      <DialogContent className="flex w-full flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle>Transférer à un autre livreur</DialogTitle>
        </DialogHeader>
        <Select value={selectedLivreurId} onValueChange={(value) => setSelectedLivreurId(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un livreur" />
          </SelectTrigger>
          <SelectContent>
            {livreurs?.map((livreur) => (
              <SelectItem key={livreur.id} value={livreur.id}>
                {livreur.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className="h-12 w-full bg-amber-500 text-base font-medium"
          disabled={!selectedLivreurId || isPending}
          onClick={handleTransfer}
        >
          Transférer
        </Button>
      </DialogContent>
    </Dialog>
  );
}
