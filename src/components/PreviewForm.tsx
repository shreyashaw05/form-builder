import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ClozePreview from './ClozePreview';
import CategorizePreview from './CategorizePreview';
import ComprehensionPreview from './ComprehensionPreview';
// import CategorizePreview from './CategorizePreview'; // Uncomment if you have this component
// import ComprehensionPreview from './ComprehensionPreview'; // Uncomment if you have this component

const PreviewForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/form-data?id=${id}`);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch form data");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchForm();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading form...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!formData) return null;

  // Combine all questions into a single array with type property
  const allQuestions = [
    ...(formData.categories || []),
    ...(formData.clozes || []),
    ...(formData.comprehensions || [])
  ];

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Preview Form</h1>
      {allQuestions.length === 0 && <div>No questions found.</div>}
      {allQuestions.map((question, idx) => {
        switch (question.type) {
          case 'cloze':
            return <ClozePreview key={question._id || idx} question={question} />;
          case 'categorization':
            return <CategorizePreview key={question._id || idx} question={question} />;
          case 'comprehension':
            return <ComprehensionPreview key={question._id || idx} question={question} />;
          default:
            return <div key={question._id || idx}>Unknown question type</div>;
        }
      })}
    </div>
  );
}

export default PreviewForm;