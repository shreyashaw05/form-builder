import React, { useState } from 'react';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import {
  DndContext,
  DragOverlay, 
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
import { SortableItem } from '../components/Form';

interface DndWrapperProps {
  items: string[];
  updateItem: (index: number, value: string) => void;
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  removeItem: (index: number) => void;
  categories: string[];
}

export default function DndWrapper({items, updateItem, setItems, removeItem, categories}: DndWrapperProps) {
const [activeId, setActiveId] = useState<string | number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
    <DndContext 
    onDragStart={handleDragStart}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item, index) => <SortableItem item={item} index={index} updateItem={updateItem} removeItem={removeItem} categories={categories} key={index} id={index} />)}
      </SortableContext>
      <DragOverlay>
        {activeId !== null ? (
          <div className="opacity-50">
            <SortableItem 
              item={items[Number(activeId)]} 
              index={Number(activeId)} 
              updateItem={updateItem} 
              removeItem={removeItem} 
              categories={categories} 
              id={activeId} 
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
    

    </>
  );
  
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
}

function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    console.log('Drag End Event:', event);
        setActiveId(null);
    if (!over) {
        console.log('No item was dragged over.');
        return;
    }
    console.log('Active ID:', active.id, 'Over ID:', over.id);

    if (active.id !== over.id) {
        setItems((prevItems) => {
            const oldIndex = Number(active.id);
            const newIndex = Number(over.id);
            console.log('Old Index:', oldIndex, 'New Index:', newIndex);
            const movedItems = arrayMove(prevItems, oldIndex, newIndex);
            console.log('Items after move:', movedItems);
            return movedItems;
        });
    }
}
}