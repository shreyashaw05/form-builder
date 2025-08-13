import { useState } from "react"
import { ChevronDown, ChevronRight, BookOpen, Target, Award } from "lucide-react"

const ComprehensionPreview = ({ question }: { question: any }) => {
  
  const [open, setOpen] = useState<boolean[]>([])
  const [selected, setSelected] = useState<(number | null)[]>([])

  if (!question || !question.questions) return null

  const toggleOpen = (idx: number) => {
    setOpen((prev) => {
      const newArr = [...prev]
      newArr[idx] = !newArr[idx]
      return newArr
    })
  }

  const handleSelect = (qIdx: number, optIdx: number) => {
    setSelected((prev) => {
      const newArr = [...prev]
      newArr[qIdx] = optIdx
      return newArr
    })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-900">Reading Comprehension</h2>
        </div>

        {/* Metadata Cards */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
            <Target className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Instruction:</span>
            <span className="text-sm text-gray-900">{question.instruction}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
            <Award className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Points:</span>
            <span className="text-sm font-bold text-gray-900">{question.points}</span>
          </div>
        </div>
      </div>

      {/* Passage Section */}
      <div className="px-6 py-5 bg-gray-50 border-b border-gray-200">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Passage</h3>
          <p className="text-gray-900 leading-relaxed">{question.passage}</p>
        </div>
      </div>

      {/* Questions Section */}
      <div className="px-6 py-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          Questions
          <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-full">{question.questions.length}</span>
        </h3>

        <div className="space-y-4">
          {question.questions.map((q: any, idx: number) => (
            <div key={q.id || idx} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              {/* Question Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                onClick={() => toggleOpen(idx)}
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-black text-white text-sm font-bold px-2 py-1 rounded-md min-w-[2rem] text-center">
                    {idx + 1}
                  </div>
                  <p className="text-gray-900 font-medium leading-relaxed">{q.question}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {open[idx] ? (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </div>

              {/* Answer Options */}
              {open[idx] && (
                <div className="px-4 pb-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Answer Options</h4>
                    {q.options && q.options.length > 0 ? (
                      <div className="space-y-2">
                        {q.options.map((opt: string, optIdx: number) => (
                          <label
                            key={optIdx}
                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:bg-gray-50 ${
                              selected[idx] === optIdx ? "border-black bg-gray-50 shadow-sm" : "border-gray-200"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q${idx}`}
                              checked={selected[idx] === optIdx}
                              onChange={() => handleSelect(idx, optIdx)}
                              className="mt-1 w-4 h-4 text-black border-gray-300 focus:ring-black focus:ring-2"
                            />
                            <span
                              className={`text-sm leading-relaxed ${
                                selected[idx] === optIdx ? "text-gray-900 font-medium" : "text-gray-700"
                              }`}
                            >
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <span className="text-gray-400 text-sm italic">No options available</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComprehensionPreview
