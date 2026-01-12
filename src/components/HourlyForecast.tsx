import { ForecastData, TemperatureUnit } from '@/types/weather';
import { ForecastCard } from './ForecastCard';

interface HourlyForecastProps {
  forecast: ForecastData;
  unit: TemperatureUnit;
}

export const HourlyForecast = ({ forecast, unit }: HourlyForecastProps) => {
  // Get next 8 items (24 hours, every 3 hours)
  const hourlyItems = forecast.list.slice(0, 8);

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 gradient-text">Today's Forecast</h3>
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {hourlyItems.map((item, index) => (
          <ForecastCard 
            key={item.dt} 
            item={item} 
            unit={unit} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
