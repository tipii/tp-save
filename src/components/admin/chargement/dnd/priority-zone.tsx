import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { TrpcLivraison } from '@/types/trpc-types';
import DraggableLot from './draggable';
import LivraisonModal from '@/components/modals/livraison-modal';
import { useDroppable } from '@dnd-kit/core';
import { Input } from '@/components/ui/input';

interface PriorityZoneProps {
  title: string;
  priority: string;
  backgroundColor: string;
  livraisons: TrpcLivraison[];
}

const MAX_ITEMS = 5;

export const PriorityZone = ({
  title,
  priority,
  backgroundColor,
  livraisons,
}: PriorityZoneProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const { isOver, setNodeRef } = useDroppable({
    id: `priority-${priority}`,
  });

  const availableLots = useMemo(() => {
    return livraisons.filter((livraison) => {
      // Filter by priority
      let matchesPriority = false;
      if (priority === 'LATE') {
        matchesPriority = true; // LATE zone shows all livraisons passed to it
      } else {
        matchesPriority = livraison.priority === priority;
      }

      if (!matchesPriority) return false;

      // Filter by search query
      if (searchQuery.trim() === '') return true;

      const query = searchQuery.toLowerCase();
      const matchesRef = livraison.commande.ref.toLowerCase().includes(query);
      const matchesClient = livraison.commande.client?.name?.toLowerCase().includes(query) ?? false;

      return matchesRef || matchesClient;
    });
  }, [livraisons, priority, searchQuery]);

  const totalPages = Math.ceil(availableLots.length / MAX_ITEMS);
  const startIndex = currentPage * MAX_ITEMS;
  const endIndex = startIndex + MAX_ITEMS;
  const paginatedLots = availableLots.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-1 flex-col rounded-lg border ${backgroundColor} ${isOver ? 'ring-2 ring-blue-400' : ''}`}
    >
      <div className="flex flex-col gap-2 border-b p-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{title}</div>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                <ChevronLeft size={16} />
              </Button>
              <span className="text-sm text-gray-600">
                {currentPage + 1} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher par référence ou client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="max-h-80 flex-1 p-4">
        {availableLots.length > 0 ? (
          <div className="flex flex-col gap-1">
            {paginatedLots.map((livraison) => (
              <div key={livraison.id} className="flex items-center gap-2">
                <DraggableLot livraison={livraison} />
                <LivraisonModal livraison={livraison}>
                  <Button variant="ghost" className="h-5 w-5">
                    <Eye size={16} />
                  </Button>
                </LivraisonModal>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <p className="text-sm text-gray-500">Aucune commande à traiter</p>
          </div>
        )}
      </div>
    </div>
  );
};
