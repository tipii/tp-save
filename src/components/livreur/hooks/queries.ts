import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function useCurrentChargement() {
  const trpc = useTRPC();

  return useQuery(trpc.livreursChargements.getCurrentChargementByLivreur.queryOptions());
}
