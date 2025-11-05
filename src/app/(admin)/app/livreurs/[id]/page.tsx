import React from 'react';
import { LivreurDetailPage } from '@/components/admin/livreurs/livreur-detail-page';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <LivreurDetailPage id={params.id} />;
}
