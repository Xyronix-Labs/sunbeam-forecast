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
  if (unit === 'fahrenheit') {
    return Math.round((temp * 9/5) + 32);
  }
  return Math.round(temp);
};

export const ForecastCard = ({ item, unit, index }: ForecastCardProps) => {
  const temp = convertTemp(item.main.temp, unit);
  const date = new Date(item.dt * 1000);
  const time = format(date, 'h a');
  const pop = Math.round(item.pop * 100);

  return (
    <div 
      className="glass-card-orange rounded-2xl p-4 flex flex-col items-center gap-2 min-w-[110px] hover:scale-105 transition-transform duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <span className="text-muted-foreground text-sm font-medium">{time}</span>
      <WeatherIcon iconCode={item.weather[0].icon} size={40} />
      <span className="text-xl font-semibold gradient-text">
        {temp}°
      </span>
      {pop > 0 && (
        <div className="flex items-center gap-1 text-xs text-primary">
          <Droplets size={12} />
          <span>{pop}%</span>
        </div>
      )}
    </div>
  );
};
