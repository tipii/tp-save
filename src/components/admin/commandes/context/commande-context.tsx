'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CommandeContextType {
  selectedCommandeId: string | null;
  setSelectedCommandeId: (id: string | null) => void;
}

const CommandeContext = createContext<CommandeContextType | undefined>(undefined);

export function useCommande() {
  const context = useContext(CommandeContext);
  if (context === undefined) {
    throw new Error('useCommande must be used within a CommandeProvider');
  }
  return context;
}

interface CommandeProviderProps {
  children: ReactNode;
}

export function CommandeProvider({ children }: CommandeProviderProps) {
  const [selectedCommandeId, setSelectedCommandeId] = useState<string | null>(null);

  return (
    <CommandeContext.Provider
      value={{
        selectedCommandeId,
        setSelectedCommandeId,
      }}
    >
      {children}
    </CommandeContext.Provider>
  );
}
