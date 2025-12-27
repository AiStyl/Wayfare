'use client';

import { useState, useMemo } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface InsurancePlan {
  id: string;
  provider: string;
  planName: string;
  logo: string;
  type: 'single-trip' | 'annual' | 'nomad';
  priceFrom: number;
  pricePer: string;
  medicalCoverage: string;
  tripCancellation: string;
  baggageCoverage: string;
  emergencyEvac: string;
  adventureSports: boolean;
  covidCoverage: boolean;
  preExisting: boolean;
  deductible: string;
  bestFor: string;
  rating: number;
  highlights: string[];
  affiliateUrl: string;
}

// Real insurance plans - December 2024 data
const insurancePlans: InsurancePlan[] = [
  {
    id: 'safetywing-nomad',
    provider: 'SafetyWing',
    planName: 'Nomad Insurance',
    logo: '🛡️',
    type: 'nomad',
    priceFrom: 45,
    pricePer: '4 weeks',
    medicalCoverage: '$250,000',
    tripCancellation: 'Not included',
    baggageCoverage: '$3,000',
    emergencyEvac: '$100,000',
    adventureSports: true,
    covidCoverage: true,
    preExisting: false,
    deductible: '$250',
    bestFor: 'Digital nomads & long-term travelers',
    rating: 4.6,
    highlights: [
      'No end date required',
      'Covers 180+ countries',
      'Home country visits (15 days/90)',
      'Automatic renewal',
      'Pay as you go',
    ],
    affiliateUrl: 'https://safetywing.com/nomad-insurance/',
  },
  {
    id: 'safetywing-remote',
    provider: 'SafetyWing',
    planName: 'Remote Health',
    logo: '🛡️',
    type: 'annual',
    priceFrom: 168,
    pricePer: 'month',
    medicalCoverage: '$1,000,000+',
    tripCancellation: 'Not included',
    baggageCoverage: 'Not included',
    emergencyEvac: 'Included',
    adventureSports: true,
    covidCoverage: true,
    preExisting: true,
    deductible: '$0 - $5,000 options',
    bestFor: 'Remote workers needing full health coverage',
    rating: 4.5,
    highlights: [
      'Comprehensive health insurance',
      'Covers pre-existing conditions',
      'Mental health included',
      'Maternity coverage option',
      'Global coverage',
    ],
    affiliateUrl: 'https://safetywing.com/remote-health/',
  },
  {
    id: 'worldnomads-standard',
    provider: 'World Nomads',
    planName: 'Standard Plan',
    logo: '🌍',
    type: 'single-trip',
    priceFrom: 50,
    pricePer: 'trip',
    medicalCoverage: '$100,000',
    tripCancellation: '$2,500',
    baggageCoverage: '$1,000',
    emergencyEvac: '$300,000',
    adventureSports: true,
    covidCoverage: true,
    preExisting: false,
    deductible: '$100',
    bestFor: 'Adventure travelers & backpackers',
    rating: 4.4,
    highlights: [
      '200+ adventure activities covered',
      'Buy while already traveling',
      'Extend while abroad',
      '24/7 emergency assistance',
      'Gear coverage for adventure sports',
    ],
    affiliateUrl: 'https://www.worldnomads.com/',
  },
  {
    id: 'worldnomads-explorer',
    provider: 'World Nomads',
    planName: 'Explorer Plan',
    logo: '🌍',
    type: 'single-trip',
    priceFrom: 80,
    pricePer: 'trip',
    medicalCoverage: '$500,000',
    tripCancellation: '$10,000',
    baggageCoverage: '$3,000',
    emergencyEvac: '$500,000',
    adventureSports: true,
    covidCoverage: true,
    preExisting: false,
    deductible: '$100',
    bestFor: 'High-value trips & extreme activities',
    rating: 4.5,
    highlights: [
      'Higher coverage limits',
      'Trip cancellation included',
      'Electronics coverage',
      'More adventure activities',
      'Cancel for any reason option',
    ],
    affiliateUrl: 'https://www.worldnomads.com/',
  },
  {
    id: 'allianz-onetrip',
    provider: 'Allianz',
    planName: 'OneTrip Prime',
    logo: '🏛️',
    type: 'single-trip',
    priceFrom: 35,
    pricePer: 'trip',
    medicalCoverage: '$50,000',
    tripCancellation: '100% of trip cost',
    baggageCoverage: '$1,000',
    emergencyEvac: '$500,000',
    adventureSports: false,
    covidCoverage: true,
    preExisting: true,
    deductible: '$250',
    bestFor: 'Traditional vacations & cruises',
    rating: 4.3,
    highlights: [
      'Trip cancellation protection',
      'Pre-existing condition waiver',
      'Cruise coverage',
      'Established provider (A+ rated)',
      '24-hour hotline assistance',
    ],
    affiliateUrl: 'https://www.allianztravelinsurance.com/',
  },
  {
    id: 'allianz-annual',
    provider: 'Allianz',
    planName: 'AllTrips Prime',
    logo: '🏛️',
    type: 'annual',
    priceFrom: 195,
    pricePer: 'year',
    medicalCoverage: '$50,000',
    tripCancellation: '$5,000 per trip',
    baggageCoverage: '$1,000',
    emergencyEvac: '$500,000',
    adventureSports: false,
    covidCoverage: true,
    preExisting: true,
    deductible: '$250',
    bestFor: 'Frequent business travelers',
    rating: 4.2,
    highlights: [
      'Unlimited trips per year',
      'Up to 45 days per trip',
      'Pre-existing conditions covered',
      'Rental car damage coverage',
      'Family plan available',
    ],
    affiliateUrl: 'https://www.allianztravelinsurance.com/',
  },
  {
    id: 'battleface-basic',
    provider: 'Battleface',
    planName: 'Travel Insurance',
    logo: '⚔️',
    type: 'single-trip',
    priceFrom: 25,
    pricePer: 'trip',
    medicalCoverage: '$100,000',
    tripCancellation: 'Optional',
    baggageCoverage: '$500',
    emergencyEvac: '$250,000',
    adventureSports: true,
    covidCoverage: true,
    preExisting: false,
    deductible: '$0 - $500 options',
    bestFor: 'Budget travelers & high-risk destinations',
    rating: 4.1,
    highlights: [
      'Covers high-risk countries',
      'War & terrorism coverage',
      'Customizable plans',
      'Digital claims process',
      'Adventure sports included',
    ],
    affiliateUrl: 'https://www.battleface.com/',
  },
  {
    id: 'insured-nomads',
    provider: 'Insured Nomads',
    planName: 'Travel Medical',
    logo: '🏥',
    type: 'nomad',
    priceFrom: 65,
    pricePer: 'month',
    medicalCoverage: '$1,000,000',
    tripCancellation: 'Not included',
    baggageCoverage: 'Not included',
    emergencyEvac: '$500,000',
    adventureSports: true,
    covidCoverage: true,
    preExisting: false,
    deductible: '$100 - $2,500 options',
    bestFor: 'Long-term travelers needing medical focus',
    rating: 4.3,
    highlights: [
      'Telehealth included',
      'Mental health coverage',
      'Prescription coverage',
      'Direct hospital payment',
      'Global coverage',
    ],
    affiliateUrl: 'https://www.insurednomads.com/',
  },
];

