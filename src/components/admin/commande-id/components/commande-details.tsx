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
      <CardHeader>
        <CardTitle>Infos</CardTitle>
      </CardHeader>
      <CardContent>
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
                {dateToTahitiDateString(commande.docVente.dateLivr)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Expedition</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.expedit}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">BC Client</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.bcClient}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Créneau de livraison</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.creneauLivraison}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Personne</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.personneContact}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Adresse livraison</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.adresseLivraison}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Expe: Ile</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.expeIle}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Expe numero CSNT</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.expeNoCsnt}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Obs1</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.obs1}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Obs2</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.obs2}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Obs3</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.obs3}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Obs4</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.obs4}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Code saisi par</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.cdeSaisiePar}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Code transmise par</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.cdeTransmissePar}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Code mode reception</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.cdeModeReception}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Heure début</TableCell>
              <TableCell className="break-words whitespace-normal">
                {commande.docVente.heureDebut}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
