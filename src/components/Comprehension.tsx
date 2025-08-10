import { useState } from 'react';
import { HelpCircle, Plus, X, Upload, Image, Video, FileText, Music, BookOpen } from 'lucide-react';
import { SortableQuestion } from './SortableQuestions';
import DndWrapper from '../context/DndWrapper';

const Comprehension = () => {
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

  const submitForm = () => {
    const payload = {
      type: "comprehension",
      passage: passage,
      instruction: instruction,
      media: selectedMedia,
      questions: questions.filter(q => q.question.trim() !== ''),
      points: points
    };
    console.log('Comprehension form submitted:', payload);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header - Compact */}
        <div className="bg-gradient-to-r from-indigo-600 to-cyan-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white mb-1">Reading Comprehension</h1>
              <p className="text-indigo-100 text-xs">Create engaging reading comprehension exercises</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-white text-xs font-medium flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  Comprehension
                </span>
              </div>
              <button
                className="w-7 h-7 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all duration-200"
                title="Help & Instructions"
              >
                <HelpCircle className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-1 bg-amber-400 rounded-lg px-2 py-1">
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
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Reading Passage</label>
            <textarea
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              placeholder="Enter the reading passage that students will analyze..."
              className="w-full h-32 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 placeholder-gray-400 resize-none"
            />
          </div>

          <div>
            <p className="block text-xs font-semibold text-gray-800 mb-2">Media Attachments (Optional) <Image className="inline w-4 h-4" /></p>

          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Instructions</label>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Provide clear instructions for students..."
              className="w-full h-16 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 placeholder-gray-400 resize-none"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Comprehension Questions</h3>
              <button
                onClick={addQuestion}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200 text-xs font-medium"
              >
                <Plus className="w-3 h-3" />
                Add Question
              </button>
            </div>

            <div className="space-y-3">
                <DndWrapper items={questions} setItems={setQuestions}>
                    {
                        questions.map((question, questionIndex) =>(
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

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 text-xs">
              Save as Draft
            </button>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200 text-xs">
                Preview
              </button>
              <button 
                onClick={submitForm} 
                className="px-6 py-1.5 bg-gradient-to-r from-indigo-500 to-cyan-600 hover:from-indigo-600 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-xs"
              >
                Create Comprehension
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comprehension;