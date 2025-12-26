'use client';

import { useState, useRef, useEffect } from 'react';

export interface City {
  name: string;
  country: string;
  countryCode: string;
  flag: string;
}

// Major cities database for travel
export const cities: City[] = [
  // North America
  { name: 'New York', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Los Angeles', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Chicago', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'San Francisco', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Las Vegas', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Miami', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Orlando', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Seattle', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Boston', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Washington D.C.', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Denver', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Austin', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Nashville', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'New Orleans', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'San Diego', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Phoenix', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Portland', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Honolulu', country: 'United States', countryCode: 'US', flag: '🇺🇸' },
  { name: 'Toronto', country: 'Canada', countryCode: 'CA', flag: '🇨🇦' },
  { name: 'Vancouver', country: 'Canada', countryCode: 'CA', flag: '🇨🇦' },
  { name: 'Montreal', country: 'Canada', countryCode: 'CA', flag: '🇨🇦' },
  { name: 'Calgary', country: 'Canada', countryCode: 'CA', flag: '🇨🇦' },
  { name: 'Mexico City', country: 'Mexico', countryCode: 'MX', flag: '🇲🇽' },
  { name: 'Cancun', country: 'Mexico', countryCode: 'MX', flag: '🇲🇽' },
  { name: 'Cabo San Lucas', country: 'Mexico', countryCode: 'MX', flag: '🇲🇽' },
  { name: 'Puerto Vallarta', country: 'Mexico', countryCode: 'MX', flag: '🇲🇽' },
  
  // Europe
  { name: 'London', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧' },
  { name: 'Paris', country: 'France', countryCode: 'FR', flag: '🇫🇷' },
  { name: 'Rome', country: 'Italy', countryCode: 'IT', flag: '🇮🇹' },
  { name: 'Barcelona', country: 'Spain', countryCode: 'ES', flag: '🇪🇸' },
  { name: 'Madrid', country: 'Spain', countryCode: 'ES', flag: '🇪🇸' },
  { name: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', flag: '🇳🇱' },
  { name: 'Berlin', country: 'Germany', countryCode: 'DE', flag: '🇩🇪' },
  { name: 'Munich', country: 'Germany', countryCode: 'DE', flag: '🇩🇪' },
  { name: 'Frankfurt', country: 'Germany', countryCode: 'DE', flag: '🇩🇪' },
  { name: 'Vienna', country: 'Austria', countryCode: 'AT', flag: '🇦🇹' },
  { name: 'Prague', country: 'Czech Republic', countryCode: 'CZ', flag: '🇨🇿' },
  { name: 'Budapest', country: 'Hungary', countryCode: 'HU', flag: '🇭🇺' },
  { name: 'Dublin', country: 'Ireland', countryCode: 'IE', flag: '🇮🇪' },
  { name: 'Edinburgh', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧' },
  { name: 'Lisbon', country: 'Portugal', countryCode: 'PT', flag: '🇵🇹' },
  { name: 'Porto', country: 'Portugal', countryCode: 'PT', flag: '🇵🇹' },
  { name: 'Athens', country: 'Greece', countryCode: 'GR', flag: '🇬🇷' },
  { name: 'Santorini', country: 'Greece', countryCode: 'GR', flag: '🇬🇷' },
  { name: 'Milan', country: 'Italy', countryCode: 'IT', flag: '🇮🇹' },
  { name: 'Venice', country: 'Italy', countryCode: 'IT', flag: '🇮🇹' },
  { name: 'Florence', country: 'Italy', countryCode: 'IT', flag: '🇮🇹' },
  { name: 'Zurich', country: 'Switzerland', countryCode: 'CH', flag: '🇨🇭' },
  { name: 'Geneva', country: 'Switzerland', countryCode: 'CH', flag: '🇨🇭' },
  { name: 'Copenhagen', country: 'Denmark', countryCode: 'DK', flag: '🇩🇰' },
  { name: 'Stockholm', country: 'Sweden', countryCode: 'SE', flag: '🇸🇪' },
  { name: 'Oslo', country: 'Norway', countryCode: 'NO', flag: '🇳🇴' },
  { name: 'Helsinki', country: 'Finland', countryCode: 'FI', flag: '🇫🇮' },
  { name: 'Brussels', country: 'Belgium', countryCode: 'BE', flag: '🇧🇪' },
  { name: 'Warsaw', country: 'Poland', countryCode: 'PL', flag: '🇵🇱' },
  { name: 'Krakow', country: 'Poland', countryCode: 'PL', flag: '🇵🇱' },
  { name: 'Istanbul', country: 'Turkey', countryCode: 'TR', flag: '🇹🇷' },
  { name: 'Reykjavik', country: 'Iceland', countryCode: 'IS', flag: '🇮🇸' },
  
  // Asia
  { name: 'Tokyo', country: 'Japan', countryCode: 'JP', flag: '🇯🇵' },
  { name: 'Kyoto', country: 'Japan', countryCode: 'JP', flag: '🇯🇵' },
  { name: 'Osaka', country: 'Japan', countryCode: 'JP', flag: '🇯🇵' },
  { name: 'Seoul', country: 'South Korea', countryCode: 'KR', flag: '🇰🇷' },
  { name: 'Beijing', country: 'China', countryCode: 'CN', flag: '🇨🇳' },
  { name: 'Shanghai', country: 'China', countryCode: 'CN', flag: '🇨🇳' },
  { name: 'Hong Kong', country: 'China', countryCode: 'HK', flag: '🇭🇰' },
  { name: 'Taipei', country: 'Taiwan', countryCode: 'TW', flag: '🇹🇼' },
  { name: 'Singapore', country: 'Singapore', countryCode: 'SG', flag: '🇸🇬' },
  { name: 'Bangkok', country: 'Thailand', countryCode: 'TH', flag: '🇹🇭' },
  { name: 'Phuket', country: 'Thailand', countryCode: 'TH', flag: '🇹🇭' },
  { name: 'Chiang Mai', country: 'Thailand', countryCode: 'TH', flag: '🇹🇭' },
  { name: 'Kuala Lumpur', country: 'Malaysia', countryCode: 'MY', flag: '🇲🇾' },
  { name: 'Bali', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩' },
  { name: 'Jakarta', country: 'Indonesia', countryCode: 'ID', flag: '🇮🇩' },
  { name: 'Manila', country: 'Philippines', countryCode: 'PH', flag: '🇵🇭' },
  { name: 'Ho Chi Minh City', country: 'Vietnam', countryCode: 'VN', flag: '🇻🇳' },
  { name: 'Hanoi', country: 'Vietnam', countryCode: 'VN', flag: '🇻🇳' },
  { name: 'Mumbai', country: 'India', countryCode: 'IN', flag: '🇮🇳' },
  { name: 'New Delhi', country: 'India', countryCode: 'IN', flag: '🇮🇳' },
  { name: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', flag: '🇦🇪' },
  { name: 'Abu Dhabi', country: 'United Arab Emirates', countryCode: 'AE', flag: '🇦🇪' },
  { name: 'Tel Aviv', country: 'Israel', countryCode: 'IL', flag: '🇮🇱' },
  { name: 'Jerusalem', country: 'Israel', countryCode: 'IL', flag: '🇮🇱' },
  { name: 'Doha', country: 'Qatar', countryCode: 'QA', flag: '🇶🇦' },
  
  // Oceania
  { name: 'Sydney', country: 'Australia', countryCode: 'AU', flag: '🇦🇺' },
  { name: 'Melbourne', country: 'Australia', countryCode: 'AU', flag: '🇦🇺' },
  { name: 'Brisbane', country: 'Australia', countryCode: 'AU', flag: '🇦🇺' },
  { name: 'Perth', country: 'Australia', countryCode: 'AU', flag: '🇦🇺' },
  { name: 'Auckland', country: 'New Zealand', countryCode: 'NZ', flag: '🇳🇿' },
  { name: 'Queenstown', country: 'New Zealand', countryCode: 'NZ', flag: '🇳🇿' },
  { name: 'Fiji', country: 'Fiji', countryCode: 'FJ', flag: '🇫🇯' },
  
  // South America
  { name: 'Rio de Janeiro', country: 'Brazil', countryCode: 'BR', flag: '🇧🇷' },
  { name: 'São Paulo', country: 'Brazil', countryCode: 'BR', flag: '🇧🇷' },
  { name: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', flag: '🇦🇷' },
  { name: 'Lima', country: 'Peru', countryCode: 'PE', flag: '🇵🇪' },
  { name: 'Cusco', country: 'Peru', countryCode: 'PE', flag: '🇵🇪' },
  { name: 'Bogota', country: 'Colombia', countryCode: 'CO', flag: '🇨🇴' },
  { name: 'Cartagena', country: 'Colombia', countryCode: 'CO', flag: '🇨🇴' },
  { name: 'Santiago', country: 'Chile', countryCode: 'CL', flag: '🇨🇱' },
  
  // Caribbean
  { name: 'San Juan', country: 'Puerto Rico', countryCode: 'PR', flag: '🇵🇷' },
  { name: 'Nassau', country: 'Bahamas', countryCode: 'BS', flag: '🇧🇸' },
  { name: 'Montego Bay', country: 'Jamaica', countryCode: 'JM', flag: '🇯🇲' },
  { name: 'Punta Cana', country: 'Dominican Republic', countryCode: 'DO', flag: '🇩🇴' },
  { name: 'Aruba', country: 'Aruba', countryCode: 'AW', flag: '🇦🇼' },
  
  // Africa
  { name: 'Cape Town', country: 'South Africa', countryCode: 'ZA', flag: '🇿🇦' },
  { name: 'Johannesburg', country: 'South Africa', countryCode: 'ZA', flag: '🇿🇦' },
  { name: 'Cairo', country: 'Egypt', countryCode: 'EG', flag: '🇪🇬' },
  { name: 'Marrakech', country: 'Morocco', countryCode: 'MA', flag: '🇲🇦' },
  { name: 'Nairobi', country: 'Kenya', countryCode: 'KE', flag: '🇰🇪' },
];

// Search function
export function searchCities(query: string): City[] {
  if (!query || query.length < 1) return [];
  
  const searchTerm = query.toLowerCase().trim();
  
  return cities
    .filter(city => 
      city.name.toLowerCase().includes(searchTerm) ||
      city.country.toLowerCase().includes(searchTerm)
    )
    .slice(0, 8);
}

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string, city?: City) => void;
  placeholder?: string;
  label: string;
}

export default function CityAutocomplete({
  value,
  onChange,
  placeholder = 'Enter city',
  label,
}: CityAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    
    if (newValue.length >= 1) {
      const results = searchCities(newValue);
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    
    onChange(newValue);
  };

  const handleSelect = (city: City) => {
    const displayValue = `${city.name}, ${city.country}`;
    setQuery(displayValue);
    onChange(city.name, city);
    setIsOpen(false);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleFocus = () => {
    if (query.length >= 1) {
      const results = searchCities(query);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-midnight-600 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
          autoComplete="off"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-midnight-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-midnight-200 rounded-xl shadow-elevated overflow-hidden">
          <ul className="max-h-64 overflow-y-auto">
            {suggestions.map((city, index) => (
              <li
                key={`${city.name}-${city.countryCode}`}
                onClick={() => handleSelect(city)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  index === highlightedIndex
                    ? 'bg-coral-50'
                    : 'hover:bg-midnight-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{city.flag}</span>
                  <div>
                    <p className="font-medium text-midnight-900">{city.name}</p>
                    <p className="text-sm text-midnight-500">{city.country}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-2 bg-midnight-50 border-t border-midnight-100">
            <p className="text-xs text-midnight-400">
              Type to search cities worldwide
            </p>
          </div>
        </div>
      )}

      {/* No results */}
      {isOpen && query.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-midnight-200 rounded-xl shadow-elevated p-4">
          <p className="text-sm text-midnight-500 text-center">
            No cities found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
