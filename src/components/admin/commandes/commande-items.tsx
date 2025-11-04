import React from 'react';
import { useCommande } from './commande-context';
import { Item } from '@/types/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function CommandeItems() {
  const { selectedCommande } = useCommande();

  if (!selectedCommande) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        Sélectionnez une commande pour voir les articles
      </div>
    );
  }

  if (selectedCommande.livraisons.length === 0) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        Aucun article trouvé
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col space-y-4">
      {selectedCommande.livraisons.map((livraison, index) =>
        (livraison.items as Item[]).length > 0 ? (
          <div key={index} className="flex flex-col space-y-2">
            {/* <h3 className="mb-2 text-sm font-semibold text-slate-700">{livraison.name}</h3> */}
            <Table className="w-full max-w-full table-fixed">
              <TableHeader>
                <TableRow className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                  <TableHead className="w-24">Ref</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead className="w-24">Quantité</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border-b">
                {(livraison.items as Item[])?.map((item: Item, itemIndex: number) => (
                  <TableRow key={itemIndex}>
                    <TableCell className="w-24">{item.AR_REF}</TableCell>
                    <TableCell className="break-words whitespace-normal">
                      {item.DL_Design}
                    </TableCell>
                    <TableCell className="w-24">{item.DL_QTEBL}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div key={index} className="text-muted-foreground flex items-center justify-center">
            <span className="text-sm">Aucun article dans {livraison.name}</span>
          </div>
        ),
      )}
    </div>
  );
}
