import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { dateToTahitiDateString } from '@/lib/date-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CommandesDocVenteInfos from '../../shared/commandes-docvente-infos';

export default function CommandeDetails({ commandeId }: { commandeId: string }) {
  const trpc = useTRPC();
  const { data: commande, isLoading } = useQuery(
    trpc.commandes.getCommandeById.queryOptions({ id: commandeId }),
  );

  if (!commande || !commande.docVente) {
    return <div>Chargement...</div>;
  }

  return (
    <Card className="flex flex-col space-y-2">
      <CardContent>
        <CommandesDocVenteInfos docVente={commande.docVente} />
      </CardContent>
    </Card>
  );
}
