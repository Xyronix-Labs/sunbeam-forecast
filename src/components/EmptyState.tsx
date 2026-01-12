import { Cloud, MapPin } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="glass-card rounded-3xl p-12 text-center animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Cloud className="w-24 h-24 text-muted-foreground animate-float" />
          <MapPin className="w-8 h-8 text-primary absolute -bottom-1 -right-1" />
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-3 gradient-text">
        Welcome to WeatherScope
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Search for a city to get the current weather conditions and forecast, 
        or use your location for instant weather updates.
      </p>
    </div>
  );
};
