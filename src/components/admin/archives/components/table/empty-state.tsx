import { Archive } from 'lucide-react';

export function EmptyState({ hasActiveFilters }: { hasActiveFilters: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-muted-foreground">
      <Archive className="h-16 w-16" />
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          {hasActiveFilters ? 'Aucun résultat' : 'Aucune archive'}
        </h3>
        <p className="text-sm">
          {hasActiveFilters
            ? 'Essayez de modifier vos filtres'
            : 'Les chargements terminés apparaîtront ici'}
        </p>
      </div>
    </div>
  );
}
