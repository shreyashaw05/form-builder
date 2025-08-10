import { useEffect, useState } from 'react';
import { HelpCircle, Plus, BookOpen } from 'lucide-react';
import { SortableQuestion } from './SortableQuestions';
import DndWrapper from '../context/DndWrapper';
interface ComprehensionProps {
  setPayload: React.Dispatch<React.SetStateAction<any>>;
  submit: boolean;
}
const Comprehension = ({setPayload, submit}:ComprehensionProps) => {
  const [passage, setPassage] = useState('');
  const [instruction, setInstruction] = useState('');
  const [selectedMedia, setSelectedMedia] = useState('');
interface Question {
  id: string | number;
  question: string;
  type: "multiple-choice";
  options: string[];
  correctAnswer: number;
}
const [questions, setQuestions] = useState<Question[]>([
  {
    id: Date.now(),
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    type: "multiple-choice"
  }
]);
  const [points, setPoints] = useState(10);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      type: "multiple-choice"
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };
    useEffect(() => {
      if(submit)
        submitForm();
    }, [submit]);

  const submitForm = () => {
    const payload = {
      type: "comprehension",
      passage: passage,
      instruction: instruction,
      media: selectedMedia,
      questions: questions.filter(q => q.question.trim() !== ''),
      points: points
    };
    setPayload((prev:any)=>[...prev, payload])
    console.log('Comprehension form submitted:', payload);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-white" />
            <div>
              <h2 className="text-lg font-semibold text-white">Reading Comprehension</h2>
              <p className="text-gray-300 text-sm">Create engaging reading exercises</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-md text-gray-300 transition-colors">
              <HelpCircle className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 bg-gray-800 rounded-md px-3 py-1.5">
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
        {/* Reading Passage */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Reading Passage</label>
          <textarea
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            placeholder="Enter the reading passage that students will analyze..."
            className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 placeholder-gray-500 resize-none"
          />
        </div>

        {/* Media Attachments */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Media Attachments (Optional)</label>
          <div className="text-sm text-gray-600">No media selected</div>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Instructions</label>
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Provide clear instructions for students..."
            className="w-full h-20 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 placeholder-gray-500 resize-none"
          />
        </div>

        {/* Questions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Comprehension Questions</h3>
            <button
              onClick={addQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-md transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Question
            </button>
          </div>

          <div className="space-y-4">
            <DndWrapper items={questions} setItems={setQuestions}>
              {questions.map((question, questionIndex) => (
                <SortableQuestion
                  key={question.id}
                  question={question}
                  questionIndex={questionIndex}
                  removeQuestion={removeQuestion}
                  updateQuestion={updateQuestion}
                  updateOption={updateOption}
                  id={questionIndex}
                  questions={questions}
                />
              ))}
            </DndWrapper>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm">
            Save as Draft
          </button>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 rounded-md font-medium transition-all text-sm">
              Preview
            </button>
            <button
              onClick={submitForm}
              className="px-6 py-2 bg-gray-900 hover:bg-black text-white rounded-md font-medium transition-colors text-sm"
            >
              Create Comprehension
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Comprehension;