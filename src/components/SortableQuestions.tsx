import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";

interface Question {
  id: string | number;
  question: string;
  type: "multiple-choice";
  options: string[];
  correctAnswer: number;
}

interface SortableQuestionProps {
  question: Question;
  questionIndex: number;
  removeQuestion: (index: number) => void;
  updateQuestion: (index: number, field: keyof Question, value: any) => void;
  updateOption: (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => void;
  id: string | number;
  questions: Question[];
}

export function SortableQuestion({
  question,
  questionIndex,
  removeQuestion,
  updateQuestion,
  updateOption,
  id,
  questions,
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
    <div style={style} className="group mb-4 relative">
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-10">
        <div
          {...attributes}
          {...listeners}
          className="w-6 h-6 rounded-md bg-white shadow-sm border border-gray-300 cursor-grab active:cursor-grabbing flex items-center justify-center hover:bg-gray-50 hover:shadow-md transition-all duration-200 group-hover:opacity-100 opacity-0"
        >
          <GripVertical className="w-3 h-3 text-gray-500" />
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={`relative bg-white rounded-lg border transition-all duration-300 ${
          isDragging ? "border-gray-400 shadow-lg" : "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
        }`}
      >
        <div className="bg-gray-50 rounded-t-lg px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-800 rounded-md flex items-center justify-center text-white font-bold text-xs">
                {questionIndex + 1}
              </div>
              <h4 className="text-sm font-semibold text-gray-900">Question {questionIndex + 1}</h4>
            </div>
            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(questionIndex)}
                className="group/btn w-7 h-7 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
                title="Delete Question"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Question Text</label>
            <input
              type="text"
              placeholder="Enter your question here..."
              value={question.question}
              onChange={(e) => updateQuestion(questionIndex, "question", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all duration-200 placeholder-gray-500 hover:border-gray-400"
            />
          </div>
          {question.type === "multiple-choice" && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Answer Options</label>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`group/option flex items-center gap-3 p-3 rounded-md border transition-all duration-200 ${
                      question.correctAnswer === optionIndex
                        ? "border-gray-400 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name={`correct-${questionIndex}`}
                        checked={question.correctAnswer === optionIndex}
                        onChange={() => updateQuestion(questionIndex, "correctAnswer", optionIndex)}
                        className="sr-only"
                      />
                      <div
                        onClick={() => updateQuestion(questionIndex, "correctAnswer", optionIndex)}
                        className={`w-4 h-4 rounded-full border cursor-pointer transition-all duration-200 flex items-center justify-center ${
                          question.correctAnswer === optionIndex
                            ? "border-gray-800 bg-gray-800"
                            : "border-gray-400 hover:border-gray-600"
                        }`}
                      >
                        {question.correctAnswer === optionIndex && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                        question.correctAnswer === optionIndex
                          ? "bg-gray-800 text-white"
                          : "bg-gray-200 text-gray-700 group-hover/option:bg-gray-300"
                      }`}
                    >
                      {String.fromCharCode(65 + optionIndex)}
                    </div>
                    <input
                      type="text"
                      placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                      value={option}
                      onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                      className={`flex-1 border-0 bg-transparent text-gray-900 focus:outline-none text-sm placeholder-gray-500 font-medium ${
                        question.correctAnswer === optionIndex ? "text-gray-900" : ""
                      }`}
                    />
                    {question.correctAnswer === optionIndex && (
                      <div className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs font-medium">✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
