import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export function usePendingLivraisons(selectedDate: Date | null) {
  const trpc = useTRPC();

  return useQuery(
    trpc.livraisons.getPendingLivraisons.queryOptions(
      {
        expectedDeliveryDate: selectedDate!,
      },
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 10, // 10 seconds
        refetchIntervalInBackground: true,
        enabled: !!selectedDate, // Only fetch when a date is selected
      },
    ),
  );
}

export function useLivraisonsEnRetard() {
  const trpc = useTRPC();

  return useQuery(
    trpc.livraisons.getLivraisonsEnRetard.queryOptions(undefined, {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchInterval: 1000 * 10, // 10 seconds
      refetchIntervalInBackground: true,
    }),
  );
}

export function useLivreurs(selectedDate: Date | null) {
  const trpc = useTRPC();

  return useQuery(
    trpc.livreurs.getLivreurs.queryOptions(
      { selectedDate: selectedDate ?? undefined },
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 10,
        refetchIntervalInBackground: true,
      },
    ),
  );
}
