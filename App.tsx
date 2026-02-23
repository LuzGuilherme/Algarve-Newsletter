
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LandingPage from './src/landing/pages/LandingPage';
import PrivacyPolicy from './src/landing/pages/PrivacyPolicy';
import TermsOfUse from './src/landing/pages/TermsOfUse';
import ContactUs from './src/landing/pages/ContactUs';
import ThankYou from './src/landing/pages/ThankYou';
import BlogIndex from './src/blog/pages/BlogIndex';
import BlogArticle from './src/blog/pages/BlogArticle';
import BeachFinder from './src/beaches/pages/BeachFinder';
import BeachDetail from './src/beaches/pages/BeachDetail';
import GuidePreview from './src/guide/pages/GuidePreview';
import GuideDownload from './src/guide/pages/GuideDownload';
import GuideTest from './src/guide/pages/GuideTest';
import { useEffect, useLayoutEffect } from 'react';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  useLayoutEffect(() => {
    document.getElementById('root')?.classList.add('hydrated');
  }, []);

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

          {/* Guide routes */}
          <Route path="/guide/test" element={<GuideTest />} />
          <Route path="/guide/preview" element={<GuidePreview />} />
          <Route path="/guide/download" element={<GuideDownload />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
