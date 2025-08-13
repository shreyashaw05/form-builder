import { useEffect, useState } from 'react';
import { HelpCircle, Plus, X, Image, Video, Grid3X3 } from 'lucide-react';
import DndWrapper from '../../context/DndWrapper';
import { SortableItem } from '../SortableItems/SortableItem';

const Categorize = ({ setPayload, submit }: { setPayload: React.Dispatch<React.SetStateAction<any>>, submit:boolean }) => {
  const [categories, setCategories] = useState(['cat1', 'cat2']);
  const [items, setItems] = useState(['1']);
  const [correct_category, setCorrectCategory] = useState<string[]>([]);
  const [points, setPoints] = useState(10);
  const [answer, setAnswer] = useState([{
    id:Number(new Date()),
    item_name: "",
    correct_category: "",
  }]);
  const [question, setQuestion] = useState('');

  const addCategory = () => {
    setCategories([...categories, '']);
  };

  const removeCategory = (index) => {
    if (categories.length > 2) {
      setCategories(categories.filter((_, i) => i !== index));
    }
  };

  const addItem = () => {
    setItems([...items, '']);
    setAnswer([...answer, {
      id:Number(new Date()),
      item_name: "",
      correct_category: "",
    }]);
  };

  const removeItem = (index) => {
    if (items.length > 2) {
      setItems(items.filter((_, i) => i !== index));
      setAnswer(answer.filter((_, i) => i !== index));
    }
  };

  const updateCategory = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const updateItem = (index:any, value:any) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  useEffect(() => {
    console.log("items", correct_category);
  }, [correct_category]);

  useEffect(() => {
    const updatedAnswer = answer.map((ans, index) => ({
      ...ans,
      item_name: items[index] || "",
      correct_category: correct_category[index] || "",
    }));
    setAnswer(updatedAnswer);
  }, [items, correct_category]);

  useEffect(() => {
    if(submit)
      submitForm();
  }, [submit]);

  const submitForm = () => {
    const payload = {
      type: "categorization",
      question: question,
      categories: categories.filter(cat => cat.trim() !== ''),
      items:answer,
      points:points
    };
   setPayload((prev:any)=>[...prev, payload])
    console.log('Form submitted:', payload);
  }

 return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Grid3X3 className="w-5 h-5 text-white" />
            <div>
              <h2 className="text-lg font-semibold text-white">Content Categorization</h2>
              <p className="text-gray-300 text-sm">Organize and classify content efficiently</p>
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
        {/* Question Input */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Question</label>
          <input
            onChange={(e) => setQuestion(e.target.value)}
            type="text"
            placeholder="Enter a detailed description of your categorization task..."
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 placeholder-gray-500"
          />
        </div>

        {/* Media Selection */}
        <div>
          <p className="block text-sm font-medium text-gray-900 mb-3">Media Attachments <Image className="inline w-4 h-4" /></p>
 
        </div>

        {/* Categories and Items */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Categories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Categories</h3>
              <button
                onClick={addCategory}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-md transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      index === 0
                        ? "bg-gray-800"
                        : index === 1
                          ? "bg-gray-600"
                          : index === 2
                            ? "bg-gray-500"
                            : "bg-gray-400"
                    }`}
                  ></div>
                  <input
                    type="text"
                    placeholder={`Category ${index + 1}`}
                    value={category}
                    onChange={(e) => updateCategory(index, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                  {categories.length > 2 && (
                    <button
                      onClick={() => removeCategory(index)}
                      className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Items to Categorize</h3>
              <button
                onClick={addItem}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-800 text-white rounded-md transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div>
              <DndWrapper items={items} setItems={setItems}>
                {items.map((item, index) => (
                  <SortableItem
                    key={index}
                    setCorrectCategory={setCorrectCategory}
                    item={item}
                    index={index}
                    updateItem={updateItem}
                    removeItem={removeItem}
                    categories={categories}
                    id={index}
                  />
                ))}
              </DndWrapper>
            </div>
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
              Create Categorization
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Categorize;