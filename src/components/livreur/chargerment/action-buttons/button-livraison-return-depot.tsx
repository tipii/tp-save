import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { PackageX } from 'lucide-react';
import React, { useState } from 'react';
import { useCurrentChargement } from '../../hooks/queries';
import { useTRPC } from '@/trpc/client';
import { toast } from 'sonner';

export default function ButtonLivraisonReturnDepot({
  livraisonId,
  toggleLivraison,
}: {
  livraisonId: string;
  toggleLivraison: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [depotComment, setDepotComment] = useState<string>('');
  const trpc = useTRPC();
  const { data: chargement, refetch: refetchChargement } = useCurrentChargement();
  const { mutate: returnLivraison, isPending } = useMutation(
    trpc.livreursLivraisons.returnLivraisonToDepot.mutationOptions(),
  );

  const handleReturn = () => {
    if (!chargement?.id) {
      return;
    }

    if (!depotComment || depotComment.trim() === '') {
      toast.error('Veuillez saisir un commentaire');
      return;
    }

    returnLivraison(
      {
        id: livraisonId,
        chargementId: chargement?.id,
        depotComment: depotComment.trim(),
      },
      {
        onSuccess: ({ allLivraisonsToReturn }) => {
          refetchChargement();
          if (allLivraisonsToReturn) {
            toast.success('Chargement terminé');
          } else {
            toast.success('Livraison retournée au dépôt');
          }
          setOpen(false);
          setDepotComment('');
          toggleLivraison();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-orange-500">
          <PackageX className="h-4 w-4" />
          Confirmer le retour au dépôt
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[10%] translate-y-0 sm:top-[50%] sm:-translate-y-1/2">
        <DialogHeader>
          <DialogTitle>Confirmer le retour au dépôt</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">
            Commentaire <span className="text-red-500">*</span>
          </label>
          <Textarea
            placeholder="Commentaire de retour au dépôt (obligatoire)..."
            value={depotComment}
            onChange={(e) => setDepotComment(e.target.value)}
            className="min-h-[120px] text-base"
            required
          />
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
            Annuler
          </Button>
          <Button
            onClick={handleReturn}
            disabled={!depotComment || depotComment.trim() === '' || isPending}
            className="w-full bg-orange-500 hover:bg-orange-600 sm:w-auto"
          >
            <PackageX className="h-4 w-4" />
            Confirmer le retour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
