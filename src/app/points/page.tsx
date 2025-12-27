'use client';

import { useState, useMemo } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  network: 'Visa' | 'Mastercard' | 'Amex';
  annualFee: number;
  welcomeBonus: string;
  welcomeBonusValue: number;
  rewardsRate: string;
  topCategories: string[];
  travelBenefits: string[];
  creditScoreNeeded: 'Excellent' | 'Good' | 'Fair';
  foreignTransactionFee: boolean;
  loungeAccess: boolean;
  tsa: boolean;
  rating: number;
  bestFor: string;
  affiliateUrl: string; // Placeholder - replace with real affiliate links
  applyUrl: string;
}

// REAL credit card data - December 2024
const creditCards: CreditCard[] = [
  {
    id: 'chase-sapphire-preferred',
    name: 'Chase Sapphire Preferred®',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 95,
    welcomeBonus: '60,000 points after $4,000 spend in 3 months',
    welcomeBonusValue: 750,
    rewardsRate: '3X on dining & travel, 1X everything else',
    topCategories: ['Dining', 'Travel', 'Streaming'],
    travelBenefits: [
      '25% more value on travel through Chase',
      'Trip cancellation insurance',
      'Primary rental car insurance',
      'No foreign transaction fees',
    ],
    creditScoreNeeded: 'Good',
    foreignTransactionFee: false,
    loungeAccess: false,
    tsa: false,
    rating: 4.8,
    bestFor: 'Best starter travel card',
    affiliateUrl: '#affiliate-chase-sapphire-preferred',
    applyUrl: 'https://creditcards.chase.com/rewards-credit-cards/sapphire/preferred',
  },
  {
    id: 'chase-sapphire-reserve',
    name: 'Chase Sapphire Reserve®',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 550,
    welcomeBonus: '60,000 points after $4,000 spend in 3 months',
    welcomeBonusValue: 900,
    rewardsRate: '10X on hotels & car rentals via Chase, 5X flights, 3X dining',
    topCategories: ['Travel', 'Dining', 'Hotels'],
    travelBenefits: [
      '$300 annual travel credit',
      'Priority Pass lounge access',
      'Global Entry/TSA PreCheck credit',
      '50% more value on travel through Chase',
      'Trip delay reimbursement',
    ],
    creditScoreNeeded: 'Excellent',
    foreignTransactionFee: false,
    loungeAccess: true,
    tsa: true,
    rating: 4.9,
    bestFor: 'Best premium travel card',
    affiliateUrl: '#affiliate-chase-sapphire-reserve',
    applyUrl: 'https://creditcards.chase.com/rewards-credit-cards/sapphire/reserve',
  },
  {
    id: 'amex-gold',
    name: 'American Express® Gold Card',
    issuer: 'American Express',
    network: 'Amex',
    annualFee: 250,
    welcomeBonus: '60,000 points after $6,000 spend in 6 months',
    welcomeBonusValue: 720,
    rewardsRate: '4X restaurants & groceries, 3X flights, 1X other',
    topCategories: ['Dining', 'Groceries', 'Flights'],
    travelBenefits: [
      '$120 dining credit (Grubhub, Seamless, etc.)',
      '$120 Uber Cash annually',
      'No foreign transaction fees',
      'Trip delay insurance',
    ],
    creditScoreNeeded: 'Good',
    foreignTransactionFee: false,
    loungeAccess: false,
    tsa: false,
    rating: 4.7,
    bestFor: 'Best for dining & groceries',
    affiliateUrl: '#affiliate-amex-gold',
    applyUrl: 'https://www.americanexpress.com/us/credit-cards/card/gold-card/',
  },
  {
    id: 'amex-platinum',
    name: 'The Platinum Card® from American Express',
    issuer: 'American Express',
    network: 'Amex',
    annualFee: 695,
    welcomeBonus: '80,000 points after $8,000 spend in 6 months',
    welcomeBonusValue: 1600,
    rewardsRate: '5X flights & hotels booked via Amex, 1X other',
    topCategories: ['Flights', 'Hotels', 'Travel'],
    travelBenefits: [
      '$200 airline fee credit',
      '$200 hotel credit',
      '$240 digital entertainment credit',
      '$200 Uber Cash annually',
      'Centurion Lounge access',
      'Priority Pass lounges',
      'Global Entry/TSA PreCheck credit',
      'Hotel elite status (Marriott Gold, Hilton Gold)',
    ],
    creditScoreNeeded: 'Excellent',
    foreignTransactionFee: false,
    loungeAccess: true,
    tsa: true,
    rating: 4.8,
    bestFor: 'Best for frequent flyers',
    affiliateUrl: '#affiliate-amex-platinum',
    applyUrl: 'https://www.americanexpress.com/us/credit-cards/card/platinum/',
  },
  {
    id: 'capital-one-venture-x',
    name: 'Capital One Venture X',
    issuer: 'Capital One',
    network: 'Visa',
    annualFee: 395,
    welcomeBonus: '75,000 miles after $4,000 spend in 3 months',
    welcomeBonusValue: 750,
    rewardsRate: '10X hotels & cars via Capital One, 5X flights, 2X everything',
    topCategories: ['Travel', 'Hotels', 'Everything'],
    travelBenefits: [
      '$300 annual travel credit',
      '10,000 bonus miles every anniversary',
      'Capital One Lounges + Priority Pass',
      'Global Entry/TSA PreCheck credit',
      'Primary rental car insurance',
      'No foreign transaction fees',
    ],
    creditScoreNeeded: 'Excellent',
    foreignTransactionFee: false,
    loungeAccess: true,
    tsa: true,
    rating: 4.9,
    bestFor: 'Best value premium card',
    affiliateUrl: '#affiliate-venture-x',
    applyUrl: 'https://www.capitalone.com/credit-cards/venture-x/',
  },
  {
    id: 'capital-one-venture',
    name: 'Capital One Venture Rewards',
    issuer: 'Capital One',
    network: 'Visa',
    annualFee: 95,
    welcomeBonus: '75,000 miles after $4,000 spend in 3 months',
    welcomeBonusValue: 750,
    rewardsRate: '5X hotels & cars via Capital One, 2X everything else',
    topCategories: ['Travel', 'Everything'],
    travelBenefits: [
      'Global Entry/TSA PreCheck credit',
      'No foreign transaction fees',
      'Transfer to 15+ airline partners',
    ],
    creditScoreNeeded: 'Good',
    foreignTransactionFee: false,
    loungeAccess: false,
    tsa: true,
    rating: 4.6,
    bestFor: 'Best simple travel rewards',
    affiliateUrl: '#affiliate-venture',
    applyUrl: 'https://www.capitalone.com/credit-cards/venture/',
  },
  {
    id: 'citi-premier',
    name: 'Citi Premier® Card',
    issuer: 'Citi',
    network: 'Mastercard',
    annualFee: 95,
    welcomeBonus: '60,000 points after $4,000 spend in 3 months',
    welcomeBonusValue: 600,
    rewardsRate: '3X travel, gas, groceries, restaurants, 1X other',
    topCategories: ['Travel', 'Dining', 'Gas', 'Groceries'],
    travelBenefits: [
      'No foreign transaction fees',
      'Trip interruption protection',
      'Transfer to airline partners',
    ],
    creditScoreNeeded: 'Good',
    foreignTransactionFee: false,
    loungeAccess: false,
    tsa: false,
    rating: 4.5,
    bestFor: 'Best for multiple categories',
    affiliateUrl: '#affiliate-citi-premier',
    applyUrl: 'https://www.citi.com/credit-cards/citi-premier-credit-card',
  },
  {
    id: 'chase-freedom-unlimited',
    name: 'Chase Freedom Unlimited®',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 0,
    welcomeBonus: '$200 after $500 spend in 3 months + 5% on groceries year 1',
    welcomeBonusValue: 200,
    rewardsRate: '5% travel via Chase, 3% dining & drugstores, 1.5% everything',
    topCategories: ['Everything', 'Dining', 'Travel'],
    travelBenefits: [
      'No annual fee',
      'Points transfer to Sapphire cards',
      'Purchase protection',
    ],
    creditScoreNeeded: 'Good',
    foreignTransactionFee: true,
    loungeAccess: false,
    tsa: false,
    rating: 4.6,
    bestFor: 'Best no-fee starter card',
    affiliateUrl: '#affiliate-freedom-unlimited',
    applyUrl: 'https://creditcards.chase.com/cash-back-credit-cards/freedom/unlimited',
  },
  {
    id: 'bilt-mastercard',
    name: 'Bilt Mastercard®',
    issuer: 'Bilt / Wells Fargo',
    network: 'Mastercard',
    annualFee: 0,
    welcomeBonus: 'No welcome bonus (earn points on rent instead)',
    welcomeBonusValue: 0,
    rewardsRate: '3X dining, 2X travel, 1X rent (no fee), 1X other',
    topCategories: ['Rent', 'Dining', 'Travel'],
    travelBenefits: [
      'Pay rent with no fees',
      'Transfer to major airlines/hotels',
      'No foreign transaction fees',
      'Cell phone protection',
    ],
    creditScoreNeeded: 'Good',
    foreignTransactionFee: false,
    loungeAccess: false,
    tsa: false,
    rating: 4.7,
    bestFor: 'Best for renters',
    affiliateUrl: '#affiliate-bilt',
    applyUrl: 'https://www.bilt.com/credit-card',
  },
  {
    id: 'amex-blue-cash-preferred',
    name: 'Blue Cash Preferred® from Amex',
    issuer: 'American Express',
    network: 'Amex',
    annualFee: 0,
    welcomeBonus: '$250 after $3,000 spend in 6 months',
    welcomeBonusValue: 250,
    rewardsRate: '6% groceries (up to $6k/yr), 6% streaming, 3% transit & gas',
    topCategories: ['Groceries', 'Streaming', 'Gas'],
    travelBenefits: [
      'Car rental insurance',
      'Purchase protection',
      'Return protection',
    ],
    creditScoreNeeded: 'Good',
    foreignTransactionFee: true,
    loungeAccess: false,
    tsa: false,
    rating: 4.5,
    bestFor: 'Best for groceries & streaming',
    affiliateUrl: '#affiliate-blue-cash-preferred',
    applyUrl: 'https://www.americanexpress.com/us/credit-cards/card/blue-cash-preferred/',
  },
  {
    id: 'world-of-hyatt',
    name: 'World of Hyatt Credit Card',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 95,
    welcomeBonus: '30,000 points after $3,000 spend in 3 months',
    welcomeBonusValue: 600,
    rewardsRate: '4X Hyatt, 2X dining & travel, 1X other',
    topCategories: ['Hotels', 'Dining', 'Travel'],
    travelBenefits: [
      'Free night award annually (up to Category 4)',
      'Automatic Discoverist status',
      '5 tier-qualifying nights per $5k spend',
      'No foreign transaction fees',
    ],
    creditScoreNeeded: 'Good',
    foreignTransactionFee: false,
    loungeAccess: false,
    tsa: false,
    rating: 4.6,
    bestFor: 'Best hotel card (Hyatt)',
    affiliateUrl: '#affiliate-world-of-hyatt',
    applyUrl: 'https://creditcards.chase.com/travel-credit-cards/world-of-hyatt',
  },
  {
    id: 'marriott-bonvoy-boundless',
    name: 'Marriott Bonvoy Boundless®',
    issuer: 'Chase',
    network: 'Visa',
    annualFee: 95,
    welcomeBonus: '3 free nights (up to 50k points each) after $3,000 spend',
    welcomeBonusValue: 450,
    rewardsRate: '6X Marriott, 2X everything else',
    topCategories: ['Hotels', 'Everything'],
    travelBenefits: [
      'Free night award annually (up to 35k points)',
      'Automatic Silver Elite status',
      '15 elite night credits annually',
      'No foreign transaction fees',
    ],
    creditScoreNeeded: 'Good',
    foreignTransactionFee: false,
    loungeAccess: false,
    tsa: false,
    rating: 4.4,
    bestFor: 'Best for Marriott stays',
    affiliateUrl: '#affiliate-marriott-boundless',
    applyUrl: 'https://creditcards.chase.com/travel-credit-cards/marriott-bonvoy/boundless',
  },
];

