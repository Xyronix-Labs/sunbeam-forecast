import { WeatherData, TemperatureUnit } from '@/types/weather';
import { WeatherIcon } from './WeatherIcon';
import { format } from 'date-fns';
import logo from '@/assets/logo.png';

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

export const CurrentWeather = ({ weather, unit }: CurrentWeatherProps) => {
  const temp = convertTemp(weather.main.temp, unit);
  const feelsLike = convertTemp(weather.main.feels_like, unit);
  const tempMin = convertTemp(weather.main.temp_min, unit);
  const tempMax = convertTemp(weather.main.temp_max, unit);
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';
  
  const currentDate = new Date();
  const dayName = format(currentDate, 'EEEE');
  const dateStr = format(currentDate, 'MMMM d, yyyy');

  return (
    <div className="glass-card-orange rounded-3xl p-8 weather-glow animate-fade-in orange-glow">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left: Location & Date */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-1">
            {weather.name}
          </h2>
          <p className="text-muted-foreground text-lg">
            {weather.sys.country}
          </p>
          <div className="mt-4 text-muted-foreground">
            <p className="text-lg font-medium">{dayName}</p>
            <p className="text-sm">{dateStr}</p>
          </div>
        </div>

        {/* Center: Weather Icon & Condition */}
        <div className="flex flex-col items-center animate-float">
          <WeatherIcon 
            iconCode={weather.weather[0].icon} 
            size={120} 
            className="drop-shadow-2xl"
          />
          <p className="text-xl text-muted-foreground capitalize mt-2">
            {weather.weather[0].description}
          </p>
        </div>

        {/* Right: Temperature */}
        <div className="text-center lg:text-right">
          <div className="flex items-start justify-center lg:justify-end">
            <span className="text-7xl md:text-8xl font-light tracking-tight gradient-text">
              {temp}
            </span>
            <span className="text-3xl font-light text-primary mt-2">
              {unitSymbol}
            </span>
          </div>
          <p className="text-muted-foreground text-lg mt-2">
            Feels like <span className="text-primary">{feelsLike}{unitSymbol}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            H: {tempMax}° L: {tempMin}°
          </p>
        </div>
      </div>
    </div>
  );
};
