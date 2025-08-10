import React, { useEffect } from "react"
import Cloze from "./Cloze"
import Comprehension from "./Comprehension"
import Categorize from "./Categorize"
import DndWrapper from "../context/DndWrapper"
import { SortableQuestionSequence } from "./QuestionList"

const FormBuilder = () => {
  const [questionSequence, setQuestionSequence] = React.useState<string[]>([])
  const [payload, setPayload]= React.useState<any>([])
  const [submit, setSubmit]= React.useState(false)

  useEffect(() => {
    console.log("Current question sequence:", questionSequence)
    console.log("payload:", payload)
    
    // When submit is true and we have payloads, show the final result
    if (submit && payload.length > 0) {
      console.log("=== FINAL FORM SUBMISSION ===")
     
      // Reset submit state after a brief delay to allow all components to submit
      setTimeout(() => {
        setSubmit(false)
      }, 100)
    }
  }, [submit, payload])

  const renderQuestion = () => {
    return questionSequence.map((questionType, index) => {
      switch (questionType) {
        case "categorization":
          return <Categorize key={index} setPayload={setPayload} submit={submit} />
        case "cloze":
          return <Cloze key={index} setPayload={setPayload} submit={submit} />
        case "comprehension":
          return <Comprehension key={index} setPayload={setPayload} submit={submit} />
        default:
          return null
      }
    })
  }
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Form Builder</h1>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setQuestionSequence((prev) => [...prev, "categorization"])}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors text-sm font-medium"
          >
            Categorization
          </button>
          <button
            onClick={() => setQuestionSequence((prev) => [...prev, "cloze"])}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Cloze Test
          </button>
          <button
            onClick={() => setQuestionSequence((prev) => [...prev, "comprehension"])}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            Comprehension
          </button>
          <button onClick={()=>{ setPayload([]);setSubmit(true)}} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition-colors text-sm font-medium ml-auto">
            Submit Form
          </button>
        </div>

        {questionSequence.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-medium text-gray-800 mb-3">Question Sequence</h2>
            <div className="flex flex-wrap gap-2 mb-4">
                <DndWrapper items={questionSequence} setItems={setQuestionSequence}>
                      {questionSequence.map((type, index) => (
                <SortableQuestionSequence 
                      item={type}
                      index={index}
                        id={index}
                        />
              ))}      
                    </DndWrapper>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">{renderQuestion()}</div>
    </div>
  )
}

export default FormBuilder