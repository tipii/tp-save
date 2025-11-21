import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function useCurrentChargement() {
  const trpc = useTRPC();

  return useQuery(
    trpc.livreursChargements.getCurrentChargementByLivreur.queryOptions(undefined, {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 10, // 10 seconds
      refetchIntervalInBackground: false,
    }),
  );
}
