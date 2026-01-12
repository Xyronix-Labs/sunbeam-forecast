import { getMoonPhase } from '@/utils/weatherUtils';
import { WeatherData } from '@/types/weather';
import { format, addDays } from 'date-fns';

interface AstronomicalInfoProps {
  weather: WeatherData;
}

export const AstronomicalInfo = ({ weather }: AstronomicalInfoProps) => {
  const moonPhase = getMoonPhase();
  
  // Calculate next 7 days moon phases
  const upcomingMoonPhases = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      date,
      phase: getMoonPhase(date),
    };
  });

  return (
    <div className="glass-card-orange rounded-3xl p-6 animate-fade-in orange-glow">
      <h3 className="text-xl font-semibold mb-6 gradient-text">Astronomical Data</h3>
      
      {/* Current Moon Phase */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="text-7xl animate-pulse-slow">{moonPhase.emoji}</div>
        <div className="text-center md:text-left">
          <h4 className="text-2xl font-semibold text-foreground">{moonPhase.name}</h4>
          <p className="text-muted-foreground">Illumination: <span className="text-primary">{moonPhase.illumination}%</span></p>
          <p className="text-sm text-muted-foreground mt-1">
            Coordinates: {weather.coord.lat.toFixed(2)}°N, {weather.coord.lon.toFixed(2)}°E
          </p>
        </div>
      </div>
      
      {/* Moon Phase Calendar */}
      <div className="border-t border-border/30 pt-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-4">7-Day Moon Calendar</h4>
        <div className="grid grid-cols-7 gap-2">
          {upcomingMoonPhases.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                index === 0 ? 'bg-primary/20 border border-primary/30' : 'hover:bg-muted/30'
              }`}
            >
              <span className="text-xs text-muted-foreground mb-1">
                {format(item.date, 'EEE')}
              </span>
              <span className="text-2xl mb-1">{item.phase.emoji}</span>
              <span className="text-xs text-muted-foreground">
                {item.phase.illumination}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
