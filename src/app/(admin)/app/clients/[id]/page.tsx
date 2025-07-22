import ClientPageComponent from '@/components/admin/clients/client-page';
import React from 'react';

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ClientPageComponent id={id} />;
}
