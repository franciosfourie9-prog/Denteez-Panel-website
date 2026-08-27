import { ArrowRight, Calendar, MessageCircle, Star, Zap, Shield, Sparkles } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
  onQuote: () => void;
}

export default function Hero({ onBookNow, onQuote }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/15489246/pexels-photo-15489246.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
          alt="Denteez Panel Beating clean auto body repair workshop in Pretoria"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/70" />
      </div>

      {/* Ambient grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Decorative blue glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200 text-blue-800 text-xs font-semibold tracking-wide mb-6 animate-fade-in-up">
            <Sparkles size={14} />
            Pretoria's Trusted Panel Beating Experts
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] text-balance animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Accidents happen, but{' '}
            <span className="text-blue-700">damage doesn't have to last.</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            From minor door dings and shopping trolley dents to major collision repairs,
            Denteez Panel Beating gets your vehicle looking showroom-ready again.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <button
              onClick={onBookNow}
              className="group flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition-all shadow-xl shadow-blue-700/20 hover:shadow-blue-700/30 hover:-translate-y-0.5"
            >
              <Calendar size={20} />
              Book an Appointment
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onQuote}
              className="group flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/90 hover:bg-sky-50 border border-sky-200 text-slate-800 font-semibold text-base transition-all backdrop-blur-sm hover:-translate-y-0.5"
            >
              <MessageCircle size={20} className="text-sky-600" />
              Get a WhatsApp Quote
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <TrustBadge icon={<Zap size={18} />} text="Fast Turnaround" />
            <TrustBadge icon={<Shield size={18} />} text="Quality Workmanship" />
            <TrustBadge icon={<Star size={18} />} text="Precision Repairs" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-400">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-500">
      <span className="text-blue-700">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
