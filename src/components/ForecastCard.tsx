import { WeatherIcon } from './WeatherIcon';
import { TemperatureUnit, ForecastItem } from '@/types/weather';
import { format } from 'date-fns';
import { Droplets } from 'lucide-react';

interface ForecastCardProps {
  item: ForecastItem;
  unit: TemperatureUnit;
  index: number;
}

const convertTemp = (temp: number, unit: TemperatureUnit): number => {
  if (unit === 'fahrenheit') return Math.round((temp * 9/5) + 32);
  return Math.round(temp);
};

export const ForecastCard = ({ item, unit, index }: ForecastCardProps) => {
  const temp = convertTemp(item.main.temp, unit);
  const date = new Date(item.dt * 1000);
  const time = format(date, 'h a');
  const pop = Math.round(item.pop * 100);

  return (
    <div
      className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col items-center gap-2.5 min-w-[108px] animate-fade-in cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Time */}
      <span className="label-caps">{time}</span>

      {/* Icon */}
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-lg opacity-30"
          style={{ background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)' }}
        />
        <WeatherIcon iconCode={item.weather[0].icon} size={44} className="relative" />
      </div>

      {/* Temperature */}
      <span className="text-xl font-bold font-display gradient-text">{temp}°</span>

      {/* Precipitation */}
      {pop > 0 && (
        <div
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: '#00D4FF' }}
        >
          <Droplets size={11} />
          <span>{pop}%</span>
        </div>
      )}
    </div>
  );
};
