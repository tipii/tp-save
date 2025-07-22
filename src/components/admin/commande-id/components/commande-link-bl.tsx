import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useTRPC } from '@/trpc/client';
import { TrpcCommande } from '@/types/trpc-types';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useCommandeEdit } from '../hooks/use-commande-edit';

export default function CommandeLinkBl({ commandeId }: { commandeId: string }) {
  const [blNumber, setBlNumber] = useState('');
  const { commande, refetchCommande } = useCommandeEdit(commandeId);

  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(
    trpc.rawSageData.getBLByNumber.mutationOptions({
      onSuccess: (data) => {
        console.log(data);
        toast.success(`BL ${data.DO_Piece} liée avec succès`);
        refetchCommande();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const { mutate: mutateUnlinkBL, isPending: isPendingUnlinkBL } = useMutation(
    trpc.rawSageData.unlinkBL.mutationOptions({
      onSuccess: () => {
        toast.success('BL déliée avec succès');
        refetchCommande();
      },
    }),
  );

  const handleLinkBL = () => {
    mutate({ blNumber, commandeId });
  };

  const handleUnlinkBL = () => {
    mutateUnlinkBL({ commandeId });
  };

  if (commande?.bl_number) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>BL liée</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <p>{commande.bl_number}</p>
          <Button onClick={handleUnlinkBL} disabled={isPendingUnlinkBL}>
            {isPendingUnlinkBL ? 'Chargement...' : 'Délier'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Lier à un BL</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="BL number"
            value={blNumber}
            onChange={(e) => setBlNumber(e.target.value)}
          />
          <Button onClick={handleLinkBL} disabled={isPending}>
            {isPending ? 'Chargement...' : 'Lier'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
