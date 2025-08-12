import { useState, useEffect } from "react"
import { DndContext, closestCenter, useDroppable, useDraggable } from "@dnd-kit/core"
import { GripVertical, RotateCcw } from 'lucide-react'

const CategorizePreview = ({ question }: { question: any }) => {
  const [items, setItems] = useState<any[]>([])
  const categories = question.categories || []

  useEffect(() => {
    if (!question) return
    const initialItems = (question.items || []).map((item: any) => ({
      ...item,
      category: null,
    }))
    setItems(initialItems)
  }, [question])

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || !active) return
    const activeId = active.id
    const toCat = over.id === "unassigned" ? null : over.id
    setItems((prev) => prev.map((item) => (item.id === activeId ? { ...item, category: toCat } : item)))
  }

  const handleReset = () => {
    setItems([])
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Categorization Preview</h2>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Question */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-2">
            <span className="text-sm font-medium text-gray-600 mt-0.5">Question:</span>
            <span className="text-gray-900 font-medium">{question?.question}</span>
          </div>
        </div>

        {/* Drag and Drop Area */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <DroppableContainer
            id="unassigned"
            label="Unassigned Items"
            items={items.filter((item) => !item.category)}
            isUnassigned={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {categories.map((cat: string) => (
              <DroppableContainer
                key={cat}
                id={cat}
                label={cat}
                items={items.filter((item) => item.category === cat)}
                isUnassigned={false}
              />
            ))}
          </div>
        </DndContext>

        {/* Instructions */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">💡 Drag and drop items into the appropriate categories</p>
        </div>

        {/* Points */}
        <div className="mt-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-black text-white text-sm font-medium rounded-full">
            {question?.points} points
          </span>
        </div>
      </div>
    </div>
  )
}

function DroppableContainer({
  id,
  label,
  items,
  isUnassigned,
}: {
  id: string
  label: string
  items: any[]
  isUnassigned: boolean
}) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg border-2 border-dashed p-4 min-h-[120px] transition-all ${
        isOver ? "border-black bg-gray-50" : isUnassigned ? "border-gray-300 bg-gray-50" : "border-gray-200 bg-white"
      }`}
    >
      <h3 className={`font-semibold mb-3 text-center text-sm ${isUnassigned ? "text-gray-600" : "text-gray-900"}`}>
        {label}
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
        {items.length === 0 && (
          <div className="text-center py-4">
            <span className="text-gray-400 text-sm">Drop items here</span>
          </div>
        )}
      </div>
    </div>
  )
}

function DraggableItem({ item }: { item: any }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
  })
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-2 cursor-grab shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
    >
      <GripVertical className="w-4 h-4 text-gray-400" />
      <span className="text-gray-900 font-medium">{item.item_name}</span>
    </div>
  )
}

export default CategorizePreview
