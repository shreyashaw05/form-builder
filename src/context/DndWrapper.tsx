import React from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface DndWrapperProps {
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
  children: React.ReactNode;
}

export default function DndWrapper({items, setItems, children}: DndWrapperProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    
    if (!over) {
      return;
    }
//  active:the item being dragged
//   over: the item it was dropped on/over
    if (active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = Number(active.id);
        const newIndex = Number(over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items.map((_, index) => index)} //cretae uniqu id for each item 
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}