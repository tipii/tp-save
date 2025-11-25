import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUser } from '@/hooks/use-user';
import { Role } from '@/lib/constants';
import { getUserInitials } from '@/lib/utils';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { FileText } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Documentation({
  livraisonId,
  documentation,
  userName,
  refetch,
}: {
  livraisonId: string;
  documentation: boolean;
  userName?: string;
  refetch: () => void;
}) {
  const user = useUser();
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
      {userName && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-6 w-6 cursor-pointer">
                <AvatarFallback className="rounded-lg">{getUserInitials(userName)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="text-sm font-medium">{userName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {userName ? (
        <FileText className="h-4 w-4 text-green-600" />
      ) : (
        <FileText className="text-muted-foreground h-4 w-4" />
      )}

      {!userName && <Switch checked={optimisticValue} onCheckedChange={handleSetDocumentation} />}
      {user.role === Role.ADMIN && userName && (
        <Switch checked={optimisticValue} onCheckedChange={handleSetDocumentation} />
      )}
    </div>
  );
}
