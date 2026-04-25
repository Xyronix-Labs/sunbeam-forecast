import { Cloud, MapPin, Zap } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div
      className="glass-card rounded-3xl p-16 text-center animate-fade-in"
      style={{ border: '1px solid rgba(0,212,255,0.12)', animationDelay: '160ms' }}
    >
      {/* Animated icon cluster */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #00D4FF 0%, #7B5EA7 100%)' }}
          />
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center relative"
            style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)' }}
          >
            <Cloud
              className="animate-float"
              size={52}
              style={{ color: 'rgba(0,212,255,0.6)' }}
            />
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #7B5EA7 100%)' }}
          >
            <MapPin size={18} style={{ color: '#0a0f1c' }} />
          </div>
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-3xl font-bold font-display gradient-text mb-3">
        Welcome to SunBeam
      </h3>
      <p
        className="text-base max-w-md mx-auto leading-relaxed"
        style={{ color: 'rgba(187,201,207,0.6)' }}
      >
        Search for any city worldwide to get real-time weather conditions, hourly forecasts,
        and astronomical data — or allow location access for instant updates.
      </p>

      {/* Subtle tips */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        {['Wind & Pressure', 'Hourly Forecast', '5-Day Outlook', 'Moon Phases'].map(tip => (
          <span
            key={tip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(0,212,255,0.07)',
              border: '1px solid rgba(0,212,255,0.15)',
              color: 'rgba(0,212,255,0.8)',
            }}
          >
            <Zap size={10} />
            {tip}
          </span>
        ))}
      </div>
    </div>
  );
};
