'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbContextType {
  items: BreadcrumbItem[];
  currentPage: string;
  setItems: (items: BreadcrumbItem[]) => void;
  setCurrentPage: (page: string) => void;
  setBreadcrumb: (items: BreadcrumbItem[], currentPage: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

interface BreadcrumbProviderProps {
  children: ReactNode;
}

export function BreadcrumbProvider({ children }: BreadcrumbProviderProps) {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);
  const [currentPage, setCurrentPage] = useState('Data Fetching');

  const setBreadcrumb = useCallback((newItems: BreadcrumbItem[], newCurrentPage: string) => {
    setItems(newItems);
    setCurrentPage(newCurrentPage);
  }, []);

  return (
    <BreadcrumbContext.Provider
      value={{
        items,
        currentPage,
        setItems,
        setCurrentPage,
        setBreadcrumb,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
}
