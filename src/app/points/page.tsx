'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  signupBonus: string;
  bonusValue: number;
  categories: { category: string; multiplier: string; }[];
  perks: string[];
  recommended: boolean;
  affiliateUrl: string;
}

const creditCards: CreditCard[] = [
  {
    id: '1',
    name: 'Chase Sapphire Preferred',
    issuer: 'Chase',
    annualFee: 95,
    signupBonus: '60,000 points after $4K spend in 3 months',
    bonusValue: 750,
    categories: [
      { category: 'Travel', multiplier: '5x on Chase Travel' },
      { category: 'Dining', multiplier: '3x' },
      { category: 'Streaming', multiplier: '3x' },
      { category: 'Online Groceries', multiplier: '3x' },
    ],
    perks: ['No foreign transaction fees', 'Trip cancellation insurance', 'Primary rental car coverage'],
    recommended: true,
    affiliateUrl: '#',
  },
  {
    id: '2',
    name: 'American Express Gold',
    issuer: 'Amex',
    annualFee: 250,
    signupBonus: '60,000 points after $6K spend in 6 months',
    bonusValue: 720,
    categories: [
      { category: 'Restaurants', multiplier: '4x' },
      { category: 'US Supermarkets', multiplier: '4x (up to $25K/yr)' },
      { category: 'Flights', multiplier: '3x' },
    ],
    perks: ['$120 Uber Cash annually', '$120 dining credit', 'No foreign transaction fees'],
    recommended: true,
    affiliateUrl: '#',
  },
  {
    id: '3',
    name: 'Capital One Venture X',
    issuer: 'Capital One',
    annualFee: 395,
    signupBonus: '75,000 miles after $4K spend in 3 months',
    bonusValue: 750,
    categories: [
      { category: 'Hotels & Car Rentals via Capital One Travel', multiplier: '10x' },
      { category: 'Flights via Capital One Travel', multiplier: '5x' },
      { category: 'Everything Else', multiplier: '2x' },
    ],
    perks: ['$300 travel credit', 'Priority Pass lounge access', '10,000 bonus miles annually'],
    recommended: false,
    affiliateUrl: '#',
  },
  {
    id: '4',
    name: 'Citi Double Cash',
    issuer: 'Citi',
    annualFee: 0,
    signupBonus: '$200 after $1,500 spend in 6 months',
    bonusValue: 200,
    categories: [
      { category: 'All Purchases', multiplier: '2% (1% when you buy, 1% when you pay)' },
    ],
    perks: ['No annual fee', 'Simple flat-rate rewards', 'Citi Entertainment access'],
    recommended: false,
    affiliateUrl: '#',
  },
];

