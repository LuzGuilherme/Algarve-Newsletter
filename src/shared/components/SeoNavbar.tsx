import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SeoNavbarProps {
  variant?: 'solid' | 'overlay';
}

const navLinks = [
  { to: '/beaches', label: 'Beaches' },
  { to: '/things-to-do', label: 'Things to Do' },
  { to: '/blog', label: 'Blog' },
];

const SeoNavbar: React.FC<SeoNavbarProps> = ({ variant = 'solid' }) => {
  const { pathname } = useLocation();

  const isActive = (to: string) =>
    pathname === to || pathname.startsWith(`${to}/`);

  const wrapperClass =
    variant === 'overlay'
      ? 'absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/40 to-transparent'
      : 'relative z-40 bg-[#004E55]';

  return (
    <nav className={`${wrapperClass} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-36">
          <Link
            to="/"
            aria-label="Algarve Newsletter home"
            className="flex-shrink-0"
          >
            <img
              src="/logo-algarve-2.png"
              alt="Algarve Newsletter"
              className="h-24 md:h-36 object-contain"
            />
          </Link>
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            {navLinks.map(link => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm md:text-base font-semibold tracking-wide transition-colors pb-1 border-b-2 ${
                    active
                      ? 'text-white border-white'
                      : 'text-white/75 border-transparent hover:text-white hover:border-white/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SeoNavbar;
