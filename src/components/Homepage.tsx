
import { FileText, Eye, ArrowRight } from "lucide-react"

export default function Homepage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Interactive Learning Platform</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Create engaging educational content with our powerful form builder and preview tools. Design interactive
              exercises that enhance learning experiences.
            </p>
          </div>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* Form Builder Card */}
            <a href="/form-builder" className="group">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Build a Form</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Create interactive learning exercises with our intuitive form builder. Design comprehension questions,
                  categorization tasks, and fill-in-the-blank activities.
                </p>

                <div className="flex items-center text-black font-medium">
                  <span>Start Building</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </a>

            {/* Preview Card */}
            <a href="/preview" className="group">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Preview Content</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Test and preview your educational content before publishing. See how your interactive exercises will
                  appear to learners.
                </p>

                <div className="flex items-center text-black font-medium">
                  <span>View Preview</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Learning Tools</h2>
            <p className="text-gray-600 text-lg">Everything you need to create engaging educational experiences</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Interactive Forms</h3>
              <p className="text-gray-600">
                Create dynamic forms with multiple question types and interactive elements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Preview</h3>
              <p className="text-gray-600">See exactly how your content will look and function before publishing.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Navigation</h3>
              <p className="text-gray-600">Intuitive interface that makes content creation simple and efficient.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
