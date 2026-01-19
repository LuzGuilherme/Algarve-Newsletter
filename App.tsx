
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LandingPage from './pages/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import ContactUs from './pages/ContactUs';
import ThankYou from './pages/ThankYou';
import BlogIndex from './src/blog/pages/BlogIndex';
import BlogArticle from './src/blog/pages/BlogArticle';
import BeachFinder from './src/beaches/pages/BeachFinder';
import BeachDetail from './src/beaches/pages/BeachDetail';
import { useEffect } from 'react';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/thank-you" element={<ThankYou />} />

          {/* Blog routes - standalone SEO funnel */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogArticle />} />

          {/* Beach Finder routes */}
          <Route path="/beaches" element={<BeachFinder />} />
          <Route path="/beaches/:slug" element={<BeachDetail />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
