'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';
import CityAutocomplete, { City } from '@/components/CityAutocomplete';

interface HotelOffer {
  id: string;
  name: string;
  rating: number;
  address: string;
  distance: string;
  price: number;
  currency: string;
  amenities: string[];
  roomType: string;
  bookingUrl: string;
}

// Amadeus API credentials from environment
const AMADEUS_CLIENT_ID = process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID;
const AMADEUS_CLIENT_SECRET = process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET;
const API_CONFIGURED = !!(AMADEUS_CLIENT_ID && AMADEUS_CLIENT_SECRET);

// City to Amadeus city code mapping
const cityCodeMap: Record<string, string> = {
  'New York': 'NYC',
  'Los Angeles': 'LAX',
  'Chicago': 'CHI',
  'San Francisco': 'SFO',
  'Las Vegas': 'LAS',
  'Miami': 'MIA',
  'Orlando': 'ORL',
  'Seattle': 'SEA',
  'Boston': 'BOS',
  'Washington D.C.': 'WAS',
  'Denver': 'DEN',
  'London': 'LON',
  'Paris': 'PAR',
  'Rome': 'ROM',
  'Barcelona': 'BCN',
  'Madrid': 'MAD',
  'Amsterdam': 'AMS',
  'Berlin': 'BER',
  'Munich': 'MUC',
  'Vienna': 'VIE',
  'Prague': 'PRG',
  'Budapest': 'BUD',
  'Dublin': 'DUB',
  'Lisbon': 'LIS',
  'Athens': 'ATH',
  'Milan': 'MIL',
  'Venice': 'VCE',
  'Florence': 'FLR',
  'Zurich': 'ZRH',
  'Geneva': 'GVA',
  'Copenhagen': 'CPH',
  'Stockholm': 'STO',
  'Tokyo': 'TYO',
  'Seoul': 'SEL',
  'Singapore': 'SIN',
  'Bangkok': 'BKK',
  'Hong Kong': 'HKG',
  'Dubai': 'DXB',
  'Sydney': 'SYD',
  'Melbourne': 'MEL',
  'Auckland': 'AKL',
  'Toronto': 'YTO',
  'Vancouver': 'YVR',
  'Cancun': 'CUN',
  'Mexico City': 'MEX',
};

