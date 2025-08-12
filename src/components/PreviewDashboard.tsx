
import { useEffect, useState } from 'react';
import axios from 'axios';

const PreviewDashboard = () => {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/forms');
        setForms(response.data);
      } catch (err: any) {
        setError("Failed to fetch forms");
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading forms...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Forms Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form, idx) => (
          <div key={form._id} className="bg-white rounded-lg shadow border p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Form #{idx + 1}</h2>
              <div className="mb-2">
                <span className="font-medium">Categories:</span> <span className="font-bold">{form.categories ? form.categories.length : 0}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Cloze Questions:</span> <span className="font-bold">{form.clozes ? form.clozes.length : 0}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Comprehensions:</span> <span className="font-bold">{form.comprehensions ? form.comprehensions.length : 0}</span>
              </div>
              <div className="text-xs text-gray-400 mt-2">Version: {form.__v}</div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
                onClick={() => window.location.href = `/preview/${form._id}`}
              >Preview</button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-colors"
                onClick={async () => {
                  try {
                    await axios.delete(`http://localhost:3000/forms/${form._id}`);
                    setForms((prev) => prev.filter((f) => f._id !== form._id));
                  } catch (err) {
                    alert("Failed to delete form");
                  }
                }}
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviewDashboard;