'use client';

import { useState, useRef, useEffect } from 'react';
import { Airport, searchAirports } from '@/data/airports';

interface AirportAutocompleteProps {
  value: string;
  onChange: (value: string, airport?: Airport) => void;
  placeholder?: string;
  label: string;
}

export default function AirportAutocomplete({
  value,
  onChange,
  placeholder = 'City or airport',
  label,
}: AirportAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update query when value prop changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Handle click outside to close dropdown
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
      const results = searchAirports(newValue);
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    
    // Pass uppercase code if it's exactly 3 letters
    if (newValue.length === 3 && /^[A-Za-z]+$/.test(newValue)) {
      onChange(newValue.toUpperCase());
    } else {
      onChange(newValue);
    }
  };

  const handleSelect = (airport: Airport) => {
    const displayValue = `${airport.city} (${airport.code})`;
    setQuery(displayValue);
    onChange(airport.code, airport);
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
      const results = searchAirports(query);
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
        {/* Search icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-midnight-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-midnight-200 rounded-xl shadow-elevated overflow-hidden">
          <ul className="max-h-64 overflow-y-auto">
            {suggestions.map((airport, index) => (
              <li
                key={airport.code}
                onClick={() => handleSelect(airport)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  index === highlightedIndex
                    ? 'bg-coral-50'
                    : 'hover:bg-midnight-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-8 bg-coral-100 text-coral-700 rounded-lg flex items-center justify-center text-sm font-bold">
                      {airport.code}
                    </span>
                    <div>
                      <p className="font-medium text-midnight-900">
                        {airport.city}
                      </p>
                      <p className="text-sm text-midnight-500 truncate max-w-[200px]">
                        {airport.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-midnight-400 flex-shrink-0 ml-2">
                    {airport.country}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-2 bg-midnight-50 border-t border-midnight-100">
            <p className="text-xs text-midnight-400">
              Type city name, airport name, or code
            </p>
          </div>
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-midnight-200 rounded-xl shadow-elevated p-4">
          <p className="text-sm text-midnight-500 text-center">
            No airports found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
