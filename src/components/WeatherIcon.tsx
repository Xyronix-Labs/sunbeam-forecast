import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle,
  CloudFog,
  Moon,
  CloudSun,
  CloudMoon
} from 'lucide-react';

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  className?: string;
}

export const WeatherIcon = ({ iconCode, size = 64, className = '' }: WeatherIconProps) => {
  const isNight = iconCode.includes('n');
  
  const iconMap: Record<string, React.ReactNode> = {
    '01d': <Sun size={size} className={`text-yellow-400 ${className}`} />,
    '01n': <Moon size={size} className={`text-blue-200 ${className}`} />,
    '02d': <CloudSun size={size} className={`text-yellow-300 ${className}`} />,
    '02n': <CloudMoon size={size} className={`text-blue-200 ${className}`} />,
    '03d': <Cloud size={size} className={`text-gray-300 ${className}`} />,
    '03n': <Cloud size={size} className={`text-gray-400 ${className}`} />,
    '04d': <Cloud size={size} className={`text-gray-400 ${className}`} />,
    '04n': <Cloud size={size} className={`text-gray-500 ${className}`} />,
    '09d': <CloudDrizzle size={size} className={`text-blue-300 ${className}`} />,
    '09n': <CloudDrizzle size={size} className={`text-blue-400 ${className}`} />,
    '10d': <CloudRain size={size} className={`text-blue-400 ${className}`} />,
    '10n': <CloudRain size={size} className={`text-blue-500 ${className}`} />,
    '11d': <CloudLightning size={size} className={`text-yellow-500 ${className}`} />,
    '11n': <CloudLightning size={size} className={`text-yellow-600 ${className}`} />,
    '13d': <CloudSnow size={size} className={`text-blue-100 ${className}`} />,
    '13n': <CloudSnow size={size} className={`text-blue-200 ${className}`} />,
    '50d': <CloudFog size={size} className={`text-gray-300 ${className}`} />,
    '50n': <CloudFog size={size} className={`text-gray-400 ${className}`} />,
  };

  return iconMap[iconCode] || (isNight ? 
    <Moon size={size} className={`text-blue-200 ${className}`} /> : 
    <Sun size={size} className={`text-yellow-400 ${className}`} />
  );
};
