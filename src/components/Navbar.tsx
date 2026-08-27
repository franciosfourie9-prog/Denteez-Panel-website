import { useEffect, useState } from 'react';
import { Menu, X, Phone, Calendar, MessageCircle } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

interface NavbarProps {
  onBookNow: () => void;
  onQuote: () => void;
}

export default function Navbar({ onBookNow, onQuote }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'header-scrolled py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <img
            src="/image.png"
            alt="Denteez Panel Beating logo"
            className="w-12 h-12 object-contain rounded-lg bg-white/90 p-1 shadow-sm group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col leading-none">
            <span className={`font-extrabold text-lg tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              Dent<span className="text-blue-700">eez</span>
            </span>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase">
              Panel Beating
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-700 hover:text-blue-700 text-sm font-medium transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onQuote}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-sky-200 bg-white/80 text-slate-700 hover:border-blue-700 hover:text-blue-700 transition-colors text-sm font-medium"
          >
            <MessageCircle size={16} />
            Get a Quote
          </button>
          <button
            onClick={onBookNow}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-700/20"
          >
            <Calendar size={16} />
            Book Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-slate-900 p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden mt-3 mx-4 rounded-xl bg-white/95 backdrop-blur-lg border border-sky-100 p-4 animate-slide-down shadow-xl">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-slate-700 hover:bg-sky-50 hover:text-blue-700 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setOpen(false);
                onQuote();
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-sky-200 text-slate-700 transition-colors text-sm font-medium"
            >
              <MessageCircle size={16} />
              Get a Quote
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onBookNow();
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-700 text-white font-semibold text-sm"
            >
              <Calendar size={16} />
              Book Now
            </button>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-sky-50 text-slate-700 text-sm font-medium"
            >
              <Phone size={16} />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
