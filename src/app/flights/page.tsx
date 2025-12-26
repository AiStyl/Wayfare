'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';
import AirportAutocomplete from '@/components/AirportAutocomplete';

interface FlightOffer {
  id: string;
  airline: string;
  airlineCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  bookingUrl: string;
}

// Check if Amadeus API credentials are configured
const AMADEUS_CLIENT_ID = process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID;
const AMADEUS_CLIENT_SECRET = process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET;
const API_CONFIGURED = !!(AMADEUS_CLIENT_ID && AMADEUS_CLIENT_SECRET);

export default function FlightsPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromDisplay, setFromDisplay] = useState('');
  const [toDisplay, setToDisplay] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [passengers, setPassengers] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<FlightOffer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');

  // Set default dates to 2 weeks from now
  useState(() => {
    const today = new Date();
    const twoWeeks = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    const threeWeeks = new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000);
    setDepartDate(twoWeeks.toISOString().split('T')[0]);
    setReturnDate(threeWeeks.toISOString().split('T')[0]);
  });

  const handleSearch = async () => {
    if (!from || !to || !departDate) {
      setError('Please fill in all required fields');
      return;
    }

    if (!API_CONFIGURED) {
      setError('API credentials not configured. See setup instructions below.');
      return;
    }

    setIsSearching(true);
    setError(null);
    setResults([]);

    try {
      // Get Amadeus access token
      const tokenResponse = await fetch('https://api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: AMADEUS_CLIENT_ID!,
          client_secret: AMADEUS_CLIENT_SECRET!,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to authenticate with Amadeus API');
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Search for flights
      const searchParams = new URLSearchParams({
        originLocationCode: from,
        destinationLocationCode: to,
        departureDate: departDate,
        adults: passengers.toString(),
        currencyCode: 'USD',
        max: '20',
      });

      if (tripType === 'roundtrip' && returnDate) {
        searchParams.append('returnDate', returnDate);
      }

      const flightResponse = await fetch(
        `https://api.amadeus.com/v2/shopping/flight-offers?${searchParams}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!flightResponse.ok) {
        throw new Error('Failed to fetch flight offers');
      }

      const flightData = await flightResponse.json();
      
      // Transform Amadeus response to our format
      const flights: FlightOffer[] = flightData.data.map((offer: any, index: number) => {
        const segment = offer.itineraries[0].segments[0];
        const lastSegment = offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1];
        
        return {
          id: offer.id || index.toString(),
          airline: flightData.dictionaries?.carriers?.[segment.carrierCode] || segment.carrierCode,
          airlineCode: segment.carrierCode,
          departureTime: new Date(segment.departure.at).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }),
          arrivalTime: new Date(lastSegment.arrival.at).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }),
          duration: offer.itineraries[0].duration.replace('PT', '').toLowerCase(),
          stops: offer.itineraries[0].segments.length - 1,
          price: parseFloat(offer.price.total),
          currency: offer.price.currency,
          bookingUrl: `https://www.google.com/flights?q=flights+from+${from}+to+${to}`,
        };
      });

      setResults(flights);
    } catch (err: any) {
      console.error('Flight search error:', err);
      setError(err.message || 'Failed to search flights. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') {
      const aDur = parseInt(a.duration.replace(/\D/g, ''));
      const bDur = parseInt(b.duration.replace(/\D/g, ''));
      return aDur - bDur;
    }
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
            description="Search real-time flight prices across airlines. Powered by Amadeus API."
          />

          {/* API Status Banner */}
          {!API_CONFIGURED && (
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-gold-50 border-2 border-gold-300 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🔑</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gold-900 text-lg mb-2">API Integration Required</h3>
                    <p className="text-gold-800 mb-4">
                      FlightRadar uses the Amadeus API for real flight data. To enable this feature:
                    </p>
                    <ol className="list-decimal list-inside text-gold-700 space-y-2 mb-4">
                      <li>Sign up at <a href="https://developers.amadeus.com" target="_blank" rel="noopener noreferrer" className="text-coral-600 hover:underline font-medium">developers.amadeus.com</a> (free)</li>
                      <li>Create an app to get your API Key and Secret</li>
                      <li>Add to your <code className="bg-gold-100 px-2 py-0.5 rounded">.env.local</code> file:</li>
                    </ol>
                    <pre className="bg-midnight-900 text-green-400 p-4 rounded-xl text-sm overflow-x-auto">
{`NEXT_PUBLIC_AMADEUS_CLIENT_ID=your_api_key
NEXT_PUBLIC_AMADEUS_CLIENT_SECRET=your_api_secret`}
                    </pre>
                    <p className="text-gold-600 text-sm mt-4">
                      Free tier includes 2,000 API calls/month — enough to test and launch.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* From */}
                <div className="relative">
                  <AirportAutocomplete
                    label="From"
                    value={fromDisplay}
                    onChange={(value, airport) => {
                      if (airport) {
                        setFrom(airport.code);
                        setFromDisplay(`${airport.city} (${airport.code})`);
                      } else {
                        setFrom(value);
                        setFromDisplay(value);
                      }
                    }}
                    placeholder="City or airport"
                  />
                </div>

                {/* To */}
                <div className="relative">
                  <AirportAutocomplete
                    label="To"
                    value={toDisplay}
                    onChange={(value, airport) => {
                      if (airport) {
                        setTo(airport.code);
                        setToDisplay(`${airport.city} (${airport.code})`);
                      } else {
                        setTo(value);
                        setToDisplay(value);
                      }
                    }}
                    placeholder="City or airport"
                  />
                  {/* Swap Button - positioned between fields */}
                  <button 
                    onClick={() => { 
                      const tempCode = from; 
                      const tempDisplay = fromDisplay;
                      setFrom(to); 
                      setFromDisplay(toDisplay);
                      setTo(tempCode); 
                      setToDisplay(tempDisplay);
                    }}
                    className="absolute -left-6 top-9 p-2 bg-white border border-midnight-200 hover:bg-coral-50 hover:border-coral-300 rounded-full transition-colors shadow-sm z-10 hidden md:flex"
                  >
                    <svg className="w-4 h-4 text-midnight-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  disabled={isSearching || !from || !to}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:shadow-coral-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* Error Message */}
          {error && (
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-coral-50 border border-coral-200 rounded-xl p-4 text-coral-700">
                {error}
              </div>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="max-w-5xl mx-auto mb-16 animate-fade-in">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-midnight-900">
                    {results.length} flights found
                  </h2>
                  <p className="text-midnight-500">
                    {fromDisplay || from} → {toDisplay || to} · {new Date(departDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
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

              {/* Live Data Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                <span className="text-sm text-midnight-500">Real-time prices from Amadeus</span>
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
                          <p className="text-sm text-midnight-500">{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</p>
                        </div>
                      </div>

                      {/* Times */}
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-semibold text-midnight-900">{flight.departureTime}</p>
                          <p className="text-sm text-midnight-500">{from}</p>
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
                          <p className="text-sm text-midnight-500">{to}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className="text-3xl font-bold text-midnight-900">${Math.round(flight.price)}</span>
                          <p className="text-sm text-midnight-500">per person</p>
                        </div>
                        <a 
                          href={flight.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-xl transition-colors"
                        >
                          Select
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <WhyUseCard 
              points={[
                'Real-time prices from Amadeus API',
                'Compare across all major airlines',
                'No markup — see actual fares',
                'Sort by price, duration, or time',
              ]}
            />
            <HowAICard 
              description="FlightRadar connects to Amadeus, the same API that powers travel agencies worldwide."
              capabilities={[
                'Real-time flight availability',
                'Accurate pricing from airlines',
                'Global airline coverage',
                '2,000 free searches/month',
              ]}
            />
            <QphiQInsight 
              insight="For domestic US flights, booking 3-4 weeks in advance typically yields the best prices. For international, aim for 2-3 months ahead."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
