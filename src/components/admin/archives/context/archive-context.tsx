'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ArchiveContextType {
  selectedChargementId: string | null;
  setSelectedChargementId: (id: string | null) => void;
}

const ArchiveContext = createContext<ArchiveContextType | undefined>(undefined);

export function ArchiveProvider({ children }: { children: ReactNode }) {
  const [selectedChargementId, setSelectedChargementId] = useState<string | null>(null);

  return (
    <ArchiveContext.Provider value={{ selectedChargementId, setSelectedChargementId }}>
      {children}
    </ArchiveContext.Provider>
  );
}

export function useArchive() {
  const context = useContext(ArchiveContext);
  if (context === undefined) {
    throw new Error('useArchive must be used within an ArchiveProvider');
  }
  return context;
}
