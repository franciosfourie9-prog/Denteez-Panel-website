import { Wrench, Paintbrush, Car, Hammer, Sparkles, ShieldCheck, Gauge, ClipboardCheck } from 'lucide-react';

const services = [
  {
    icon: Hammer,
    title: 'Panel Beating',
    description: 'Expert hammer-and-dolly work to restore panels to factory shape, removing dents and creases.',
  },
  {
    icon: Car,
    title: 'Dent Repair',
    description: 'From minor door dings to shopping trolley dents, we smooth out every imperfection.',
  },
  {
    icon: Wrench,
    title: 'Collision Repair',
    description: 'Major accident damage? We handle full structural and body repairs to get you safely back on the road.',
  },
  {
    icon: Paintbrush,
    title: 'Paint Matching & Buffing',
    description: 'High-quality paint matching and buffing for a seamless, pristine shine that looks factory-fresh.',
  },
  {
    icon: ShieldCheck,
    title: 'Chassis Straightening',
    description: 'Precision frame and chassis alignment to ensure your vehicle drives straight and safe.',
  },
  {
    icon: Sparkles,
    title: 'Detailing & Finishing',
    description: 'Final polish and detail that makes your vehicle look showroom-ready when it leaves our shop.',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Workshop background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/33814734/pexels-photo-33814734.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/80" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold tracking-wide mb-4 backdrop-blur-sm">
            <ClipboardCheck size={14} />
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 text-balance">
            Complete Auto Body Repair,{' '}
            <span className="text-blue-700">Start to Finish</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Whatever the damage, we have the skills and equipment to fix it right.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative p-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-sky-100 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-sky-50/0 group-hover:from-blue-50/50 group-hover:to-transparent transition-all duration-500" />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-5 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                  <service.icon size={26} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-16 flex items-center justify-center gap-3 text-slate-600">
          <Gauge size={20} className="text-blue-700" />
          <p className="text-sm">
            Don't see what you need? We handle all auto body repairs — just ask.
          </p>
        </div>
      </div>
    </section>
  );
}
