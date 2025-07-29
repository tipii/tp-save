'use client';

import { useBreadcrumb } from '@/components/admin/shared/breadcrumb/breadcrumb-context';
import React, { useEffect } from 'react';

// Import our new self-contained components
import RecentCommandsSection from './recent-commands-section';
import DeliveringLivraisonsSection from './delivering-livraisons-section';
import DeliveredLivraisonsSection from './delivered-livraisons-section';
import ReturnsLivraisonsSection from './returns-livraisons-section';

export default function DashboardComponent() {
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb([], 'Dashboard');
  }, [setBreadcrumb]);

  return (
    <div className="space-y-6 p-4">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Commands */}
        <RecentCommandsSection />

        {/* Delivering Livraisons */}
        <DeliveringLivraisonsSection />

        {/* Delivered Livraisons */}
        <DeliveredLivraisonsSection />

        {/* Returns */}
        <ReturnsLivraisonsSection />
      </div>
    </div>
  );
}
