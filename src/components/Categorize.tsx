import { useEffect, useState } from 'react';
import { HelpCircle, Plus, X, Upload, Image, Video, FileText, Music } from 'lucide-react';
import DndWrapper from '../context/DndWrapper';
import { SortableItem } from './SortableItem';

const Categorize = () => {
  const [categories, setCategories] = useState(['cat1', 'cat2']);
  const [items, setItems] = useState(['1']);
  const [selectedMedia, setSelectedMedia] = useState('');
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

  const getMediaIcon = (type:any) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <Upload className="w-4 h-4" />;
    }
  };

  const submitForm = () => {
    const payload = {
      type: "categorization",
      question: question,
      categories: categories.filter(cat => cat.trim() !== ''),
      items:answer,
      points:points
    };
    console.log('Form submitted:', payload);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Content Categorization</h1>
              <p className="text-blue-100 text-sm">Organize and classify your content efficiently</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <span className="text-white text-sm font-medium">Categorize</span>
              </div>
              <button
                className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all duration-200"
                title="Help & Instructions"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 bg-amber-400 rounded-lg px-3 py-1.5">
                <span className="text-amber-900 text-sm font-medium">Points:</span>
                <input
                  value={points}
                  onChange={e=> setPoints(parseInt(e.target.value))}
                  type="number"
                  className="w-12 bg-transparent border-0 text-amber-900 font-semibold focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Question Input */}
          <div>
            <input
              onChange={(e)=> setQuestion(e.target.value)}
              type="text"
              placeholder="Enter a detailed description of your categorization task..."
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder-gray-400"
            />
          </div>

          {/* Media Selection - Compact */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">Media Attachments</label>
            <div className="flex gap-2">
              {['', 'image', 'video', 'audio', 'document'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedMedia(type)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 text-sm ${
                    selectedMedia === type
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {getMediaIcon(type)}
                  <span className="capitalize">{type || 'None'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Categories and Items - Side by side */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Categories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                <button
                  onClick={addCategory}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-purple-500' :
                      index === 2 ? 'bg-green-500' :
                      'bg-orange-500'
                    }`}></div>
                    <input
                      type="text"
                      placeholder={`Category ${index + 1}`}
                      value={category}
                      onChange={(e) => updateCategory(index, e.target.value)}
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                    />
                    {categories.length > 2 && (
                      <button
                        onClick={() => removeCategory(index)}
                        className="w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-md transition-colors duration-200 flex-shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Items to Categorize</h3>
                <button
                  onClick={addItem}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                >
                  <Plus className="w-3.5 h-3.5" />
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
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <button className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200 text-sm">
              Save as Draft
            </button>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200 text-sm">
                Preview
              </button>
              <button 
                onClick={submitForm} 
                className="px-8 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm"
              >
                Create Categorization
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorize;