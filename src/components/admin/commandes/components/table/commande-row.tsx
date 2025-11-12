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
import { useCommande } from '../../context/commande-context';
import { formatDateForTahiti } from '@/lib/date-utils';
import { toast } from 'sonner';

export interface CommandeRowProps {
  commande: TrpcCommande;
}

export function CommandeRow({ commande }: CommandeRowProps) {
  const router = useRouter();
  const { selectedCommandeId, setSelectedCommandeId } = useCommande();

  const handleRowClick = () => {
    setSelectedCommandeId(commande.id);
  };

  const handleCopyRef = (source: 'ref' | 'client') => async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    if (commande.ref && commande.client?.name) {
      try {
        await navigator.clipboard.writeText(source === 'ref' ? commande.ref : commande.client.name);
        toast.success('Référence copiée', {
          description: `"${source === 'ref' ? commande.ref : commande.client.name}" a été copié dans le presse-papiers`,
        });
      } catch (error) {
        toast.error('Erreur', {
          description: 'Impossible de copier la référence',
        });
      }
    }
  };

  const isSelected = selectedCommandeId === commande.id;

  return (
    <TableRow
      className={cn(
        'cursor-pointer p-4 py-12',
        isSelected ? 'border-blue-200 bg-blue-50 hover:bg-blue-100' : 'hover:bg-muted/50',
      )}
      onClick={handleRowClick}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          {commande.ref ? (
            <Badge
              variant="green"
              className="text-md cursor-pointer transition-opacity hover:opacity-80"
              onClick={handleCopyRef('ref')}
            >
              {commande.ref}
            </Badge>
          ) : (
            <span className="text-muted-foreground">Non défini</span>
          )}
        </div>
      </TableCell>
      <TableCell>
        {commande.client ? (
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-orange-100 p-1.5">
              <Building className="h-4 w-4 text-orange-600" />
            </div>
            <div onClick={handleCopyRef('client')}>
              <div className="cursor-pointer font-medium">{commande.client.name}</div>
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
          {commande.livraisons.length > 0 ? (
            priorityToBadge(commande.livraisons[0].priority)
          ) : (
            <span className="text-muted-foreground">Non défini</span>
          )}
        </div>
      </TableCell>
      <TableCell>
        {commande.livraisons.length > 0 ? (
          statusToBadge(commande.livraisons[0].status)
        ) : (
          <span className="text-muted-foreground">Non défini</span>
        )}
      </TableCell>
      <TableCell>
        {commande.plannedDeliveryDate ? (
          <Badge variant="blue">{formatDateForTahiti(commande.plannedDeliveryDate)}</Badge>
        ) : (
          <span className="text-muted-foreground">Non défini</span>
        )}
      </TableCell>

      <TableCell>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Clock className="h-3 w-3" />
          <span>{formatDateForTahiti(commande.createdAt)}</span>
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
