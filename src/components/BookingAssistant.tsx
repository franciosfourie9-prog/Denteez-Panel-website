import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Calendar, Bot, User, CheckCircle2, Loader2, Car, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { TIME_SLOTS, BUSINESS } from '@/lib/constants';
import type { BookingInput } from '@/lib/types';

interface BookingAssistantProps {
  open: boolean;
  onClose: () => void;
}

type Step = 'greeting' | 'name' | 'phone' | 'vehicle_make' | 'vehicle_model' | 'vehicle_year' | 'damage' | 'date' | 'time' | 'email' | 'confirm' | 'submitting' | 'done';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
}

const STEP_ORDER: Step[] = [
  'greeting', 'name', 'phone', 'vehicle_make', 'vehicle_model', 'vehicle_year', 'damage', 'date', 'time', 'email', 'confirm',
];

const STEP_PROMPTS: Record<Step, string> = {
  greeting: "Hi there! I'm the Denteez booking assistant. I'll help you arrange an appointment in just a few quick steps. Ready? Let's get started!",
  name: "First, what's your full name?",
  phone: `Great to meet you! What's the best phone number to reach you on? (We'll use this for your booking confirmation.)`,
  vehicle_make: "What's the make of your vehicle? (e.g. Toyota, Ford, Volkswagen)",
  vehicle_model: "And the model? (e.g. Corolla, Fiesta, Polo)",
  vehicle_year: "What year is your vehicle? (e.g. 2019, or just say 'skip')",
  damage: "Please describe the damage or what you need repaired. (e.g. 'dent in the driver door', 'front bumper scraped', 'major collision damage')",
  date: "Let's pick a date. Select your preferred day from the calendar below:",
  time: "Now choose a time slot that works for you:",
  email: "Last one! What's your email address? (Optional — just say 'skip' if you'd rather not.)",
  confirm: "Here's a summary of your booking. Does everything look correct?",
  submitting: '',
  done: '',
};

