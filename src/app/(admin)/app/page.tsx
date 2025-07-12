import ChargementDnd from '@/components/admin/chargement/chargement-dnd';
import { DateNavigationComponent } from '@/components/admin/shared/date-navigation-example';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function AdminPage() {
  return <ChargementDnd />;
}
