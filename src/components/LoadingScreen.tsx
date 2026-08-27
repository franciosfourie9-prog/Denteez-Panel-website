import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

type Phase = 'driving' | 'hammering' | 'shining' | 'reveal' | 'done';

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<Phase>('driving');
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('hammering'), 2400));
    timers.push(setTimeout(() => setPhase('shining'), 5000));
    timers.push(setTimeout(() => setPhase('reveal'), 6000));
    timers.push(setTimeout(() => setFadingOut(true), 8600));
    timers.push(setTimeout(() => onComplete(), 9400));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden transition-opacity duration-700 ${
        fadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: fadingOut ? 'none' : 'auto' }}
    >
      {/* Ambient grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sky-50/30 to-white" />

      {/* Blue glow spotlight */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full transition-opacity duration-1000"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          opacity: phase === 'shining' || phase === 'reveal' ? 1 : 0.4,
        }}
      />

      {/* Animation stage */}
      <div className="relative w-full max-w-2xl px-8" style={{ height: '280px' }}>
        {/* Ground line */}
        <div
          className="absolute bottom-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"
          style={{ opacity: 0.5 }}
        />

        {/* Brake marks behind the car */}
        <div
          className="absolute bottom-16 left-0"
          style={{
            width: '50%',
            height: '3px',
            transformOrigin: 'right center',
            marginLeft: '0',
            left: '5%',
            background: 'linear-gradient(to left, rgba(30,58,95,0.6) 0%, rgba(30,58,95,0.3) 50%, transparent 100%)',
            borderRadius: '2px',
            animation: 'brake-marks 2.4s ease-out forwards',
          }}
        />

        {/* Car — light blue sports car */}
        <div
          className="absolute bottom-16 left-1/2"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div
            style={{
              animation: 'sports-car-drive 2.2s cubic-bezier(0.15, 0.85, 0.3, 1) forwards',
            }}
          >
            <SportsCarSVG />
          </div>
        </div>

        {/* Hammer — shiny chrome */}
        {phase !== 'driving' && (
          <div
            className="absolute"
            style={{
              bottom: '168px',
              left: 'calc(50% + 75px)',
              transformOrigin: 'bottom left',
              animation: 'hammer-strike 2.5s ease-in-out forwards',
            }}
          >
            <ShinyHammerSVG />
          </div>
        )}

        {/* Dent on the car body */}
        {phase !== 'driving' && phase !== 'shining' && phase !== 'reveal' && (
          <div
            className="absolute"
            style={{
              bottom: '163px',
              left: 'calc(50% + 65px)',
              animation: 'dent-pop 2.5s ease-in-out forwards',
            }}
          >
            <DentSVG />
          </div>
        )}

        {/* Impact sparks */}
        {phase === 'hammering' && (
          <>
            <Sparkle style={{ bottom: '168px', left: 'calc(50% + 68px)', animationDelay: '0.15s' }} />
            <Sparkle style={{ bottom: '175px', left: 'calc(50% + 85px)', animationDelay: '0.35s' }} />
            <Sparkle style={{ bottom: '160px', left: 'calc(50% + 52px)', animationDelay: '0.55s' }} />
            <Sparkle style={{ bottom: '172px', left: 'calc(50% + 75px)', animationDelay: '0.75s' }} />
          </>
        )}

        {/* Shine sweep over the car */}
        {phase === 'shining' && (
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: '70px',
              left: '20%',
              width: '60%',
              height: '140px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '40%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), rgba(186,230,253,0.6), transparent)',
                animation: 'shine-sweep 1s ease-in-out forwards',
              }}
            />
          </div>
        )}

        {/* Sparkles during shine */}
        {phase === 'shining' && (
          <>
            <Sparkle size={14} color="#0ea5e9" style={{ bottom: '120px', left: '35%', animationDelay: '0s' }} />
            <Sparkle size={10} color="#38bdf8" style={{ bottom: '190px', left: '55%', animationDelay: '0.2s' }} />
            <Sparkle size={12} color="#0ea5e9" style={{ bottom: '150px', left: '65%', animationDelay: '0.4s' }} />
            <Sparkle size={8} color="#7dd3fc" style={{ bottom: '200px', left: '40%', animationDelay: '0.6s' }} />
            <Sparkle size={16} color="#38bdf8" style={{ bottom: '130px', left: '50%', animationDelay: '0.5s' }} />
          </>
        )}
      </div>

      {/* Business Name Drive-in with brake marks */}
      {phase === 'reveal' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
          {/* Brake marks for the name */}
          <div
            className="absolute"
            style={{
              top: 'calc(50% - 10px)',
              left: '15%',
              width: '35%',
              height: '3px',
              transformOrigin: 'right center',
              background: 'linear-gradient(to left, rgba(30,58,95,0.5) 0%, rgba(30,58,95,0.2) 50%, transparent 100%)',
              borderRadius: '2px',
              animation: 'name-brake-marks 1.2s ease-out forwards',
            }}
          />

          {/* Logo */}
          <div
            style={{ animation: 'logo-fade-in 0.8s ease-out 0.3s forwards', opacity: 0 }}
            className="mb-4"
          >
            <img
              src="/image.png"
              alt="Denteez Panel Beating logo"
              className="w-24 h-24 object-contain drop-shadow-lg"
            />
          </div>

          {/* Business name drives in */}
          <div
            className="text-center"
            style={{ animation: 'name-drive-in 1.2s cubic-bezier(0.15, 0.85, 0.3, 1) forwards' }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900">
              <span className="text-blue-700">Dent</span>eez
            </h1>
            <div className="mt-1 h-1 w-32 mx-auto bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 rounded-full" />
            <p
              className="mt-3 text-sm md:text-lg text-slate-500 font-light tracking-widest uppercase"
              style={{ animation: 'tagline-fade 1.5s ease-out forwards' }}
            >
              Panel Beating
            </p>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      {phase !== 'reveal' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="flex gap-2">
            <Dot active={phase === 'driving'} />
            <Dot active={phase === 'hammering'} />
            <Dot active={phase === 'shining'} />
          </div>
          <p className="text-xs text-slate-400 tracking-widest uppercase">
            {phase === 'driving' && 'Driving in'}
            {phase === 'hammering' && 'Panel beating'}
            {phase === 'shining' && 'Restoring shine'}
          </p>
        </div>
      )}
    </div>
  );
}

