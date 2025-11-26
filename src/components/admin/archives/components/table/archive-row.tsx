import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Package, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrpcArchivedChargement } from '@/types/trpc-types';
import { Badge } from '@/components/ui/badge';
import { useArchive } from '../../context/archive-context';
import { formatDateForTahiti } from '@/lib/date-utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getUserInitials } from '@/lib/utils';

export interface ArchiveRowProps {
  chargement: TrpcArchivedChargement;
  refetch: () => void;
}

export function ArchiveRow({ chargement, refetch }: ArchiveRowProps) {
  const { selectedChargementId, setSelectedChargementId } = useArchive();

  const handleRowClick = () => {
    setSelectedChargementId(chargement.id);
  };

  const isSelected = selectedChargementId === chargement.id;
  const livraisonsCount = chargement.livraisons?.length || 0;

  return (
    <TableRow
      onClick={handleRowClick}
      className={cn(
        'hover:bg-muted/50 cursor-pointer transition-colors',
        isSelected && 'bg-muted/80',
      )}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-green-600" />
          <span className="font-medium">{chargement.name}</span>
        </div>
      </TableCell>

      <TableCell>
        {chargement.livreur && (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 border-2 border-blue-200 bg-blue-50">
              <AvatarFallback className="text-xs font-semibold text-blue-700">
                {getUserInitials(chargement.livreur.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{chargement.livreur.name}</span>
          </div>
        )}
      </TableCell>

      <TableCell>
        <Badge variant="purple" className="font-mono">
          {livraisonsCount}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-orange-400" />
          {formatDateForTahiti(chargement.createdAt)}
        </div>
      </TableCell>

      <TableCell>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          {formatDateForTahiti(chargement.updatedAt)}
        </div>
      </TableCell>

      <TableCell>
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedChargementId(chargement.id);
          }}
          className="hover:bg-green-50 hover:text-green-700"
        >
          <Eye className="h-4 w-4" />
        </Button> */}
      </TableCell>
    </TableRow>
  );
}
