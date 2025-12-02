import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function useActiveChargement() {
  const trpc = useTRPC();

  return useQuery(
    trpc.livreursChargements.getActiveChargement.queryOptions(undefined, {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 10, // 10 seconds
      refetchIntervalInBackground: false,
    }),
  );
}

export function useAvailableChargements() {
  const trpc = useTRPC();

  return useQuery(
    trpc.livreursChargements.getAvailableChargements.queryOptions(undefined, {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 10, // 10 seconds
      refetchIntervalInBackground: false,
    }),
  );
}
