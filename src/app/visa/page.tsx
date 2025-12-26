'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface VisaResult {
  visaRequired: boolean;
  visaType: string;
  stayDuration: string;
  processingTime: string;
  cost: string;
  requirements: string[];
  healthRequirements: string[];
  additionalInfo: string;
  officialLink: string;
}

const popularDestinations = [
  { country: 'Japan', flag: '🇯🇵' },
  { country: 'France', flag: '🇫🇷' },
  { country: 'Thailand', flag: '🇹🇭' },
  { country: 'Australia', flag: '🇦🇺' },
  { country: 'Brazil', flag: '🇧🇷' },
  { country: 'India', flag: '🇮🇳' },
];

export default function VisaPage() {
  const [passport, setPassport] = useState('United States');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [stayLength, setStayLength] = useState('14');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<VisaResult | null>(null);

  const handleCheck = async () => {
    if (!destination) return;
    setIsChecking(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Demo result
    const demoResult: VisaResult = {
      visaRequired: destination.toLowerCase() === 'india' || destination.toLowerCase() === 'brazil',
      visaType: destination.toLowerCase() === 'india' ? 'e-Visa' : 
                destination.toLowerCase() === 'brazil' ? 'Tourist Visa' : 'Visa-Free Entry',
      stayDuration: destination.toLowerCase() === 'japan' ? '90 days' : 
                    destination.toLowerCase() === 'thailand' ? '30 days' : '90 days',
      processingTime: destination.toLowerCase() === 'india' ? '3-5 business days' : 'N/A',
      cost: destination.toLowerCase() === 'india' ? '$25 USD' : 
            destination.toLowerCase() === 'brazil' ? '$160 USD' : 'Free',
      requirements: destination.toLowerCase() === 'india' ? [
        'Valid passport (6+ months validity)',
        'Recent passport photo',
        'Confirmed travel itinerary',
        'Proof of accommodation',
        'Return flight booking',
      ] : [
        'Valid passport (6+ months validity)',
        'Return flight ticket',
        'Proof of sufficient funds',
        'Accommodation details',
      ],
      healthRequirements: [
        'No mandatory vaccinations',
        'COVID-19: Check current requirements',
        'Travel insurance recommended',
      ],
      additionalInfo: destination.toLowerCase() === 'japan' ? 
        'Japan has resumed visa-free access for US citizens. You can stay up to 90 days for tourism.' :
        'Check the official embassy website for the most current requirements before travel.',
      officialLink: '#',
    };
    
    setResult(demoResult);
    setIsChecking(false);
  };

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🛂"
            name="VisaCheck"
            tagline="Entry Requirements"
            description="Know exactly what you need before you go. Visa requirements, vaccination info, and entry requirements for any destination."
          />

          {/* Search Form */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Passport Country */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Your Passport</label>
                  <select
                    value={passport}
                    onChange={(e) => setPassport(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  >
                    <option value="United States">🇺🇸 United States</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="France">🇫🇷 France</option>
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Destination Country</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Japan, France, Thailand"
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Travel Date */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>

                {/* Stay Length */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Length of Stay</label>
                  <select
                    value={stayLength}
                    onChange={(e) => setStayLength(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  >
                    <option value="7">1 week</option>
                    <option value="14">2 weeks</option>
                    <option value="30">1 month</option>
                    <option value="60">2 months</option>
                    <option value="90">3 months</option>
                    <option value="180">6 months</option>
                  </select>
                </div>
              </div>

              {/* Quick Destinations */}
              <div className="mb-6">
                <p className="text-sm text-midnight-500 mb-3">Popular destinations:</p>
                <div className="flex flex-wrap gap-2">
                  {popularDestinations.map((dest) => (
                    <button
                      key={dest.country}
                      onClick={() => setDestination(dest.country)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        destination === dest.country
                          ? 'bg-coral-500 text-white'
                          : 'bg-midnight-50 text-midnight-600 hover:bg-coral-50 hover:text-coral-600'
                      }`}
                    >
                      {dest.flag} {dest.country}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCheck}
                disabled={!destination || isChecking}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:shadow-coral-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50"
              >
                {isChecking ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Checking Requirements...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Check Requirements
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="max-w-3xl mx-auto mb-16 animate-fade-in">
              {/* Status Banner */}
              <div className={`rounded-2xl p-6 mb-6 ${
                result.visaRequired 
                  ? 'bg-gradient-to-r from-gold-100 to-gold-50 border border-gold-200' 
                  : 'bg-gradient-to-r from-teal-100 to-teal-50 border border-teal-200'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                    result.visaRequired ? 'bg-gold-200' : 'bg-teal-200'
                  }`}>
                    {result.visaRequired ? '📋' : '✅'}
                  </div>
                  <div>
                    <h2 className={`text-2xl font-display font-semibold ${
                      result.visaRequired ? 'text-gold-800' : 'text-teal-800'
                    }`}>
                      {result.visaRequired ? `${result.visaType} Required` : 'No Visa Required'}
                    </h2>
                    <p className={result.visaRequired ? 'text-gold-700' : 'text-teal-700'}>
                      {passport} passport → {destination} · Up to {result.stayDuration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Entry Requirements */}
                <div className="bg-white rounded-2xl border border-midnight-100 p-6">
                  <h3 className="font-display font-semibold text-midnight-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">📄</span>
                    Entry Requirements
                  </h3>
                  <ul className="space-y-3">
                    {result.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-midnight-600">
                        <svg className="w-5 h-5 text-coral-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Health & Safety */}
                <div className="bg-white rounded-2xl border border-midnight-100 p-6">
                  <h3 className="font-display font-semibold text-midnight-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">💉</span>
                    Health Requirements
                  </h3>
                  <ul className="space-y-3">
                    {result.healthRequirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-midnight-600">
                        <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Additional Info */}
              {result.visaRequired && (
                <div className="mt-6 bg-midnight-50 rounded-2xl p-6">
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 bg-white rounded-xl">
                      <p className="text-sm text-midnight-500 mb-1">Processing Time</p>
                      <p className="text-lg font-semibold text-midnight-900">{result.processingTime}</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <p className="text-sm text-midnight-500 mb-1">Visa Cost</p>
                      <p className="text-lg font-semibold text-midnight-900">{result.cost}</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <p className="text-sm text-midnight-500 mb-1">Max Stay</p>
                      <p className="text-lg font-semibold text-midnight-900">{result.stayDuration}</p>
                    </div>
                  </div>
                  <a 
                    href={result.officialLink}
                    className="block w-full py-3 bg-coral-500 hover:bg-coral-600 text-white text-center font-medium rounded-xl transition-colors"
                  >
                    Apply for e-Visa →
                  </a>
                </div>
              )}

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-gold-50 border border-gold-200 rounded-xl">
                <p className="text-sm text-gold-800">
                  <strong>⚠️ Important:</strong> {result.additionalInfo} Requirements can change — always verify with the official embassy or consulate before travel.
                </p>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WhyUseCard 
              points={[
                'Instant visa requirement lookup',
                'Passport-specific information',
                'Health and vaccination requirements',
                'Direct links to e-visa applications',
              ]}
            />
            <HowAICard 
              description="VisaCheck aggregates entry requirements from official government sources and updates in real-time."
              capabilities={[
                'Official source verification',
                'Real-time requirement updates',
                'Health advisory integration',
                'e-Visa application links',
              ]}
            />
            <QphiQInsight 
              insight="Always check passport validity requirements — most countries require 6 months validity beyond your travel dates. Renew early to avoid issues."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
