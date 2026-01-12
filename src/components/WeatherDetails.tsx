import { WeatherData, TemperatureUnit } from '@/types/weather';
import { Wind, Droplets, Gauge, Eye, Sunrise, Sunset } from 'lucide-react';
import { format } from 'date-fns';

interface WeatherDetailsProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

interface DetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay?: number;
}

const DetailCard = ({ icon, label, value, delay = 0 }: DetailCardProps) => (
  <div 
    className="glass-card rounded-2xl p-5 flex flex-col gap-3 hover:scale-105 transition-transform duration-300"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <span className="text-muted-foreground text-sm">{label}</span>
    </div>
    <span className="text-2xl font-semibold">{value}</span>
  </div>
);

export const WeatherDetails = ({ weather, unit }: WeatherDetailsProps) => {
  const windSpeed = unit === 'celsius' 
    ? `${weather.wind.speed.toFixed(1)} m/s` 
    : `${(weather.wind.speed * 2.237).toFixed(1)} mph`;

  const visibility = weather.visibility >= 1000 
    ? `${(weather.visibility / 1000).toFixed(1)} km` 
    : `${weather.visibility} m`;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'h:mm a');
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-fade-in">
      <DetailCard
        icon={<Wind size={20} />}
        label="Wind Speed"
        value={windSpeed}
        delay={0}
      />
      <DetailCard
        icon={<Droplets size={20} />}
        label="Humidity"
        value={`${weather.main.humidity}%`}
        delay={50}
      />
      <DetailCard
        icon={<Gauge size={20} />}
        label="Pressure"
        value={`${weather.main.pressure} hPa`}
        delay={100}
      />
      <DetailCard
        icon={<Eye size={20} />}
        label="Visibility"
        value={visibility}
        delay={150}
      />
      <DetailCard
        icon={<Sunrise size={20} />}
        label="Sunrise"
        value={formatTime(weather.sys.sunrise)}
        delay={200}
      />
      <DetailCard
        icon={<Sunset size={20} />}
        label="Sunset"
        value={formatTime(weather.sys.sunset)}
        delay={250}
      />
    </div>
  );
};
