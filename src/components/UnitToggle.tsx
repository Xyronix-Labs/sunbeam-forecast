import { TemperatureUnit } from '@/types/weather';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onToggle: (unit: TemperatureUnit) => void;
}

export const UnitToggle = ({ unit, onToggle }: UnitToggleProps) => {
  return (
    <div className="unit-toggle flex items-center">
      <button
        id="celsius-toggle"
        onClick={() => onToggle('celsius')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          unit === 'celsius' ? 'unit-toggle-active' : 'unit-toggle-inactive'
        }`}
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        °C
      </button>
      <button
        id="fahrenheit-toggle"
        onClick={() => onToggle('fahrenheit')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          unit === 'fahrenheit' ? 'unit-toggle-active' : 'unit-toggle-inactive'
        }`}
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        °F
      </button>
    </div>
  );
};
