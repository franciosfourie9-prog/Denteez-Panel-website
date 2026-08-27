import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { BUSINESS, buildWhatsAppLink } from '@/lib/constants';

interface FooterProps {
  onBookNow: () => void;
  onQuote: () => void;
}

export default function Footer({ onBookNow, onQuote }: FooterProps) {
  return (
    <footer className="relative bg-slate-900 border-t border-slate-800">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/image.png"
                alt="Denteez Panel Beating logo"
                className="w-12 h-12 object-contain rounded-lg bg-white p-1"
              />
              <div className="flex flex-col leading-none">
                <span className="text-white font-extrabold text-lg tracking-tight">
                  Dent<span className="text-sky-400">eez</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase">Panel Beating</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              From minor door dings and shopping trolley dents to major collision repairs,
              Denteez Panel Beating gets your vehicle looking showroom-ready again.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Owned and operated by <span className="text-slate-300 font-medium">{BUSINESS.owner}</span>
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><a href="#home" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Home</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Services</a></li>
              <li><a href="#why-us" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Why Choose Us</a></li>
              <li><a href="#gallery" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Gallery</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin size={15} className="text-sky-400 mt-0.5 flex-shrink-0" />
                {BUSINESS.address}
              </li>
              <li>
                <a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-2 text-slate-400 hover:text-sky-400 text-sm transition-colors">
                  <Phone size={15} className="text-sky-400 flex-shrink-0" />
                  {BUSINESS.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 text-slate-400 hover:text-sky-400 text-sm transition-colors">
                  <Mail size={15} className="text-sky-400 flex-shrink-0" />
                  {BUSINESS.email}
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-4 flex gap-2">
              <a
                href={buildWhatsAppLink('Hi Denteez! I have a question about panel beating work.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-300 hover:text-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} className="text-slate-300 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-500 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} className="text-slate-300 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Hashtags */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-wrap gap-2">
            {BUSINESS.social.hashtags.map((tag) => (
              <span key={tag} className="text-xs text-slate-600 hover:text-sky-400 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <button onClick={onBookNow} className="text-xs text-slate-500 hover:text-sky-400 transition-colors">Book Now</button>
            <button onClick={onQuote} className="text-xs text-slate-500 hover:text-sky-400 transition-colors">Get a Quote</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
