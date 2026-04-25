import { WeatherData, TemperatureUnit } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { format } from 'date-fns';
import { MapPin } from 'lucide-react';

interface CurrentWeatherProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

const convertTemp = (temp: number, unit: TemperatureUnit): number => {
  if (unit === 'fahrenheit') {
    return Math.round((temp * 9/5) + 32);
  }
  return Math.round(temp);
};

const getTempClass = (temp: number): string => {
  if (temp >= 30) return 'temp-hot';
  if (temp >= 15) return 'temp-warm';
  return 'temp-cold';
};

export const CurrentWeather = ({ weather, unit }: CurrentWeatherProps) => {
  const temp = convertTemp(weather.main.temp, unit);
  const feelsLike = convertTemp(weather.main.feels_like, unit);
  const tempMin = convertTemp(weather.main.temp_min, unit);
  const tempMax = convertTemp(weather.main.temp_max, unit);
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';
  const rawTemp = weather.main.temp;

  const currentDate = new Date();
  const dayName = format(currentDate, 'EEEE');
  const dateStr = format(currentDate, 'MMMM d, yyyy');

  return (
    <div
      className="glass-card-glow rounded-3xl p-8 animate-fade-in"
      style={{ animationDelay: '120ms' }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Left: Location & Date */}
        <div className="text-center lg:text-left space-y-1">
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <MapPin size={16} style={{ color: '#00D4FF' }} />
            <span className="label-caps" style={{ color: 'rgba(0,212,255,0.7)' }}>
              CURRENT LOCATION
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-[#dee1f7] leading-tight mt-2">
            {weather.name}
          </h2>
          <p className="text-lg font-medium" style={{ color: 'rgba(0,212,255,0.8)' }}>
            {weather.sys.country}
          </p>
          <div className="mt-4 space-y-0.5" style={{ color: 'rgba(187,201,207,0.7)' }}>
            <p className="text-lg font-semibold font-display">{dayName}</p>
            <p className="text-sm">{dateStr}</p>
          </div>
        </div>

        {/* Center: Weather Icon & Condition */}
        <div className="flex flex-col items-center animate-float">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-30"
              style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
            />
            <WeatherIcon
              iconCode={weather.weather[0].icon}
              size={130}
              className="relative drop-shadow-2xl"
            />
          </div>
          <p
            className="text-lg capitalize mt-3 font-medium"
            style={{ color: '#d6baff' }}
          >
            {weather.weather[0].description}
          </p>
        </div>

        {/* Right: Temperature */}
        <div className="text-center lg:text-right">
          <div className="flex items-start justify-center lg:justify-end">
            <span
              className={`text-8xl md:text-9xl font-light tracking-tighter font-display ${getTempClass(rawTemp)}`}
            >
              {temp}
            </span>
            <span
              className="text-3xl font-light mt-4"
              style={{ color: 'rgba(0,212,255,0.7)' }}
            >
              {unitSymbol}
            </span>
          </div>
          <div className="space-y-1 mt-1">
            <p style={{ color: 'rgba(187,201,207,0.7)' }}>
              Feels like{' '}
              <span className="font-semibold" style={{ color: '#00D4FF' }}>
                {feelsLike}{unitSymbol}
              </span>
            </p>
            <p className="text-sm" style={{ color: 'rgba(187,201,207,0.5)' }}>
              <span style={{ color: '#FF6B35' }}>H: {tempMax}°</span>
              {' '}·{' '}
              <span style={{ color: '#7B5EA7' }}>L: {tempMin}°</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
