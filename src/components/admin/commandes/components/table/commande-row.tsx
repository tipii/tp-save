import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  FileText,
  Building,
  Package,
  Clock,
  AlertCircle,
  Pencil,
  ClockArrowUp,
} from 'lucide-react';
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
import { Status } from '@/generated/prisma';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';

export interface CommandeRowProps {
  commande: TrpcCommande;
  refetch: () => void;
}

export function CommandeRow({ commande, refetch }: CommandeRowProps) {
  const router = useRouter();
  const { selectedCommandeId, setSelectedCommandeId } = useCommande();
  const trpc = useTRPC();
  const redeliverLivraisonMutation = useMutation(
    trpc.livraisons.redeliverLivraison.mutationOptions(),
  );

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

  const handleRedeliverLivraison = () => {
    redeliverLivraisonMutation.mutate(
      { livraisonId: commande.livraisons[0].id },
      {
        onSuccess: () => {
          toast.success('Livraison ré-livrée avec succès');
        },
        onError: (error) => {
          toast.error('Erreur', {
            description: error.message,
          });
        },
        onSettled: () => {
          refetch();
        },
      },
    );
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
        {commande.livraisons.length > 0 && commande.livraisons[0].expectedDeliveryDate ? (
          <Badge variant="blue">
            {formatDateForTahiti(commande.livraisons[0].expectedDeliveryDate)}
          </Badge>
        ) : (
          <span className="text-muted-foreground">Non défini</span>
        )}
      </TableCell>
      <TableCell>
        {commande.livraisons.length > 0 && commande.livraisons[0].deliveryDate ? (
          <Badge variant="green">{formatDateForTahiti(commande.livraisons[0].deliveryDate)}</Badge>
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
      <TableCell className="flex items-center gap-2">
        {commande.livraisons.length === 1 && commande.livraisons[0].status === Status.RETURNED && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleRedeliverLivraison}>
                <ClockArrowUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remettre en livraison</p>
            </TooltipContent>
          </Tooltip>
        )}
        <Button variant="outline" size="icon" asChild>
          <Link href={`/app/commandes/${commande.id}`}>
            <Pencil className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
