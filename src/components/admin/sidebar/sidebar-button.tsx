'use client';

import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarButton({
  title,
  url,
  icon,
}: {
  title: string;
  url: string;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();
  // Handle the /app route as a special case
  const isActive =
    (url === '/app' && pathname === '/app') || (url !== '/app' && pathname.startsWith(url));

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={url}
          className={`w-full justify-start gap-3 py-2 ${
            isActive
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
