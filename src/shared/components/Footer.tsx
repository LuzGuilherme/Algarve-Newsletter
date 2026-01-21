
import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002B30] text-slate-400 py-12 md:py-16 px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 relative z-10">
        {/* Brand Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src="/logo-algarve-2.png" alt="Algarve Newsletter" className="h-48 object-contain mb-2" />
          <p className="text-xs font-medium max-w-xs leading-relaxed">
            Your weekly curation for an authentic life in southern Portugal.
          </p>
        </div>

        {/* Social Icons - Centered on mobile, absolute center on desktop if desired, but here just balanced */}
        <div className="flex gap-6">
          <a
            href="https://www.instagram.com/algarve_newsletter/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61585564455250"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>

        {/* Essential Links */}
        <div className="flex flex-col items-center md:items-end gap-2 text-[11px] font-bold uppercase tracking-wider">
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white cursor-pointer transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white cursor-pointer transition-colors">Terms of Use</Link>
          </div>
          <Link to="/contact" className="hover:text-white cursor-pointer transition-colors">Contact Us</Link>
        </div>
      </div>

      {/* Copyright & Decor */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center relative z-10">
        <p className="text-[10px] uppercase tracking-widest opacity-40">
          © {new Date().getFullYear()} Algarve Newsletter. All rights reserved.
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
