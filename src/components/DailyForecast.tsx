import { ForecastData, TemperatureUnit, ForecastItem } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { format } from 'date-fns';
import { Droplets, Wind, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

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

interface DayData {
  date: Date;
  items: ForecastItem[];
  minTemp: number;
  maxTemp: number;
  mainWeather: ForecastItem;
}

export const DailyForecast = ({ forecast, unit }: DailyForecastProps) => {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  // Group forecast items by day
  const dailyData: DayData[] = [];
  const dayMap = new Map<string, ForecastItem[]>();
  
  forecast.list.forEach(item => {
    const dateKey = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
    if (!dayMap.has(dateKey)) {
      dayMap.set(dateKey, []);
    }
    dayMap.get(dateKey)!.push(item);
  });

  dayMap.forEach((items, dateKey) => {
    const temps = items.map(i => i.main.temp);
    const noonItem = items.find(i => {
      const hour = new Date(i.dt * 1000).getHours();
      return hour >= 11 && hour <= 14;
    }) || items[Math.floor(items.length / 2)];
    
    dailyData.push({
      date: new Date(dateKey),
      items,
      minTemp: Math.min(...temps),
      maxTemp: Math.max(...temps),
      mainWeather: noonItem,
    });
  });

  const toggleDay = (dateKey: string) => {
    setExpandedDay(expandedDay === dateKey ? null : dateKey);
  };

  return (
    <div className="glass-card-orange rounded-3xl p-6 animate-fade-in orange-glow">
      <h3 className="text-xl font-semibold mb-6 gradient-text">5-Day Forecast</h3>
      <div className="space-y-2">
        {dailyData.slice(0, 5).map((day, index) => {
          const dateKey = format(day.date, 'yyyy-MM-dd');
          const isExpanded = expandedDay === dateKey;
          const dayName = format(day.date, 'EEEE');
          const dateStr = format(day.date, 'MMM d');
          const minTemp = convertTemp(day.minTemp, unit);
          const maxTemp = convertTemp(day.maxTemp, unit);
          const unitSymbol = unit === 'celsius' ? '°' : '°';

          return (
            <div key={dateKey} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              {/* Day Header - Clickable */}
              <button
                onClick={() => toggleDay(dateKey)}
                className="w-full flex items-center justify-between py-4 px-4 rounded-xl hover:bg-muted/20 transition-colors duration-200"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-24 text-left">
                    <p className="font-medium">{dayName}</p>
                    <p className="text-sm text-muted-foreground">{dateStr}</p>
                  </div>
                  <WeatherIcon iconCode={day.mainWeather.weather[0].icon} size={36} />
                  <p className="text-muted-foreground capitalize text-sm hidden md:block flex-1">
                    {day.mainWeather.weather[0].description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-lg font-semibold text-primary">{maxTemp}{unitSymbol}</span>
                    <span className="text-muted-foreground mx-1">/</span>
                    <span className="text-muted-foreground">{minTemp}{unitSymbol}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Expanded 24-Hour View */}
              {isExpanded && (
                <div className="mt-2 mb-4 p-4 bg-muted/10 rounded-xl border border-border/30 animate-fade-in">
                  <h4 className="text-sm font-medium text-muted-foreground mb-4">Hourly Breakdown</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
                    {day.items.map((item, idx) => {
                      const time = format(new Date(item.dt * 1000), 'h a');
                      const temp = convertTemp(item.main.temp, unit);
                      const windSpeed = unit === 'celsius' 
                        ? `${item.wind.speed.toFixed(0)}m/s`
                        : `${(item.wind.speed * 2.237).toFixed(0)}mph`;

                      return (
                        <div 
                          key={item.dt} 
                          className="flex flex-col items-center p-3 rounded-xl bg-background/30 hover:bg-background/50 transition-colors"
                        >
                          <span className="text-xs text-muted-foreground mb-2">{time}</span>
                          <WeatherIcon iconCode={item.weather[0].icon} size={28} />
                          <span className="text-lg font-semibold mt-2 gradient-text">{temp}°</span>
                          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                            <Droplets size={10} />
                            <span>{Math.round(item.pop * 100)}%</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Wind size={10} />
                            <span>{windSpeed}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
