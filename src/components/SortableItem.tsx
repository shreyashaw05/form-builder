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
    <div
      style={style}
      className="bg-white border border-gray-200 rounded-md p-4 space-y-3 hover:border-gray-300 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="w-6 h-6 rounded-md bg-gray-200 cursor-grab active:cursor-grabbing flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <GripVertical className="w-4 h-4 text-gray-600" />
        </div>
        <div ref={setNodeRef} className="flex-1">
          <input
            type="text"
            placeholder={`Item ${index + 1}`}
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200 placeholder-gray-500"
          />
        </div>
        <button
          onClick={() => removeItem(index)}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="ml-9">
        <select
          onChange={(e) =>
            setCorrectCategory((prev) => {
              const newCategories = [...prev]
              newCategories[index] = e.target.value
              return newCategories
            })
          }
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200 bg-gray-50"
        >
          <option value="">Assign to Category</option>
          {categories.map(
            (cat, catIndex) =>
              cat && (
                <option key={catIndex} value={cat}>
                  {cat}
                </option>
              ),
          )}
        </select>
      </div>
    </div>
  )
}