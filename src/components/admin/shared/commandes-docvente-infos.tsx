import React from 'react';
import { DocVente } from '@/generated/prisma';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateForTahiti } from '@/lib/date-utils';

export default function CommandesDocVenteInfos({ docVente }: { docVente: DocVente }) {
  return (
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
              {formatDateForTahiti(docVente.dateLivr)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Expedition</TableCell>
            <TableCell className="break-words whitespace-normal">{docVente.expedit}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">BC Client</TableCell>
            <TableCell className="break-words whitespace-normal">{docVente.bcClient}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Créneau de livraison</TableCell>
            <TableCell className="break-words whitespace-normal">
              {docVente.creneauLivraison}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Personne</TableCell>
            <TableCell className="break-words whitespace-normal">
              {docVente.personneContact}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Adresse livraison</TableCell>
            <TableCell className="break-words whitespace-normal">
              {docVente.adresseLivraison}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Expe: Ile</TableCell>
            <TableCell className="break-words whitespace-normal">{docVente.expeIle}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Expe numero CSNT</TableCell>
            <TableCell className="break-words whitespace-normal">{docVente.expeNoCsnt}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Obs1</TableCell>
            <TableCell className="break-words whitespace-normal">{docVente.obs1}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Obs2</TableCell>
            <TableCell className="break-words whitespace-normal">{docVente.obs2}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Obs3</TableCell>
            <TableCell className="break-words whitespace-normal">{docVente.obs3}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Obs4</TableCell>
            <TableCell className="break-words whitespace-normal">{docVente.obs4}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Code saisi par</TableCell>
            <TableCell className="break-words whitespace-normal">{docVente.cdeSaisiePar}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Code transmise par</TableCell>
            <TableCell className="break-words whitespace-normal">
              {docVente.cdeTransmissePar}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Code mode reception</TableCell>
            <TableCell className="break-words whitespace-normal">
              {docVente.cdeModeReception}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Heure début</TableCell>
            <TableCell className="break-words whitespace-normal">{docVente.heureDebut}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
