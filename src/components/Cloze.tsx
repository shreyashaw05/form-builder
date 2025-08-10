import React, { useEffect, useRef, useState } from "react";
import { HelpCircle, Type } from 'lucide-react';
import DndWrapper from "../context/DndWrapper";
import { SortableCloze } from "./SortableclozeOptions";

const Cloze = () => {
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

  const submitForm = () => {
    const payload = {
      type: "cloze",
      answer: inputValue,
      preview: previewText,
      answers: selectedText,
      points: points
    };
    console.log('Cloze form submitted:', payload);
  };

  useEffect(() => {
    console.log(selectedText);
  }, [selectedText]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Cloze Test Builder</h1>
              <p className="text-emerald-100 text-xs">Create fill-in-the-blank questions</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-md px-2 py-1">
                <span className="text-white text-xs font-medium">Cloze</span>
              </div>
              <button className="w-7 h-7 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-md text-white transition-all duration-200">
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-1.5 bg-amber-400 rounded-md px-2 py-1">
                <span className="text-amber-900 text-xs font-medium">Points:</span>
                <input
                  value={points}
                  onChange={e => setPoints(parseInt(e.target.value))}
                  type="number"
                  className="w-10 bg-transparent border-0 text-amber-900 font-semibold focus:outline-none text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">

          {/* Compact Text Input Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Text Content</h3>
              {showFormatter && (
                <button
                  onClick={() => handleUnderline()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-colors duration-200 text-xs font-medium"
                >
                  <Type className="w-3.5 h-3.5" />
                  Create Blank
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Input Text:</label>
                <input
                  value={inputValue} 
                  ref={inputRef}
                  onChange={(e) => {
                    setShowFormatter(true);
                    const newValue = e.target.value;
                    setInputValue(newValue);
                    if (selectedText.length === 0) {
                      setFinalValue(newValue);
                    }
                  }}
                  type="text"
                  placeholder="Type text, select words to create blanks..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-all duration-200 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Rich Editor:</label>
                <div
                  className="w-full h-[60px] border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 transition-all duration-200 overflow-y-auto"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => {
                    setShowFormatter(true);
                    const newValue = e.currentTarget.innerHTML;
                    setInputValue(newValue.replace(/<[^>]*>/g, ''));
                    setFinalValue(newValue);
                  }}
                  dangerouslySetInnerHTML={{ __html: finalValue }}
                />
              </div>
            </div>
          </div>

          {/* Compact Preview and Answer Choices - Side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Compact Preview */}
            {previewText.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Preview</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700 leading-relaxed">{previewText}</p>
                </div>
              </div>
            )}

            {/* Compact Answer Choices */}
            {selectedText.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-2">Answer Choices</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-700 mb-2">Drag to reorder:</p>
                  <DndWrapper items={selectedText} setItems={setSelectedText}>
                    <div className="space-y-1">
                      {selectedText.map((item, index) => (
                        <SortableCloze key={index} item={item} id={index} />
                      ))}
                    </div>
                  </DndWrapper>
                </div>
              </div>
            )}
          </div>

          {/* Compact Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 text-xs">
              Save Draft
            </button>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 rounded-md font-medium transition-all duration-200 text-xs">
                Preview
              </button>
              <button 
                onClick={submitForm} 
                className="px-6 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-md font-semibold shadow-sm hover:shadow-md transition-all duration-200 text-xs"
              >
                Create Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cloze;
