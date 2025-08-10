import { useState } from 'react';
import { HelpCircle, Plus, X, Upload, Image, Video, FileText, Music } from 'lucide-react';
import DndWrapper from '../context/dndContext';

const Categorize = () => {
  const [categories, setCategories] = useState(['', '']);
  const [items, setItems] = useState(['', '']);
  const [selectedMedia, setSelectedMedia] = useState('');
  
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
  };

  const removeItem = (index) => {
    if (items.length > 2) {
      setItems(items.filter((_, i) => i !== index));
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

  const getMediaIcon = (type:any) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <Upload className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Content Categorization</h1>
              <p className="text-slate-600">Organize and classify your content efficiently</p>
            </div>
            <div className="flex items-center gap-4">
              <select className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer">
                <option value="">Categorization Type</option>
                <option value="type1">Content Classification</option>
                <option value="type2">Topic Sorting</option>
                <option value="type3">Priority Grouping</option>
              </select>
              <button
                className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-blue-100 border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 transition-all duration-200"
                title="Help & Instructions"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">
                <span className="text-sm font-medium text-amber-700">Points:</span>
                <input
                  type="number"
                  placeholder="100"
                  className="w-16 bg-transparent border-0 text-amber-800 font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Enter a detailed description of your categorization task..."
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Media Selection Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mb-8 border border-slate-200">
          <label className="block text-lg font-semibold text-slate-800 mb-4">Media Attachments</label>
          <div className="grid grid-cols-5 gap-4">
            {['', 'image', 'video', 'audio', 'document'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMedia(type)}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedMedia === type
                    ? 'border-blue-400 bg-blue-50 text-blue-600'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {getMediaIcon(type)}
                <span className="mt-2 text-sm font-medium capitalize">
                  {type || 'None'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories and Items Grid */}
        <div className="gap-8">
          {/* Categories Card */}
          <div className="bg-white shadow-lg rounded-2xl p-8 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Categories</h3>
              <button
                onClick={addCategory}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-200 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
            </div>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${
                    index === 0 ? 'from-blue-400 to-blue-600' :
                    index === 1 ? 'from-purple-400 to-purple-600' :
                    index === 2 ? 'from-green-400 to-green-600' :
                    'from-orange-400 to-orange-600'
                  }`}></div>
                  <input
                    type="text"
                    placeholder={`Category ${index + 1}`}
                    value={category}
                    onChange={(e) => updateCategory(index, e.target.value)}
                    className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                  />
                  {categories.length > 2 && (
                    <button
                      onClick={() => removeCategory(index)}
                      className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Items Card */}
          <div className="bg-white shadow-lg rounded-2xl p-8 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Items to Categorize</h3>
              <button
                onClick={addItem}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            <div className="space-y-4">
              <DndWrapper items={items} setItems={setItems} updateItem={updateItem} removeItem={removeItem} categories={categories} />
              {/* {items.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-slate-300"></div>
                    <input
                      type="text"
                      placeholder={`Item ${index + 1}`}
                      value={item}
                      onChange={(e) => updateItem(index, e.target.value)}
                      className="flex-1 border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                    />
                    {items.length > 2 && (
                      <button
                        onClick={() => removeItem(index)}
                        className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="ml-7">
                    <select className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50">
                      <option value="">Assign to Category</option>
                      {categories.map((cat, catIndex) => (
                        cat && <option key={catIndex} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8 bg-white shadow-lg rounded-2xl p-6 border border-slate-200">
          <button className="px-6 py-3 text-slate-600 hover:text-slate-800 font-medium transition-colors duration-200">
            Save as Draft
          </button>
          <div className="flex gap-4">
            <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 hover:border-slate-400 rounded-xl font-medium transition-all duration-200">
              Preview
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
              Create Categorization
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorize;