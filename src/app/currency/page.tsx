'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface ExchangeRates {
  [key: string]: number;
}

interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  result: number;
  rate: number;
}

// Popular currencies with symbols and names
const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł', flag: '🇵🇱' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
];

export default function CurrencyPage() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [conversionHistory, setConversionHistory] = useState<ConversionResult[]>([]);

  // Fetch real exchange rates from Frankfurter API (free, no key required)
  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Frankfurter API - free, no API key needed, updates daily from ECB
        const response = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}`);
        if (!response.ok) throw new Error('Failed to fetch rates');
        const data = await response.json();
        
        // Add the base currency with rate 1
        const allRates = { ...data.rates, [fromCurrency]: 1 };
        setRates(allRates);
        setLastUpdated(data.date);
      } catch (err) {
        setError('Unable to fetch exchange rates. Please try again.');
        console.error('Exchange rate error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  const getCurrencyInfo = (code: string) => {
    return currencies.find(c => c.code === code) || { code, name: code, symbol: '', flag: '🌍' };
  };

  const convertCurrency = () => {
    if (!rates || !rates[toCurrency]) return null;
    const rate = rates[toCurrency];
    const result = amount * rate;
    return { rate, result };
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = () => {
    const conversion = convertCurrency();
    if (conversion) {
      const newConversion: ConversionResult = {
        from: fromCurrency,
        to: toCurrency,
        amount,
        result: conversion.result,
        rate: conversion.rate,
      };
      setConversionHistory(prev => [newConversion, ...prev.slice(0, 4)]);
    }
  };

  const conversion = convertCurrency();
  const fromInfo = getCurrencyInfo(fromCurrency);
  const toInfo = getCurrencyInfo(toCurrency);

  // Get popular rates for display
  const popularCurrencies = ['EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF'];
  const popularRates = popularCurrencies
    .filter(code => code !== fromCurrency && rates?.[code])
    .slice(0, 6);

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="💱"
            name="CurrencyIQ"
            tagline="Exchange Intelligence"
            description="Real-time exchange rates updated daily from the European Central Bank. Convert currencies and track rates for your trip."
          />

          {/* Converter Card */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              {/* Live Data Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                  <span className="text-sm text-midnight-500">
                    Live rates from European Central Bank
                  </span>
                </div>
                {lastUpdated && (
                  <span className="text-xs text-midnight-400">
                    Updated: {lastUpdated}
                  </span>
                )}
              </div>

              {error && (
                <div className="mb-6 p-4 bg-coral-50 border border-coral-200 rounded-xl text-coral-700">
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end mb-6">
                {/* From */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">From</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-32 px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 text-lg font-semibold focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                    />
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="flex-1 px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                    >
                      {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>
                          {currency.flag} {currency.code} - {currency.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Swap Button */}
                <button 
                  onClick={handleSwap}
                  className="p-3 bg-midnight-100 hover:bg-coral-100 rounded-full transition-colors mb-1"
                >
                  <svg className="w-5 h-5 text-midnight-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>

                {/* To */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">To</label>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Result */}
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-4 border-coral-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-midnight-500">Loading rates...</p>
                </div>
              ) : conversion && (
                <div className="bg-gradient-to-br from-coral-50 to-gold-50 rounded-2xl p-6 text-center">
                  <p className="text-midnight-500 mb-2">
                    {fromInfo.flag} {amount.toLocaleString()} {fromCurrency} =
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-midnight-900 mb-2">
                    {toInfo.flag} {conversion.result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
                  </p>
                  <p className="text-sm text-midnight-500">
                    1 {fromCurrency} = {conversion.rate.toFixed(4)} {toCurrency}
                  </p>
                </div>
              )}

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={isLoading}
                className="w-full mt-6 inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                Save Conversion
              </button>
            </div>
          </div>

          {/* Popular Rates */}
          {rates && (
            <div className="max-w-3xl mx-auto mb-12">
              <h3 className="text-lg font-display font-semibold text-midnight-900 mb-4">
                {fromInfo.flag} {fromCurrency} Exchange Rates
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {popularRates.map(code => {
                  const info = getCurrencyInfo(code);
                  const rate = rates[code];
                  return (
                    <div 
                      key={code}
                      className="bg-white rounded-xl border border-midnight-100 p-4 hover:shadow-card-hover hover:border-coral-200 transition-all cursor-pointer"
                      onClick={() => setToCurrency(code)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{info.flag}</span>
                        <span className="text-xs text-midnight-400">{info.name}</span>
                      </div>
                      <p className="text-lg font-semibold text-midnight-900">
                        {rate.toFixed(4)} {code}
                      </p>
                      <p className="text-xs text-midnight-500">
                        per 1 {fromCurrency}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Conversion History */}
          {conversionHistory.length > 0 && (
            <div className="max-w-3xl mx-auto mb-12">
              <h3 className="text-lg font-display font-semibold text-midnight-900 mb-4">
                Recent Conversions
              </h3>
              <div className="space-y-2">
                {conversionHistory.map((conv, i) => {
                  const fromInfo = getCurrencyInfo(conv.from);
                  const toInfo = getCurrencyInfo(conv.to);
                  return (
                    <div 
                      key={i}
                      className="bg-white rounded-xl border border-midnight-100 p-4 flex items-center justify-between"
                    >
                      <span className="text-midnight-600">
                        {fromInfo.flag} {conv.amount.toLocaleString()} {conv.from}
                      </span>
                      <span className="text-midnight-400">→</span>
                      <span className="font-semibold text-midnight-900">
                        {toInfo.flag} {conv.result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {conv.to}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <WhyUseCard 
              points={[
                'Real-time rates from European Central Bank',
                'No hidden fees in displayed rates',
                'Track rates for trip planning',
                '30+ currencies supported',
              ]}
            />
            <HowAICard 
              description="CurrencyIQ pulls live exchange rates from the European Central Bank via the Frankfurter API, updated daily."
              capabilities={[
                'Live ECB exchange rates',
                'Daily rate updates',
                'Conversion history tracking',
                'Multi-currency comparison',
              ]}
            />
            <QphiQInsight 
              insight="Airport and hotel currency exchanges charge 8-12% markup. Use a no-foreign-transaction-fee credit card or withdraw from ATMs for the best rates."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
