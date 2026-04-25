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
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-3">
        {/* Main input container */}
        <div className="relative flex-1">
          {/* Search icon */}
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
            style={{ color: 'rgba(0,212,255,0.5)' }}
          />

          <input
            type="text"
            id="city-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city or location..."
            className="search-input w-full pl-12 pr-4 py-4 rounded-2xl backdrop-blur-xl"
            style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.95rem' }}
            disabled={loading}
          />

          {/* Submit button inside field (right side) */}
          {query.trim() && (
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #00D4FF 0%, #7B5EA7 100%)',
                color: '#0a0f1c',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              Search
            </button>
          )}
        </div>

        {/* Location button */}
        <button
          type="button"
          id="use-location-btn"
          onClick={onGetLocation}
          disabled={loading}
          className="glass-card-hover p-4 rounded-2xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ border: '1px solid rgba(0,212,255,0.15)' }}
          title="Use my location"
        >
          {loading ? (
            <Loader2
              className="w-5 h-5 animate-spin"
              style={{ color: '#00D4FF' }}
            />
          ) : (
            <MapPin
              className="w-5 h-5 transition-colors"
              style={{ color: 'rgba(0,212,255,0.7)' }}
            />
          )}
        </button>
      </div>
    </form>
  );
};
