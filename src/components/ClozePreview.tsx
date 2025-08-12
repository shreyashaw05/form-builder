import { useState } from "react"
import { DndContext, useDraggable, useDroppable, closestCenter } from "@dnd-kit/core"
import { Type } from "lucide-react"

const ClozePreview = ({ question }: { question: any }) => {
  const [blankAnswers, setBlankAnswers] = useState<(string | null)[]>([])
  if (!question) return null
  const answers = question.answers || []
  const previewWords = question.preview.split(/( _____ )/g)
  const blankCount = previewWords.filter((w: string) => w === " _____ ").length

  const availableAnswers = answers.filter((ans) => !blankAnswers.includes(ans))

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || !active) return
    const answer = active.id
    if (over.id.startsWith("blank-")) {
      const blankIdx = Number(over.id.replace("blank-", ""))
      setBlankAnswers((prev) => {
        const newArr = [...prev]
        newArr[blankIdx] = answer
        return newArr
      })
    }
  }

  const handleReset = () => {
    setBlankAnswers(Array(blankCount).fill(null))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Type className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Cloze Preview</h2>
          </div>
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {/* Available Answers */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Available Words:</h3>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">
              <div className="flex flex-wrap gap-2">
                {availableAnswers.map((ans) => (
                  <DraggableAnswer key={ans} answer={ans} />
                ))}
                {availableAnswers.length === 0 && (
                  <span className="text-gray-400 text-sm italic">All words have been used</span>
                )}
              </div>
            </div>
          </div>

          {/* Text with Blanks */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3">Complete the Text:</h3>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="text-gray-900 leading-relaxed">
                {(() => {
                  let blankIdx = 0
                  return previewWords.map((word: string, idx: number) => {
                    if (word === " _____ ") {
                      const filled = blankAnswers[blankIdx]
                      const blankNumber = blankIdx
                      blankIdx++
                      return <DroppableBlank key={idx} id={`blank-${blankNumber}`} answer={filled} />
                    }
                    return <span key={idx}>{word}</span>
                  })
                })()}
              </div>
            </div>
          </div>
        </DndContext>

        {/* Instructions */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700">💡 Drag words from above to fill in the blanks</p>
        </div>

        {/* Points */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-black text-white text-sm font-medium rounded-full">
            {question.points} points
          </span>
        </div>
      </div>
    </div>
  )
}

function DraggableAnswer({ answer }: { answer: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: answer })
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <span
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-lg cursor-grab shadow-sm hover:shadow-md hover:border-gray-400 transition-all text-gray-900 font-medium"
    >
      {answer}
    </span>
  )
}

function DroppableBlank({ id, answer }: { id: string; answer: string | null }) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <span
      ref={setNodeRef}
      className={`inline-flex items-center justify-center min-w-[80px] px-3 py-1.5 border-2 border-dashed rounded-lg mx-1 transition-all ${
        isOver ? "border-black bg-gray-50" : "border-gray-300 bg-gray-50"
      }`}
      style={{ minHeight: 32 }}
    >
      {answer ? (
        <span className="text-gray-900 font-medium">{answer}</span>
      ) : (
        <span className="text-gray-400 text-sm">blank</span>
      )}
    </span>
  )
}

export default ClozePreview
