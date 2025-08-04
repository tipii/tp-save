'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TrpcCommande } from '@/types/trpc-types';

interface CommandeContextType {
  selectedCommande: TrpcCommande | null;
  setSelectedCommande: (commande: TrpcCommande | null) => void;
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
  const [selectedCommande, setSelectedCommande] = useState<TrpcCommande | null>(null);

  return (
    <CommandeContext.Provider
      value={{
        selectedCommande,
        setSelectedCommande,
      }}
    >
      {children}
    </CommandeContext.Provider>
  );
}
