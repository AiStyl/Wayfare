'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface HotelResult {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  amenities: string[];
  prices: {
    source: string;
    price: number;
    totalWithFees: number;
  }[];
  bestDeal: string;
}

const demoHotels: HotelResult[] = [
  {
    id: '1',
    name: 'The Ritz-Carlton, New York',
    rating: 4.8,
    reviewCount: 2847,
    location: 'Central Park South',
    image: '🏨',
    amenities: ['Spa', 'Pool', 'Restaurant', 'Gym', 'Valet'],
    prices: [
      { source: 'Booking.com', price: 895, totalWithFees: 1042 },
      { source: 'Hotels.com', price: 920, totalWithFees: 1058 },
      { source: 'Expedia', price: 879, totalWithFees: 1025 },
      { source: 'Direct', price: 950, totalWithFees: 1045 },
    ],
    bestDeal: 'Expedia',
  },
  {
    id: '2',
    name: 'Park Hyatt New York',
    rating: 4.7,
    reviewCount: 1923,
    location: 'Midtown West',
    image: '🏨',
    amenities: ['Spa', 'Restaurant', 'Gym', 'Bar', 'Concierge'],
    prices: [
      { source: 'Booking.com', price: 725, totalWithFees: 845 },
      { source: 'Hotels.com', price: 750, totalWithFees: 862 },
      { source: 'Expedia', price: 735, totalWithFees: 851 },
      { source: 'Direct', price: 700, totalWithFees: 812 },
    ],
    bestDeal: 'Direct',
  },
  {
    id: '3',
    name: 'The Standard High Line',
    rating: 4.5,
    reviewCount: 3421,
    location: 'Meatpacking District',
    image: '🏨',
    amenities: ['Rooftop Bar', 'Restaurant', 'Gym', 'Bikes'],
    prices: [
      { source: 'Booking.com', price: 385, totalWithFees: 452 },
      { source: 'Hotels.com', price: 395, totalWithFees: 465 },
      { source: 'Expedia', price: 379, totalWithFees: 445 },
      { source: 'Direct', price: 410, totalWithFees: 472 },
    ],
    bestDeal: 'Expedia',
  },
];

export default function HotelsPage() {
  const [destination, setDestination] = useState('New York');
  const [checkIn, setCheckIn] = useState('2025-02-15');
  const [checkOut, setCheckOut] = useState('2025-02-18');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<HotelResult[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'reviews'>('price');

  const handleSearch = async () => {
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResults(demoHotels);
    setIsSearching(false);
  };

  const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🏨"
            name="StayCompare"
            tagline="Hotel Price Compare"
            description="See the real price after fees. Compare hotels across Booking.com, Expedia, Hotels.com, and direct booking in one view."
          />

          {/* Search Form */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Destination */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="City, hotel, or landmark"
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>

                {/* Check In */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Check In</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>

                {/* Check Out */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Check Out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>

                {/* Guests & Rooms */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Guests & Rooms</label>
                  <div className="flex gap-2">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="flex-1 px-3 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                    >
                      {[1, 2, 3, 4, 5, 6].map(n => (
                        <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    <select
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      className="flex-1 px-3 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                    >
                      {[1, 2, 3, 4].map(n => (
                        <option key={n} value={n}>{n} room{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:shadow-coral-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Comparing Prices...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Compare Hotels
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mb-16 animate-fade-in">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-display font-semibold text-midnight-900">
                    {results.length} hotels in {destination}
                  </h2>
                  <p className="text-midnight-500">
                    {nights} night{nights > 1 ? 's' : ''} · {guests} guest{guests > 1 ? 's' : ''} · {rooms} room{rooms > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-midnight-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'reviews')}
                    className="px-4 py-2 bg-white border border-midnight-200 rounded-lg text-midnight-700 focus:outline-none focus:border-coral-400"
                  >
                    <option value="price">Lowest Price</option>
                    <option value="rating">Highest Rating</option>
                    <option value="reviews">Most Reviews</option>
                  </select>
                </div>
              </div>

              {/* Hotel Cards */}
              <div className="space-y-6">
                {results.map((hotel) => {
                  const lowestPrice = Math.min(...hotel.prices.map(p => p.totalWithFees));
                  const highestPrice = Math.max(...hotel.prices.map(p => p.totalWithFees));
                  const savings = highestPrice - lowestPrice;

                  return (
                    <div 
                      key={hotel.id}
                      className="bg-white rounded-2xl border border-midnight-100 overflow-hidden hover:shadow-card-hover hover:border-coral-200 transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row">
                        {/* Hotel Image & Info */}
                        <div className="lg:w-1/3 p-6 bg-gradient-to-br from-midnight-50 to-midnight-100">
                          <div className="flex items-start gap-4">
                            <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center text-5xl">
                              {hotel.image}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-display font-semibold text-midnight-900 mb-1">
                                {hotel.name}
                              </h3>
                              <p className="text-midnight-500 text-sm mb-2">📍 {hotel.location}</p>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-coral-100 text-coral-700 text-sm font-medium rounded-lg">
                                  ★ {hotel.rating}
                                </span>
                                <span className="text-midnight-400 text-sm">
                                  ({hotel.reviewCount.toLocaleString()} reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {hotel.amenities.map((amenity) => (
                              <span key={amenity} className="px-3 py-1 bg-white text-midnight-600 text-xs rounded-full">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price Comparison */}
                        <div className="lg:w-2/3 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-midnight-700">Price Comparison (with fees)</h4>
                            {savings > 0 && (
                              <span className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full">
                                Save up to ${savings}
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {hotel.prices.map((price) => (
                              <div 
                                key={price.source}
                                className={`p-4 rounded-xl border-2 transition-colors ${
                                  price.totalWithFees === lowestPrice
                                    ? 'border-teal-400 bg-teal-50'
                                    : 'border-midnight-100 bg-white hover:border-midnight-200'
                                }`}
                              >
                                <p className="text-sm text-midnight-500 mb-1">{price.source}</p>
                                <p className="text-xs text-midnight-400 line-through">${price.price}/night</p>
                                <p className="text-xl font-bold text-midnight-900">${price.totalWithFees}</p>
                                <p className="text-xs text-midnight-400">total with fees</p>
                                {price.totalWithFees === lowestPrice && (
                                  <span className="inline-block mt-2 text-xs text-teal-600 font-medium">
                                    ✓ Best Deal
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-xl transition-colors">
                              Book on {hotel.bestDeal} →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WhyUseCard 
              points={[
                'Compare prices across 10+ booking sites',
                'See true cost including all taxes and fees',
                'Read aggregated reviews from multiple sources',
                'Find hidden deals and member discounts',
              ]}
            />
            <HowAICard 
              description="StayCompare aggregates real-time pricing from all major hotel booking platforms and calculates the true total cost."
              capabilities={[
                'Real-time price aggregation',
                'Fee and tax calculation',
                'Review sentiment analysis',
                'Deal quality scoring',
              ]}
            />
            <QphiQInsight 
              insight="Booking directly with hotels often includes perks like free breakfast or room upgrades not available on OTAs. Always check the hotel's website before booking elsewhere."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
