import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Building,
  Package,
  Clock,
  AlertCircle,
  Pencil,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { type CommandeRowProps } from './types';
import { getTotalItems } from './utils';
import { ExpandedRow } from './expanded-row';
import Link from 'next/link';
import { statusToBadge, priorityToBadge } from '@/lib/enum-to-ui';

export function CommandeRow({ commande, isExpanded, onToggle }: CommandeRowProps) {
  return (
    <>
      <TableRow
        className={cn('hover:bg-muted/50 cursor-pointer', isExpanded && 'bg-muted/30')}
        onClick={() => onToggle(commande.id)}
      >
        <TableCell>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
              <FileText className="text-primary h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">{commande.name ?? 'Non défini'}</div>
              <div className="text-muted-foreground text-sm">ID: {commande.id.slice(0, 8)}...</div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <span className="font-medium">{commande.bp_number ?? 'Non défini'}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <span className="font-medium">{commande.bl_number ?? 'Non défini'}</span>
          </div>
        </TableCell>
        <TableCell>
          {commande.client ? (
            <div className="flex items-center gap-2">
              <Building className="text-muted-foreground h-4 w-4" />
              <div>
                <div className="font-medium">{commande.client.name}</div>
                <div className="text-muted-foreground text-sm">{commande.client.code}</div>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>Client non assigné</span>
            </div>
          )}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Package className="text-muted-foreground h-4 w-4" />
            <span className="font-medium">{commande.livraisons.length}</span>
          </div>
        </TableCell>
        <TableCell>
          {commande.livraisons.length > 0 ? (
            commande.livraisons.map((livraison) => (
              <span key={livraison.id} className="mr-1">
                {priorityToBadge(livraison.priority)}
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">Non défini</span>
          )}
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
          <Link href={`/app/commandes/${commande.id}`} onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={9} className="bg-muted/20 p-0">
            <ExpandedRow commande={commande} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
