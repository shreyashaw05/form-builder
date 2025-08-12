import { useState } from "react";
import { DndContext, useDraggable, useDroppable, closestCenter } from "@dnd-kit/core";

const ClozePreview = ({ question }: { question: any }) => {
  if (!question) return null;
  const answers = question.answers || [];
  const previewWords = question.preview.split(/( _____ )/g);
  const blankCount = previewWords.filter((w: string) => w === " _____ ").length;
  const [blankAnswers, setBlankAnswers] = useState<(string | null)[]>(Array(blankCount).fill(null));


  const availableAnswers = answers.filter(ans => !blankAnswers.includes(ans));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || !active) return;
    const answer = active.id;
    if (over.id.startsWith("blank-")) {
      const blankIdx = Number(over.id.replace("blank-", ""));
      setBlankAnswers(prev => {
        const newArr = [...prev];
        newArr[blankIdx] = answer;
        return newArr;
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2">Cloze Preview</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="mb-4 flex flex-wrap gap-2">
          {availableAnswers.map((ans) => (
            <DraggableAnswer key={ans} answer={ans} />
          ))}
          {availableAnswers.length === 0 && <span className="text-gray-400">(All answers used)</span>}
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {(() => {
            let blankIdx = 0;
            return previewWords.map((word: string, idx: number) => {
              if (word === " _____ ") {
                const filled = blankAnswers[blankIdx];
                const blankNumber = blankIdx;
                blankIdx++;
                return (
                  <DroppableBlank
                    key={idx}
                    id={`blank-${blankNumber}`}
                    answer={filled}
                  />
                );
              }
              return (
                <span key={idx} className="px-1">{word}</span>
              );
            });
          })()}
        </div>
      </DndContext>
      <div className="mb-2">
        <span className="font-medium">Points:</span> {question.points}
      </div>
    </div>
  );
};

function DraggableAnswer({ answer }: { answer: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: answer });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    marginBottom: "4px",
    display: "inline-block",
  };
  return (
    <span
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="inline-flex items-center gap-1 bg-white border rounded px-2 py-1 cursor-grab shadow"
    >
      {answer}
    </span>
  );
}

function DroppableBlank({ id, answer }: { id: string; answer: string | null }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <span
      ref={setNodeRef}
      className={`inline-block min-w-[60px] px-2 py-1 border rounded bg-gray-100 text-center mx-1 ${isOver ? "bg-blue-200" : ""}`}
      style={{ minHeight: 32 }}
    >
      {answer ? answer : <span className="text-gray-400">(blank)</span>}
    </span>
  );
}

export default ClozePreview;
