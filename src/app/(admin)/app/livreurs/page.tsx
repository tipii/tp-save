import React from 'react';
import LivreursPageComponent from '@/components/admin/livreurs/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Livreurs',
};

export default function LivreursPage() {
  return <LivreursPageComponent />;
}
