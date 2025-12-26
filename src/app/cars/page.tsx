'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface RentalResult {
  id: string;
  provider: string;
  car: string;
  category: string;
  image: string;
  features: string[];
  basePrice: number;
  taxes: number;
  insuranceIncluded: boolean;
  insurancePrice: number;
  totalPrice: number;
  rating: number;
  pickupLocation: string;
  mileage: string;
  cancellation: string;
}

const demoRentals: RentalResult[] = [
  {
    id: '1',
    provider: 'Enterprise',
    car: 'Toyota Camry or similar',
    category: 'Full-size Sedan',
    image: '🚗',
    features: ['Automatic', 'A/C', '5 seats', '4 bags', 'Bluetooth'],
    basePrice: 245,
    taxes: 78,
    insuranceIncluded: false,
    insurancePrice: 89,
    totalPrice: 412,
    rating: 4.4,
    pickupLocation: 'Airport Terminal',
    mileage: 'Unlimited',
    cancellation: 'Free cancellation',
  },
  {
    id: '2',
    provider: 'Hertz',
    car: 'Ford Escape or similar',
    category: 'Compact SUV',
    image: '🚙',
    features: ['Automatic', 'A/C', '5 seats', '3 bags', 'AWD Available'],
    basePrice: 289,
    taxes: 92,
    insuranceIncluded: true,
    insurancePrice: 0,
    totalPrice: 381,
    rating: 4.2,
    pickupLocation: 'Airport Terminal',
    mileage: 'Unlimited',
    cancellation: 'Free cancellation',
  },
  {
    id: '3',
    provider: 'Budget',
    car: 'Nissan Sentra or similar',
    category: 'Intermediate Sedan',
    image: '🚗',
    features: ['Automatic', 'A/C', '5 seats', '3 bags'],
    basePrice: 198,
    taxes: 63,
    insuranceIncluded: false,
    insurancePrice: 75,
    totalPrice: 336,
    rating: 4.0,
    pickupLocation: 'Off-site (shuttle)',
    mileage: 'Unlimited',
    cancellation: 'Free cancellation',
  },
  {
    id: '4',
    provider: 'Sixt',
    car: 'BMW 3 Series or similar',
    category: 'Premium Sedan',
    image: '🚘',
    features: ['Automatic', 'A/C', '5 seats', '3 bags', 'Leather', 'GPS'],
    basePrice: 425,
    taxes: 136,
    insuranceIncluded: true,
    insurancePrice: 0,
    totalPrice: 561,
    rating: 4.5,
    pickupLocation: 'Airport Terminal',
    mileage: 'Unlimited',
    cancellation: 'Free cancellation',
  },
];

export default function CarsPage() {
  const [pickupLocation, setPickupLocation] = useState('Los Angeles Airport (LAX)');
  const [pickupDate, setPickupDate] = useState('2025-02-15');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState('2025-02-20');
  const [returnTime, setReturnTime] = useState('10:00');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<RentalResult[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');
  const [showInsurance, setShowInsurance] = useState(true);

  const handleSearch = async () => {
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResults(demoRentals);
    setIsSearching(false);
  };

  const days = Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24));

  const sortedResults = [...results].sort((a, b) => {
    const aPrice = showInsurance ? a.totalPrice : a.basePrice + a.taxes;
    const bPrice = showInsurance ? b.totalPrice : b.basePrice + b.taxes;
    if (sortBy === 'price') return aPrice - bPrice;
    return b.rating - a.rating;
  });

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🚗"
            name="RentalScout"
            tagline="Car Rental Finder"
            description="Compare car rental prices with insurance and fees included. See the TRUE total cost with no surprises at the counter."
          />

          {/* Search Form */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Pickup Location</label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Airport, city, or address"
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Pickup Date & Time</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="flex-1 px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                    />
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-28 px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Return Date & Time</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="flex-1 px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                    />
                    <input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                      className="w-28 px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {isSearching ? 'Searching...' : 'Compare Car Rentals'}
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
                    {results.length} rentals found
                  </h2>
                  <p className="text-midnight-500">
                    {days} day{days > 1 ? 's' : ''} • {pickupLocation}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={showInsurance}
                      onChange={(e) => setShowInsurance(e.target.checked)}
                      className="w-4 h-4 rounded border-midnight-300 text-coral-500 focus:ring-coral-400"
                    />
                    <span className="text-sm text-midnight-600">Include insurance</span>
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'price' | 'rating')}
                    className="px-4 py-2 bg-white border border-midnight-200 rounded-lg text-midnight-700 focus:outline-none focus:border-coral-400"
                  >
                    <option value="price">Lowest Price</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </div>
              </div>

              {/* Insurance Info Banner */}
              <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <p className="font-medium text-gold-900">Check your credit card benefits</p>
                  <p className="text-sm text-gold-700">Many travel credit cards include rental car insurance. You might not need to pay extra.</p>
                </div>
              </div>

              {/* Rental Cards */}
              <div className="space-y-4">
                {sortedResults.map((rental) => {
                  const displayPrice = showInsurance ? rental.totalPrice : rental.basePrice + rental.taxes;
                  
                  return (
                    <div 
                      key={rental.id}
                      className="bg-white rounded-2xl border border-midnight-100 p-6 hover:shadow-card-hover hover:border-coral-200 transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        {/* Car Info */}
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-midnight-50 rounded-xl flex items-center justify-center text-5xl">
                            {rental.image}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-coral-500">{rental.provider}</span>
                              <span className="flex items-center gap-1 text-sm text-midnight-500">
                                ★ {rental.rating}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-midnight-900">{rental.car}</h3>
                            <p className="text-sm text-midnight-500">{rental.category}</p>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {rental.features.map((feature) => (
                            <span key={feature} className="px-3 py-1 bg-midnight-50 text-midnight-600 text-xs rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Details */}
                        <div className="text-sm text-midnight-500 space-y-1">
                          <p>📍 {rental.pickupLocation}</p>
                          <p>🛣️ {rental.mileage}</p>
                          <p className="text-teal-600">✓ {rental.cancellation}</p>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="mb-2">
                            <p className="text-3xl font-bold text-midnight-900">${displayPrice}</p>
                            <p className="text-sm text-midnight-500">total for {days} days</p>
                          </div>
                          {showInsurance && !rental.insuranceIncluded && (
                            <p className="text-xs text-midnight-400 mb-2">
                              Includes ${rental.insurancePrice} insurance
                            </p>
                          )}
                          {rental.insuranceIncluded && (
                            <span className="inline-block px-2 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full mb-2">
                              Insurance included
                            </span>
                          )}
                          <button className="w-full px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-xl transition-colors">
                            Select
                          </button>
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
                'See true total cost including all fees',
                'Compare insurance options side by side',
                'Find off-airport locations (often cheaper)',
                'Free cancellation policies highlighted',
              ]}
            />
            <HowAICard 
              description="RentalScout aggregates prices from major rental companies and calculates the true total including taxes, fees, and optional insurance."
              capabilities={[
                'Real-time price aggregation',
                'Hidden fee detection',
                'Insurance cost comparison',
                'Location convenience scoring',
              ]}
            />
            <QphiQInsight 
              insight="Off-airport locations are often 20-40% cheaper than airport counters. If you can take a 10-minute Uber, the savings add up fast."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
