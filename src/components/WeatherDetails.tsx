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
  barValue?: number; // 0-100 for progress bar
  delay?: number;
}

const DetailCard = ({ icon, label, value, subValue, barValue, delay = 0 }: DetailCardProps) => (
  <div
    className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col h-full animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Icon + Label row */}
    <div className="flex items-center gap-2.5 mb-4">
      <div className="icon-pill">
        {icon}
      </div>
      <span className="label-caps">{label}</span>
    </div>

    {/* Value */}
    <div className="mt-auto space-y-2">
      <span className="text-2xl font-bold font-display gradient-text block">
        {value}
      </span>
      {subValue && (
        <span className="text-xs block" style={{ color: 'rgba(187,201,207,0.5)' }}>
          {subValue}
        </span>
      )}
      {/* Aurora data bar for percentage values */}
      {barValue !== undefined && (
        <div className="aurora-bar-track mt-2">
          <div
            className="aurora-bar-fill"
            style={{ width: `${Math.min(100, barValue)}%` }}
          />
        </div>
      )}
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

  const formatTime = (timestamp: number) => format(new Date(timestamp * 1000), 'h:mm a');

  const windDir = getWindDirection(weather.wind.deg);
  const dewPoint = getDewPoint(weather.main.temp, weather.main.humidity);
  const dayLength = getDayLength(weather.sys.sunrise, weather.sys.sunset);

  const details: DetailCardProps[] = [
    {
      icon: <Wind size={16} />,
      label: 'Wind Speed',
      value: windSpeed,
      subValue: windGust,
    },
    {
      icon: <Compass size={16} />,
      label: 'Wind Dir',
      value: windDir,
      subValue: `${weather.wind.deg}°`,
    },
    {
      icon: <Droplets size={16} />,
      label: 'Humidity',
      value: `${weather.main.humidity}%`,
      barValue: weather.main.humidity,
    },
    {
      icon: <Thermometer size={16} />,
      label: 'Dew Point',
      value: `${unit === 'celsius' ? dewPoint : Math.round((dewPoint * 9/5) + 32)}°`,
    },
    {
      icon: <Gauge size={16} />,
      label: 'Pressure',
      value: `${weather.main.pressure}`,
      subValue: weather.main.sea_level ? `SL: ${weather.main.sea_level} hPa` : 'hPa',
    },
    {
      icon: <Eye size={16} />,
      label: 'Visibility',
      value: visibility,
      barValue: Math.min(100, (weather.visibility / 10000) * 100),
    },
    {
      icon: <Cloud size={16} />,
      label: 'Cloud Cover',
      value: `${weather.clouds.all}%`,
      barValue: weather.clouds.all,
    },
    {
      icon: <Timer size={16} />,
      label: 'Day Length',
      value: dayLength,
    },
    {
      icon: <Sunrise size={16} />,
      label: 'Sunrise',
      value: formatTime(weather.sys.sunrise),
    },
    {
      icon: <Sunset size={16} />,
      label: 'Sunset',
      value: formatTime(weather.sys.sunset),
    },
  ];

  return (
    <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-xl font-bold font-display gradient-text">
          Weather Details
        </h3>
        <div className="flex-1 section-divider" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {details.map((detail, index) => (
          <DetailCard key={detail.label} {...detail} delay={index * 60} />
        ))}
      </div>
    </div>
  );
};
