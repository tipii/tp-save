import { FileText, Search } from 'lucide-react';
import { EmptyStateProps } from './types';

export function EmptyState({ hasActiveFilters }: EmptyStateProps) {
  if (hasActiveFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Search className="text-muted-foreground mb-4 h-12 w-12" />
        <h3 className="mb-2 text-lg font-semibold">Aucune commande trouvée</h3>
        <p className="text-muted-foreground max-w-md">
          Aucune commande ne correspond à vos critères de recherche. Essayez de modifier vos filtres
          ou votre recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileText className="text-muted-foreground mb-4 h-12 w-12" />
      <h3 className="mb-2 text-lg font-semibold">Aucune commande</h3>
      <p className="text-muted-foreground max-w-md">
        Il n'y a pas encore de commandes dans le système.
      </p>
    </div>
  );
}
