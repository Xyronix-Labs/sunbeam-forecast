import { TemperatureUnit } from '@/types/weather';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

export const UnitToggle = ({ unit, onToggle }: UnitToggleProps) => {
  return (
    <div className="flex items-center glass-card rounded-full p-1">
      <button
        onClick={() => onToggle('celsius')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          unit === 'celsius'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        °C, m/s
      </button>
      <button
        onClick={() => onToggle('fahrenheit')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          unit === 'fahrenheit'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        °F, mph
      </button>
    </div>
  );
};
