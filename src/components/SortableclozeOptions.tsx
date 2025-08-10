import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
  item: string;
  id: string | number;
}

export function SortableCloze({item, id}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 mb-2">
      <div 
        {...attributes} 
        {...listeners}
        className="w-4 h-4 rounded-full bg-slate-300 cursor-grab active:cursor-grabbing flex items-center justify-center hover:bg-slate-400 transition-colors"
      >
        <GripVertical className="w-3 h-3 text-slate-600" />
      </div>
      <span className="px-4 py-1 rounded-lg border">{item}</span>
    </div>
  );
}