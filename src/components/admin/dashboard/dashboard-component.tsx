'use client';

import { useBreadcrumb } from '@/components/admin/shared/breadcrumb/breadcrumb-context';
import React, { useEffect } from 'react';

// Import our new self-contained components
import RecentCommandsSection from './recent-commands-section';
import DeliveringLivraisonsSection from './delivering-livraisons-section';
import DeliveredLivraisonsSection from './delivered-livraisons-section';
import ReturnsLivraisonsSection from './returns-livraisons-section';
import Stats from './stats';
import { CheckCircle, Clock, Package, PackageMinus, Truck } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import CalendarLivraison from './calendar-livraison';

export default function DashboardComponent() {
  const { setBreadcrumb } = useBreadcrumb();

  const trpc = useTRPC();

  const { data: stats, isLoading } = useQuery(trpc.dashboard.getStats.queryOptions());

  useEffect(() => {
    setBreadcrumb([], 'Dashboard');
  }, [setBreadcrumb]);

  return (
    <div className="space-y-6 p-4">
      <Stats
        stats={[
          {
            label: 'Commandes reçues',
            value: stats?.commandesRecuesToday ?? 0,
            description: "Commandes reçues aujourd'hui",
            icon: <Package />,
            link: '/app/commandes',
            className: 'bg-blue-500/10 border-blue-500/20 text-blue-600',
            // trend: { value: 10, isUp: true },
          },
          {
            label: 'Livraisons en cours',
            value: stats?.livraisonsEnCours ?? 0,
            description: 'Livraisons en cours',
            icon: <Truck />,
            link: '/app/commandes?status=DELIVERING',
            className: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600',
            // trend: { value: 10, isUp: true },
          },
          {
            label: 'Livraisons effectuées',
            value: stats?.livraisonsEffectuees ?? 0,
            description: 'Livraisons effectuées',
            icon: <CheckCircle />,
            link: '/app/commandes?status=DELIVERED',
            className: 'bg-green-500/10 border-green-500/20 text-green-600',
            // trend: { value: 10, isUp: true },
          },
          {
            label: 'En retard',
            value: stats?.commandesEnRetard ?? 0,
            description: 'Commandes en retard',
            icon: <Clock />,
            link: '/app/commandes?expectedDeliveryDatePassed=true',
            className: 'bg-red-500/10 border-red-500/20 text-red-600',
            // trend: { value: 10, isUp: true },
          },
        ]}
        isLoading={isLoading}
      />
      <div className="space-y-6">
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Commands */}
          <CalendarLivraison />
          {/* Delivering Livraisons */}
          <DeliveringLivraisonsSection />

          <RecentCommandsSection />

          {/* Returns */}
          <ReturnsLivraisonsSection />
        </div>
      </div>
    </div>
  );
}
