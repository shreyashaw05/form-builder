import React, { useEffect, useRef, useState } from "react";
import { HelpCircle, Type } from 'lucide-react';
import { SortableCloze } from "../SortableItems/SortableclozeOptions";
import DndWrapper from "../../context/DndWrapper";


const Cloze = (props:any) => {
  const [showFormatter, setShowFormatter] = React.useState(true);
  const [inputValue, setInputValue] = React.useState("");
  const [finalValue, setFinalValue] = React.useState("");
  const [selectedText, setSelectedText] = useState<string[]>([]);
  const [previewText, setPreviewText] = useState<string>("");
  const [points, setPoints] = useState(10);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedText.length === 0) {
      setPreviewText(inputValue);
      setFinalValue(inputValue);
    }
  }, [inputValue, selectedText.length]);

  const handleUnderline = () => {
    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      if (start !== null && end !== null && start !== end) {
        const selectedTextValue = inputValue.substring(start, end);
        
        if (!selectedText.includes(selectedTextValue)) {
          const newSelections = [...selectedText, selectedTextValue];
          setSelectedText(newSelections);
          
          let newFinalValue = inputValue;
          let newPreview = inputValue;
          
          newSelections.forEach((text) => {
            newFinalValue = newFinalValue.replace(text, `<u>${text}</u>`);
            newPreview = newPreview.replace(text, " _____ ");
          });

          setFinalValue(newFinalValue);
          setPreviewText(newPreview);
        }
      }
    }
  };
  useEffect(() => {
    if(props.submit)
      submitForm();
  }, [props.submit]);
  const submitForm = () => {
    const payload = {
      type: "cloze",
      answer: inputValue,
      preview: previewText,
      answers: selectedText,
      points: points
    };
    props.setPayload((prev:any)=>[...prev, payload])
    console.log('Cloze form submitted:', payload);
  };

  useEffect(() => {
    console.log(selectedText);
  }, [selectedText]);

   return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Type className="w-5 h-5 text-white" />
            <div>
              <h2 className="text-lg font-semibold text-white">Cloze Test Builder</h2>
              <p className="text-gray-300 text-sm">Create fill-in-the-blank questions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors">
              <HelpCircle className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 bg-gray-700 rounded-md px-3 py-1.5">
              <span className="text-gray-300 text-sm">Points:</span>
              <input
                value={points}
                onChange={(e) => setPoints(Number.parseInt(e.target.value))}
                type="number"
                className="w-12 bg-transparent border-0 text-white font-medium focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Text Input Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Text Content</h3>
            {showFormatter && (
              <button
                onClick={() => handleUnderline()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md transition-colors text-sm font-medium"
              >
                <Type className="w-4 h-4" />
                Create Blank
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Input Text:</label>
              <input
                value={inputValue}
                ref={inputRef}
                onChange={(e) => {
                  setShowFormatter(true)
                  const newValue = e.target.value
                  setInputValue(newValue)
                  if (selectedText.length === 0) {
                    setFinalValue(newValue)
                  }
                }}
                type="text"
                placeholder="Type text, select words to create blanks..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rich Editor:</label>
              <div
                className="w-full h-[60px] border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 overflow-y-auto"
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => {
                  setShowFormatter(true)
                  const newValue = e.currentTarget.innerHTML
                  setInputValue(newValue.replace(/<[^>]*>/g, ""))
                  setFinalValue(newValue)
                }}
                dangerouslySetInnerHTML={{ __html: finalValue }}
              />
            </div>
          </div>
        </div>

        {/* Preview and Answer Choices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview */}
          {previewText.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Preview</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{previewText}</p>
              </div>
            </div>
          )}

          {/* Answer Choices */}
          {selectedText.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Answer Choices</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <p className="text-xs text-gray-600 mb-3">Drag to reorder:</p>
                <DndWrapper items={selectedText} setItems={setSelectedText}>
                  <div className="space-y-2">
                    {selectedText.map((item, index) => (
                      <SortableCloze key={index} item={item} id={index} />
                    ))}
                  </div>
                </DndWrapper>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
};

export default Cloze;
