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

// Aurora-tuned icon colors — vivid but fitting the cosmic dark palette
export const WeatherIcon = ({ iconCode, size = 64, className = '' }: WeatherIconProps) => {
  const isNight = iconCode.includes('n');

  const iconMap: Record<string, React.ReactNode> = {
    // Clear sky
    '01d': <Sun size={size} className={className} style={{ color: '#FFD60A', filter: 'drop-shadow(0 0 12px rgba(255,214,10,0.5))' }} />,
    '01n': <Moon size={size} className={className} style={{ color: '#a8e8ff', filter: 'drop-shadow(0 0 10px rgba(168,232,255,0.4))' }} />,

    // Few clouds
    '02d': <CloudSun size={size} className={className} style={{ color: '#FFD60A', filter: 'drop-shadow(0 0 10px rgba(255,214,10,0.4))' }} />,
    '02n': <CloudMoon size={size} className={className} style={{ color: '#a8e8ff', filter: 'drop-shadow(0 0 8px rgba(168,232,255,0.3))' }} />,

    // Scattered / broken clouds
    '03d': <Cloud size={size} className={className} style={{ color: '#bbc9cf', filter: 'drop-shadow(0 0 6px rgba(187,201,207,0.2))' }} />,
    '03n': <Cloud size={size} className={className} style={{ color: '#8899a8', filter: 'drop-shadow(0 0 6px rgba(136,153,168,0.2))' }} />,
    '04d': <Cloud size={size} className={className} style={{ color: '#9aacbb', filter: 'drop-shadow(0 0 6px rgba(154,172,187,0.2))' }} />,
    '04n': <Cloud size={size} className={className} style={{ color: '#7a8fa0', filter: 'drop-shadow(0 0 6px rgba(122,143,160,0.2))' }} />,

    // Drizzle
    '09d': <CloudDrizzle size={size} className={className} style={{ color: '#00D4FF', filter: 'drop-shadow(0 0 10px rgba(0,212,255,0.4))' }} />,
    '09n': <CloudDrizzle size={size} className={className} style={{ color: '#3cd7ff', filter: 'drop-shadow(0 0 10px rgba(60,215,255,0.3))' }} />,

    // Rain
    '10d': <CloudRain size={size} className={className} style={{ color: '#00D4FF', filter: 'drop-shadow(0 0 12px rgba(0,212,255,0.5))' }} />,
    '10n': <CloudRain size={size} className={className} style={{ color: '#7B5EA7', filter: 'drop-shadow(0 0 10px rgba(123,94,167,0.4))' }} />,

    // Thunderstorm
    '11d': <CloudLightning size={size} className={className} style={{ color: '#FFD60A', filter: 'drop-shadow(0 0 16px rgba(255,214,10,0.6))' }} />,
    '11n': <CloudLightning size={size} className={className} style={{ color: '#FF6B35', filter: 'drop-shadow(0 0 14px rgba(255,107,53,0.5))' }} />,

    // Snow
    '13d': <CloudSnow size={size} className={className} style={{ color: '#dee1f7', filter: 'drop-shadow(0 0 10px rgba(222,225,247,0.4))' }} />,
    '13n': <CloudSnow size={size} className={className} style={{ color: '#a8e8ff', filter: 'drop-shadow(0 0 10px rgba(168,232,255,0.4))' }} />,

    // Mist/Fog
    '50d': <CloudFog size={size} className={className} style={{ color: '#8899a8', filter: 'drop-shadow(0 0 6px rgba(136,153,168,0.3))' }} />,
    '50n': <CloudFog size={size} className={className} style={{ color: '#6a7d8c', filter: 'drop-shadow(0 0 6px rgba(106,125,140,0.3))' }} />,
  };

  return (
    <>
      {iconMap[iconCode] || (isNight
        ? <Moon size={size} className={className} style={{ color: '#a8e8ff', filter: 'drop-shadow(0 0 10px rgba(168,232,255,0.4))' }} />
        : <Sun size={size} className={className} style={{ color: '#FFD60A', filter: 'drop-shadow(0 0 12px rgba(255,214,10,0.5))' }} />
      )}
    </>
  );
};