type FilterCategory = 'all' | 'travel' | 'hotels' | 'dining' | 'cashback' | 'no-fee';
type SortOption = 'recommended' | 'bonus' | 'fee-low' | 'fee-high';

export default function PointsPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const filteredCards = useMemo(() => {
    let cards = [...creditCards];

    // Filter by category
    if (selectedCategory !== 'all') {
      cards = cards.filter(card => {
        switch (selectedCategory) {
          case 'travel':
            return card.topCategories.includes('Travel') || card.topCategories.includes('Flights');
          case 'hotels':
            return card.topCategories.includes('Hotels');
          case 'dining':
            return card.topCategories.includes('Dining');
          case 'cashback':
            return card.topCategories.includes('Everything') || card.topCategories.includes('Groceries');
          case 'no-fee':
            return card.annualFee === 0;
          default:
            return true;
        }
      });
    }

    // Sort
    switch (sortBy) {
      case 'bonus':
        cards.sort((a, b) => b.welcomeBonusValue - a.welcomeBonusValue);
        break;
      case 'fee-low':
        cards.sort((a, b) => a.annualFee - b.annualFee);
        break;
      case 'fee-high':
        cards.sort((a, b) => b.annualFee - a.annualFee);
        break;
      default:
        cards.sort((a, b) => b.rating - a.rating);
    }

    return cards;
  }, [selectedCategory, sortBy]);

  const toggleCompare = (cardId: string) => {
    setCompareList(prev => 
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : prev.length < 3 
          ? [...prev, cardId]
          : prev
    );
  };

  const compareCards = creditCards.filter(card => compareList.includes(card.id));

  const categories: { id: FilterCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'All Cards', icon: '💳' },
    { id: 'travel', label: 'Travel', icon: '✈️' },
    { id: 'hotels', label: 'Hotels', icon: '🏨' },
    { id: 'dining', label: 'Dining', icon: '🍽️' },
    { id: 'cashback', label: 'Cash Back', icon: '💵' },
    { id: 'no-fee', label: 'No Annual Fee', icon: '🆓' },
  ];

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="💳"
            name="PointsMax"
            tagline="Rewards Optimizer"
            description="Find the best travel credit cards for your spending. Real cards, real benefits, real sign-up bonuses."
          />

          {/* Live Data Badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span className="text-sm text-midnight-500">
              Card data updated December 2024 — Actual offers from card issuers
            </span>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-coral-500 text-white shadow-lg shadow-coral-400/25'
                    : 'bg-white text-midnight-600 border border-midnight-200 hover:border-coral-300 hover:bg-coral-50'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort & Compare */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-sm text-midnight-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-white border border-midnight-200 rounded-lg text-midnight-700 focus:outline-none focus:border-coral-400"
              >
                <option value="recommended">Recommended</option>
                <option value="bonus">Highest Bonus</option>
                <option value="fee-low">Lowest Fee</option>
                <option value="fee-high">Premium Cards</option>
              </select>
            </div>

            {compareList.length > 0 && (
              <button
                onClick={() => setShowCompare(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Compare ({compareList.length}) Cards
              </button>
            )}
          </div>

          {/* Cards Grid */}
          <div className="max-w-5xl mx-auto space-y-6 mb-16">
            {filteredCards.map((card) => (
              <div 
                key={card.id}
                className={`bg-white rounded-2xl border-2 transition-all hover:shadow-card-hover ${
                  compareList.includes(card.id) 
                    ? 'border-purple-400 shadow-lg' 
                    : 'border-midnight-100'
                }`}
              >
                {/* Card Header */}
                <div className="p-6 border-b border-midnight-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs ${
                        card.issuer === 'Chase' ? 'bg-blue-600' :
                        card.issuer === 'American Express' ? 'bg-blue-400' :
                        card.issuer === 'Capital One' ? 'bg-red-600' :
                        card.issuer === 'Citi' ? 'bg-blue-800' :
                        'bg-midnight-600'
                      }`}>
                        {card.network}
                      </div>
                      <div>
                        <h3 className="font-semibold text-midnight-900 text-lg">{card.name}</h3>
                        <p className="text-sm text-midnight-500">{card.issuer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-midnight-900">
                          {card.annualFee === 0 ? '$0' : `$${card.annualFee}`}
                        </p>
                        <p className="text-xs text-midnight-500">annual fee</p>
                      </div>
                      <button
                        onClick={() => toggleCompare(card.id)}
                        className={`p-2 rounded-lg border-2 transition-colors ${
                          compareList.includes(card.id)
                            ? 'bg-purple-100 border-purple-400 text-purple-700'
                            : 'border-midnight-200 text-midnight-400 hover:border-purple-300'
                        }`}
                        title={compareList.includes(card.id) ? 'Remove from compare' : 'Add to compare'}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Best For Badge */}
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-sm font-medium rounded-full">
                      ⭐ {card.bestFor}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Welcome Bonus */}
                    <div>
                      <h4 className="text-sm font-medium text-midnight-500 mb-2">Welcome Bonus</h4>
                      <p className="text-midnight-900 font-medium">{card.welcomeBonus}</p>
                      <p className="text-sm text-teal-600 mt-1">Worth ~${card.welcomeBonusValue}</p>
                    </div>

                    {/* Rewards Rate */}
                    <div>
                      <h4 className="text-sm font-medium text-midnight-500 mb-2">Rewards Rate</h4>
                      <p className="text-midnight-900">{card.rewardsRate}</p>
                    </div>
                  </div>

                  {/* Top Categories */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {card.topCategories.map((cat, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-midnight-50 text-midnight-600 text-sm rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                      {!card.foreignTransactionFee && (
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                          No FX Fee
                        </span>
                      )}
                      {card.loungeAccess && (
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">
                          Lounge Access
                        </span>
                      )}
                      {card.tsa && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                          TSA PreCheck
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Key Benefits */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-midnight-500 mb-2">Key Benefits</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      {card.travelBenefits.slice(0, 4).map((benefit, i) => (
                        <li key={i} className="text-sm text-midnight-600 flex items-start gap-2">
                          <span className="text-teal-500 mt-0.5">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply Button */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(card.rating) ? 'text-gold-400' : 'text-midnight-200'}>
                          ★
                        </span>
                      ))}
                      <span className="text-sm text-midnight-500 ml-1">{card.rating}</span>
                    </div>
                    <a
                      href={card.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.02] transition-all"
                    >
                      Apply Now
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Modal */}
          {showCompare && compareCards.length > 0 && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCompare(false)}>
              <div 
                className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-6 border-b border-midnight-100 flex items-center justify-between">
                  <h2 className="text-2xl font-display font-semibold text-midnight-900">Compare Cards</h2>
                  <button onClick={() => setShowCompare(false)} className="p-2 hover:bg-midnight-100 rounded-lg">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-3 bg-midnight-50 rounded-tl-lg">Feature</th>
                        {compareCards.map(card => (
                          <th key={card.id} className="text-left p-3 bg-midnight-50 last:rounded-tr-lg">
                            <div className="font-semibold text-midnight-900">{card.name}</div>
                            <div className="text-sm text-midnight-500 font-normal">{card.issuer}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-midnight-100">
                        <td className="p-3 font-medium text-midnight-600">Annual Fee</td>
                        {compareCards.map(card => (
                          <td key={card.id} className="p-3 text-midnight-900">${card.annualFee}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-midnight-100 bg-midnight-50/50">
                        <td className="p-3 font-medium text-midnight-600">Welcome Bonus Value</td>
                        {compareCards.map(card => (
                          <td key={card.id} className="p-3 text-teal-600 font-semibold">${card.welcomeBonusValue}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-midnight-100">
                        <td className="p-3 font-medium text-midnight-600">Rewards Rate</td>
                        {compareCards.map(card => (
                          <td key={card.id} className="p-3 text-midnight-900 text-sm">{card.rewardsRate}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-midnight-100 bg-midnight-50/50">
                        <td className="p-3 font-medium text-midnight-600">Lounge Access</td>
                        {compareCards.map(card => (
                          <td key={card.id} className="p-3">{card.loungeAccess ? '✅ Yes' : '❌ No'}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-midnight-100">
                        <td className="p-3 font-medium text-midnight-600">TSA PreCheck Credit</td>
                        {compareCards.map(card => (
                          <td key={card.id} className="p-3">{card.tsa ? '✅ Yes' : '❌ No'}</td>
                        ))}
                      </tr>
                      <tr className="border-b border-midnight-100 bg-midnight-50/50">
                        <td className="p-3 font-medium text-midnight-600">Foreign Transaction Fee</td>
                        {compareCards.map(card => (
                          <td key={card.id} className="p-3">{card.foreignTransactionFee ? '❌ 3%' : '✅ None'}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3"></td>
                        {compareCards.map(card => (
                          <td key={card.id} className="p-3">
                            <a
                              href={card.affiliateUrl}
                              className="inline-block px-4 py-2 bg-coral-500 text-white font-medium rounded-lg hover:bg-coral-600 transition-colors text-sm"
                            >
                              Apply Now
                            </a>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Affiliate Disclosure */}
          <div className="max-w-3xl mx-auto mb-12 p-4 bg-midnight-50 rounded-xl">
            <p className="text-sm text-midnight-500 text-center">
              <strong>Disclosure:</strong> WAYFARE may receive compensation when you apply for credit cards through our links. 
              This does not affect our recommendations — we only feature cards we genuinely believe offer value.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <WhyUseCard 
              points={[
                'Real card data from issuers',
                'Side-by-side comparison tool',
                'Actual welcome bonus values',
                'Filter by your spending habits',
              ]}
            />
            <HowAICard 
              description="PointsMax uses real credit card data updated monthly, including current welcome bonuses, rewards rates, and travel benefits."
              capabilities={[
                'Current welcome offers',
                'Accurate annual fees',
                'Real benefit details',
                'Value calculations',
              ]}
            />
            <QphiQInsight 
              insight="The best travel card isn't always the one with the highest bonus. Match the rewards to YOUR spending — a dining card beats a travel card if you eat out more than you fly."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
