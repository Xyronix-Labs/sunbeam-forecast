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
import logo from '@/assets/logo.png';

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
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="WeatherScope Logo" className="w-12 h-12 rounded-xl" />
            <h1 className="text-3xl font-bold gradient-text">WeatherScope</h1>
          </div>
          <UnitToggle unit={unit} onToggle={setUnit} />
        </header>

        {/* Search Bar */}
        <SearchBar 
          onSearch={fetchWeather} 
          onGetLocation={handleGetLocation}
          loading={loading}
        />

        {/* Error State */}
        {error && <ErrorMessage message={error} />}

        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Empty State */}
        {!loading && !weather && !error && <EmptyState />}

        {/* Weather Content */}
        {!loading && weather && forecast && (
          <div className="space-y-6">
            {/* Current Weather */}
            <CurrentWeather weather={weather} unit={unit} />

            {/* Weather Details Grid */}
            <WeatherDetails weather={weather} unit={unit} />

            {/* Hourly Forecast */}
            <HourlyForecast forecast={forecast} unit={unit} />

            {/* 5-Day Forecast with Expandable 24h View */}
            <DailyForecast forecast={forecast} unit={unit} />

            {/* Astronomical Info */}
            <AstronomicalInfo weather={weather} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm py-8">
          <p>Powered by OpenWeatherMap API</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