type TripType = 'all' | 'single-trip' | 'annual' | 'nomad';
type SortOption = 'recommended' | 'price-low' | 'price-high' | 'coverage';

export default function InsurancePage() {
  const [tripType, setTripType] = useState<TripType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [needsAdventure, setNeedsAdventure] = useState(false);
  const [needsPreExisting, setNeedsPreExisting] = useState(false);

  const filteredPlans = useMemo(() => {
    let plans = [...insurancePlans];

    // Filter by type
    if (tripType !== 'all') {
      plans = plans.filter(p => p.type === tripType);
    }

    // Filter by features
    if (needsAdventure) {
      plans = plans.filter(p => p.adventureSports);
    }
    if (needsPreExisting) {
      plans = plans.filter(p => p.preExisting);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        plans.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case 'price-high':
        plans.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case 'coverage':
        plans.sort((a, b) => {
          const aCov = parseInt(a.medicalCoverage.replace(/\D/g, '')) || 0;
          const bCov = parseInt(b.medicalCoverage.replace(/\D/g, '')) || 0;
          return bCov - aCov;
        });
        break;
      default:
        plans.sort((a, b) => b.rating - a.rating);
    }

    return plans;
  }, [tripType, sortBy, needsAdventure, needsPreExisting]);

  const tripTypes: { id: TripType; label: string; icon: string }[] = [
    { id: 'all', label: 'All Plans', icon: '📋' },
    { id: 'single-trip', label: 'Single Trip', icon: '✈️' },
    { id: 'annual', label: 'Annual/Multi-Trip', icon: '🔄' },
    { id: 'nomad', label: 'Digital Nomad', icon: '💻' },
  ];

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🔒"
            name="TripGuard"
            tagline="Travel Insurance Comparison"
            description="Compare travel insurance plans from trusted providers. Find the right coverage for your trip."
          />

          {/* Live Data Badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span className="text-sm text-midnight-500">
              Plan data updated December 2024 — Prices may vary based on trip details
            </span>
          </div>

          {/* Trip Type Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {tripTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setTripType(type.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  tripType === type.id
                    ? 'bg-coral-500 text-white shadow-lg shadow-coral-400/25'
                    : 'bg-white text-midnight-600 border border-midnight-200 hover:border-coral-300 hover:bg-coral-50'
                }`}
              >
                <span>{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsAdventure}
                  onChange={(e) => setNeedsAdventure(e.target.checked)}
                  className="w-4 h-4 rounded border-midnight-300 text-coral-500 focus:ring-coral-400"
                />
                <span className="text-sm text-midnight-600">Adventure Sports</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsPreExisting}
                  onChange={(e) => setNeedsPreExisting(e.target.checked)}
                  className="w-4 h-4 rounded border-midnight-300 text-coral-500 focus:ring-coral-400"
                />
                <span className="text-sm text-midnight-600">Pre-existing Conditions</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-midnight-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-white border border-midnight-200 rounded-lg text-midnight-700 focus:outline-none focus:border-coral-400"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="coverage">Highest Coverage</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="max-w-5xl mx-auto space-y-6 mb-16">
            {filteredPlans.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-midnight-100">
                <p className="text-midnight-500">No plans match your filters. Try adjusting your criteria.</p>
              </div>
            ) : (
              filteredPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className="bg-white rounded-2xl border border-midnight-100 hover:shadow-card-hover transition-all"
                >
                  {/* Plan Header */}
                  <div className="p-6 border-b border-midnight-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-midnight-100 rounded-xl flex items-center justify-center text-3xl">
                          {plan.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold text-midnight-900 text-lg">{plan.planName}</h3>
                          <p className="text-sm text-midnight-500">{plan.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-midnight-500">From</p>
                          <p className="text-2xl font-bold text-midnight-900">${plan.priceFrom}</p>
                          <p className="text-xs text-midnight-400">/{plan.pricePer}</p>
                        </div>
                      </div>
                    </div>

                    {/* Best For Badge */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-sm font-medium rounded-full">
                        ⭐ {plan.bestFor}
                      </span>
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        plan.type === 'single-trip' ? 'bg-blue-50 text-blue-700' :
                        plan.type === 'annual' ? 'bg-purple-50 text-purple-700' :
                        'bg-coral-50 text-coral-700'
                      }`}>
                        {plan.type === 'single-trip' ? '✈️ Single Trip' :
                         plan.type === 'annual' ? '🔄 Annual' : '💻 Nomad'}
                      </span>
                    </div>
                  </div>

                  {/* Plan Body */}
                  <div className="p-6">
                    {/* Coverage Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-midnight-500 mb-1">Medical</p>
                        <p className="font-semibold text-midnight-900">{plan.medicalCoverage}</p>
                      </div>
                      <div>
                        <p className="text-xs text-midnight-500 mb-1">Trip Cancel</p>
                        <p className="font-semibold text-midnight-900">{plan.tripCancellation}</p>
                      </div>
                      <div>
                        <p className="text-xs text-midnight-500 mb-1">Baggage</p>
                        <p className="font-semibold text-midnight-900">{plan.baggageCoverage}</p>
                      </div>
                      <div>
                        <p className="text-xs text-midnight-500 mb-1">Emergency Evac</p>
                        <p className="font-semibold text-midnight-900">{plan.emergencyEvac}</p>
                      </div>
                    </div>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {plan.adventureSports && (
                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-lg">🏔️ Adventure Sports</span>
                      )}
                      {plan.covidCoverage && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">🦠 COVID Covered</span>
                      )}
                      {plan.preExisting && (
                        <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-lg">💊 Pre-existing OK</span>
                      )}
                      <span className="px-2 py-1 bg-midnight-50 text-midnight-600 text-xs rounded-lg">
                        Deductible: {plan.deductible}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="mb-6">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {plan.highlights.slice(0, 4).map((highlight, i) => (
                          <li key={i} className="text-sm text-midnight-600 flex items-start gap-2">
                            <span className="text-teal-500 mt-0.5">✓</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(plan.rating) ? 'text-gold-400' : 'text-midnight-200'}>
                            ★
                          </span>
                        ))}
                        <span className="text-sm text-midnight-500 ml-1">{plan.rating}</span>
                      </div>
                      <a
                        href={plan.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.02] transition-all"
                      >
                        Get Quote
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Why Insurance Section */}
          <div className="max-w-4xl mx-auto mb-12 bg-gradient-to-br from-coral-50 to-gold-50 rounded-2xl p-8 border border-coral-100">
            <h3 className="text-xl font-display font-semibold text-midnight-900 mb-6 text-center">
              Why Travel Insurance Matters
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🏥</div>
                <h4 className="font-semibold text-midnight-900 mb-2">Medical Emergencies</h4>
                <p className="text-sm text-midnight-600">A hospital stay abroad can cost $50,000+. Insurance covers it.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">✈️</div>
                <h4 className="font-semibold text-midnight-900 mb-2">Trip Cancellation</h4>
                <p className="text-sm text-midnight-600">Illness, weather, or emergencies? Get your money back.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🧳</div>
                <h4 className="font-semibold text-midnight-900 mb-2">Lost Baggage</h4>
                <p className="text-sm text-midnight-600">Airline lost your bags? Get reimbursed for essentials.</p>
              </div>
            </div>
          </div>

          {/* Affiliate Disclosure */}
          <div className="max-w-3xl mx-auto mb-12 p-4 bg-midnight-50 rounded-xl">
            <p className="text-sm text-midnight-500 text-center">
              <strong>Disclosure:</strong> WAYFARE may receive compensation when you purchase insurance through our links. 
              This helps support our free tools. We only recommend providers we trust.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <WhyUseCard 
              points={[
                'Real plan data from providers',
                'Compare coverage side-by-side',
                'Filter by your travel style',
                'Direct links to get quotes',
              ]}
            />
            <HowAICard 
              description="TripGuard compares real insurance plans from trusted providers, showing actual coverage limits and pricing."
              capabilities={[
                'Current pricing',
                'Coverage comparison',
                'Feature filtering',
                'Multiple providers',
              ]}
            />
            <QphiQInsight 
              insight="For nomads: SafetyWing is hard to beat at $45/month. For single trips with expensive bookings: get trip cancellation coverage from Allianz or World Nomads."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
