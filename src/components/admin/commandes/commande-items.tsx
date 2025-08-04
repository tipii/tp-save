import React from 'react';
import { useCommande } from './commande-context';
import { Item } from '@/types/types';

export default function CommandeItems() {
  const { selectedCommande, setSelectedCommande } = useCommande();

  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto">
      {selectedCommande?.livraisons.map((livraison, index) => (
        <div key={index}>
          <h2>{livraison.name}</h2>
          <div className="flex flex-col gap-2">
            {(livraison.items as Item[])?.map((item: Item, index: number) => (
              <div key={index}>
                <p>{item.AR_REF}</p>
                <p>{item.DL_Design}</p>
                <p>{item.DL_QTEBL}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
