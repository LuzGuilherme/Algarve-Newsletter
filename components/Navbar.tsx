import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  theme?: 'light' | 'dark';
}

const Navbar: React.FC<NavbarProps> = ({ theme = 'light' }) => {
  const textColor = theme === 'dark' ? 'text-slate-900' : 'text-white';

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <div className="flex items-center gap-2">
            <Link to="/">
              <span className={`hidden md:block text-xl md:text-2xl font-black tracking-tight ${textColor}`}>Algarve<span className="text-cyan-400">Newsletter</span></span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
