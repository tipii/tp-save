import { Switch } from '@/components/ui/switch';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { FileText } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Documentation({
  livraisonId,
  documentation,
  refetch,
}: {
  livraisonId: string;
  documentation: boolean;
  refetch: () => void;
}) {
  const trpc = useTRPC();
  const [optimisticValue, setOptimisticValue] = useState(documentation);
  const setDocumentationMutation = useMutation(trpc.livraisons.setDocumentation.mutationOptions());

  // Sync optimistic value when prop changes (e.g., after refetch)
  useEffect(() => {
    setOptimisticValue(documentation);
  }, [documentation]);

  const handleSetDocumentation = (newValue: boolean) => {
    // Optimistically update the UI
    setOptimisticValue(newValue);

    setDocumentationMutation.mutate(
      { livraisonId, documentation: newValue },
      {
        onSuccess: () => {
          toast.success(newValue ? 'Documentation ajoutée' : 'Documentation retirée');
          refetch();
        },
        onError: (error) => {
          // Revert on error
          setOptimisticValue(documentation);
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="flex items-center gap-2">
      <FileText className="h-4 w-4" />
      <Switch checked={optimisticValue} onCheckedChange={handleSetDocumentation} />
    </div>
  );
}
