'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface InsuranceQuote {
  id: string;
  provider: string;
  planName: string;
  price: number;
  rating: number;
  coverage: {
    tripCancellation: number;
    medicalExpenses: number;
    emergencyEvacuation: number;
    baggageLoss: number;
    tripDelay: number;
  };
  highlights: string[];
  exclusions: string[];
  bestFor: string;
  affiliateUrl: string;
}

const demoQuotes: InsuranceQuote[] = [
  {
    id: '1',
    provider: 'World Nomads',
    planName: 'Explorer Plan',
    price: 89,
    rating: 4.6,
    coverage: {
      tripCancellation: 10000,
      medicalExpenses: 100000,
      emergencyEvacuation: 300000,
      baggageLoss: 2500,
      tripDelay: 1500,
    },
    highlights: ['Adventure activities covered', '24/7 emergency assistance', 'COVID coverage included', 'Can buy while traveling'],
    exclusions: ['Pre-existing conditions', 'Extreme sports (extra fee)'],
    bestFor: 'Adventure travelers',
    affiliateUrl: '#',
  },
  {
    id: '2',
    provider: 'SafetyWing',
    planName: 'Nomad Insurance',
    price: 42,
    rating: 4.4,
    coverage: {
      tripCancellation: 0,
      medicalExpenses: 250000,
      emergencyEvacuation: 100000,
      baggageLoss: 3000,
      tripDelay: 0,
    },
    highlights: ['Subscription model (pay monthly)', 'Covers 180+ countries', 'COVID hospitalization covered', 'Great for long-term travel'],
    exclusions: ['No trip cancellation', 'USA only covered 30 days'],
    bestFor: 'Digital nomads & long-term travelers',
    affiliateUrl: '#',
  },
  {
    id: '3',
    provider: 'Allianz',
    planName: 'OneTrip Premier',
    price: 156,
    rating: 4.5,
    coverage: {
      tripCancellation: 150000,
      medicalExpenses: 500000,
      emergencyEvacuation: 1000000,
      baggageLoss: 2500,
      tripDelay: 2000,
    },
    highlights: ['Highest coverage limits', 'Cancel for any reason option', 'Rental car damage included', 'Pre-existing conditions waiver'],
    exclusions: ['CFAR requires purchase within 14 days of deposit'],
    bestFor: 'Expensive trips & cruises',
    affiliateUrl: '#',
  },
  {
    id: '4',
    provider: 'Travel Insurance Master',
    planName: 'Budget Basic',
    price: 34,
    rating: 4.1,
    coverage: {
      tripCancellation: 5000,
      medicalExpenses: 50000,
      emergencyEvacuation: 150000,
      baggageLoss: 1000,
      tripDelay: 500,
    },
    highlights: ['Budget-friendly', 'Simple claims process', 'Covers basics'],
    exclusions: ['Limited coverage amounts', 'No adventure sports'],
    bestFor: 'Budget travelers & domestic trips',
    affiliateUrl: '#',
  },
];

