
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Website from './pages/Website';
import Services from './pages/Services';
import AboutUs from './pages/AboutUs';
import Portfolio from './pages/Portfolio';
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
import AuditGratuit from './pages/AuditGratuit';
import Contact from './pages/Contact';
import BusinessCard from './pages/BusinessCard';
import LinkTree from './pages/LinkTree';
import Auth from './pages/Auth';
import BusinessDashboard from './pages/business/BusinessDashboard';
import Invoices from './pages/business/Invoices';
import Quotes from './pages/business/Quotes';
import Proposals from './pages/business/Proposals';
import Contracts from './pages/business/Contracts';
import Clients from './pages/business/Clients';
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
        <Route path="/audit-gratuit" element={<AuditGratuit />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/business-card" element={<BusinessCard />} />
        <Route path="/linktree" element={<LinkTree />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/business-dashboard" element={<BusinessDashboard />} />
        <Route path="/business-dashboard/invoices" element={<Invoices />} />
        <Route path="/business-dashboard/quotes" element={<Quotes />} />
        <Route path="/business-dashboard/proposals" element={<Proposals />} />
        <Route path="/business-dashboard/contracts" element={<Contracts />} />
        <Route path="/business-dashboard/clients" element={<Clients />} />
      </Routes>
      <CookieConsent />
    </Router>
  );
};

export default App;
