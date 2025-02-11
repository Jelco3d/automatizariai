
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Website from './pages/Website';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Portfolio from './pages/Portfolio';

const App = () => {
  console.log("Rendering App component");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/website" element={<Website />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
};

export default App;
