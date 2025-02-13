
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Website from './pages/Website';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Portfolio from './pages/Portfolio';
import Terms from './pages/Terms';
import GDPR from './pages/GDPR';
import PrivacyPolicy from './pages/PrivacyPolicy';

const App = () => {
  console.log("Rendering App component");
  return (
    <Router>
      <Routes>
        <Route path="/personal" element={<Index />} />
        <Route path="/acasa" element={<Website />} />
        <Route path="/servicii" element={<Services />} />
        <Route path="/despre" element={<AboutUs />} />
        <Route path="/portofoliu" element={<Portfolio />} />
        <Route path="/termenii" element={<Terms />} />
        <Route path="/gdpr" element={<GDPR />} />
        <Route path="/politica" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
