import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FileText, Building, Package, Clock, AlertCircle, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTotalItems } from './utils';
import Link from 'next/link';
import { statusToBadge, priorityToBadge } from '@/components/ui/enum-to-ui';
import { useRouter } from 'next/navigation';
import { TrpcCommande } from '@/types/trpc-types';
import { Badge } from '@/components/ui/badge';
import { useCommande } from '../commande-context';

export interface CommandeRowProps {
  commande: TrpcCommande;
}

export function CommandeRow({ commande }: CommandeRowProps) {
  const router = useRouter();
  const { selectedCommande, setSelectedCommande } = useCommande();

  const handleRowClick = () => {
    setSelectedCommande(commande);
  };

  const isSelected = selectedCommande?.id === commande.id;

  return (
    <TableRow
      className={cn(
        'cursor-pointer p-4 py-12',
        isSelected ? 'border-blue-200 bg-blue-50 hover:bg-blue-100' : 'hover:bg-muted/50',
      )}
      onClick={handleRowClick}
    >
      <TableCell>
        <div className="flex items-center space-x-3">
          <div className="rounded-lg bg-blue-100 p-1.5">
            <FileText className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div className="text-sm leading-tight font-semibold text-slate-900">
              {commande.name}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        {commande.client ? (
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-orange-100 p-1.5">
              <Building className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <div className="font-medium">{commande.client.name}</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-red-100 p-1.5">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
            <span className="text-muted-foreground">Client non assigné</span>
          </div>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {commande.bp_number ? (
            <Badge variant="green">{commande.bp_number}</Badge>
          ) : (
            <span className="text-muted-foreground">Non défini</span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {commande.bl_number ? (
            <Badge variant="purple">{commande.bl_number}</Badge>
          ) : (
            <span className="text-muted-foreground">Non défini</span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex w-full items-center">
          <div className="flex items-center gap-2">
            <Package className="text-muted-foreground h-4 w-4" />
            <span className="font-medium">{commande.livraisons.length}</span>
          </div>
          {commande.livraisons.length > 0 && (
            <div className="grid w-full grid-cols-3">
              <div className="flex flex-col items-end justify-evenly gap-0 text-xs">
                <span className="text-muted-foreground">Priorités :</span>
                <span className="text-muted-foreground">Statuts :</span>
              </div>
              {commande.livraisons.map((livraison) => (
                <div className="flex flex-col items-center gap-0" key={livraison.id}>
                  {priorityToBadge(livraison.priority)}
                  {statusToBadge(livraison.status)}
                </div>
              ))}
            </div>
          )}
        </div>
      </TableCell>

      <TableCell>{statusToBadge(commande.status)}</TableCell>
      <TableCell>
        <div className="font-medium">{getTotalItems(commande.livraisons)} articles</div>
      </TableCell>
      <TableCell>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Clock className="h-3 w-3" />
          <span>{new Date(commande.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
      </TableCell>
      <TableCell>
        <Button variant="outline" size="icon" asChild>
          <Link href={`/app/commandes/${commande.id}`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