function Dot({ active }: { active: boolean }) {
  return (
    <div
      className={`w-2 h-2 rounded-full transition-all duration-300 ${
        active ? 'bg-blue-600 scale-125' : 'bg-slate-300'
      }`}
    />
  );
}

function Sparkle({
  style,
  size = 12,
  color = '#0ea5e9',
}: {
  style?: React.CSSProperties;
  size?: number;
  color?: string;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        animation: 'sparkle 0.6s ease-in-out forwards',
        ...style,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path
          d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
          fill={color}
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

/* Realistic sedan car with reflective body, proper proportions, detailed wheels */
function SportsCarSVG() {
  return (
    <svg
      width="280"
      height="110"
      viewBox="0 0 280 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Realistic metallic blue paint */}
        <linearGradient id="carBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="20%" stopColor="#3b82f6" />
          <stop offset="55%" stopColor="#1d4ed8" />
          <stop offset="85%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
        {/* Clear-coat reflection top highlight */}
        <linearGradient id="carTopShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* Lower body shadow gradient */}
        <linearGradient id="carBottomShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </linearGradient>
        {/* Tinted glass */}
        <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" stopOpacity="0.92" />
          <stop offset="50%" stopColor="#334155" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="glassReflect" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64748b" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#64748b" stopOpacity="0.15" />
        </linearGradient>
        {/* Tire gradient */}
        <radialGradient id="tireGrad" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="60%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        {/* Rim gradient */}
        <radialGradient id="rimGrad" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>
        {/* Headlight glow */}
        <radialGradient id="headlightGrad" cx="0.3" cy="0.5" r="0.8">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="50%" stopColor="#dbeafe" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="140" cy="102" rx="120" ry="5" fill="rgba(15,23,42,0.25)" />

      {/* === CAR BODY — single unified silhouette === */}
      {/* Main body lower section */}
      <path
        d="M12 82 L12 72 Q12 65 20 63 L42 60 Q50 58 58 54 L82 44 Q95 38 115 36 L155 35 Q175 36 195 40 L218 46 Q235 50 248 56 L262 62 Q270 65 270 72 L270 82 Q270 88 263 88 L245 88 L245 82 Q245 73 237 73 L225 73 Q217 73 217 82 L217 88 L63 88 L63 82 Q63 73 55 73 L43 73 Q35 73 35 82 L35 88 L19 88 Q12 88 12 82 Z"
        fill="url(#carBodyGrad)"
      />

      {/* Roof / greenhouse — sedan cabin */}
      <path
        d="M68 56 Q72 40 92 36 L120 32 Q140 30 160 33 L188 38 Q208 42 222 50 L228 54 Q232 57 232 60 L225 60 Q205 52 185 47 L160 43 Q140 40 120 41 L95 44 Q78 48 72 56 Z"
        fill="url(#carBodyGrad)"
      />

      {/* Top clear-coat highlight */}
      <path
        d="M68 56 Q72 40 92 36 L120 32 Q140 30 160 33 L188 38 Q208 42 222 50 L228 54 Q232 57 232 60 L225 60 Q205 52 185 47 L160 43 Q140 40 120 41 L95 44 Q78 48 72 56 Z"
        fill="url(#carTopShine)"
      />

      {/* Bottom shade */}
      <path
        d="M12 82 L12 72 Q12 65 20 63 L42 60 Q50 58 58 54 L82 44 Q95 38 115 36 L155 35 Q175 36 195 40 L218 46 Q235 50 248 56 L262 62 Q270 65 270 72 L270 82 Q270 88 263 88 L245 88 L245 82 Q245 73 237 73 L225 73 Q217 73 217 82 L217 88 L63 88 L63 82 Q63 73 55 73 L43 73 Q35 73 35 82 L35 88 L19 88 Q12 88 12 82 Z"
        fill="url(#carBottomShade)"
      />

      {/* === Windows === */}
      {/* Front windshield */}
      <path
        d="M82 54 Q88 42 102 38 L122 35 L122 54 Z"
        fill="url(#glassGrad)"
      />
      {/* Rear windshield */}
      <path
        d="M128 35 L162 38 Q182 42 198 50 L198 54 L128 54 Z"
        fill="url(#glassGrad)"
      />
      {/* Window glass reflection */}
      <path
        d="M82 54 Q88 42 102 38 L122 35 L122 54 Z"
        fill="url(#glassReflect)"
      />
      <path
        d="M128 35 L162 38 Q182 42 198 50 L198 54 L128 54 Z"
        fill="url(#glassReflect)"
      />

      {/* B-pillar between front and rear windows */}
      <line x1="125" y1="35" x2="125" y2="56" stroke="#0f172a" strokeWidth="2" opacity="0.6" />

      {/* === Body details === */}
      {/* Upper character line */}
      <path d="M40 62 Q140 56 260 64" stroke="#1e3a8a" strokeWidth="0.6" fill="none" opacity="0.35" />
      {/* Lower character line */}
      <path d="M38 78 L260 78" stroke="#0f172a" strokeWidth="0.5" fill="none" opacity="0.3" />

      {/* Door panel gap — front door */}
      <line x1="125" y1="56" x2="125" y2="86" stroke="#0f172a" strokeWidth="0.6" opacity="0.35" />
      {/* Door panel gap — rear door */}
      <line x1="172" y1="56" x2="172" y2="86" stroke="#0f172a" strokeWidth="0.6" opacity="0.35" />

      {/* Door handle — front */}
      <rect x="110" y="64" width="14" height="3" rx="1.5" fill="#1e3a8a" opacity="0.6" />
      {/* Door handle — rear */}
      <rect x="158" y="64" width="14" height="3" rx="1.5" fill="#1e3a8a" opacity="0.6" />

      {/* Side mirror */}
      <path
        d="M78 50 L86 45 L88 49 L84 52 Z"
        fill="#1d4ed8"
        stroke="#172554"
        strokeWidth="0.4"
      />
      <ellipse cx="86" cy="48.5" rx="2" ry="1.5" fill="#334155" opacity="0.7" />

      {/* === Front end details (right side) === */}
      {/* Headlight housing */}
      <path
        d="M255 64 Q268 65 270 70 Q270 75 264 75 L252 73 Z"
        fill="#1e293b"
        opacity="0.9"
      />
      {/* Headlight lens with glow */}
      <ellipse cx="262" cy="69" rx="5" ry="3" fill="url(#headlightGrad)" />
      {/* LED strip */}
      <path d="M253 67 Q260 66.5 268 68" stroke="#dbeafe" strokeWidth="1" fill="none" opacity="0.8" />

      {/* Front grille */}
      <rect x="250" y="76" width="18" height="7" rx="2" fill="#0f172a" opacity="0.85" />
      <line x1="252" y1="78" x2="267" y2="78" stroke="#334155" strokeWidth="0.4" />
      <line x1="252" y1="80" x2="267" y2="80" stroke="#334155" strokeWidth="0.4" />
      <line x1="252" y1="82" x2="267" y2="82" stroke="#334155" strokeWidth="0.4" />

      {/* === Rear end details (left side) === */}
      {/* Tail light */}
      <path
        d="M12 64 L24 64 L26 75 L14 75 Z"
        fill="#7f1d1d"
        opacity="0.85"
      />
      <rect x="14" y="66" width="10" height="3" rx="1" fill="#ef4444" opacity="0.7" />
      <rect x="14" y="70" width="10" height="2" rx="0.5" fill="#fca5a5" opacity="0.5" />

      {/* Body side reflection streak */}
      <path
        d="M50 68 Q140 62 240 70"
        stroke="#ffffff"
        strokeWidth="1.5"
        fill="none"
        opacity="0.12"
      />

      {/* === Wheels === */}
      {/* Front wheel */}
      <g style={{ animation: 'wheel-spin 2.2s linear forwards' }} transform-origin="63 88">
        {/* Tire */}
        <circle cx="63" cy="88" r="17" fill="url(#tireGrad)" />
        <circle cx="63" cy="88" r="17" fill="none" stroke="#0f172a" strokeWidth="0.5" />
        {/* Rim outer */}
        <circle cx="63" cy="88" r="10" fill="url(#rimGrad)" />
        {/* Rim inner */}
        <circle cx="63" cy="88" r="8" fill="none" stroke="#64748b" strokeWidth="0.8" />
        {/* Center cap */}
        <circle cx="63" cy="88" r="3" fill="#334155" />
        <circle cx="63" cy="88" r="1.5" fill="#64748b" />
        {/* 5-spoke pattern */}
        <g stroke="#475569" strokeWidth="1.5" strokeLinecap="round">
          <line x1="63" y1="79" x2="63" y2="97" />
          <line x1="54.3" y1="83" x2="71.7" y2="93" />
          <line x1="54.3" y1="93" x2="71.7" y2="83" />
          <line x1="55.5" y1="85" x2="70.5" y2="91" transform="rotate(36 63 88)" />
          <line x1="55.5" y1="91" x2="70.5" y2="85" transform="rotate(-36 63 88)" />
        </g>
      </g>

      {/* Rear wheel */}
      <g style={{ animation: 'wheel-spin 2.2s linear forwards' }} transform-origin="217 88">
        <circle cx="217" cy="88" r="17" fill="url(#tireGrad)" />
        <circle cx="217" cy="88" r="17" fill="none" stroke="#0f172a" strokeWidth="0.5" />
        <circle cx="217" cy="88" r="10" fill="url(#rimGrad)" />
        <circle cx="217" cy="88" r="8" fill="none" stroke="#64748b" strokeWidth="0.8" />
        <circle cx="217" cy="88" r="3" fill="#334155" />
        <circle cx="217" cy="88" r="1.5" fill="#64748b" />
        <g stroke="#475569" strokeWidth="1.5" strokeLinecap="round">
          <line x1="217" y1="79" x2="217" y2="97" />
          <line x1="208.3" y1="83" x2="225.7" y2="93" />
          <line x1="208.3" y1="93" x2="225.7" y2="83" />
          <line x1="209.5" y1="85" x2="224.5" y2="91" transform="rotate(36 217 88)" />
          <line x1="209.5" y1="91" x2="224.5" y2="85" transform="rotate(-36 217 88)" />
        </g>
      </g>

      {/* Wheel arches */}
      <path d="M46 88 Q63 70 80 88" stroke="#0f172a" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M200 88 Q217 70 234 88" stroke="#0f172a" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  );
}

/* Shiny chrome hammer */
function ShinyHammerSVG() {
  return (
    <svg
      width="80"
      height="100"
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="chromeHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="30%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="70%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="chromeHandle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="30%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="handleGrip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Handle — chrome */}
      <rect x="35" y="30" width="8" height="65" rx="3" fill="url(#chromeHandle)" />
      {/* Grip */}
      <rect x="33" y="75" width="12" height="20" rx="2" fill="url(#handleGrip)" />
      {/* Grip texture lines */}
      <line x1="34" y1="80" x2="44" y2="80" stroke="#334155" strokeWidth="0.5" />
      <line x1="34" y1="84" x2="44" y2="84" stroke="#334155" strokeWidth="0.5" />
      <line x1="34" y1="88" x2="44" y2="88" stroke="#334155" strokeWidth="0.5" />
      {/* Head — shiny chrome */}
      <rect x="18" y="8" width="44" height="26" rx="4" fill="url(#chromeHead)" />
      <rect x="18" y="8" width="44" height="26" rx="4" stroke="#64748b" strokeWidth="0.5" />
      {/* Shine highlight on head */}
      <rect x="20" y="10" width="40" height="5" rx="2" fill="#ffffff" opacity="0.6" />
      <rect x="20" y="10" width="20" height="3" rx="1" fill="#ffffff" opacity="0.8" />
      {/* Reflection */}
      <ellipse cx="30" cy="14" rx="6" ry="2" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}

function DentSVG() {
  return (
    <svg
      width="50"
      height="40"
      viewBox="0 0 50 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="25" cy="20" rx="22" ry="16" fill="rgba(7,89,133,0.3)" opacity="0.6" />
      <ellipse cx="25" cy="18" rx="16" ry="11" fill="rgba(7,89,133,0.15)" />
      <path
        d="M10 22 Q25 8 40 22"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
