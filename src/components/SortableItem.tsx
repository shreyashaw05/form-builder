import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { X, GripVertical } from 'lucide-react';

interface SortableItemProps {
  item: string;
  index: number;
  updateItem: (index: number, value: string) => void;
  removeItem: (index: number) => void;
  categories: string[];
  //  handleUpdation: (e:any, item,index) => void;
  setCorrectCategory: React.Dispatch<React.SetStateAction<string[]>>;
  id: string | number;
}

export function SortableItem({item, index, updateItem, setCorrectCategory, removeItem, categories, id}: SortableItemProps) {
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
    <div  style={style} className="space-y-3 flex">
      <div className="flex items-center gap-3">
        <div 
          {...attributes} 
          {...listeners}
          className="w-4 h-4 rounded-full bg-slate-300 cursor-grab active:cursor-grabbing flex items-center justify-center hover:bg-slate-400 transition-colors"
        >
          <GripVertical className="w-3 h-3 text-slate-600" />
        </div>
        <div ref={setNodeRef}>
        <input
          type="text"
          placeholder={`Item ${index + 1}`}
          value={item}
          onChange={(e) => updateItem(index, e.target.value)}
          className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
        />
        </div>
        
        <button
          onClick={() => removeItem(index)}
          className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="ml-7">
        <select
          onChange={e=>setCorrectCategory(prev => {
            const newCategories = [...prev];
            newCategories[index] = e.target.value;
            return newCategories;
          })}
          className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50"
        >
          <option value="">Assign to Category</option>
          {categories.map((cat, catIndex) => (
            cat && <option key={catIndex} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
}