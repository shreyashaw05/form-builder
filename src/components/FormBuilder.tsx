"use client"

import React, { useEffect } from "react"
import Cloze from "./Cloze"
import Comprehension from "./Comprehension"
import Categorize from "./Categorize"
import DndWrapper from "../context/DndWrapper"
import { SortableQuestionSequence } from "./QuestionList"
import axios from "axios"

const FormBuilder = () => {
  const [questionSequence, setQuestionSequence] = React.useState<string[]>([])
  const [payload, setPayload] = React.useState<any>([])
  const [submit, setSubmit] = React.useState(false)

  useEffect(() => {
    console.log("Current question sequence:", questionSequence)
    console.log("payload:", payload)

    if (submit && payload.length > 0) {
      console.log("=== FINAL FORM SUBMISSION ===")

      setTimeout(() => {
        setSubmit(false)
        handleSubmission()
      }, 100)
    }
  }, [submit, payload])

  const handleSubmission = async () => {
    console.log("Final payload submitted:", payload)
    const response = await axios.post("http://localhost:3000/form-create", payload)
    // console.log("Response from server:", response)
    if (response.status === 201) {
      window.location.href = "/preview"
    }

    setPayload([])
  }

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
  
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Your Form</h1>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-sm font-semibold text-gray-800 mb-2">Quick Start Guide:</h2>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>
                <span className="font-medium text-gray-800">1.</span> Click question type buttons to add questions
              </li>
              <li>
                <span className="font-medium text-gray-800">2.</span> Drag question tags to reorder them
              </li>
              <li>
                <span className="font-medium text-gray-800">3.</span> Fill out each question form below
              </li>
              <li>
                <span className="font-medium text-gray-800">4.</span> Click Submit Form to create your form
              </li>
            </ol>
          </div>
        </div>
      </div>

    
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setQuestionSequence((prev) => [...prev, "categorization"])}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors text-sm font-medium"
          >
            + Categorization
          </button>
          <button
            onClick={() => setQuestionSequence((prev) => [...prev, "cloze"])}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            + Cloze Test
          </button>
          <button
            onClick={() => setQuestionSequence((prev) => [...prev, "comprehension"])}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            + Comprehension
          </button>
          <button
            onClick={() => {
              setPayload([])
              setSubmit(true)
            }}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 transition-colors text-sm font-medium ml-auto"
          >
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
                    key={index} // Added key property
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
