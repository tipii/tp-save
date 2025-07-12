'use client';

import { DateNavigationComponent } from '@/components/admin/shared/date-navigation-example';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { useDroppable } from '@dnd-kit/core';

export function Droppable(props: { id: string; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

function Draggable(props: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

export default function ChargementDnd() {
  const [parent, setParent] = useState(null);
  const draggable = <Draggable id="draggable-1">Go ahead, drag me.</Draggable>;

  function handleDragEnd({ over }: { over: any }) {
    setParent(over ? over.id : null);
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4">
        <DateNavigationComponent />
        <div className="flex flex-col gap-4">
          <Card className="h-full">
            <CardHeader className="flex justify-between">
              <CardTitle>Commande Drag Zone</CardTitle>
              <div className="">Filter zone</div>
            </CardHeader>
            <CardContent className="flex h-full min-h-64 gap-x-4">
              <div className="flex-1 rounded-2xl bg-red-50 p-4 text-2xl font-bold">
                <span className="">Priorité</span>
                {!parent ? draggable : null}
              </div>
              <div className="flex-1 rounded-2xl bg-yellow-50 p-4 text-2xl font-bold">
                <span className="">Normal</span>
              </div>
              <div className="flex-1 rounded-2xl bg-blue-50 p-4 text-2xl font-bold">
                <span className="">Îles</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Livreur Drop Zone</CardTitle>
              <div className="">Filter zone</div>
            </CardHeader>
            <CardContent className="flex min-h-64 gap-2">
              <div className="">
                {Array.from({ length: 14 }).map((_, index) => (
                  <div
                    key={index}
                    className="m-2 inline-block w-xs flex-col items-center gap-2 rounded-2xl border border-gray-200 p-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium">Livreur {index + 1}</p>
                      </div>
                    </div>
                    <div className="flex h-20 w-full items-center justify-center rounded-2xl bg-gray-200">
                      <Droppable id={`droppable-${index}`}>
                        {parent === `droppable-${index}` ? draggable : 'Drop here'}
                      </Droppable>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DndContext>
  );
}
