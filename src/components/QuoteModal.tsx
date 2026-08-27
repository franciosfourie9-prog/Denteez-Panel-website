import { useState, useEffect } from 'react';
import { X, MessageCircle, Car, Send, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppLink, BUSINESS } from '@/lib/constants';

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function QuoteModal({ open, onClose }: QuoteModalProps) {
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [damage, setDamage] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setSent(false);
    }
  }, [open]);

  const canSend = name.trim() && vehicle.trim() && damage.trim() && phone.trim();

  const handleSend = () => {
    if (!canSend) return;
    const message = `Hi Denteez! I'd like a quote for panel beating work.

Name: ${name}
Phone: ${phone}
Vehicle: ${vehicle}
Damage/Work needed: ${damage}

Please get back to me with an estimate. Thanks!`;
    window.open(buildWhatsAppLink(message), '_blank');
    setSent(true);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed z-[61] inset-x-0 top-1/2 -translate-y-1/2 mx-auto max-w-md px-4 transition-all duration-300 ${
          open ? 'opacity-100 translate-y-[-50%]' : 'opacity-0 translate-y-[-40%] pointer-events-none'
        }`}
      >
        <div className="rounded-2xl bg-white border border-sky-100 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-sky-100 bg-sky-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-slate-900 font-bold text-base">Get a Quote</h3>
                <p className="text-xs text-slate-500">Via WhatsApp — we'll reply fast</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-sky-100 text-slate-400 hover:text-slate-700 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          {sent ? (
            <div className="p-8 flex flex-col items-center gap-4 text-center">
              <CheckCircle2 size={56} className="text-sky-500" />
              <h4 className="text-slate-900 font-bold text-lg">WhatsApp Opened!</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your quote request has been prepared in WhatsApp. Just hit send there and we'll
                get back to you with an estimate as soon as possible.
              </p>
              <p className="text-xs text-slate-400">
                If WhatsApp didn't open, message us directly at {BUSINESS.phone}
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <div className="p-5 space-y-4">
              <p className="text-slate-600 text-sm">
                Fill in a few details and we'll send a quote request straight to our WhatsApp.
              </p>

              <Field label="Your Name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-2.5 rounded-lg bg-sky-50/50 border border-sky-100 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </Field>

              <Field label="Phone Number">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="072 123 4567"
                  className="w-full px-4 py-2.5 rounded-lg bg-sky-50/50 border border-sky-100 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </Field>

              <Field label="Vehicle (Make & Model)">
                <div className="flex gap-2">
                  <Car size={18} className="text-slate-400 mt-2.5 flex-shrink-0" />
                  <input
                    type="text"
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    placeholder="Toyota Corolla 2019"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-sky-50/50 border border-sky-100 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>
              </Field>

              <Field label="Describe the Damage / Work Needed">
                <textarea
                  value={damage}
                  onChange={(e) => setDamage(e.target.value)}
                  placeholder="e.g. Dent in the driver door, front bumper scraped..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg bg-sky-50/50 border border-sky-100 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none"
                />
              </Field>

              <button
                onClick={handleSend}
                disabled={!canSend}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors"
              >
                <Send size={18} />
                Send via WhatsApp
              </button>

              <p className="text-center text-xs text-slate-400">
                Opens WhatsApp with your message pre-filled — just press send.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  );
}