export default function PointsPage() {
  const [monthlySpend, setMonthlySpend] = useState({
    travel: 500,
    dining: 400,
    groceries: 600,
    gas: 200,
    other: 1000,
  });
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const totalMonthly = Object.values(monthlySpend).reduce((a, b) => a + b, 0);

  const calculateAnnualValue = (card: CreditCard) => {
    // Simplified calculation for demo
    const baseValue = totalMonthly * 12 * 0.015; // Assume 1.5% average value
    return Math.round(baseValue + card.bonusValue - card.annualFee);
  };

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
            description="Calculate your points value, compare travel credit cards, and maximize your rewards on every purchase."
          />

          {/* Spending Calculator Toggle */}
          <div className="max-w-4xl mx-auto mb-12">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="w-full bg-white rounded-2xl shadow-card p-6 border border-midnight-100 hover:border-coral-200 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-coral-100 to-gold-100 rounded-xl flex items-center justify-center text-2xl">
                    🧮
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-midnight-900">Spending Calculator</h3>
                    <p className="text-midnight-500 text-sm">Enter your monthly spending to get personalized card recommendations</p>
                  </div>
                </div>
                <svg 
                  className={`w-6 h-6 text-midnight-400 transition-transform ${showCalculator ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Calculator Panel */}
            {showCalculator && (
              <div className="mt-4 bg-white rounded-2xl shadow-card p-6 border border-midnight-100 animate-slide-down">
                <h4 className="font-medium text-midnight-900 mb-4">Monthly Spending Breakdown</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(monthlySpend).map(([category, amount]) => (
                    <div key={category}>
                      <label className="block text-sm text-midnight-500 mb-1 capitalize">{category}</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight-400">$</span>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setMonthlySpend(prev => ({ ...prev, [category]: Number(e.target.value) }))}
                          className="w-full pl-8 pr-3 py-2 bg-midnight-50 border border-midnight-200 rounded-lg text-midnight-900 focus:outline-none focus:border-coral-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-coral-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-midnight-600">Total Monthly Spending:</span>
                    <span className="text-2xl font-bold text-coral-600">${totalMonthly.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cards Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-semibold text-midnight-900">
                Top Travel Credit Cards
              </h2>
              <span className="text-sm text-midnight-500">
                {selectedCards.length > 0 && `${selectedCards.length} selected for comparison`}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {creditCards.map((card) => {
                const annualValue = calculateAnnualValue(card);
                const isSelected = selectedCards.includes(card.id);

                return (
                  <div 
                    key={card.id}
                    className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                      card.recommended 
                        ? 'border-coral-300 shadow-glow-coral' 
                        : isSelected
                        ? 'border-teal-400'
                        : 'border-midnight-100 hover:border-midnight-200'
                    }`}
                  >
                    {/* Card Header */}
                    <div className={`p-6 ${card.recommended ? 'bg-gradient-to-r from-coral-50 to-gold-50' : 'bg-midnight-50'}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          {card.recommended && (
                            <span className="inline-block px-3 py-1 bg-coral-500 text-white text-xs font-medium rounded-full mb-2">
                              ⭐ Recommended
                            </span>
                          )}
                          <h3 className="text-xl font-display font-semibold text-midnight-900">
                            {card.name}
                          </h3>
                          <p className="text-midnight-500">{card.issuer}</p>
                        </div>
                        <button
                          onClick={() => setSelectedCards(prev => 
                            isSelected ? prev.filter(id => id !== card.id) : [...prev, card.id]
                          )}
                          className={`p-2 rounded-lg transition-colors ${
                            isSelected 
                              ? 'bg-teal-500 text-white' 
                              : 'bg-white text-midnight-400 hover:text-midnight-600'
                          }`}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      {/* Key Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-3 bg-midnight-50 rounded-xl">
                          <p className="text-xs text-midnight-500 mb-1">Annual Fee</p>
                          <p className="text-lg font-bold text-midnight-900">
                            {card.annualFee === 0 ? '$0' : `$${card.annualFee}`}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-teal-50 rounded-xl">
                          <p className="text-xs text-teal-600 mb-1">Bonus Value</p>
                          <p className="text-lg font-bold text-teal-700">${card.bonusValue}</p>
                        </div>
                        <div className="text-center p-3 bg-coral-50 rounded-xl">
                          <p className="text-xs text-coral-600 mb-1">Est. 1st Year</p>
                          <p className="text-lg font-bold text-coral-700">${annualValue}</p>
                        </div>
                      </div>

                      {/* Sign-up Bonus */}
                      <div className="mb-4 p-3 bg-gold-50 border border-gold-200 rounded-xl">
                        <p className="text-sm font-medium text-gold-800">
                          🎁 {card.signupBonus}
                        </p>
                      </div>

                      {/* Categories */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-midnight-700 mb-2">Earning Categories</h4>
                        <div className="space-y-1">
                          {card.categories.map((cat, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                              <span className="text-midnight-600">{cat.category}</span>
                              <span className="font-medium text-midnight-900">{cat.multiplier}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Perks */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-midnight-700 mb-2">Key Perks</h4>
                        <ul className="space-y-1">
                          {card.perks.map((perk, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-midnight-500">
                              <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <a 
                        href={card.affiliateUrl}
                        className="block w-full py-3 bg-midnight-900 hover:bg-midnight-800 text-white text-center font-medium rounded-xl transition-colors"
                      >
                        Apply Now →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Points Calculator */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-midnight-900 to-midnight-800 rounded-3xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-display font-semibold text-white mb-4">
                  Points Value Calculator
                </h2>
                <p className="text-midnight-300 mb-8">
                  Enter your points balance to see their estimated value in dollars
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { program: 'Chase Ultimate Rewards', value: 0.02, color: 'coral' },
                    { program: 'Amex Membership Rewards', value: 0.012, color: 'gold' },
                    { program: 'Capital One Miles', value: 0.01, color: 'teal' },
                  ].map((program) => (
                    <div key={program.program} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-white text-sm mb-2">{program.program}</p>
                      <p className="text-3xl font-bold text-white">{program.value * 100}¢</p>
                      <p className="text-midnight-400 text-xs">per point (avg)</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WhyUseCard 
              points={[
                'Find the best card for your spending habits',
                'Maximize sign-up bonus value',
                'Understand true point valuations',
                'Compare annual fees vs benefits',
              ]}
            />
            <HowAICard 
              description="PointsMax analyzes your spending patterns and matches them with optimal credit card rewards programs."
              capabilities={[
                'Spending pattern analysis',
                'Reward optimization algorithms',
                'Sign-up bonus tracking',
                'Break-even calculations',
              ]}
            />
            <QphiQInsight 
              insight="The best travel credit card isn't always the one with the highest sign-up bonus. Factor in your actual spending categories — a card earning 4x on your biggest expense beats 2x on everything."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
