import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, ExternalLink } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

interface ContactProps {
  onBookNow: () => void;
  onQuote: () => void;
}

export default function Contact({ onBookNow, onQuote }: ContactProps) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.address)}`;

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Workshop background — clean garage */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/33814732/pexels-photo-33814732.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/88 to-white/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/75 to-white/85" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold tracking-wide mb-4 backdrop-blur-sm">
            <Phone size={14} />
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 text-balance">
            Don't let a dent ruin{' '}
            <span className="text-blue-700">your ride's look</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Visit us, call us, or book online — we're ready to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Contact info */}
          <div className="space-y-4">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-sky-100 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-700 group-hover:bg-blue-800 flex items-center justify-center transition-colors flex-shrink-0 shadow-md shadow-blue-200">
                <MapPin size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 font-bold text-base mb-1">Visit Us</h3>
                <p className="text-slate-600 text-sm">{BUSINESS.address}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-blue-700 text-xs font-semibold">
                  Open in Google Maps <ExternalLink size={12} />
                </span>
              </div>
            </a>

            <a
              href={`tel:${BUSINESS.phone}`}
              className="group flex items-start gap-4 p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-sky-100 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-700 group-hover:bg-blue-800 flex items-center justify-center transition-colors flex-shrink-0 shadow-md shadow-blue-200">
                <Phone size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-base mb-1">Call / WhatsApp</h3>
                <p className="text-slate-600 text-sm">{BUSINESS.phone}</p>
              </div>
            </a>

            <a
              href={`mailto:${BUSINESS.email}`}
              className="group flex items-start gap-4 p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-sky-100 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-700 group-hover:bg-blue-800 flex items-center justify-center transition-colors flex-shrink-0 shadow-md shadow-blue-200">
                <Mail size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-base mb-1">Email</h3>
                <p className="text-slate-600 text-sm break-all">{BUSINESS.email}</p>
              </div>
            </a>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-sky-100">
              <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-200">
                <Clock size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 font-bold text-base mb-2">Business Hours</h3>
                <ul className="space-y-1">
                  {BUSINESS.hours.map((h) => (
                    <li key={h.day} className="flex justify-between text-sm">
                      <span className="text-slate-500">{h.day}</span>
                      <span className="text-slate-800 font-medium">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onBookNow}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-200"
              >
                <Calendar size={18} />
                Book an Appointment
              </button>
              <button
                onClick={onQuote}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm transition-colors shadow-lg shadow-sky-200"
              >
                <MessageCircle size={18} />
                WhatsApp Quote
              </button>
            </div>
          </div>

          {/* Right: Map embed */}
          <div className="relative rounded-2xl overflow-hidden border border-sky-100 min-h-[400px] shadow-lg shadow-blue-100 ring-1 ring-sky-100">
            <iframe
              title="Denteez location map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full absolute inset-0"
              style={{ border: 0, minHeight: '400px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
