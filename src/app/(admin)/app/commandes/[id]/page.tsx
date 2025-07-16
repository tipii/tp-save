import CommandeIdPage from '@/components/admin/commande-id/commande-id-page';
import React from 'react';

interface CommandePageProps {
  params: {
    id: string;
  };
}

export default async function CommandePage({ params }: CommandePageProps) {
  const { id } = await params;

  return <CommandeIdPage id={id} />;
}
