import CommandesComponent from '@/components/admin/commandes/components/commandes-component';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Commandes',
};

export default function CommandesPage() {
  return <CommandesComponent />;
}
