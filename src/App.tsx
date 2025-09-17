
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Website from './pages/Website';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Portfolio from './pages/Portfolio';
import Search from './pages/Search';
import Terms from './pages/Terms';
import GDPR from './pages/GDPR';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Cookies from './pages/Cookies';
import Blog from './pages/Blog';
import AdminBlog from './pages/admin/AdminBlog';
import NewBlogPost from './pages/admin/NewBlogPost';
import Categories from './pages/admin/Categories';
import Comments from './pages/admin/Comments';
import BlogAnalytics from './pages/admin/BlogAnalytics';
import BlogSettings from './pages/admin/BlogSettings';
import Dashboard from './pages/admin/Dashboard';
import WhatsAppDemo from './pages/WhatsAppDemo';
import { CookieConsent } from './components/CookieConsent';

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
        <Route path="/search" element={<Search />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/gdpr" element={<GDPR />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/blog/new" element={<NewBlogPost />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/blog/comments" element={<Comments />} />
        <Route path="/admin/blog/analytics" element={<BlogAnalytics />} />
        <Route path="/admin/blog/settings" element={<BlogSettings />} />
        <Route path="/whatsapp-demo" element={<WhatsAppDemo />} />
      </Routes>
      <CookieConsent />
    </Router>
  );
};

export default App;
