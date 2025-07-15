'use client';

import { useEffect, useRef } from 'react';
import { useBreadcrumb as useBreadcrumbContext } from './breadcrumb-context';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Hook to easily set breadcrumb in one line
 * @param items - Array of breadcrumb items
 * @param currentPage - Current page name
 * @example
 * useBreadcrumb([{ label: 'Home', href: '/' }], 'Dashboard');
 */
export function useBreadcrumb(items: BreadcrumbItem[], currentPage: string) {
  const { setBreadcrumb } = useBreadcrumbContext();
  const previousItems = useRef<string>('');
  const previousPage = useRef<string>('');

  useEffect(() => {
    const itemsString = JSON.stringify(items);

    // Only update if items or currentPage have actually changed
    if (previousItems.current !== itemsString || previousPage.current !== currentPage) {
      setBreadcrumb(items, currentPage);
      previousItems.current = itemsString;
      previousPage.current = currentPage;
    }
  }, [setBreadcrumb, items, currentPage]);
}

// Re-export the original context hook for advanced usage
export { useBreadcrumb as useBreadcrumbContext } from './breadcrumb-context';
