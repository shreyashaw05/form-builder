import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

const CategorizePreview = ({ question }: { question: any }) => {
  if (!question) return null;

  // All items start unassigned
  const initialItems = (question.items || []).map((item: any) => ({
    ...item,
    category: null,
  }));
  const [items, setItems] = useState<any[]>(initialItems);
  const categories = question.categories || [];

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || !active) return;
    const activeId = active.id;
    const toCat = over.id === "unassigned" ? null : over.id;
    setItems((prev) =>
      prev.map((item) =>
        item.id === activeId ? { ...item, category: toCat } : item
      )
    );
  };

  const handleReset = () => {
    setItems(initialItems);
  };

  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-2">Categorization Preview</h2>
        <button
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div className="mb-2">
        <span className="font-medium">Question:</span> {question.question}
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <DroppableContainer
          id="unassigned"
          label="Unassigned Items"
          items={items.filter((item) => !item.category)}
        />
        <div className="flex gap-6 mt-6">
          {categories.map((cat: string) => (
            <DroppableContainer
              key={cat}
              id={cat}
              label={cat}
              items={items.filter((item) => item.category === cat)}
            />
          ))}
        </div>
      </DndContext>
      <div className="mt-4 text-sm text-gray-500">
        Drag and drop items into categories.
      </div>
      <div className="mb-2">
        <span className="font-medium">Points:</span> {question.points}
      </div>
    </div>
  );
};

function DroppableContainer({
  id,
  label,
  items,
}: {
  id: string;
  label: string;
  items: any[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`flex-1 bg-gray-50 rounded-lg p-4 border min-h-[80px] ${
        isOver ? "bg-blue-100" : ""
      }`}
      style={{ minWidth: 150, marginBottom: 16 }}
    >
      <h3 className="font-semibold mb-2 text-center">{label}</h3>
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function DraggableItem({ item }: { item: any }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id,
    });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    marginBottom: "8px",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-2 bg-white border rounded px-3 py-2 cursor-grab shadow"
    >
      <GripVertical className="w-4 h-4 text-slate-600" />
      <span>{item.item_name}</span>
    </div>
  );
}

export default CategorizePreview;
