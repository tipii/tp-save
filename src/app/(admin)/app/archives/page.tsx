import ArchivesComponent from '@/components/admin/archives/components/archives-component';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archives | Tallin',
  description: 'Chargements terminés',
};

export default function ArchivesPage() {
  return <ArchivesComponent />;
}
