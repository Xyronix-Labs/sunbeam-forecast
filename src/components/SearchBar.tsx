import { useState, FormEvent } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onGetLocation: () => void;
  loading: boolean;
}

export const SearchBar = ({ onSearch, onGetLocation, loading }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl glass-card-orange text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            disabled={loading}
          />
        </div>
        
        <button
          type="button"
          onClick={onGetLocation}
          disabled={loading}
          className="p-4 rounded-2xl glass-card-orange text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 disabled:opacity-50"
          title="Use my location"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
};
