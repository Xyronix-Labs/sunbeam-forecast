import { ForecastData, TemperatureUnit, ForecastItem } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { format } from 'date-fns';
import { Droplets, Wind, ChevronDown, ChevronUp, CalendarDays } from 'lucide-react';
import { useState } from 'react';

interface DailyForecastProps {
  forecast: ForecastData;
  unit: TemperatureUnit;
}

const convertTemp = (temp: number, unit: TemperatureUnit): number => {
  if (unit === 'fahrenheit') return Math.round((temp * 9/5) + 32);
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
    if (!dayMap.has(dateKey)) dayMap.set(dateKey, []);
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
    <div className="animate-fade-in" style={{ animationDelay: '360ms' }}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="icon-pill">
          <CalendarDays size={15} />
        </div>
        <h3 className="text-xl font-bold font-display gradient-text">
          5-Day Forecast
        </h3>
        <div className="flex-1 section-divider" />
      </div>

      {/* Day rows */}
      <div
        className="glass-card rounded-3xl overflow-hidden"
        style={{ border: '1px solid rgba(0,212,255,0.12)' }}
      >
        {dailyData.slice(0, 5).map((day, index) => {
          const dateKey = format(day.date, 'yyyy-MM-dd');
          const isExpanded = expandedDay === dateKey;
          const dayName = format(day.date, 'EEE');
          const fullDayName = format(day.date, 'EEEE');
          const dateStr = format(day.date, 'MMM d');
          const minTemp = convertTemp(day.minTemp, unit);
          const maxTemp = convertTemp(day.maxTemp, unit);

          return (
            <div key={dateKey} className="animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
              {/* Divider between rows (not first) */}
              {index > 0 && (
                <div style={{ height: '1px', background: 'rgba(0,212,255,0.07)', margin: '0 20px' }} />
              )}

              {/* Day Header - Clickable */}
              <button
                onClick={() => toggleDay(dateKey)}
                className="w-full flex items-center justify-between py-4 px-6 transition-colors duration-200 group"
                style={{ background: isExpanded ? 'rgba(0,212,255,0.04)' : 'transparent' }}
              >
                {/* Day info */}
                <div className="flex items-center gap-4 flex-1 text-left">
                  <div className="w-20">
                    <p className="font-bold font-display" style={{ color: '#dee1f7' }}>
                      {dayName}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(187,201,207,0.5)' }}>
                      {dateStr}
                    </p>
                  </div>

                  {/* Weather icon */}
                  <WeatherIcon iconCode={day.mainWeather.weather[0].icon} size={38} />

                  {/* Condition */}
                  <p
                    className="capitalize text-sm hidden md:block flex-1"
                    style={{ color: '#d6baff' }}
                  >
                    {day.mainWeather.weather[0].description}
                  </p>
                </div>

                {/* Temps + Chevron */}
                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <span className="text-lg font-bold font-display" style={{ color: '#FF6B35' }}>
                      {maxTemp}°
                    </span>
                    <span className="mx-1.5" style={{ color: 'rgba(187,201,207,0.3)' }}>/</span>
                    <span className="text-base font-medium" style={{ color: '#7B5EA7' }}>
                      {minTemp}°
                    </span>
                  </div>
                  {isExpanded
                    ? <ChevronUp size={18} style={{ color: '#00D4FF' }} />
                    : <ChevronDown size={18} style={{ color: 'rgba(187,201,207,0.4)' }} className="group-hover:text-[#00D4FF] transition-colors" />
                  }
                </div>
              </button>

              {/* Expanded 24-Hour View */}
              {isExpanded && (
                <div
                  className="mx-4 mb-4 p-4 rounded-2xl animate-fade-in"
                  style={{ background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.1)' }}
                >
                  <h4 className="label-caps mb-4">
                    {fullDayName} — Hourly Breakdown
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                    {day.items.map((item, idx) => {
                      const time = format(new Date(item.dt * 1000), 'h a');
                      const temp = convertTemp(item.main.temp, unit);
                      const windSpeed = unit === 'celsius'
                        ? `${item.wind.speed.toFixed(0)}m/s`
                        : `${(item.wind.speed * 2.237).toFixed(0)}mph`;

                      return (
                        <div
                          key={item.dt}
                          className="flex flex-col items-center p-3 rounded-xl transition-colors duration-200 animate-fade-in"
                          style={{
                            animationDelay: `${idx * 40}ms`,
                            background: 'rgba(255,255,255,0.03)',
                          }}
                        >
                          <span className="label-caps mb-1.5">{time}</span>
                          <WeatherIcon iconCode={item.weather[0].icon} size={28} />
                          <span className="text-base font-bold font-display gradient-text mt-1.5">{temp}°</span>
                          <div className="flex items-center gap-0.5 mt-1 text-xs" style={{ color: '#00D4FF' }}>
                            <Droplets size={9} />
                            <span>{Math.round(item.pop * 100)}%</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-xs" style={{ color: 'rgba(187,201,207,0.5)' }}>
                            <Wind size={9} />
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
