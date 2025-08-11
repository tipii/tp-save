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
      <Link href={url}>
        <SidebarMenuButton isActive={isActive} className="cursor-pointer">
          {icon}
          <span>{title}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}
