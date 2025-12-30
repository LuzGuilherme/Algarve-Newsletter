
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white">Algarve<span className="text-cyan-400">Insider</span></span>
          </div>




        </div>
      </div>
    </nav>
  );
};

export default Navbar;
