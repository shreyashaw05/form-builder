import FormBuilder from './components/FormBuilder';
import PreviewDashboard from './components/PreviewDashboard';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import PreviewForm from './components/PreviewForm';

export default function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/preview" element={<PreviewDashboard />} />
          <Route path="/preview/:id" element={<PreviewForm />} />
        </Routes>
      </Router>

    </>
  );
}