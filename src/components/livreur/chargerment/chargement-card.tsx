import { TrpcLivreurChargmenent } from '@/types/trpc-types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { Item } from '@/types/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, MapPin, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { statusToBadge } from '@/components/ui/enum-to-ui';

export default function ChargementCard({ chargement }: { chargement: TrpcLivreurChargmenent }) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{chargement.name}</CardTitle> {statusToBadge(chargement.status)}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div>
            <p>Livraisons ({chargement.livraisons.length})</p>
          </div>
          <div className="flex flex-col gap-2">
            {chargement.livraisons.map((livraison) => (
              <Card key={livraison.id} className="">
                <CardHeader className="mb-2 flex items-center justify-between">
                  <CardTitle>{livraison.commande?.client?.name}</CardTitle>
                  {statusToBadge(livraison.status)}
                </CardHeader>
                <CardContent className="p-2">
                  <Collapsible className="bg-tallin-yellow/50 mb-1 rounded-sm px-2">
                    <CollapsibleTrigger className="flex w-full items-center justify-between gap-2">
                      <h2 className="text-sm font-bold">Client infos</h2>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="">
                        <p>{livraison.commande?.client?.contactPerson}</p>
                        <p>{livraison.commande?.client?.phone}</p>
                        <p>{livraison.commande?.client?.phoneSecond}</p>
                        <p>{livraison.commande?.client?.address}</p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="">
                    <Collapsible className="bg-tallin-yellow/50 mb-1 rounded-sm px-2">
                      <CollapsibleTrigger className="flex w-full items-center justify-between gap-2">
                        <h2 className="text-sm font-bold">Items</h2>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="py-2">
                        {(livraison.items as Item[])?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="mb-2 grid w-full grid-cols-12 items-center gap-2 bg-white/60 px-1 text-xs"
                            >
                              <p className="col-span-4">{item.AR_REF}</p>
                              <p className="col-span-6 font-bold">{item.DL_Design}</p>
                              <p className="col-span-2 text-right">{item.DL_QTEBL}</p>
                            </div>
                          );
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <CardFooter className="mt-4 px-0">
          <Button className="w-full">
            <Truck className="h-4 w-4" />
            <p>Prendre en charge</p>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
