import { WeatherIcon } from './WeatherIcon';
import { TemperatureUnit } from '@/types/weather';
import { format } from 'date-fns';

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
}

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
  const unitSymbol = unit === 'celsius' ? '°' : '°';
  const date = new Date(item.dt * 1000);
  const time = format(date, 'h a');

  return (
    <div 
      className="glass-card rounded-2xl p-4 flex flex-col items-center gap-3 min-w-[100px] hover:scale-105 transition-transform duration-300"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <span className="text-muted-foreground text-sm font-medium">{time}</span>
      <WeatherIcon iconCode={item.weather[0].icon} size={40} />
      <span className="text-xl font-semibold">
        {temp}{unitSymbol}
      </span>
    </div>
  );
};
