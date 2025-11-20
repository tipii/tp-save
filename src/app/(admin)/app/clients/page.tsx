import ClientsPageComponent from '@/components/admin/clients/clients-page';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Clients',
};

export default function ClientsPage() {
  return <ClientsPageComponent />;
}
