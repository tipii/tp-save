import React from 'react';
import { LivreurDetailPage } from '@/components/admin/livreurs/livreur-detail-page';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <LivreurDetailPage id={id} />;
}
