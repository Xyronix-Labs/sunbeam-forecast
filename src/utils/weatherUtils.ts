import { MoonPhase } from '@/types/weather';

// Calculate moon phase based on date
export const getMoonPhase = (date: Date = new Date()): MoonPhase => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Calculate Julian date
  let c = 0;
  let e = 0;
  let jd = 0;
  
  if (month < 3) {
    c = year - 1;
    e = month + 12;
  } else {
    c = year;
    e = month;
  }
  
  jd = day + Math.floor(153 * e / 5) + 365 * c + Math.floor(c / 4) - Math.floor(c / 100) + Math.floor(c / 400) + 1721119;
  
  // Calculate moon phase (0-29.53)
  const moonCycle = 29.53058867;
  const knownNewMoon = 2451550.1; // Known new moon date
  const daysSinceNewMoon = (jd - knownNewMoon) % moonCycle;
  const phase = daysSinceNewMoon / moonCycle;
  
  // Calculate illumination percentage
  const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);
  
  // Determine phase name and emoji
  let name: string;
  let emoji: string;
  
  if (phase < 0.0625) {
    name = 'New Moon';
    emoji = '🌑';
  } else if (phase < 0.1875) {
    name = 'Waxing Crescent';
    emoji = '🌒';
  } else if (phase < 0.3125) {
    name = 'First Quarter';
    emoji = '🌓';
  } else if (phase < 0.4375) {
    name = 'Waxing Gibbous';
    emoji = '🌔';
  } else if (phase < 0.5625) {
    name = 'Full Moon';
    emoji = '🌕';
  } else if (phase < 0.6875) {
    name = 'Waning Gibbous';
    emoji = '🌖';
  } else if (phase < 0.8125) {
    name = 'Last Quarter';
    emoji = '🌗';
  } else if (phase < 0.9375) {
    name = 'Waning Crescent';
    emoji = '🌘';
  } else {
    name = 'New Moon';
    emoji = '🌑';
  }
  
  return {
    phase,
    name,
    emoji,
    illumination,
  };
};

// Calculate day length
export const getDayLength = (sunrise: number, sunset: number): string => {
  const diff = sunset - sunrise;
  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

// Get UV index description
export const getUVDescription = (uvIndex: number): { level: string; color: string } => {
  if (uvIndex <= 2) return { level: 'Low', color: 'text-green-400' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-400' };
  if (uvIndex <= 7) return { level: 'High', color: 'text-orange-400' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-400' };
  return { level: 'Extreme', color: 'text-purple-400' };
};

// Get wind direction from degrees
export const getWindDirection = (deg: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};

// Get dew point approximation
export const getDewPoint = (temp: number, humidity: number): number => {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
  return Math.round((b * alpha) / (a - alpha));
};
