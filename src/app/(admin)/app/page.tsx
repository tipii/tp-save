'use client';

import React from 'react';
import { useBreadcrumb } from '@/components/admin/shared/breadcrumb/useBreadcrumb';

export default function DashboardPage() {
  // One-liner to set breadcrumb
  useBreadcrumb([], 'Accueil');

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600">
        Cette page utilise le hook useBreadcrumb en une ligne pour mettre à jour le fil d'Ariane.
      </p>
    </div>
  );
}