export default function HotelsPage() {
  const [destination, setDestination] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<HotelOffer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance'>('price');

  // Set default dates
  useState(() => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const weekAfter = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    setCheckIn(nextWeek.toISOString().split('T')[0]);
    setCheckOut(weekAfter.toISOString().split('T')[0]);
  });

  const handleSearch = async () => {
    if (!destination || !checkIn || !checkOut) {
      setError('Please fill in all required fields');
      return;
    }

    if (!API_CONFIGURED) {
      setError('API credentials not configured. See setup instructions below.');
      return;
    }

    const cityCode = cityCodeMap[destination] || destination.substring(0, 3).toUpperCase();

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

      // Search for hotels by city
      const hotelListParams = new URLSearchParams({
        cityCode: cityCode,
        radius: '30',
        radiusUnit: 'KM',
        hotelSource: 'ALL',
      });

      const hotelListResponse = await fetch(
        `https://api.amadeus.com/v1/reference-data/locations/hotels/by-city?${hotelListParams}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!hotelListResponse.ok) {
        const errorData = await hotelListResponse.json();
        throw new Error(errorData.errors?.[0]?.detail || 'Failed to fetch hotels');
      }

      const hotelListData = await hotelListResponse.json();
      
      if (!hotelListData.data || hotelListData.data.length === 0) {
        setError('No hotels found for this destination. Try a different city.');
        setIsSearching(false);
        return;
      }

      // Get first 10 hotel IDs for pricing
      const hotelIds = hotelListData.data.slice(0, 10).map((h: any) => h.hotelId);

      // Get hotel offers (prices)
      const offersParams = new URLSearchParams({
        hotelIds: hotelIds.join(','),
        checkInDate: checkIn,
        checkOutDate: checkOut,
        adults: guests.toString(),
        roomQuantity: rooms.toString(),
        currency: 'USD',
      });

      const offersResponse = await fetch(
        `https://api.amadeus.com/v3/shopping/hotel-offers?${offersParams}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!offersResponse.ok) {
        // If offers fail, show hotels without prices
        const hotels: HotelOffer[] = hotelListData.data.slice(0, 10).map((hotel: any, index: number) => ({
          id: hotel.hotelId || index.toString(),
          name: hotel.name || 'Hotel',
          rating: hotel.rating ? parseInt(hotel.rating) : 4,
          address: hotel.address?.countryCode || destination,
          distance: hotel.distance?.value ? `${hotel.distance.value} ${hotel.distance.unit}` : 'City center',
          price: 0,
          currency: 'USD',
          amenities: [],
          roomType: 'Standard Room',
          bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}`,
        }));
        
        setResults(hotels);
        setError('Prices unavailable for these dates. Showing hotels only.');
        setIsSearching(false);
        return;
      }

      const offersData = await offersResponse.json();

      // Transform to our format
      const hotels: HotelOffer[] = offersData.data.map((hotel: any, index: number) => {
        const offer = hotel.offers?.[0];
        return {
          id: hotel.hotel?.hotelId || index.toString(),
          name: hotel.hotel?.name || 'Hotel',
          rating: hotel.hotel?.rating ? parseInt(hotel.hotel.rating) : 4,
          address: hotel.hotel?.address?.lines?.[0] || destination,
          distance: hotel.hotel?.distance?.value 
            ? `${hotel.hotel.distance.value} ${hotel.hotel.distance.unit} from center`
            : 'City center',
          price: offer?.price?.total ? parseFloat(offer.price.total) : 0,
          currency: offer?.price?.currency || 'USD',
          amenities: hotel.hotel?.amenities?.slice(0, 4) || [],
          roomType: offer?.room?.typeEstimated?.category || 'Standard Room',
          bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&checkin=${checkIn}&checkout=${checkOut}`,
        };
      });

      setResults(hotels.filter((h: HotelOffer) => h.price > 0));
      
      if (hotels.filter((h: HotelOffer) => h.price > 0).length === 0) {
        setError('No available rooms for these dates. Try different dates.');
      }
    } catch (err: any) {
      console.error('Hotel search error:', err);
      setError(err.message || 'Failed to search hotels. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🏨"
            name="StayCompare"
            tagline="Hotel Intelligence"
            description="Search real-time hotel prices across booking platforms. Powered by Amadeus API."
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
                      StayCompare uses the Amadeus API for real hotel data. Add your credentials to enable.
                    </p>
                    <pre className="bg-midnight-900 text-green-400 p-4 rounded-xl text-sm overflow-x-auto">
{`NEXT_PUBLIC_AMADEUS_CLIENT_ID=your_api_key
NEXT_PUBLIC_AMADEUS_CLIENT_SECRET=your_api_secret`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Form */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Destination */}
                <div className="lg:col-span-2">
                  <CityAutocomplete
                    label="Destination"
                    value={destination}
                    onChange={(value, city) => {
                      setDestination(value);
                      if (city) setSelectedCity(city);
                    }}
                    placeholder="Where are you going?"
                  />
                </div>

                {/* Check-in */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>

                {/* Check-out */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>
              </div>

              {/* Guests & Rooms */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-midnight-600">Guests:</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="px-4 py-2 bg-midnight-50 border border-midnight-200 rounded-lg text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-midnight-600">Rooms:</label>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    className="px-4 py-2 bg-midnight-50 border border-midnight-200 rounded-lg text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    {[1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'room' : 'rooms'}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSearch}
                  disabled={isSearching || !destination}
                  className="ml-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                      Search Hotels
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
                    {results.length} hotels found
                  </h2>
                  <p className="text-midnight-500">
                    {destination} · {nights} {nights === 1 ? 'night' : 'nights'} · {guests} {guests === 1 ? 'guest' : 'guests'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-midnight-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'distance')}
                    className="px-4 py-2 bg-white border border-midnight-200 rounded-lg text-midnight-700 focus:outline-none focus:border-coral-400"
                  >
                    <option value="price">Price (Low to High)</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="distance">Distance (Closest)</option>
                  </select>
                </div>
              </div>

              {/* Live Data Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                <span className="text-sm text-midnight-500">Real-time prices from Amadeus</span>
              </div>

              {/* Hotel Cards */}
              <div className="space-y-4">
                {sortedResults.map((hotel) => (
                  <div 
                    key={hotel.id}
                    className="bg-white rounded-2xl border border-midnight-100 p-6 hover:shadow-card-hover hover:border-coral-200 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Hotel Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-midnight-100 rounded-xl flex items-center justify-center text-2xl">
                            🏨
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-midnight-900 text-lg">{hotel.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(hotel.rating)].map((_, i) => (
                                  <span key={i} className="text-gold-400">★</span>
                                ))}
                              </div>
                              <span className="text-sm text-midnight-500">{hotel.distance}</span>
                            </div>
                            <p className="text-sm text-midnight-500 mt-1">{hotel.address}</p>
                            {hotel.amenities.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {hotel.amenities.map((amenity, i) => (
                                  <span 
                                    key={i}
                                    className="px-2 py-1 bg-midnight-50 text-midnight-600 text-xs rounded-lg"
                                  >
                                    {amenity.replace(/_/g, ' ').toLowerCase()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Price & Book */}
                      <div className="flex items-center gap-6 lg:text-right">
                        <div>
                          <p className="text-sm text-midnight-500">{nights} {nights === 1 ? 'night' : 'nights'}</p>
                          <p className="text-3xl font-bold text-midnight-900">
                            ${Math.round(hotel.price)}
                          </p>
                          <p className="text-xs text-midnight-400">total</p>
                        </div>
                        <a
                          href={hotel.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-xl transition-colors whitespace-nowrap"
                        >
                          View Deal
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
                'Compare across hotel inventory',
                'No markup — see actual rates',
                'Sort by price, rating, or distance',
              ]}
            />
            <HowAICard 
              description="StayCompare connects to Amadeus, the same API that powers major travel agencies worldwide."
              capabilities={[
                'Real-time hotel availability',
                'Accurate pricing from hotels',
                'Global hotel coverage',
                'Live inventory data',
              ]}
            />
            <QphiQInsight 
              insight="Book hotels directly when possible — loyalty points add up. Use aggregators to find the best price, then book on the hotel's site for perks."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