export default function InsurancePage() {
  const [tripCost, setTripCost] = useState(3000);
  const [destination, setDestination] = useState('Europe');
  const [travelers, setTravelers] = useState(2);
  const [tripLength, setTripLength] = useState(14);
  const [isSearching, setIsSearching] = useState(false);
  const [quotes, setQuotes] = useState<InsuranceQuote[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);

  const handleSearch = async () => {
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setQuotes(demoQuotes);
    setIsSearching(false);
  };

  const toggleCompare = (id: string) => {
    setSelectedQuotes(prev => 
      prev.includes(id) 
        ? prev.filter(q => q !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const formatCurrency = (amount: number) => {
    return amount === 0 ? 'Not covered' : `$${amount.toLocaleString()}`;
  };

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🔒"
            name="TripGuard"
            tagline="Travel Insurance Hub"
            description="Compare travel insurance policies side-by-side. See coverage details, exclusions, and find the right protection for your trip."
          />

          {/* Quote Form */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Trip Cost</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight-400">$</span>
                    <input
                      type="number"
                      value={tripCost}
                      onChange={(e) => setTripCost(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Destination</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    <option>Europe</option>
                    <option>Asia</option>
                    <option>Caribbean</option>
                    <option>South America</option>
                    <option>Africa</option>
                    <option>Australia/Pacific</option>
                    <option>USA/Canada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Travelers</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} traveler{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Trip Length</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={tripLength}
                      onChange={(e) => setTripLength(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-midnight-400 text-sm">days</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {isSearching ? 'Getting Quotes...' : 'Compare Insurance Plans'}
              </button>
            </div>
          </div>

          {/* Results */}
          {quotes.length > 0 && (
            <div className="mb-16 animate-fade-in">
              {/* Controls */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-semibold text-midnight-900">
                  {quotes.length} plans available
                </h2>
                <button
                  onClick={() => setCompareMode(!compareMode)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    compareMode 
                      ? 'bg-coral-500 text-white' 
                      : 'bg-midnight-100 text-midnight-600 hover:bg-midnight-200'
                  }`}
                >
                  {compareMode ? 'Exit Compare' : 'Compare Plans'}
                </button>
              </div>

              {/* Comparison Table (when in compare mode with selections) */}
              {compareMode && selectedQuotes.length >= 2 && (
                <div className="bg-white rounded-2xl border border-midnight-100 overflow-hidden mb-8">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-midnight-50">
                        <tr>
                          <th className="text-left px-6 py-4 font-medium text-midnight-600">Coverage</th>
                          {selectedQuotes.map(id => {
                            const quote = quotes.find(q => q.id === id);
                            return (
                              <th key={id} className="text-left px-6 py-4">
                                <span className="font-semibold text-midnight-900">{quote?.provider}</span>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { key: 'tripCancellation', label: 'Trip Cancellation' },
                          { key: 'medicalExpenses', label: 'Medical Expenses' },
                          { key: 'emergencyEvacuation', label: 'Emergency Evacuation' },
                          { key: 'baggageLoss', label: 'Baggage Loss' },
                          { key: 'tripDelay', label: 'Trip Delay' },
                        ].map(({ key, label }) => (
                          <tr key={key} className="border-t border-midnight-100">
                            <td className="px-6 py-4 text-midnight-600">{label}</td>
                            {selectedQuotes.map(id => {
                              const quote = quotes.find(q => q.id === id);
                              const value = quote?.coverage[key as keyof typeof quote.coverage] || 0;
                              return (
                                <td key={id} className="px-6 py-4 font-medium text-midnight-900">
                                  {formatCurrency(value)}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                        <tr className="border-t border-midnight-100 bg-coral-50">
                          <td className="px-6 py-4 font-semibold text-midnight-900">Price</td>
                          {selectedQuotes.map(id => {
                            const quote = quotes.find(q => q.id === id);
                            return (
                              <td key={id} className="px-6 py-4 font-bold text-coral-600 text-xl">
                                ${quote?.price}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Quote Cards */}
              <div className="grid lg:grid-cols-2 gap-6">
                {quotes.map((quote) => (
                  <div 
                    key={quote.id}
                    className={`bg-white rounded-2xl border-2 p-6 transition-all duration-300 ${
                      selectedQuotes.includes(quote.id)
                        ? 'border-coral-400 shadow-glow-coral'
                        : 'border-midnight-100 hover:border-coral-200 hover:shadow-card-hover'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-display font-semibold text-midnight-900">
                            {quote.provider}
                          </h3>
                          <span className="flex items-center gap-1 text-sm text-midnight-500">
                            ★ {quote.rating}
                          </span>
                        </div>
                        <p className="text-midnight-500">{quote.planName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-midnight-900">${quote.price}</p>
                        <p className="text-sm text-midnight-500">per trip</p>
                      </div>
                    </div>

                    {/* Best For */}
                    <div className="px-3 py-2 bg-teal-50 rounded-lg mb-4">
                      <p className="text-sm text-teal-700">
                        <span className="font-medium">Best for:</span> {quote.bestFor}
                      </p>
                    </div>

                    {/* Coverage Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-midnight-50 rounded-lg">
                        <p className="text-xs text-midnight-500">Medical</p>
                        <p className="font-semibold text-midnight-900">{formatCurrency(quote.coverage.medicalExpenses)}</p>
                      </div>
                      <div className="p-3 bg-midnight-50 rounded-lg">
                        <p className="text-xs text-midnight-500">Trip Cancellation</p>
                        <p className="font-semibold text-midnight-900">{formatCurrency(quote.coverage.tripCancellation)}</p>
                      </div>
                      <div className="p-3 bg-midnight-50 rounded-lg">
                        <p className="text-xs text-midnight-500">Evacuation</p>
                        <p className="font-semibold text-midnight-900">{formatCurrency(quote.coverage.emergencyEvacuation)}</p>
                      </div>
                      <div className="p-3 bg-midnight-50 rounded-lg">
                        <p className="text-xs text-midnight-500">Baggage</p>
                        <p className="font-semibold text-midnight-900">{formatCurrency(quote.coverage.baggageLoss)}</p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-midnight-700 mb-2">Highlights</p>
                      <ul className="space-y-1">
                        {quote.highlights.slice(0, 3).map((highlight) => (
                          <li key={highlight} className="flex items-center gap-2 text-sm text-midnight-600">
                            <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {compareMode && (
                        <button
                          onClick={() => toggleCompare(quote.id)}
                          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                            selectedQuotes.includes(quote.id)
                              ? 'bg-coral-100 text-coral-700'
                              : 'bg-midnight-100 text-midnight-600 hover:bg-midnight-200'
                          }`}
                        >
                          {selectedQuotes.includes(quote.id) ? '✓ Selected' : 'Select'}
                        </button>
                      )}
                      <a 
                        href={quote.affiliateUrl}
                        className="flex-1 py-3 px-4 bg-coral-500 hover:bg-coral-600 text-white text-center font-medium rounded-xl transition-colors"
                      >
                        Get Quote →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <p className="text-center text-xs text-midnight-400 mt-8">
                Insurance quotes are estimates. Final pricing may vary based on traveler ages and pre-existing conditions. 
                We may earn a commission from insurance partners.
              </p>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WhyUseCard 
              points={[
                'Compare coverage limits side-by-side',
                'See what\'s NOT covered (exclusions)',
                'Find plans for adventure activities',
                'Understand pre-existing condition rules',
              ]}
            />
            <HowAICard 
              description="TripGuard analyzes policy documents to extract key coverage details and exclusions for easy comparison."
              capabilities={[
                'Coverage extraction',
                'Exclusion identification',
                'Price/value scoring',
                'Trip-type matching',
              ]}
            />
            <QphiQInsight 
              insight="For trips over $5,000, consider 'Cancel for Any Reason' (CFAR) coverage. It costs more but lets you cancel for ANY reason and get 50-75% back."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
