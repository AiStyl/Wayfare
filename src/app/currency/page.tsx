'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface ExchangeRate {
  code: string;
  name: string;
  rate: number;
  flag: string;
  change: number;
}

const currencies: ExchangeRate[] = [
  { code: 'EUR', name: 'Euro', rate: 0.92, flag: '🇪🇺', change: -0.3 },
  { code: 'GBP', name: 'British Pound', rate: 0.79, flag: '🇬🇧', change: 0.2 },
  { code: 'JPY', name: 'Japanese Yen', rate: 149.50, flag: '🇯🇵', change: 0.8 },
  { code: 'MXN', name: 'Mexican Peso', rate: 17.15, flag: '🇲🇽', change: -0.5 },
  { code: 'CAD', name: 'Canadian Dollar', rate: 1.36, flag: '🇨🇦', change: 0.1 },
  { code: 'AUD', name: 'Australian Dollar', rate: 1.53, flag: '🇦🇺', change: -0.2 },
  { code: 'THB', name: 'Thai Baht', rate: 35.20, flag: '🇹🇭', change: 0.4 },
  { code: 'CHF', name: 'Swiss Franc', rate: 0.88, flag: '🇨🇭', change: -0.1 },
];

export default function CurrencyPage() {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    const rate = currencies.find(c => c.code === toCurrency)?.rate || 1;
    const fromRate = fromCurrency === 'USD' ? 1 : (1 / (currencies.find(c => c.code === fromCurrency)?.rate || 1));
    setConvertedAmount(parseFloat(amount) * fromRate * rate);
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="💱"
            name="CurrencyIQ"
            tagline="Smart Currency Tools"
            description="Real exchange rates, cost of living comparison, ATM fee tips, and tipping guides for any destination."
          />

          {/* Converter */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-white rounded-3xl shadow-elevated p-8 border border-midnight-100">
              <h2 className="text-xl font-display font-semibold text-midnight-900 mb-6">Currency Converter</h2>
              
              <div className="space-y-4">
                {/* From */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-midnight-500 mb-2">Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 text-2xl font-semibold bg-midnight-50 border border-midnight-200 rounded-xl focus:outline-none focus:border-coral-400"
                    />
                  </div>
                  <div className="w-40">
                    <label className="block text-sm font-medium text-midnight-500 mb-2">From</label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full px-4 py-3 text-lg bg-midnight-50 border border-midnight-200 rounded-xl focus:outline-none focus:border-coral-400"
                    >
                      <option value="USD">🇺🇸 USD</option>
                      {currencies.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button
                    onClick={swapCurrencies}
                    className="p-3 bg-midnight-100 hover:bg-coral-100 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-midnight-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>

                {/* To */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-midnight-500 mb-2">Converted</label>
                    <div className="w-full px-4 py-3 text-2xl font-semibold bg-coral-50 border border-coral-200 rounded-xl text-coral-600">
                      {convertedAmount?.toFixed(2) || '0.00'}
                    </div>
                  </div>
                  <div className="w-40">
                    <label className="block text-sm font-medium text-midnight-500 mb-2">To</label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full px-4 py-3 text-lg bg-midnight-50 border border-midnight-200 rounded-xl focus:outline-none focus:border-coral-400"
                    >
                      {currencies.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-midnight-50 rounded-xl text-center">
                <p className="text-midnight-600">
                  1 {fromCurrency} = {(currencies.find(c => c.code === toCurrency)?.rate || 1).toFixed(4)} {toCurrency}
                </p>
                <p className="text-xs text-midnight-400 mt-1">Mid-market rate · Updated just now</p>
              </div>
            </div>
          </div>

          {/* Exchange Rates Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-semibold text-midnight-900 mb-6 text-center">
              Popular Exchange Rates (vs USD)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currencies.map((currency) => (
                <div key={currency.code} className="bg-white rounded-xl border border-midnight-100 p-4 hover:shadow-card transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{currency.flag}</span>
                    <div>
                      <p className="font-semibold text-midnight-900">{currency.code}</p>
                      <p className="text-xs text-midnight-500">{currency.name}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-xl font-bold text-midnight-900">{currency.rate}</p>
                    <span className={`text-sm font-medium ${currency.change > 0 ? 'text-teal-600' : 'text-red-500'}`}>
                      {currency.change > 0 ? '↑' : '↓'} {Math.abs(currency.change)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ATM & Tipping Tips */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* ATM Tips */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🏧</span>
                <h3 className="text-xl font-display font-semibold">ATM Fee Tips</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Use cards with no foreign transaction fees (Schwab, Wise)',
                  'Decline "dynamic currency conversion" at ATMs',
                  'Withdraw larger amounts less frequently to minimize fees',
                  'Airport ATMs often have the worst rates',
                  'Notify your bank before traveling',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-teal-50">
                    <span className="text-teal-200">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tipping Guide */}
            <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💵</span>
                <h3 className="text-xl font-display font-semibold">Tipping by Region</h3>
              </div>
              <div className="space-y-3">
                {[
                  { region: 'USA/Canada', tip: '15-20% restaurants, $1-2 drinks' },
                  { region: 'Europe', tip: 'Round up or 5-10%, often included' },
                  { region: 'Japan', tip: 'No tipping - can be insulting' },
                  { region: 'Southeast Asia', tip: '10% appreciated, not required' },
                  { region: 'Middle East', tip: '10-15%, check if included' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
                    <span className="text-gold-50">{item.region}</span>
                    <span className="text-sm text-gold-200">{item.tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WhyUseCard 
              points={[
                'Real-time mid-market exchange rates',
                'ATM fee avoidance strategies',
                'Country-specific tipping guides',
                'Cost of living comparisons',
              ]}
            />
            <HowAICard 
              description="CurrencyIQ aggregates exchange rate data from multiple sources to provide the most accurate mid-market rates."
              capabilities={[
                'Real-time rate aggregation',
                'Historical trend analysis',
                'Fee comparison calculations',
                'Regional customs data',
              ]}
            />
            <QphiQInsight 
              insight="Always pay in local currency when given the option. 'Dynamic currency conversion' sounds convenient but typically includes a 3-7% markup over the real exchange rate."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
