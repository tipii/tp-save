'use client';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';

export default function ClientPageComponent() {
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb([{ label: 'Tallin Pi Livraison', href: '/app' }], 'Clients');
  }, []);

  const trpc = useTRPC();
  const { data: clients, isPending } = useQuery(trpc.clients.getClients.queryOptions());

  if (isPending) return <div>Loading...</div>;

  if (!clients) return <div>No clients found</div>;

  return (
    <div>
      <div>
        <h1>Clients</h1>
      </div>
      <div>
        {clients.map((client) => (
          <div key={client.id}>{client.name}</div>
        ))}
      </div>
    </div>
  );
}
