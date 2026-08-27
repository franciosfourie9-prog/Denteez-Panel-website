import { Images } from 'lucide-react';

const galleryItems = [
  {
    url: 'https://images.pexels.com/photos/33814734/pexels-photo-33814734.jpeg?auto=compress&cs=tinysrgb&w=600&h=450',
    alt: 'Clean automotive repair shop interior',
    label: 'Our Workshop',
  },
  {
    url: 'https://images.pexels.com/photos/6870296/pexels-photo-6870296.jpeg?auto=compress&cs=tinysrgb&w=600&h=450',
    alt: 'Polishing a car surface',
    label: 'Polishing & Buffing',
  },
  {
    url: 'https://images.pexels.com/photos/5233262/pexels-photo-5233262.jpeg?auto=compress&cs=tinysrgb&w=600&h=450',
    alt: 'Buffing car paint to a shine',
    label: 'Paint Restoration',
  },
  {
    url: 'https://images.pexels.com/photos/14615263/pexels-photo-14615263.jpeg?auto=compress&cs=tinysrgb&w=600&h=450',
    alt: 'Spray painting car parts in booth',
    label: 'Spray Painting',
  },
  {
    url: 'https://images.pexels.com/photos/33814735/pexels-photo-33814735.jpeg?auto=compress&cs=tinysrgb&w=600&h=450',
    alt: 'Mechanic repairing a car panel',
    label: 'Panel Work',
  },
  {
    url: 'https://images.pexels.com/photos/33814680/pexels-photo-33814680.jpeg?auto=compress&cs=tinysrgb&w=600&h=450',
    alt: 'Car in clean paint booth',
    label: 'Paint Booth',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 overflow-hidden">
      {/* Workshop background — spray painting */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/14615263/pexels-photo-14615263.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-white/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/70 to-white/80" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold tracking-wide mb-4 backdrop-blur-sm">
            <Images size={14} />
            Our Work
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 text-balance">
            From Damaged to{' '}
            <span className="text-blue-700">Showroom-Ready</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            A look inside our workshop and the quality of work we deliver.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-lg ring-1 ring-sky-100"
            >
              <img
                src={item.url}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-white font-semibold text-sm md:text-base">{item.label}</p>
              </div>
              <div className="absolute inset-0 rounded-xl ring-2 ring-blue-500/0 group-hover:ring-blue-500/50 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
