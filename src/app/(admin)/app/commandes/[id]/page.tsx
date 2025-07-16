import CommandeIdPage from '@/components/admin/commande-id/commande-id-page';
import React from 'react';

export default async function CommandePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <CommandeIdPage id={id} />;
}
