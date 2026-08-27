import { Award, Clock, Palette, ThumbsUp, Quote } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Precision Work',
    description: 'Expert panel beating, hammer-and-dolly work and seamless dent repairs done right the first time.',
  },
  {
    icon: Palette,
    title: 'Flawless Finish',
    description: 'High-quality paint matching and buffing for a pristine shine that blends perfectly with your vehicle.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Getting you back on the road safely and without delay — we respect your time and your schedule.',
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 overflow-hidden">
      {/* Workshop background — paint booth */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/33814680/pexels-photo-33814680.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/88 to-white/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/75 to-white/85" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Decorative blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-200/20 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-200/50 ring-1 ring-sky-100">
              <img
                src="https://images.pexels.com/photos/6870296/pexels-photo-6870296.jpeg?auto=compress&cs=tinysrgb&w=900&h=600"
                alt="Polishing a car to a shine"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
              {/* Shine sweep effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full animate-shimmer pointer-events-none" />
              </div>
            </div>

            {/* Floating quote card */}
            <div className="absolute -bottom-6 -right-4 md:-right-6 max-w-xs p-5 rounded-xl bg-white/95 backdrop-blur-sm border border-sky-100 shadow-xl">
              <Quote size={24} className="text-blue-700 mb-2" />
              <p className="text-slate-700 text-sm leading-relaxed italic">
                "Don't let a dent ruin your ride's look!"
              </p>
              <p className="mt-2 text-xs text-slate-500 font-medium">
                — Antonie Botes, Owner
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold tracking-wide mb-4 backdrop-blur-sm">
              <ThumbsUp size={14} />
              Why Choose Denteez?
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 text-balance leading-tight">
              Quality you can{' '}
              <span className="text-blue-700">see and trust</span>
            </h2>
            <p className="mt-4 text-slate-700 text-lg">
              We take pride in every repair that leaves our shop. When you bring your vehicle
              to Denteez, you're choosing craftsmanship, reliability, and results that speak for themselves.
            </p>

            {/* Reasons */}
            <div className="mt-8 space-y-5">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm border border-sky-200 flex items-center justify-center group-hover:bg-blue-700 group-hover:border-blue-700 transition-colors duration-300 shadow-sm">
                    <reason.icon size={22} className="text-blue-700 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{reason.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
