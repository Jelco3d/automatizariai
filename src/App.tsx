
import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Website from './pages/Website';
import { CookieConsent } from './components/CookieConsent';

const Index = lazy(() => import('./pages/Index'));
const Services = lazy(() => import('./pages/Services'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Terms = lazy(() => import('./pages/Terms'));
const GDPR = lazy(() => import('./pages/GDPR'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'));
const NewBlogPost = lazy(() => import('./pages/admin/NewBlogPost'));
const Categories = lazy(() => import('./pages/admin/Categories'));
const Comments = lazy(() => import('./pages/admin/Comments'));
const BlogAnalytics = lazy(() => import('./pages/admin/BlogAnalytics'));
const BlogSettings = lazy(() => import('./pages/admin/BlogSettings'));
const WhatsAppDemo = lazy(() => import('./pages/WhatsAppDemo'));
const ShowroomVSL = lazy(() => import('./pages/ShowroomVSL'));
const AuditGratuit = lazy(() => import('./pages/AuditGratuit'));
const Contact = lazy(() => import('./pages/Contact'));
const BusinessCard = lazy(() => import('./pages/BusinessCard'));
const LinkTree = lazy(() => import('./pages/LinkTree'));
const Auth = lazy(() => import('./pages/Auth'));
const BusinessDashboard = lazy(() => import('./pages/business/BusinessDashboard'));
const Invoices = lazy(() => import('./pages/business/Invoices'));
const Quotes = lazy(() => import('./pages/business/Quotes'));
const Proposals = lazy(() => import('./pages/business/Proposals'));
const Contracts = lazy(() => import('./pages/business/Contracts'));
const Clients = lazy(() => import('./pages/business/Clients'));
const Payments = lazy(() => import('./pages/business/Payments'));
const Calendar = lazy(() => import('./pages/business/Calendar'));
const ContractSignature = lazy(() => import('./pages/ContractSignature'));
const FidelizarePacienti = lazy(() => import('./pages/FidelizarePacienti'));
const CerereOferta = lazy(() => import('./pages/CerereOferta'));
const Leads = lazy(() => import('./pages/business/Leads'));
const ClientPortalSystem = lazy(() => import('./pages/ClientPortalSystem'));

const App = () => {
  useEffect(() => {
    const handler = (event: PromiseRejectionEvent) => {
      event.preventDefault();
    };
    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);

  return (
    <Router>
      <Suspense fallback={null}>
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
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/blog/new" element={<NewBlogPost />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/blog/comments" element={<Comments />} />
          <Route path="/admin/blog/analytics" element={<BlogAnalytics />} />
          <Route path="/admin/blog/settings" element={<BlogSettings />} />
          <Route path="/whatsapp-demo" element={<WhatsAppDemo />} />
          <Route path="/audit-gratuit" element={<AuditGratuit />} />
          <Route path="/AI" element={<AuditGratuit />} />
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
          <Route path="/business-dashboard/plati" element={<Payments />} />
          <Route path="/business-dashboard/calendar" element={<Calendar />} />
          <Route path="/business-dashboard/leads" element={<Leads />} />
          <Route path="/contract-signature/:token" element={<ContractSignature />} />
          <Route path="/fidelizare-pacienti" element={<FidelizarePacienti />} />
          <Route path="/showroom-vsl" element={<ShowroomVSL />} />
          <Route path="/cerere-oferta" element={<CerereOferta />} />
          <Route path="/client-portal-system" element={<ClientPortalSystem />} />
        </Routes>
      </Suspense>
      <CookieConsent />
      <Toaster />
    </Router>
  );
};

export default App;
