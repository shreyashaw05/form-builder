import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";


interface SortableQuestionProps {
  index: number;
  id: string | number;
  item: string;
}

export function SortableQuestionSequence({
  id,
  item,
  index
}: SortableQuestionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1,
  };

    return (
     <div
      ref={setNodeRef}
      style={style}
      className="group mb-4 relative flex items-center space-x-2"
    >
      <div
        {...attributes}
        {...listeners}
        className="w-6 h-6 rounded-md bg-white shadow-sm border border-gray-300 cursor-grab active:cursor-grabbing flex items-center justify-center hover:bg-gray-50 hover:shadow-md transition-all duration-200 group-hover:opacity-100 opacity-100"
      >
        <GripVertical className="w-3 h-3 text-gray-500" />
      </div>
      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border">
        {index + 1}. <span>{item}</span>
      </span>
    </div>
  )
}
