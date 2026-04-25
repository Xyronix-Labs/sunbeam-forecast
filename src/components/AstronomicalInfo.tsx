import { getMoonPhase } from '@/utils/weatherUtils';
import { WeatherData } from '@/types/weather';
import { format, addDays } from 'date-fns';
import { Moon, MapPin } from 'lucide-react';

interface AstronomicalInfoProps {
  weather: WeatherData;
}

export const AstronomicalInfo = ({ weather }: AstronomicalInfoProps) => {
  const moonPhase = getMoonPhase();

  // Calculate next 7 days moon phases
  const upcomingMoonPhases = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i);
    return { date, phase: getMoonPhase(date) };
  });

  // Illumination arc: we'll render a simple SVG arc
  const illuminationPct = moonPhase.illumination;
  const arcRadius = 36;
  const arcCircumference = 2 * Math.PI * arcRadius;
  const arcDash = (illuminationPct / 100) * arcCircumference;

  return (
    <div className="animate-fade-in" style={{ animationDelay: '440ms' }}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="icon-pill">
          <Moon size={15} />
        </div>
        <h3 className="text-xl font-bold font-display gradient-text">
          Astronomical Data
        </h3>
        <div className="flex-1 section-divider" />
      </div>

      <div
        className="glass-card rounded-3xl p-6"
        style={{ border: '1px solid rgba(0,212,255,0.12)' }}
      >
        {/* Current Moon Phase */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          {/* Moon + illumination arc */}
          <div className="relative flex items-center justify-center">
            {/* SVG arc ring */}
            <svg width="120" height="120" className="-rotate-90">
              {/* Track */}
              <circle
                cx="60" cy="60" r={arcRadius}
                fill="none"
                strokeWidth="4"
                stroke="rgba(255,255,255,0.07)"
              />
              {/* Fill arc */}
              <circle
                cx="60" cy="60" r={arcRadius}
                fill="none"
                strokeWidth="4"
                stroke="url(#arcGrad)"
                strokeLinecap="round"
                strokeDasharray={`${arcDash} ${arcCircumference}`}
                style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.6))' }}
              />
              <defs>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#7B5EA7" />
                </linearGradient>
              </defs>
            </svg>
            {/* Moon emoji centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl animate-pulse-slow">{moonPhase.emoji}</span>
            </div>
          </div>

          {/* Moon info */}
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold font-display" style={{ color: '#dee1f7' }}>
              {moonPhase.name}
            </h4>
            <div className="mt-2 space-y-1">
              <p style={{ color: 'rgba(187,201,207,0.7)' }}>
                Illumination:{' '}
                <span className="font-bold font-display" style={{ color: '#00D4FF' }}>
                  {illuminationPct}%
                </span>
              </p>
              <div className="aurora-bar-track w-40">
                <div className="aurora-bar-fill" style={{ width: `${illuminationPct}%` }} />
              </div>
            </div>
            {/* Coordinates */}
            <div
              className="flex items-center gap-1.5 mt-4"
              style={{ color: 'rgba(187,201,207,0.5)' }}
            >
              <MapPin size={12} style={{ color: '#00D4FF' }} />
              <span className="text-xs font-mono">
                {weather.coord.lat.toFixed(4)}°N, {weather.coord.lon.toFixed(4)}°E
              </span>
            </div>
          </div>
        </div>

        {/* 7-Day Moon Calendar */}
        <div>
          <div className="label-caps mb-4">7-Day Moon Calendar</div>
          <div className="grid grid-cols-7 gap-2">
            {upcomingMoonPhases.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 rounded-xl transition-all duration-300"
                style={index === 0
                  ? {
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.25)',
                      boxShadow: '0 0 16px rgba(0,212,255,0.1)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid transparent',
                    }
                }
              >
                <span className="label-caps mb-1.5 text-center" style={{ letterSpacing: '0.08em' }}>
                  {format(item.date, 'EEE')}
                </span>
                <span className="text-2xl">{item.phase.emoji}</span>
                <span
                  className="text-xs mt-1 font-display font-medium"
                  style={{ color: index === 0 ? '#00D4FF' : 'rgba(187,201,207,0.5)' }}
                >
                  {item.phase.illumination}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
