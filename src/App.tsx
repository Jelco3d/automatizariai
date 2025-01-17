import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Website from './pages/Website';
import Services from './pages/Services';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/website" element={<Website />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
};

export default App;