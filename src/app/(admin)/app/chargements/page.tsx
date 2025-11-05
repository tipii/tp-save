import ChargementDnd from '@/components/admin/chargement/chargement-dnd';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function AdminPage() {
  return <ChargementDnd />;
}
