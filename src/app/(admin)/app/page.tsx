import React from 'react';
import DashboardComponent from '@/components/admin/dashboard/dashboard-component';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return <DashboardComponent />;
}
