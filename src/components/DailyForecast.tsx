import { ForecastData, TemperatureUnit } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { format } from 'date-fns';

interface DailyForecastProps {
  forecast: ForecastData;
  unit: TemperatureUnit;
}

const convertTemp = (temp: number, unit: TemperatureUnit): number => {
  if (unit === 'fahrenheit') {
    return Math.round((temp * 9/5) + 32);
  }
  return Math.round(temp);
};

export const DailyForecast = ({ forecast, unit }: DailyForecastProps) => {
  // Group by day and get one entry per day (noon time preferably)
  const dailyMap = new Map<string, typeof forecast.list[0]>();
  
  forecast.list.forEach(item => {
    const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
    const hour = new Date(item.dt * 1000).getHours();
    
    // Prefer noon (12-15) or just keep first entry for the day
    if (!dailyMap.has(date) || (hour >= 12 && hour <= 15)) {
      dailyMap.set(date, item);
    }
  });

  const dailyItems = Array.from(dailyMap.values()).slice(0, 5);

  return (
    <div className="glass-card rounded-3xl p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-6 gradient-text">5-Day Forecast</h3>
      <div className="space-y-4">
        {dailyItems.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = format(date, 'EEEE');
          const dateStr = format(date, 'MMM d');
          const temp = convertTemp(item.main.temp, unit);
          const unitSymbol = unit === 'celsius' ? '°C' : '°F';

          return (
            <div
              key={item.dt}
              className="flex items-center justify-between py-3 border-b border-border/30 last:border-0 hover:bg-muted/20 rounded-xl px-3 transition-colors duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-24">
                  <p className="font-medium">{dayName}</p>
                  <p className="text-sm text-muted-foreground">{dateStr}</p>
                </div>
                <WeatherIcon iconCode={item.weather[0].icon} size={36} />
                <p className="text-muted-foreground capitalize text-sm hidden md:block">
                  {item.weather[0].description}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-semibold">{temp}{unitSymbol}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
