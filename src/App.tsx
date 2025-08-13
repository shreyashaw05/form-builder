import FormBuilder from './components/FormBuilder';
import PreviewDashboard from './components/Preview/PreviewPages/PreviewDashboard';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import PreviewForm from './components/Preview/PreviewPages/PreviewForm';
import Homepage from './components/Homepage';

export default function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/preview" element={<PreviewDashboard />} />
          <Route path="/preview/:id" element={<PreviewForm />} />
        </Routes>
      </Router>

    </>
  );
}