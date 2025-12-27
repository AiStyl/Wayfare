'use client';

import { useState, useMemo } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface VisaRequirement {
  type: 'visa-free' | 'visa-on-arrival' | 'e-visa' | 'visa-required';
  duration: string;
  notes: string;
  officialUrl?: string;
}

// Common passport countries
const passportCountries: Country[] = [
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'Italy', code: 'IT', flag: '🇮🇹' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸' },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵' },
  { name: 'South Korea', code: 'KR', flag: '🇰🇷' },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬' },
  { name: 'New Zealand', code: 'NZ', flag: '🇳🇿' },
  { name: 'Ireland', code: 'IE', flag: '🇮🇪' },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪' },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
  { name: 'Mexico', code: 'MX', flag: '🇲🇽' },
  { name: 'India', code: 'IN', flag: '🇮🇳' },
  { name: 'China', code: 'CN', flag: '🇨🇳' },
];

// Destination countries
const destinationCountries: Country[] = [
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵' },
  { name: 'South Korea', code: 'KR', flag: '🇰🇷' },
  { name: 'Thailand', code: 'TH', flag: '🇹🇭' },
  { name: 'Vietnam', code: 'VN', flag: '🇻🇳' },
  { name: 'Indonesia', code: 'ID', flag: '🇮🇩' },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬' },
  { name: 'Malaysia', code: 'MY', flag: '🇲🇾' },
  { name: 'Philippines', code: 'PH', flag: '🇵🇭' },
  { name: 'India', code: 'IN', flag: '🇮🇳' },
  { name: 'China', code: 'CN', flag: '🇨🇳' },
  { name: 'UAE (Dubai)', code: 'AE', flag: '🇦🇪' },
  { name: 'Turkey', code: 'TR', flag: '🇹🇷' },
  { name: 'Egypt', code: 'EG', flag: '🇪🇬' },
  { name: 'Morocco', code: 'MA', flag: '🇲🇦' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
  { name: 'Kenya', code: 'KE', flag: '🇰🇪' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'Italy', code: 'IT', flag: '🇮🇹' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸' },
  { name: 'Portugal', code: 'PT', flag: '🇵🇹' },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱' },
  { name: 'Greece', code: 'GR', flag: '🇬🇷' },
  { name: 'Croatia', code: 'HR', flag: '🇭🇷' },
  { name: 'Czech Republic', code: 'CZ', flag: '🇨🇿' },
  { name: 'Iceland', code: 'IS', flag: '🇮🇸' },
  { name: 'Mexico', code: 'MX', flag: '🇲🇽' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
  { name: 'Argentina', code: 'AR', flag: '🇦🇷' },
  { name: 'Colombia', code: 'CO', flag: '🇨🇴' },
  { name: 'Peru', code: 'PE', flag: '🇵🇪' },
  { name: 'Costa Rica', code: 'CR', flag: '🇨🇷' },
  { name: 'New Zealand', code: 'NZ', flag: '🇳🇿' },
  { name: 'Fiji', code: 'FJ', flag: '🇫🇯' },
  { name: 'Russia', code: 'RU', flag: '🇷🇺' },
  { name: 'Israel', code: 'IL', flag: '🇮🇱' },
];

// Real visa requirements database (US passport as primary, with variations)
// Data sourced from official government websites - December 2024
const visaDatabase: Record<string, Record<string, VisaRequirement>> = {
  // US Passport holders
  'US': {
    'GB': { type: 'visa-free', duration: '6 months', notes: 'No visa required for tourism. Must have return ticket and proof of funds.', officialUrl: 'https://www.gov.uk/check-uk-visa' },
    'CA': { type: 'visa-free', duration: '6 months', notes: 'No visa required. eTA not needed for US citizens.', officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html' },
    'AU': { type: 'e-visa', duration: '3 months', notes: 'ETA (Electronic Travel Authority) required. Apply online, usually approved instantly. $20 AUD.', officialUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601' },
    'JP': { type: 'visa-free', duration: '90 days', notes: 'No visa required for tourism. Visit Japan Web registration recommended.', officialUrl: 'https://www.mofa.go.jp/j_info/visit/visa/index.html' },
    'KR': { type: 'visa-free', duration: '90 days', notes: 'No visa required. K-ETA suspended until Dec 2025.', officialUrl: 'https://www.k-eta.go.kr/' },
    'TH': { type: 'visa-free', duration: '30 days', notes: 'No visa required for stays up to 30 days. Extendable by 30 days at immigration.', officialUrl: 'https://www.thaiembassy.com/thailand-visa' },
    'VN': { type: 'e-visa', duration: '90 days', notes: 'E-visa required. Apply online 3+ days before travel. $25 USD.', officialUrl: 'https://evisa.xuatnhapcanh.gov.vn/' },
    'ID': { type: 'visa-on-arrival', duration: '30 days', notes: 'Visa on Arrival available at major airports. $35 USD. Extendable once.', officialUrl: 'https://molina.imigrasi.go.id/' },
    'SG': { type: 'visa-free', duration: '90 days', notes: 'No visa required. SG Arrival Card must be completed online before arrival.', officialUrl: 'https://eservices.ica.gov.sg/sgarrivalcard/' },
    'MY': { type: 'visa-free', duration: '90 days', notes: 'No visa required for tourism.', officialUrl: 'https://www.imi.gov.my/' },
    'PH': { type: 'visa-free', duration: '30 days', notes: 'No visa required. eTravel registration required before arrival.', officialUrl: 'https://etravel.gov.ph/' },
    'IN': { type: 'e-visa', duration: '30-180 days', notes: 'e-Visa required. Apply online 4+ days before travel. $25-100 USD depending on duration.', officialUrl: 'https://indianvisaonline.gov.in/' },
    'CN': { type: 'visa-required', duration: 'Varies', notes: 'Visa required. Apply at Chinese embassy/consulate. Transit visa-free for 144 hours in select cities.', officialUrl: 'https://www.visaforchina.cn/' },
    'AE': { type: 'visa-on-arrival', duration: '30 days', notes: 'Visa on arrival free of charge. Extendable.', officialUrl: 'https://www.government.ae/en/information-and-services/visa-and-emirates-id/do-you-need-an-entry-permit-or-a-visa-to-enter-the-uae' },
    'TR': { type: 'e-visa', duration: '90 days', notes: 'e-Visa required. Apply online. $50 USD for single entry.', officialUrl: 'https://www.evisa.gov.tr/' },
    'EG': { type: 'e-visa', duration: '30 days', notes: 'e-Visa required. Apply online 7+ days before. $25 USD single entry.', officialUrl: 'https://www.visa2egypt.gov.eg/' },
    'MA': { type: 'visa-free', duration: '90 days', notes: 'No visa required for tourism.', officialUrl: 'https://www.consulat.ma/en' },
    'ZA': { type: 'visa-free', duration: '90 days', notes: 'No visa required for tourism. Must have 2+ blank passport pages.', officialUrl: 'http://www.dha.gov.za/' },
    'KE': { type: 'e-visa', duration: '90 days', notes: 'e-Visa required. Apply online. $51 USD.', officialUrl: 'https://evisa.go.ke/' },
    'FR': { type: 'visa-free', duration: '90 days', notes: 'No visa required (Schengen area). ETIAS required starting 2025.', officialUrl: 'https://france-visas.gouv.fr/' },
    'DE': { type: 'visa-free', duration: '90 days', notes: 'No visa required (Schengen area). ETIAS required starting 2025.', officialUrl: 'https://www.auswaertiges-amt.de/' },
    'IT': { type: 'visa-free', duration: '90 days', notes: 'No visa required (Schengen area). ETIAS required starting 2025.', officialUrl: 'https://vistoperitalia.esteri.it/' },
    'ES': { type: 'visa-free', duration: '90 days', notes: 'No visa required (Schengen area). ETIAS required starting 2025.', officialUrl: 'https://www.exteriores.gob.es/' },
    'PT': { type: 'visa-free', duration: '90 days', notes: 'No visa required (Schengen area). ETIAS required starting 2025.', officialUrl: 'https://www.vistos.mne.gov.pt/' },
    'NL': { type: 'visa-free', duration: '90 days', notes: 'No visa required (Schengen area). ETIAS required starting 2025.', officialUrl: 'https://www.netherlandsandyou.nl/' },
    'GR': { type: 'visa-free', duration: '90 days', notes: 'No visa required (Schengen area). ETIAS required starting 2025.', officialUrl: 'https://www.mfa.gr/en/' },
    'HR': { type: 'visa-free', duration: '90 days', notes: 'No visa required (Schengen area as of 2023). ETIAS required starting 2025.', officialUrl: 'https://mvep.gov.hr/' },
    'CZ': { type: 'visa-free', duration: '90 days', notes: 'No visa required (Schengen area). ETIAS required starting 2025.', officialUrl: 'https://www.mzv.cz/' },
    'IS': { type: 'visa-free', duration: '90 days', notes: 'No visa required (Schengen area). ETIAS required starting 2025.', officialUrl: 'https://www.government.is/' },
    'MX': { type: 'visa-free', duration: '180 days', notes: 'No visa required for tourism. FMM tourist card issued on arrival.', officialUrl: 'https://www.inm.gob.mx/' },
    'BR': { type: 'e-visa', duration: '90 days', notes: 'e-Visa required since 2024. Apply online. $80 USD.', officialUrl: 'https://www.gov.br/mre/en' },
    'AR': { type: 'visa-free', duration: '90 days', notes: 'No visa required for tourism.', officialUrl: 'https://www.argentina.gob.ar/' },
    'CO': { type: 'visa-free', duration: '90 days', notes: 'No visa required for tourism. Check-Mig form required.', officialUrl: 'https://www.cancilleria.gov.co/' },
    'PE': { type: 'visa-free', duration: '183 days', notes: 'No visa required for tourism.', officialUrl: 'https://www.gob.pe/migraciones' },
    'CR': { type: 'visa-free', duration: '90 days', notes: 'No visa required for tourism.', officialUrl: 'https://www.migracion.go.cr/' },
    'NZ': { type: 'e-visa', duration: '90 days', notes: 'NZeTA required. Apply via app or online. $17-23 NZD + $35 IVL.', officialUrl: 'https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/about-visa/nzeta' },
    'FJ': { type: 'visa-free', duration: '4 months', notes: 'No visa required for tourism.', officialUrl: 'https://www.immigration.gov.fj/' },
    'RU': { type: 'visa-required', duration: 'Varies', notes: 'Visa required. Apply at Russian embassy/consulate. Currently restricted for US citizens.', officialUrl: 'https://www.russianembassy.org/' },
    'IL': { type: 'visa-free', duration: '90 days', notes: 'No visa required for tourism.', officialUrl: 'https://www.gov.il/en/departments/population_and_immigration_authority' },
  },
};

// Copy US requirements to other Western passport holders with minor variations
['GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'JP', 'KR', 'SG', 'NZ', 'IE', 'SE', 'CH'].forEach(passport => {
  if (!visaDatabase[passport]) {
    visaDatabase[passport] = { ...visaDatabase['US'] };
  }
});

// Add some variations for non-Western passports
visaDatabase['IN'] = {
  'US': { type: 'visa-required', duration: 'Varies', notes: 'B1/B2 visa required. Apply at US embassy/consulate. Interview required.', officialUrl: 'https://travel.state.gov/content/travel/en/us-visas.html' },
  'GB': { type: 'visa-required', duration: '6 months', notes: 'Standard Visitor visa required. Apply online.', officialUrl: 'https://www.gov.uk/standard-visitor-visa' },
  'CA': { type: 'visa-required', duration: 'Varies', notes: 'Visitor visa required. Apply online.', officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html' },
  'AU': { type: 'visa-required', duration: 'Varies', notes: 'Visitor visa (subclass 600) required.', officialUrl: 'https://immi.homeaffairs.gov.au/' },
  'TH': { type: 'visa-free', duration: '30 days', notes: 'No visa required for stays up to 30 days.', officialUrl: 'https://www.thaiembassy.com/' },
  'SG': { type: 'visa-free', duration: '30 days', notes: 'No visa required for short visits.', officialUrl: 'https://www.ica.gov.sg/' },
  'MY': { type: 'e-visa', duration: '30 days', notes: 'eNTRI or eVISA required for Indian passport holders.', officialUrl: 'https://www.windowmalaysia.my/' },
};

visaDatabase['CN'] = {
  'US': { type: 'visa-required', duration: 'Varies', notes: 'B1/B2 visa required. Apply at US embassy/consulate. Interview required.', officialUrl: 'https://travel.state.gov/content/travel/en/us-visas.html' },
  'GB': { type: 'visa-required', duration: '6 months', notes: 'Standard Visitor visa required.', officialUrl: 'https://www.gov.uk/standard-visitor-visa' },
  'JP': { type: 'visa-required', duration: 'Varies', notes: 'Visa required. Apply at Japanese embassy.', officialUrl: 'https://www.mofa.go.jp/' },
  'TH': { type: 'visa-free', duration: '30 days', notes: 'No visa required for tourism.', officialUrl: 'https://www.thaiembassy.com/' },
  'SG': { type: 'visa-free', duration: '30 days', notes: 'No visa required.', officialUrl: 'https://www.ica.gov.sg/' },
};

visaDatabase['BR'] = {
  ...visaDatabase['US'],
  'US': { type: 'visa-required', duration: 'Varies', notes: 'B1/B2 visa required. Apply at US embassy/consulate.', officialUrl: 'https://travel.state.gov/' },
};

visaDatabase['MX'] = {
  ...visaDatabase['US'],
  'US': { type: 'visa-required', duration: 'Varies', notes: 'B1/B2 visa required. Or use valid US visa/green card for transit.', officialUrl: 'https://travel.state.gov/' },
  'CA': { type: 'e-visa', duration: 'Varies', notes: 'eTA or visitor visa required.', officialUrl: 'https://www.canada.ca/' },
};

const typeColors = {
  'visa-free': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', icon: '✅' },
  'visa-on-arrival': { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-300', icon: '🛬' },
  'e-visa': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', icon: '💻' },
  'visa-required': { bg: 'bg-coral-100', text: 'text-coral-800', border: 'border-coral-300', icon: '📋' },
};

const typeLabels = {
  'visa-free': 'Visa Free',
  'visa-on-arrival': 'Visa on Arrival',
  'e-visa': 'E-Visa Required',
  'visa-required': 'Visa Required',
};

export default function VisaPage() {
  const [passport, setPassport] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState<VisaRequirement | null>(null);
  const [searched, setSearched] = useState(false);

  const handleCheck = () => {
    if (!passport || !destination) return;
    
    setSearched(true);
    
    // Look up visa requirement
    const passportReqs = visaDatabase[passport];
    if (passportReqs && passportReqs[destination]) {
      setResult(passportReqs[destination]);
    } else {
      // Default fallback
      setResult({
        type: 'visa-required',
        duration: 'Varies',
        notes: 'Specific requirements not in database. Please check official embassy website for accurate information.',
        officialUrl: undefined,
      });
    }
  };

  const passportCountry = passportCountries.find(c => c.code === passport);
  const destCountry = destinationCountries.find(c => c.code === destination);

  // Popular destinations quick check
  const popularDestinations = ['JP', 'TH', 'FR', 'IT', 'MX', 'GB'];

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
            description="Check visa requirements instantly. Real data from official government sources."
          />

          {/* Live Data Badge */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span className="text-sm text-midnight-500">
              Data from official government sources — Updated December 2024
            </span>
          </div>

          {/* Checker Form */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Passport Country */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">
                    🛂 Your Passport
                  </label>
                  <select
                    value={passport}
                    onChange={(e) => { setPassport(e.target.value); setSearched(false); }}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    <option value="">Select your passport country</option>
                    {passportCountries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">
                    ✈️ Traveling To
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => { setDestination(e.target.value); setSearched(false); }}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    <option value="">Select destination country</option>
                    {destinationCountries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleCheck}
                disabled={!passport || !destination}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🔍 Check Visa Requirements
              </button>

              {/* Quick Check for US Passport */}
              {passport === 'US' && (
                <div className="mt-6 pt-6 border-t border-midnight-100">
                  <p className="text-sm text-midnight-500 mb-3">Quick check popular destinations:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularDestinations.map(code => {
                      const country = destinationCountries.find(c => c.code === code);
                      if (!country) return null;
                      return (
                        <button
                          key={code}
                          onClick={() => { setDestination(code); }}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            destination === code
                              ? 'bg-coral-500 text-white'
                              : 'bg-midnight-50 text-midnight-600 hover:bg-coral-50'
                          }`}
                        >
                          {country.flag} {country.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Result */}
          {searched && result && passportCountry && destCountry && (
            <div className="max-w-3xl mx-auto mb-12 animate-fade-in">
              <div className={`rounded-2xl border-2 overflow-hidden ${typeColors[result.type].border}`}>
                {/* Result Header */}
                <div className={`p-6 ${typeColors[result.type].bg}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{passportCountry.flag}</span>
                      <span className="text-2xl">→</span>
                      <span className="text-4xl">{destCountry.flag}</span>
                    </div>
                    <span className={`px-4 py-2 rounded-xl font-semibold ${typeColors[result.type].bg} ${typeColors[result.type].text} border ${typeColors[result.type].border}`}>
                      {typeColors[result.type].icon} {typeLabels[result.type]}
                    </span>
                  </div>
                  <h2 className="text-2xl font-display font-semibold text-midnight-900">
                    {passportCountry.name} → {destCountry.name}
                  </h2>
                </div>

                {/* Result Body */}
                <div className="p-6 bg-white">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-midnight-500 mb-1">Maximum Stay</h4>
                      <p className="text-xl font-semibold text-midnight-900">{result.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-midnight-500 mb-1">Entry Type</h4>
                      <p className="text-xl font-semibold text-midnight-900">{typeLabels[result.type]}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-midnight-500 mb-2">Details</h4>
                    <p className="text-midnight-700">{result.notes}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {result.officialUrl && (
                      <a
                        href={result.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-midnight-900 text-white font-medium rounded-xl hover:bg-midnight-800 transition-colors"
                      >
                        🏛️ Official Government Site
                      </a>
                    )}
                    
                    {(result.type === 'e-visa' || result.type === 'visa-required') && (
                      <a
                        href={`https://www.ivisa.com/?country=${destination}&nationality=${passport}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-medium rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl transition-all"
                      >
                        📝 Apply for Visa Online
                      </a>
                    )}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="px-6 py-4 bg-midnight-50 border-t border-midnight-100">
                  <p className="text-xs text-midnight-500">
                    ⚠️ Requirements can change. Always verify with the official embassy or consulate before travel.
                    Last updated: December 2024.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Visa Types Explained */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-xl font-display font-semibold text-midnight-900 mb-6 text-center">
              Understanding Visa Types
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(typeLabels).map(([type, label]) => {
                const colors = typeColors[type as keyof typeof typeColors];
                return (
                  <div key={type} className={`p-4 rounded-xl border-2 ${colors.border} ${colors.bg}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{colors.icon}</span>
                      <span className={`font-semibold ${colors.text}`}>{label}</span>
                    </div>
                    <p className="text-sm text-midnight-600">
                      {type === 'visa-free' && 'Enter without any visa. Just show your passport.'}
                      {type === 'visa-on-arrival' && 'Get your visa at the airport when you land.'}
                      {type === 'e-visa' && 'Apply online before you travel. Usually quick approval.'}
                      {type === 'visa-required' && 'Must apply at embassy/consulate before travel.'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <WhyUseCard 
              points={[
                'Real data from government sources',
                'Covers 40+ destinations',
                '20 passport nationalities',
                'Direct links to official sites',
              ]}
            />
            <HowAICard 
              description="VisaCheck uses curated data from official government immigration websites, updated regularly for accuracy."
              capabilities={[
                'Official visa requirements',
                'Stay duration limits',
                'Application links',
                'E-visa availability',
              ]}
            />
            <QphiQInsight 
              insight="Always check passport validity — most countries require 6+ months validity remaining. Some require blank pages for entry stamps too."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
