import ClientPageComponent from '@/components/admin/clients/client-page';
import React from 'react';

export default async function ClientPage({ params }: { params: { id: Promise<string> } }) {
  const id = await params.id;

  return <ClientPageComponent id={id} />;
}
