import { useEffect, useState } from "react"
import axios from "axios"
import { Eye, Trash2, FileText, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

const PreviewDashboard = () => {
  const [forms, setForms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/forms`)
        setForms(response.data)
      } catch (err: any) {
        setError("Failed to fetch forms")
      } finally {
        setLoading(false)
      }
    }
    fetchForms()
  }, [])

  const handleDelete = async (formId: string) => {
    setDeletingId(formId)
    try {
      await axios.delete(`${BACKEND_URL}/forms/${formId}`)
      setForms((prev) => prev.filter((f) => f._id !== formId))
    } catch (err) {
      alert("Failed to delete form")
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading forms...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Forms Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage and preview your forms</p>
        </div>

        {/* Forms Grid */}
        {forms.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No forms found</h3>
            <p className="text-gray-600">Create your first form to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form, idx) => (
              <div
                key={form._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Form #{idx + 1}</h2>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Categories:</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {form.categories ? form.categories.length : 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cloze Questions:</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        {form.clozes ? form.clozes.length : 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Comprehensions:</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                        {form.comprehensions ? form.comprehensions.length : 0}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
                      onClick={() => navigate(`/preview/${form._id}`)}
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                      onClick={() => handleDelete(form._id)}
                      disabled={deletingId === form._id}
                    >
                      {deletingId === form._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PreviewDashboard
