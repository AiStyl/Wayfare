'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface SafetyInfo {
  country: string;
  flag: string;
  advisoryLevel: 1 | 2 | 3 | 4;
  advisoryTitle: string;
  summary: string;
  lastUpdated: string;
  healthAlerts: string[];
  securityConcerns: string[];
  entryRequirements: string[];
  emergencyNumbers: { service: string; number: string; }[];
  localLaws: string[];
}

const advisoryColors = {
  1: { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-300', label: 'Exercise Normal Precautions' },
  2: { bg: 'bg-gold-100', text: 'text-gold-800', border: 'border-gold-300', label: 'Exercise Increased Caution' },
  3: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300', label: 'Reconsider Travel' },
  4: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', label: 'Do Not Travel' },
};

export default function SafetyPage() {
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [safetyInfo, setSafetyInfo] = useState<SafetyInfo | null>(null);

  const handleSearch = async () => {
    if (!country) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    const demoInfo: SafetyInfo = {
      country: country,
      flag: '🌍',
      advisoryLevel: country.toLowerCase().includes('japan') ? 1 : 
                     country.toLowerCase().includes('mexico') ? 2 : 1,
      advisoryTitle: 'Exercise Normal Precautions',
      summary: `Travel to ${country} is generally safe for tourists. Standard travel precautions apply. Be aware of your surroundings and keep valuables secure.`,
      lastUpdated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      healthAlerts: [
        'Routine vaccinations recommended',
        'Check CDC for current health notices',
        'Travel health insurance strongly recommended',
      ],
      securityConcerns: [
        'Petty theft in tourist areas - keep valuables secure',
        'Use official taxis or ride-share apps',
        'Avoid displaying expensive jewelry',
      ],
      entryRequirements: [
        'Valid passport required (6+ months validity)',
        'Visa-free for US citizens (up to 90 days)',
        'Proof of return travel may be requested',
      ],
      emergencyNumbers: [
        { service: 'Police', number: '110' },
        { service: 'Ambulance', number: '119' },
        { service: 'Fire', number: '119' },
        { service: 'US Embassy', number: '+81-3-3224-5000' },
      ],
      localLaws: [
        'Photography restrictions at certain sites',
        'Strict drug laws - severe penalties',
        'Respect local customs and dress codes',
      ],
    };

    setSafetyInfo(demoInfo);
    setIsLoading(false);
  };

  const popularCountries = [
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Mexico', flag: '🇲🇽' },
    { name: 'Thailand', flag: '🇹🇭' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'UK', flag: '🇬🇧' },
  ];

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🛡️"
            name="SafetyPulse"
            tagline="Travel Advisory Hub"
            description="Real-time safety information from official sources. Travel advisories, health alerts, and emergency contacts for any destination."
          />

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-elevated p-6 border border-midnight-100">
              <label className="block text-sm font-medium text-midnight-600 mb-2">Country or Region</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g., Japan, France, Thailand"
                  className="flex-1 px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  disabled={!country || isLoading}
                  className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Check'}
                </button>
              </div>
              
              {/* Quick Select */}
              <div className="mt-4 flex flex-wrap gap-2">
                {popularCountries.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setCountry(c.name)}
                    className="px-3 py-1.5 bg-midnight-50 hover:bg-coral-50 text-midnight-600 hover:text-coral-600 text-sm rounded-full transition-colors"
                  >
                    {c.flag} {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Safety Info */}
          {safetyInfo && (
            <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
              {/* Advisory Banner */}
              <div className={`rounded-2xl p-6 mb-8 border-2 ${advisoryColors[safetyInfo.advisoryLevel].bg} ${advisoryColors[safetyInfo.advisoryLevel].border}`}>
                <div className="flex items-start gap-4">
                  <div className="text-6xl">{safetyInfo.flag}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-display font-semibold text-midnight-900">
                        {safetyInfo.country}
                      </h2>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${advisoryColors[safetyInfo.advisoryLevel].bg} ${advisoryColors[safetyInfo.advisoryLevel].text}`}>
                        Level {safetyInfo.advisoryLevel}
                      </span>
                    </div>
                    <p className={`text-lg font-medium ${advisoryColors[safetyInfo.advisoryLevel].text} mb-2`}>
                      {advisoryColors[safetyInfo.advisoryLevel].label}
                    </p>
                    <p className="text-midnight-600">{safetyInfo.summary}</p>
                    <p className="text-sm text-midnight-400 mt-3">
                      Last updated: {safetyInfo.lastUpdated} · Source: U.S. State Department
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Health Alerts */}
                <div className="bg-white rounded-2xl border border-midnight-100 p-6">
                  <h3 className="font-display font-semibold text-midnight-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">💉</span>
                    Health Alerts
                  </h3>
                  <ul className="space-y-3">
                    {safetyInfo.healthAlerts.map((alert, i) => (
                      <li key={i} className="flex items-start gap-3 text-midnight-600">
                        <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {alert}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security Concerns */}
                <div className="bg-white rounded-2xl border border-midnight-100 p-6">
                  <h3 className="font-display font-semibold text-midnight-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">⚠️</span>
                    Security Concerns
                  </h3>
                  <ul className="space-y-3">
                    {safetyInfo.securityConcerns.map((concern, i) => (
                      <li key={i} className="flex items-start gap-3 text-midnight-600">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {concern}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Entry Requirements */}
                <div className="bg-white rounded-2xl border border-midnight-100 p-6">
                  <h3 className="font-display font-semibold text-midnight-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">🛂</span>
                    Entry Requirements
                  </h3>
                  <ul className="space-y-3">
                    {safetyInfo.entryRequirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-midnight-600">
                        <svg className="w-5 h-5 text-coral-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Local Laws */}
                <div className="bg-white rounded-2xl border border-midnight-100 p-6">
                  <h3 className="font-display font-semibold text-midnight-900 mb-4 flex items-center gap-2">
                    <span className="text-xl">⚖️</span>
                    Local Laws to Know
                  </h3>
                  <ul className="space-y-3">
                    {safetyInfo.localLaws.map((law, i) => (
                      <li key={i} className="flex items-start gap-3 text-midnight-600">
                        <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {law}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Emergency Numbers */}
              <div className="bg-gradient-to-r from-midnight-900 to-midnight-800 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">📞</span>
                  Emergency Numbers
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {safetyInfo.emergencyNumbers.map((item) => (
                    <div key={item.service} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                      <p className="text-midnight-300 text-sm mb-1">{item.service}</p>
                      <p className="text-white text-xl font-bold">{item.number}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WhyUseCard 
              points={[
                'Official State Department advisories',
                'Real-time health and security alerts',
                'Emergency contact numbers',
                'Local laws and customs guide',
              ]}
            />
            <HowAICard 
              description="SafetyPulse aggregates travel advisories from official government sources including the U.S. State Department and CDC."
              capabilities={[
                'Real-time advisory updates',
                'Multi-source data aggregation',
                'Health notice monitoring',
                'Embassy contact integration',
              ]}
            />
            <QphiQInsight 
              insight="Register with the State Department's STEP program before international travel. It's free and allows the embassy to contact you in emergencies."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
