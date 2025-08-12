import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const ComprehensionPreview = ({ question }: { question: any }) => {
  if (!question || !question.questions) return null;
  // Track open state for each question
  const [open, setOpen] = useState<boolean[]>(Array(question.questions.length).fill(false));
  // Track selected option for each question
  const [selected, setSelected] = useState<(number | null)[]>(Array(question.questions.length).fill(null));

  const toggleOpen = (idx: number) => {
    setOpen((prev) => {
      const newArr = [...prev];
      newArr[idx] = !newArr[idx];
      return newArr;
    });
  };

  const handleSelect = (qIdx: number, optIdx: number) => {
    setSelected((prev) => {
      const newArr = [...prev];
      newArr[qIdx] = optIdx;
      return newArr;
    });
  };

  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
         <div className="mt-2">
        <span className="font-medium">Passage:</span> {question.passage}
      </div>
      <div className="mb-2">
        <span className="font-medium">Instruction:</span> {question.instruction}
      </div>
      <div className="mb-2">
        <span className="font-medium">Points:</span> {question.points}
      </div>
      <h2 className="text-lg font-semibold mb-2">Comprehension Questions</h2>
      {question.questions.map((q: any, idx: number) => (
        <div key={q.id || idx} className="mb-4 border-b pb-2">
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={() => toggleOpen(idx)}
          >
            {open[idx] ? (
              <ChevronDown className="w-5 h-5 mr-2" />
            ) : (
              <ChevronRight className="w-5 h-5 mr-2" />
            )}
            <span className="font-medium">Q{idx + 1}:</span> {q.question}
          </div>
          {open[idx] && (
            <div className="mt-2 ml-7">
              <div className="mb-1">
                <span className="font-medium">Options:</span>
                <div className="flex flex-col gap-2 mt-2">
                  {q.options && q.options.length > 0 ? (
                    q.options.map((opt: string, optIdx: number) => (
                      <label key={optIdx} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`q${idx}`}
                          checked={selected[idx] === optIdx}
                          onChange={() => handleSelect(idx, optIdx)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
      ))}
     
    </div>
  );
};

export default ComprehensionPreview;