export default function BookingAssistant({ open, onClose }: BookingAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>('greeting');
  const [input, setInput] = useState('');
  const [data, setData] = useState<Partial<BookingInput>>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const msgId = useRef(0);

  const addMessage = useCallback((sender: 'bot' | 'user', text: string) => {
    setMessages((prev) => [...prev, { id: msgId.current++, sender, text }]);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      addMessage('bot', STEP_PROMPTS.greeting);
      setTimeout(() => addMessage('bot', STEP_PROMPTS.name), 800);
      setStep('name');
    }
  }, [open, messages.length, addMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && step !== 'date' && step !== 'time' && step !== 'confirm' && step !== 'submitting' && step !== 'done') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [step, open]);

  const nextStep = useCallback((current: Step) => {
    const idx = STEP_ORDER.indexOf(current);
    if (idx < STEP_ORDER.length - 1) {
      const next = STEP_ORDER[idx + 1];
      setStep(next);
      if (next !== 'date' && next !== 'time' && next !== 'confirm') {
        setTimeout(() => addMessage('bot', STEP_PROMPTS[next]), 600);
      }
    }
  }, [addMessage]);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setStep('submitting');
    addMessage('bot', 'Submitting your booking...');

    try {
      const { data: result, error } = await supabase
        .from('bookings')
        .insert({
          name: data.name!,
          phone: data.phone!,
          email: data.email || null,
          vehicle_make: data.vehicle_make!,
          vehicle_model: data.vehicle_model!,
          vehicle_year: data.vehicle_year || null,
          damage_description: data.damage_description!,
          preferred_date: data.preferred_date!,
          preferred_time: data.preferred_time!,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      setBookingId(result.id);
      setStep('done');
      addMessage('bot', `Your booking is confirmed! We've saved your appointment for ${formatDate(data.preferred_date!)} at ${data.preferred_time}.`);
      setTimeout(() => addMessage('bot', `A team member will contact you on ${data.phone} to confirm the details. If you need to reach us sooner, call ${BUSINESS.phone}.`), 800);

      try {
        const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-booking`;
        await fetch(fnUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ bookingId: result.id }),
        });
      } catch {
        // Non-critical: booking is already saved
      }
    } catch {
      addMessage('bot', "I'm sorry, something went wrong submitting your booking. Please try again or call us directly at " + BUSINESS.phone + ".");
      setStep('confirm');
    } finally {
      setSubmitting(false);
    }
  }, [data, addMessage]);

  const handleUserInput = useCallback(() => {
    const value = input.trim();
    if (!value || submitting || step === 'submitting' || step === 'done') return;

    addMessage('user', value);
    setInput('');

    const updated = { ...data };

    switch (step) {
      case 'name':
        updated.name = value;
        setData(updated);
        nextStep('name');
        break;
      case 'phone':
        updated.phone = value;
        setData(updated);
        nextStep('phone');
        break;
      case 'vehicle_make':
        updated.vehicle_make = value;
        setData(updated);
        nextStep('vehicle_make');
        break;
      case 'vehicle_model':
        updated.vehicle_model = value;
        setData(updated);
        nextStep('vehicle_model');
        break;
      case 'vehicle_year':
        updated.vehicle_year = value.toLowerCase() === 'skip' ? undefined : value;
        setData(updated);
        nextStep('vehicle_year');
        break;
      case 'damage':
        updated.damage_description = value;
        setData(updated);
        nextStep('damage');
        break;
      case 'email':
        updated.email = value.toLowerCase() === 'skip' ? undefined : value;
        setData(updated);
        setStep('confirm');
        setTimeout(() => addMessage('bot', STEP_PROMPTS.confirm), 600);
        break;
    }
  }, [input, submitting, step, data, addMessage, nextStep]);

  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
    const updated = { ...data, preferred_date: date };
    setData(updated);
    addMessage('user', formatDate(date));
    setStep('time');
    setTimeout(() => addMessage('bot', STEP_PROMPTS.time), 500);
  }, [data, addMessage]);

  const handleTimeSelect = useCallback((time: string) => {
    const updated = { ...data, preferred_time: time };
    setData(updated);
    addMessage('user', time);
    setStep('email');
    setTimeout(() => addMessage('bot', STEP_PROMPTS.email), 500);
  }, [data, addMessage]);

  const handleConfirm = useCallback(() => {
    addMessage('user', 'Yes, looks good!');
    handleSubmit();
  }, [addMessage, handleSubmit]);

  const handleEdit = useCallback(() => {
    addMessage('user', 'I need to change something.');
    setStep('name');
    setTimeout(() => addMessage('bot', "No problem! Let's start over. What's your full name?"), 500);
  }, [addMessage]);

  const showTextInput = step !== 'date' && step !== 'time' && step !== 'confirm' && step !== 'submitting' && step !== 'done';
  const showCalendar = step === 'date';
  const showTimeSlots = step === 'time';
  const showConfirm = step === 'confirm';

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed z-[61] inset-x-0 bottom-0 md:inset-y-0 md:right-0 md:left-auto md:w-[440px] flex flex-col bg-white border-t md:border-t-0 md:border-l border-sky-100 shadow-2xl transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full md:translate-y-0 md:translate-x-full'
        }`}
        style={{ maxHeight: '85vh' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-sky-100 bg-sky-50/50">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md shadow-blue-200">
              <Bot size={22} className="text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-slate-900 font-bold text-base leading-tight">Denteez Assistant</h3>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Online — here to help you book
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-sky-100 text-slate-400 hover:text-slate-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-sky-50/30">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} sender={msg.sender} text={msg.text} />
          ))}

          {showCalendar && (
            <div className="py-2 animate-fade-in-up">
              <CalendarPicker
                month={calendarMonth}
                onMonthChange={setCalendarMonth}
                selectedDate={selectedDate}
                onSelect={handleDateSelect}
              />
            </div>
          )}

          {showTimeSlots && (
            <div className="py-2 animate-fade-in-up">
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleTimeSelect(slot)}
                    className="px-3 py-2.5 rounded-lg bg-white border border-sky-200 text-slate-700 text-sm font-medium hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-colors"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showConfirm && data.name && (
            <div className="py-2 animate-fade-in-up">
              <div className="rounded-xl bg-white border border-sky-200 p-4 space-y-2.5 shadow-sm">
                <SummaryRow icon={<User size={14} />} label="Name" value={data.name} />
                <SummaryRow icon={<Phone size={14} />} label="Phone" value={data.phone} />
                {data.email && <SummaryRow icon={<Mail size={14} />} label="Email" value={data.email} />}
                <SummaryRow icon={<Car size={14} />} label="Vehicle" value={`${data.vehicle_make} ${data.vehicle_model}${data.vehicle_year ? ` (${data.vehicle_year})` : ''}`} />
                <SummaryRow icon={<span className="text-xs">📝</span>} label="Damage" value={data.damage_description} />
                <SummaryRow icon={<Calendar size={14} />} label="Date" value={formatDate(data.preferred_date!)} />
                <SummaryRow icon={<span className="text-xs">⏰</span>} label="Time" value={data.preferred_time} />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleConfirm}
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                  {submitting ? 'Submitting...' : 'Confirm Booking'}
                </button>
                <button
                  onClick={handleEdit}
                  disabled={submitting}
                  className="px-4 py-3 rounded-lg bg-white border border-sky-200 text-slate-700 hover:bg-sky-50 text-sm font-medium transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          )}

          {step === 'done' && bookingId && (
            <div className="py-4 animate-scale-in">
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-green-50 border border-green-200">
                <CheckCircle2 size={48} className="text-green-500" />
                <p className="text-slate-900 font-bold text-lg">Booking Confirmed!</p>
                <p className="text-slate-500 text-sm text-center">
                  Booking ref: {bookingId.slice(0, 8).toUpperCase()}
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        {showTextInput && (
          <div className="p-4 border-t border-sky-100 bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUserInput()}
                placeholder="Type your answer..."
                className="flex-1 px-4 py-3 rounded-xl bg-sky-50/50 border border-sky-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
              />
              <button
                onClick={handleUserInput}
                disabled={!input.trim()}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white transition-colors flex-shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function MessageBubble({ sender, text }: { sender: 'bot' | 'user'; text: string }) {
  const isBot = sender === 'bot';
  return (
    <div className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
          <Bot size={16} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isBot
            ? 'bg-white border border-sky-100 text-slate-700 rounded-tl-sm shadow-sm'
            : 'bg-blue-700 text-white font-medium rounded-tr-sm'
        }`}
      >
        {text}
      </div>
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
          <User size={16} className="text-slate-600" />
        </div>
      )}
    </div>
  );
}

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-blue-700 mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <span className="text-slate-400 text-xs uppercase tracking-wide">{label}: </span>
        <span className="text-slate-800 text-sm font-medium">{value}</span>
      </div>
    </div>
  );
}

function CalendarPicker({
  month,
  onMonthChange,
  selectedDate,
  onSelect,
}: {
  month: Date;
  onMonthChange: (d: Date) => void;
  selectedDate: string;
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = month.getFullYear();
  const m = month.getMonth();

  const firstDay = new Date(year, m, 1);
  const lastDay = new Date(year, m + 1, 0);
  const startWeekday = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, m, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const monthName = month.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const isDisabled = (date: Date | null) => {
    if (!date) return true;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    if (d < today) return true;
    const dow = d.getDay();
    if (dow === 0) return true;
    return false;
  };

  const dateStr = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  return (
    <div className="rounded-xl bg-white border border-sky-200 p-3 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => onMonthChange(new Date(year, m - 1, 1))}
          className="p-1.5 rounded-lg hover:bg-sky-100 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-slate-900 font-semibold text-sm">{monthName}</span>
        <button
          onClick={() => onMonthChange(new Date(year, m + 1, 1))}
          className="p-1.5 rounded-lg hover:bg-sky-100 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map((wd) => (
          <div key={wd} className="text-center text-[10px] text-slate-400 font-semibold py-1">{wd}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const disabled = isDisabled(date);
          const str = dateStr(date);
          const selected = selectedDate === str;
          const isToday = dateStr(today) === str;
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onSelect(str)}
              className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                selected
                  ? 'bg-blue-700 text-white font-bold scale-105'
                  : disabled
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-sky-100 hover:text-blue-700'
              } ${isToday && !selected ? 'ring-1 ring-blue-400' : ''}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[10px] text-slate-400 text-center">Sundays are closed. Past dates are unavailable.</p>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-ZA', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}
