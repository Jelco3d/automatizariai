
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Website from './pages/Website';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Portfolio from './pages/Portfolio';
import Terms from './pages/Terms';
import GDPR from './pages/GDPR';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Blog from './pages/Blog';

const App = () => {
  console.log("Rendering App component");
  return (
    <Router>
      <Routes>
        <Route path="/acasă" element={<Index />} />
        <Route path="/" element={<Website />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/gdpr" element={<GDPR />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
};

export default App;
