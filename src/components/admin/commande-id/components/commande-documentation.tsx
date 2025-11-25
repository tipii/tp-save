import { useTRPC } from '@/trpc/client';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';
import { useCommandeEdit } from '../hooks/use-commande-edit';
import { Status } from '@/generated/prisma';
import Documentation from '../../shared/documentation';

export default function CommandeDocumentation({ commandeId }: { commandeId: string }) {
  const trpc = useTRPC();
  const setDocumentationMutation = useMutation(trpc.livraisons.setDocumentation.mutationOptions());
  const { commande, isLoading, refetchCommande } = useCommandeEdit(commandeId);

  const handleSetDocumentation = (livraisonId: string, newValue: boolean) => {
    setDocumentationMutation.mutate(
      { livraisonId, documentation: newValue },
      {
        onSuccess: () => {
          toast.success(newValue ? 'Documentation ajoutée' : 'Documentation retirée');
          refetchCommande();
        },
        onError: (error) => {
          // Revert on error
          toast.error(error.message);
        },
      },
    );
  };

  const deliveredLivraisons = commande?.livraisons.filter(
    (livraison) => livraison.status === Status.DELIVERED,
  );
  return (
    <Card className="flex flex-col space-y-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" /> Documentation
        </CardTitle>
      </CardHeader>
      <CardContent>
        {deliveredLivraisons && deliveredLivraisons.length === 0 && <p>Aucune livraison livrée</p>}
        {deliveredLivraisons &&
          deliveredLivraisons.map((livraison) => (
            <div key={livraison.id} className="flex items-center gap-2">
              <p>{livraison.name}</p>
              <Documentation
                livraisonId={livraison.id}
                documentation={livraison.documentation}
                userName={livraison.userDoc?.name}
                refetch={refetchCommande}
              />
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
