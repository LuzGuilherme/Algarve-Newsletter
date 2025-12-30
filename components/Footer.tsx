
import React from 'react';
import { Instagram, Twitter, Youtube, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002B30] text-slate-400 py-16 px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 relative z-10">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="text-2xl font-black text-white mb-2">Algarve<span className="text-cyan-400">Insider</span></span>
          <p className="text-xs font-medium max-w-xs leading-relaxed">
            Your weekly curation for an authentic life in southern Portugal.
          </p>
        </div>

        {/* Social Icons - Centered on mobile, absolute center on desktop if desired, but here just balanced */}
        <div className="flex gap-6">
          <Instagram className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          <Youtube className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          <Facebook className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
        </div>

        {/* Essential Links */}
        <div className="flex flex-col items-center md:items-end gap-2 text-[11px] font-bold uppercase tracking-wider">
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
          </div>
          <span className="hover:text-white cursor-pointer transition-colors">Contact Us</span>
        </div>
      </div>

      {/* Copyright & Decor */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center relative z-10">
        <p className="text-[10px] uppercase tracking-widest opacity-40">
          © {new Date().getFullYear()} Algarve Insider. All rights reserved.
        </p>
      </div>

      {/* Plane decor - kept subtle */}
      <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none">
        <span className="text-8xl">📩</span>
      </div>
    </footer>
  );
};

export default Footer;
