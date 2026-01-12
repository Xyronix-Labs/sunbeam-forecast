import { WeatherData, TemperatureUnit } from '@/types/weather';
import { Wind, Droplets, Gauge, Eye, Sunrise, Sunset, Cloud, Compass, Thermometer, Timer } from 'lucide-react';
import { format } from 'date-fns';
import { getWindDirection, getDewPoint, getDayLength } from '@/utils/weatherUtils';

interface WeatherDetailsProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

interface DetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  delay?: number;
}

const DetailCard = ({ icon, label, value, subValue, delay = 0 }: DetailCardProps) => (
  <div 
    className="glass-card-orange rounded-2xl p-5 flex flex-col gap-3 hover:scale-105 transition-transform duration-300 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-primary/20 text-primary">
        {icon}
      </div>
      <span className="text-muted-foreground text-sm">{label}</span>
    </div>
    <span className="text-2xl font-semibold gradient-text">{value}</span>
    {subValue && <span className="text-sm text-muted-foreground">{subValue}</span>}
  </div>
);

export const WeatherDetails = ({ weather, unit }: WeatherDetailsProps) => {
  const windSpeed = unit === 'celsius' 
    ? `${weather.wind.speed.toFixed(1)} m/s` 
    : `${(weather.wind.speed * 2.237).toFixed(1)} mph`;

  const windGust = weather.wind.gust 
    ? (unit === 'celsius' 
        ? `Gust: ${weather.wind.gust.toFixed(1)} m/s`
        : `Gust: ${(weather.wind.gust * 2.237).toFixed(1)} mph`)
    : undefined;

  const visibility = weather.visibility >= 1000 
    ? `${(weather.visibility / 1000).toFixed(1)} km` 
    : `${weather.visibility} m`;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'h:mm a');
  };

  const windDir = getWindDirection(weather.wind.deg);
  const dewPoint = getDewPoint(weather.main.temp, weather.main.humidity);
  const dayLength = getDayLength(weather.sys.sunrise, weather.sys.sunset);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <DetailCard
        icon={<Wind size={20} />}
        label="Wind Speed"
        value={windSpeed}
        subValue={windGust}
        delay={0}
      />
      <DetailCard
        icon={<Compass size={20} />}
        label="Wind Direction"
        value={windDir}
        subValue={`${weather.wind.deg}°`}
        delay={50}
      />
      <DetailCard
        icon={<Droplets size={20} />}
        label="Humidity"
        value={`${weather.main.humidity}%`}
        delay={100}
      />
      <DetailCard
        icon={<Thermometer size={20} />}
        label="Dew Point"
        value={`${unit === 'celsius' ? dewPoint : Math.round((dewPoint * 9/5) + 32)}°`}
        delay={150}
      />
      <DetailCard
        icon={<Gauge size={20} />}
        label="Pressure"
        value={`${weather.main.pressure} hPa`}
        subValue={weather.main.sea_level ? `Sea: ${weather.main.sea_level} hPa` : undefined}
        delay={200}
      />
      <DetailCard
        icon={<Eye size={20} />}
        label="Visibility"
        value={visibility}
        delay={250}
      />
      <DetailCard
        icon={<Cloud size={20} />}
        label="Cloud Cover"
        value={`${weather.clouds.all}%`}
        delay={300}
      />
      <DetailCard
        icon={<Timer size={20} />}
        label="Day Length"
        value={dayLength}
        delay={350}
      />
      <DetailCard
        icon={<Sunrise size={20} />}
        label="Sunrise"
        value={formatTime(weather.sys.sunrise)}
        delay={400}
      />
      <DetailCard
        icon={<Sunset size={20} />}
        label="Sunset"
        value={formatTime(weather.sys.sunset)}
        delay={450}
      />
    </div>
  );
};
