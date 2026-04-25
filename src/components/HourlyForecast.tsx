import { ForecastData, TemperatureUnit } from '@/types/weather';
import { ForecastCard } from './ForecastCard';
import { Clock } from 'lucide-react';

interface HourlyForecastProps {
  forecast: ForecastData;
  unit: TemperatureUnit;
}

export const HourlyForecast = ({ forecast, unit }: HourlyForecastProps) => {
  const hourlyItems = forecast.list.slice(0, 8);

  return (
    <div className="animate-fade-in" style={{ animationDelay: '280ms' }}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="icon-pill">
          <Clock size={15} />
        </div>
        <h3 className="text-xl font-bold font-display gradient-text">
          Today's Forecast
        </h3>
        <div className="flex-1 section-divider" />
      </div>

      {/* Scrollable cards row */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {hourlyItems.map((item, index) => (
          <ForecastCard key={item.dt} item={item} unit={unit} index={index} />
        ))}
      </div>
    </div>
  );
};
