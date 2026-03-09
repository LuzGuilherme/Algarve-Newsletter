import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Algarve Newsletter</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-black text-slate-900 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-slate-700 mb-4">Page Not Found</h2>
          <p className="text-slate-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-[#004E55] text-white font-bold rounded-xl hover:bg-[#006D77] transition-colors"
            >
              Go Home
            </Link>
            <Link
              to="/blog"
              className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Read Our Blog
            </Link>
            <Link
              to="/beaches"
              className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Find Beaches
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
