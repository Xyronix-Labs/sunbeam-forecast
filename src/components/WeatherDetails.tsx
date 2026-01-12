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
}

const DetailCard = ({ icon, label, value, subValue }: DetailCardProps) => (
  <div className="glass-card-orange rounded-2xl p-5 flex flex-col h-full hover:scale-[1.02] transition-transform duration-300">
    <div className="flex items-center gap-3 mb-auto">
      <div className="p-2.5 rounded-xl bg-primary/20 text-primary shrink-0">
        {icon}
      </div>
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
    </div>
    <div className="mt-4">
      <span className="text-2xl font-semibold gradient-text block">{value}</span>
      {subValue && <span className="text-xs text-muted-foreground mt-1 block">{subValue}</span>}
    </div>
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

  const details = [
    { icon: <Wind size={20} />, label: "Wind Speed", value: windSpeed, subValue: windGust },
    { icon: <Compass size={20} />, label: "Wind Direction", value: windDir, subValue: `${weather.wind.deg}°` },
    { icon: <Droplets size={20} />, label: "Humidity", value: `${weather.main.humidity}%` },
    { icon: <Thermometer size={20} />, label: "Dew Point", value: `${unit === 'celsius' ? dewPoint : Math.round((dewPoint * 9/5) + 32)}°` },
    { icon: <Gauge size={20} />, label: "Pressure", value: `${weather.main.pressure} hPa`, subValue: weather.main.sea_level ? `Sea level: ${weather.main.sea_level} hPa` : undefined },
    { icon: <Eye size={20} />, label: "Visibility", value: visibility },
    { icon: <Cloud size={20} />, label: "Cloud Cover", value: `${weather.clouds.all}%` },
    { icon: <Timer size={20} />, label: "Day Length", value: dayLength },
    { icon: <Sunrise size={20} />, label: "Sunrise", value: formatTime(weather.sys.sunrise) },
    { icon: <Sunset size={20} />, label: "Sunset", value: formatTime(weather.sys.sunset) },
  ];

  return (
    <div className="glass-card-orange rounded-3xl p-6 animate-fade-in orange-glow">
      <h3 className="text-xl font-semibold mb-6 gradient-text">Weather Details</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {details.map((detail, index) => (
          <div 
            key={detail.label}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <DetailCard {...detail} />
          </div>
        ))}
      </div>
    </div>
  );
};
