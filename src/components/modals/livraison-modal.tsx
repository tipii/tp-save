import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Building } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import { TrpcClient, TrpcCommande, TrpcLivraison } from '@/types/trpc-types';
import ClientCard from '@/components/admin/clients/client-card';
import { priorityToBadge, statusToBadge } from '@/components/ui/enum-to-ui';
import { Item } from '@/types/types';
import CommandesDocVenteInfos from '../admin/shared/commandes-docvente-infos';
import { DocVente } from '@/generated/prisma';

export default function LivraisonModal({
  children,
  livraison,
}: {
  children: React.ReactNode;
  livraison: TrpcLivraison;
}) {
  const commande = livraison.commande;
  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] w-[900px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{commande.ref}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span className="space-x-1">Priorité: {priorityToBadge(livraison.priority)}</span>
            <span className="space-x-1">Statut: {statusToBadge(livraison.status)}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Client Section */}
          {commande.client ? (
            <ClientCard client={commande.client as TrpcClient} />
          ) : (
            <Card>
              <CardContent className="py-6">
                <div className="text-muted-foreground text-center">
                  <Building className="mx-auto mb-2 h-12 w-12 opacity-50" />
                  <p>Aucun client associé à cette commande</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="flex gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Items</h3>
            <div className="flex h-full flex-col space-y-4">
              {(livraison.items as Item[]).length > 0 ? (
                <div className="flex flex-col space-y-2">
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
                <div className="text-muted-foreground flex items-center justify-center">
                  <span className="text-sm">Aucun article dans cette livraison</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <CommandesDocVenteInfos docVente={commande.docVente as DocVente} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
