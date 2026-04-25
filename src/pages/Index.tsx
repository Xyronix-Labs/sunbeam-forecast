import { useState, useEffect } from 'react';
import { useWeather } from '@/hooks/useWeather';
import { SearchBar } from '@/components/SearchBar';
import { CurrentWeather } from '@/components/CurrentWeather';
import { WeatherDetails } from '@/components/WeatherDetails';
import { HourlyForecast } from '@/components/HourlyForecast';
import { DailyForecast } from '@/components/DailyForecast';
import { AstronomicalInfo } from '@/components/AstronomicalInfo';
import { UnitToggle } from '@/components/UnitToggle';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage } from '@/components/ErrorMessage';
import { TemperatureUnit } from '@/types/weather';

// Aurora star particles
const StarField = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <div className="stars-bg">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const Index = () => {
  const { weather, forecast, loading, error, fetchWeather, fetchWeatherByCoords } = useWeather();
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchWeather('London');
        }
      );
    } else {
      fetchWeather('London');
    }
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Aurora background bleeds */}
      <div className="aurora-bleed-top-left" />
      <div className="aurora-bleed-top-right" />
      <StarField />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* ── Header ── */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            {/* Lightning bolt logo */}
            <div className="relative">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center cyan-glow"
                style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #7B5EA7 100%)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#0a0f1c" strokeWidth="0" />
                </svg>
              </div>
              <div
                className="absolute inset-0 rounded-2xl opacity-40 blur-md"
                style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #7B5EA7 100%)' }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text font-display tracking-tight leading-none">
                SunBeam
              </h1>
              <p className="text-xs label-caps" style={{ color: 'rgba(0,212,255,0.6)' }}>
                Forecast
              </p>
            </div>
          </div>
          <UnitToggle unit={unit} onToggle={setUnit} />
        </header>

        {/* ── Search Bar ── */}
        <div className="animate-fade-in" style={{ animationDelay: '80ms' }}>
          <SearchBar
            onSearch={fetchWeather}
            onGetLocation={handleGetLocation}
            loading={loading}
          />
        </div>

        {/* ── Error State ── */}
        {error && <ErrorMessage message={error} />}

        {/* ── Loading State ── */}
        {loading && <LoadingSkeleton />}

        {/* ── Empty State ── */}
        {!loading && !weather && !error && <EmptyState />}

        {/* ── Weather Content ── */}
        {!loading && weather && forecast && (
          <div className="space-y-6">
            <CurrentWeather weather={weather} unit={unit} />
            <WeatherDetails weather={weather} unit={unit} />
            <HourlyForecast forecast={forecast} unit={unit} />
            <DailyForecast forecast={forecast} unit={unit} />
            <AstronomicalInfo weather={weather} />
          </div>
        )}

        {/* ── Footer ── */}
        <footer className="text-center py-8 animate-fade-in">
          <div className="section-divider mb-6" />
          <p className="label-caps" style={{ color: 'rgba(0,212,255,0.4)' }}>
            Powered by OpenWeatherMap API · SunBeam Forecast · Final Year Project
          </p>
        </footer>

      </div>
    </div>
  );
};

export default Index;
