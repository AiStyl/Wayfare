'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface FlightResult {
  id: string;
  airline: string;
  airlineCode: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  priceChange: 'up' | 'down' | 'stable';
  prediction: string;
  bookingUrl: string;
}

const demoFlights: FlightResult[] = [
  {
    id: '1',
    airline: 'United Airlines',
    airlineCode: 'UA',
    departure: 'SFO',
    arrival: 'JFK',
    departureTime: '6:00 AM',
    arrivalTime: '2:45 PM',
    duration: '5h 45m',
    stops: 0,
    price: 287,
    priceChange: 'down',
    prediction: 'Prices likely to rise 12% in next 3 days',
    bookingUrl: '#',
  },
  {
    id: '2',
    airline: 'Delta',
    airlineCode: 'DL',
    departure: 'SFO',
    arrival: 'JFK',
    departureTime: '8:30 AM',
    arrivalTime: '5:05 PM',
    duration: '5h 35m',
    stops: 0,
    price: 312,
    priceChange: 'stable',
    prediction: 'Good price for this route',
    bookingUrl: '#',
  },
  {
    id: '3',
    airline: 'American Airlines',
    airlineCode: 'AA',
    departure: 'SFO',
    arrival: 'JFK',
    departureTime: '11:15 AM',
    arrivalTime: '10:30 PM',
    duration: '8h 15m',
    stops: 1,
    price: 198,
    priceChange: 'down',
    prediction: 'Best value option with 1 stop',
    bookingUrl: '#',
  },
  {
    id: '4',
    airline: 'JetBlue',
    airlineCode: 'B6',
    departure: 'SFO',
    arrival: 'JFK',
    departureTime: '2:00 PM',
    arrivalTime: '10:35 PM',
    duration: '5h 35m',
    stops: 0,
    price: 329,
    priceChange: 'up',
    prediction: 'Wait — price dropped 8% yesterday',
    bookingUrl: '#',
  },
];

export default function FlightsPage() {
  const [from, setFrom] = useState('SFO');
  const [to, setTo] = useState('JFK');
  const [departDate, setDepartDate] = useState('2025-02-15');
  const [returnDate, setReturnDate] = useState('2025-02-22');
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [passengers, setPassengers] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<FlightResult[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');

  const handleSearch = async () => {
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResults(demoFlights);
    setIsSearching(false);
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
    return a.departureTime.localeCompare(b.departureTime);
  });

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="✈️"
            name="FlightRadar"
            tagline="Fare Intelligence"
            description="Track prices across airlines, get AI-powered fare predictions, and never overpay for flights again."
          />

          {/* Search Form */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              {/* Trip Type Toggle */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setTripType('roundtrip')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    tripType === 'roundtrip' 
                      ? 'bg-coral-500 text-white' 
                      : 'bg-midnight-50 text-midnight-600 hover:bg-midnight-100'
                  }`}
                >
                  Round Trip
                </button>
                <button
                  onClick={() => setTripType('oneway')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    tripType === 'oneway' 
                      ? 'bg-coral-500 text-white' 
                      : 'bg-midnight-50 text-midnight-600 hover:bg-midnight-100'
                  }`}
                >
                  One Way
                </button>
              </div>

              {/* Search Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* From */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-midnight-600 mb-2">From</label>
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value.toUpperCase())}
                    placeholder="City or airport"
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>

                {/* Swap Button */}
                <div className="hidden lg:flex items-end justify-center pb-3">
                  <button 
                    onClick={() => { const temp = from; setFrom(to); setTo(temp); }}
                    className="p-2 bg-midnight-100 hover:bg-coral-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 text-midnight-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>

                {/* To */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-midnight-600 mb-2">To</label>
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value.toUpperCase())}
                    placeholder="City or airport"
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>

                {/* Depart Date */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Depart</label>
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>

                {/* Return Date */}
                {tripType === 'roundtrip' && (
                  <div>
                    <label className="block text-sm font-medium text-midnight-600 mb-2">Return</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Passengers & Search */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-midnight-600">Passengers:</label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="px-4 py-2 bg-midnight-50 border border-midnight-200 rounded-lg text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'passenger' : 'passengers'}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:shadow-coral-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50"
                >
                  {isSearching ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Searching...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search Flights
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mb-16 animate-fade-in">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-midnight-900">
                    {results.length} flights found
                  </h2>
                  <p className="text-midnight-500">
                    {from} → {to} · {new Date(departDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-midnight-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'price' | 'duration' | 'departure')}
                    className="px-4 py-2 bg-white border border-midnight-200 rounded-lg text-midnight-700 focus:outline-none focus:border-coral-400"
                  >
                    <option value="price">Price (Low to High)</option>
                    <option value="duration">Duration (Shortest)</option>
                    <option value="departure">Departure Time</option>
                  </select>
                </div>
              </div>

              {/* Flight Cards */}
              <div className="space-y-4">
                {sortedResults.map((flight) => (
                  <div 
                    key={flight.id}
                    className="bg-white rounded-2xl border border-midnight-100 p-6 hover:shadow-card-hover hover:border-coral-200 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Airline & Flight Info */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-midnight-100 rounded-xl flex items-center justify-center text-lg font-bold text-midnight-600">
                          {flight.airlineCode}
                        </div>
                        <div>
                          <p className="font-medium text-midnight-900">{flight.airline}</p>
                          <p className="text-sm text-midnight-500">{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}</p>
                        </div>
                      </div>

                      {/* Times */}
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-semibold text-midnight-900">{flight.departureTime}</p>
                          <p className="text-sm text-midnight-500">{flight.departure}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <p className="text-xs text-midnight-400 mb-1">{flight.duration}</p>
                          <div className="w-24 h-px bg-midnight-200 relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-coral-500 rounded-full" />
                          </div>
                          {flight.stops > 0 && (
                            <p className="text-xs text-midnight-400 mt-1">{flight.stops} stop</p>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-semibold text-midnight-900">{flight.arrivalTime}</p>
                          <p className="text-sm text-midnight-500">{flight.arrival}</p>
                        </div>
                      </div>

                      {/* Price & Prediction */}
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-midnight-900">${flight.price}</span>
                            {flight.priceChange === 'down' && (
                              <span className="text-teal-500">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                </svg>
                              </span>
                            )}
                            {flight.priceChange === 'up' && (
                              <span className="text-red-500">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-midnight-500 mt-1 max-w-[180px]">{flight.prediction}</p>
                        </div>
                        <a 
                          href={flight.bookingUrl}
                          className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-xl transition-colors"
                        >
                          Select
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Alert CTA */}
              <div className="mt-8 bg-gradient-to-r from-midnight-900 to-midnight-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-coral-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-coral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Set a Price Alert</p>
                    <p className="text-midnight-300 text-sm">Get notified when prices drop for this route</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white text-midnight-900 font-medium rounded-xl hover:bg-midnight-50 transition-colors">
                  Create Alert
                </button>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WhyUseCard 
              points={[
                'Compare prices across all major airlines',
                'AI-powered fare predictions',
                'Historical price data for better timing',
                'Price alerts when fares drop',
              ]}
            />
            <HowAICard 
              description="FlightRadar analyzes millions of fare data points to predict price movements and help you book at the right time."
              capabilities={[
                'Machine learning price prediction',
                'Historical trend analysis',
                'Demand forecasting',
                'Best booking window detection',
              ]}
            />
            <QphiQInsight 
              insight="For domestic US flights, booking 3-4 weeks in advance typically yields the best prices. For international, aim for 2-3 months ahead — but watch for airline sales."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
