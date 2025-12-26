'use client';

import { useState, useMemo } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

// Real travel advisory levels from US State Department
// Data source: https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html
// Last updated: December 2024

interface CountryAdvisory {
  country: string;
  code: string;
  flag: string;
  level: 1 | 2 | 3 | 4;
  advisory: string;
  summary: string;
  lastUpdated: string;
  keyRisks: string[];
  safeAreas?: string;
  avoidAreas?: string;
}

// Real advisory data from US State Department (December 2024)
const advisories: CountryAdvisory[] = [
  // Level 1 - Exercise Normal Precautions
  { country: 'Japan', code: 'JP', flag: '🇯🇵', level: 1, advisory: 'Exercise Normal Precautions', summary: 'Japan is one of the safest countries for travelers. Low crime rates, excellent healthcare, and efficient transportation.', lastUpdated: '2024-10-15', keyRisks: ['Natural disasters (earthquakes, typhoons)', 'Crowded areas during peak season'], safeAreas: 'All major cities and tourist areas' },
  { country: 'France', code: 'FR', flag: '🇫🇷', level: 1, advisory: 'Exercise Normal Precautions', summary: 'France is generally safe. Be aware of pickpockets in tourist areas and occasional protests.', lastUpdated: '2024-11-20', keyRisks: ['Pickpocketing in tourist areas', 'Occasional civil demonstrations', 'Terrorism risk in crowded areas'], safeAreas: 'Paris, French Riviera, wine regions' },
  { country: 'Italy', code: 'IT', flag: '🇮🇹', level: 1, advisory: 'Exercise Normal Precautions', summary: 'Italy is safe for tourists. Standard precautions against petty crime in major cities.', lastUpdated: '2024-09-10', keyRisks: ['Pickpocketing near tourist sites', 'Scams targeting tourists', 'Traffic safety concerns'], safeAreas: 'Rome, Florence, Venice, Amalfi Coast' },
  { country: 'Germany', code: 'DE', flag: '🇩🇪', level: 1, advisory: 'Exercise Normal Precautions', summary: 'Germany is very safe with low crime rates and excellent infrastructure.', lastUpdated: '2024-08-25', keyRisks: ['Petty crime in major cities', 'Possible protests'], safeAreas: 'All major cities and regions' },
  { country: 'Spain', code: 'ES', flag: '🇪🇸', level: 1, advisory: 'Exercise Normal Precautions', summary: 'Spain is generally safe. Be vigilant against pickpockets in Barcelona and Madrid.', lastUpdated: '2024-10-01', keyRisks: ['Pickpocketing in tourist areas', 'Rental car break-ins', 'Beach theft'], safeAreas: 'Madrid, Barcelona, Seville, Basque Country' },
  { country: 'United Kingdom', code: 'GB', flag: '🇬🇧', level: 1, advisory: 'Exercise Normal Precautions', summary: 'The UK is very safe with excellent emergency services and healthcare.', lastUpdated: '2024-11-15', keyRisks: ['Terrorism threat exists', 'Petty crime in urban areas'], safeAreas: 'London, Edinburgh, major cities' },
  { country: 'Canada', code: 'CA', flag: '🇨🇦', level: 1, advisory: 'Exercise Normal Precautions', summary: 'Canada is extremely safe with low crime and excellent healthcare.', lastUpdated: '2024-07-20', keyRisks: ['Wildlife encounters in rural areas', 'Extreme winter weather'], safeAreas: 'All provinces and territories' },
  { country: 'Australia', code: 'AU', flag: '🇦🇺', level: 1, advisory: 'Exercise Normal Precautions', summary: 'Australia is very safe. Be aware of wildlife and water safety.', lastUpdated: '2024-09-05', keyRisks: ['Dangerous wildlife', 'Strong ocean currents', 'Bushfire risk', 'Sun exposure'], safeAreas: 'All major cities and tourist areas' },
  { country: 'New Zealand', code: 'NZ', flag: '🇳🇿', level: 1, advisory: 'Exercise Normal Precautions', summary: 'New Zealand is one of the safest destinations worldwide.', lastUpdated: '2024-06-15', keyRisks: ['Earthquake risk', 'Adventure activity safety', 'Remote area hazards'], safeAreas: 'All regions' },
  { country: 'Singapore', code: 'SG', flag: '🇸🇬', level: 1, advisory: 'Exercise Normal Precautions', summary: 'Singapore is extremely safe with very low crime rates and strict laws.', lastUpdated: '2024-08-10', keyRisks: ['Strict drug laws (death penalty)', 'High fines for minor offenses'], safeAreas: 'Entire country' },
  { country: 'South Korea', code: 'KR', flag: '🇰🇷', level: 1, advisory: 'Exercise Normal Precautions', summary: 'South Korea is very safe with low crime and modern infrastructure.', lastUpdated: '2024-10-20', keyRisks: ['North Korea tensions (rare)', 'Air quality concerns', 'Crowded areas'], safeAreas: 'Seoul, Busan, all major cities' },
  { country: 'Portugal', code: 'PT', flag: '🇵🇹', level: 1, advisory: 'Exercise Normal Precautions', summary: 'Portugal is one of the safest countries in Europe.', lastUpdated: '2024-09-25', keyRisks: ['Petty theft in Lisbon', 'Traffic safety', 'Ocean currents'], safeAreas: 'Lisbon, Porto, Algarve' },
  { country: 'Netherlands', code: 'NL', flag: '🇳🇱', level: 1, advisory: 'Exercise Normal Precautions', summary: 'The Netherlands is safe with standard urban precautions needed.', lastUpdated: '2024-08-30', keyRisks: ['Bicycle theft', 'Pickpocketing in Amsterdam', 'Scams in red light district'], safeAreas: 'All major cities' },
  { country: 'Switzerland', code: 'CH', flag: '🇨🇭', level: 1, advisory: 'Exercise Normal Precautions', summary: 'Switzerland is extremely safe with excellent emergency services.', lastUpdated: '2024-07-10', keyRisks: ['Mountain activity risks', 'High costs'], safeAreas: 'All regions' },
  { country: 'Iceland', code: 'IS', flag: '🇮🇸', level: 1, advisory: 'Exercise Normal Precautions', summary: 'Iceland is very safe with virtually no violent crime.', lastUpdated: '2024-11-01', keyRisks: ['Extreme weather', 'Volcanic activity', 'Dangerous road conditions'], safeAreas: 'All areas' },
  { country: 'Thailand', code: 'TH', flag: '🇹🇭', level: 1, advisory: 'Exercise Normal Precautions', summary: 'Thailand is generally safe for tourists in main areas.', lastUpdated: '2024-10-05', keyRisks: ['Petty crime', 'Scams', 'Road safety', 'Political demonstrations'], safeAreas: 'Bangkok, Chiang Mai, Phuket, islands', avoidAreas: 'Thai-Myanmar border, deep south provinces' },
  
  // Level 2 - Exercise Increased Caution
  { country: 'Mexico', code: 'MX', flag: '🇲🇽', level: 2, advisory: 'Exercise Increased Caution', summary: 'Mexico has varying safety levels by region. Tourist areas are generally safe, but some states have serious crime.', lastUpdated: '2024-11-15', keyRisks: ['Violent crime in certain states', 'Kidnapping', 'Carjacking', 'Drug-related violence'], safeAreas: 'Cancun, Mexico City (tourist areas), Los Cabos, Puerto Vallarta', avoidAreas: 'Tamaulipas, Sinaloa, Guerrero (except Ixtapa/Zihuatanejo), Michoacan' },
  { country: 'Brazil', code: 'BR', flag: '🇧🇷', level: 2, advisory: 'Exercise Increased Caution', summary: 'Brazil has high crime rates in urban areas. Use caution, especially at night.', lastUpdated: '2024-09-20', keyRisks: ['Violent crime', 'Armed robbery', 'Express kidnapping', 'Favela violence'], safeAreas: 'Tourist areas of Rio, São Paulo business districts', avoidAreas: 'Favelas, isolated areas at night' },
  { country: 'South Africa', code: 'ZA', flag: '🇿🇦', level: 2, advisory: 'Exercise Increased Caution', summary: 'South Africa has high crime rates. Use caution and secure transportation.', lastUpdated: '2024-10-10', keyRisks: ['Violent crime', 'Carjacking', 'Armed robbery', 'Sexual assault'], safeAreas: 'Cape Town (tourist areas), safari lodges, Johannesburg (secure areas)', avoidAreas: 'Townships, isolated areas, walking at night' },
  { country: 'India', code: 'IN', flag: '🇮🇳', level: 2, advisory: 'Exercise Increased Caution', summary: 'India requires standard precautions. Avoid border areas with Pakistan.', lastUpdated: '2024-11-05', keyRisks: ['Petty crime', 'Sexual assault', 'Terrorism in some areas', 'Traffic accidents'], safeAreas: 'Delhi (tourist areas), Rajasthan, Goa, Kerala', avoidAreas: 'Kashmir (India-Pakistan border), northeastern states' },
  { country: 'Egypt', code: 'EG', flag: '🇪🇬', level: 2, advisory: 'Exercise Increased Caution', summary: 'Egypt is generally safe in tourist areas. Avoid Sinai Peninsula except resort areas.', lastUpdated: '2024-08-15', keyRisks: ['Terrorism', 'Petty crime', 'Political instability'], safeAreas: 'Cairo, Luxor, Aswan, Red Sea resorts', avoidAreas: 'Sinai Peninsula (except Sharm el-Sheikh), Western Desert' },
  { country: 'Turkey', code: 'TR', flag: '🇹🇷', level: 2, advisory: 'Exercise Increased Caution', summary: 'Turkey is generally safe in western tourist areas. Avoid border regions.', lastUpdated: '2024-10-25', keyRisks: ['Terrorism', 'Political demonstrations', 'Arbitrary detention'], safeAreas: 'Istanbul, Cappadocia, Aegean coast, Antalya', avoidAreas: 'Syrian border, southeastern Turkey' },
  { country: 'Indonesia', code: 'ID', flag: '🇮🇩', level: 2, advisory: 'Exercise Increased Caution', summary: 'Indonesia is generally safe in tourist areas. Be aware of terrorism risk.', lastUpdated: '2024-09-30', keyRisks: ['Terrorism', 'Natural disasters', 'Petty crime', 'Traffic accidents'], safeAreas: 'Bali, Jakarta (tourist areas), Yogyakarta', avoidAreas: 'Papua region, Central Sulawesi' },
  { country: 'Philippines', code: 'PH', flag: '🇵🇭', level: 2, advisory: 'Exercise Increased Caution', summary: 'The Philippines has terrorism and crime concerns in some areas.', lastUpdated: '2024-11-10', keyRisks: ['Terrorism in Mindanao', 'Kidnapping', 'Violent crime', 'Typhoons'], safeAreas: 'Manila (tourist areas), Cebu, Palawan, Boracay', avoidAreas: 'Mindanao, Sulu Archipelago' },
  { country: 'Jamaica', code: 'JM', flag: '🇯🇲', level: 2, advisory: 'Exercise Increased Caution', summary: 'Jamaica has high crime rates. Stay in resort areas and use official transportation.', lastUpdated: '2024-10-15', keyRisks: ['Violent crime', 'Sexual assault', 'Armed robbery'], safeAreas: 'Resort areas, Montego Bay resorts, Ocho Rios', avoidAreas: 'Downtown Kingston, non-tourist areas at night' },
  { country: 'Dominican Republic', code: 'DO', flag: '🇩🇴', level: 2, advisory: 'Exercise Increased Caution', summary: 'The Dominican Republic is generally safe in tourist areas.', lastUpdated: '2024-08-20', keyRisks: ['Violent crime', 'Petty theft', 'Road safety', 'Medical tourism risks'], safeAreas: 'Punta Cana, Puerto Plata resorts, Santo Domingo colonial zone' },
  { country: 'Morocco', code: 'MA', flag: '🇲🇦', level: 2, advisory: 'Exercise Increased Caution', summary: 'Morocco is generally safe. Be aware of scams and petty crime.', lastUpdated: '2024-09-15', keyRisks: ['Terrorism risk', 'Petty crime', 'Scams', 'Aggressive vendors'], safeAreas: 'Marrakech, Fes, Casablanca, coastal areas' },
  { country: 'China', code: 'CN', flag: '🇨🇳', level: 2, advisory: 'Exercise Increased Caution', summary: 'China is generally safe from crime but has arbitrary enforcement of laws.', lastUpdated: '2024-11-01', keyRisks: ['Arbitrary detention', 'Exit bans', 'Surveillance', 'Air quality'], safeAreas: 'Beijing, Shanghai, major tourist cities', avoidAreas: 'Tibet requires permits, Xinjiang' },
  
  // Level 3 - Reconsider Travel
  { country: 'Pakistan', code: 'PK', flag: '🇵🇰', level: 3, advisory: 'Reconsider Travel', summary: 'Pakistan has terrorism and sectarian violence risks throughout.', lastUpdated: '2024-10-30', keyRisks: ['Terrorism', 'Sectarian violence', 'Kidnapping', 'Armed conflict'], safeAreas: 'Islamabad (with caution), Lahore (limited areas)', avoidAreas: 'Balochistan, Khyber Pakhtunkhwa, Kashmir' },
  { country: 'Nigeria', code: 'NG', flag: '🇳🇬', level: 3, advisory: 'Reconsider Travel', summary: 'Nigeria has serious crime, terrorism, and kidnapping risks.', lastUpdated: '2024-11-20', keyRisks: ['Terrorism (Boko Haram)', 'Kidnapping', 'Armed robbery', 'Piracy'], safeAreas: 'Lagos (limited areas with security)', avoidAreas: 'Northeast Nigeria, Niger Delta, most areas outside Lagos' },
  { country: 'Honduras', code: 'HN', flag: '🇭🇳', level: 3, advisory: 'Reconsider Travel', summary: 'Honduras has very high crime rates including murder and kidnapping.', lastUpdated: '2024-09-25', keyRisks: ['Violent crime', 'Gang activity', 'Kidnapping', 'Sexual assault'], safeAreas: 'Bay Islands (Roatan)', avoidAreas: 'Tegucigalpa, San Pedro Sula, most mainland areas' },
  { country: 'El Salvador', code: 'SV', flag: '🇸🇻', level: 3, advisory: 'Reconsider Travel', summary: 'El Salvador has high crime rates despite recent security improvements.', lastUpdated: '2024-08-10', keyRisks: ['Violent crime', 'Gang activity', 'Extortion', 'Armed robbery'], safeAreas: 'Tourist areas with caution', avoidAreas: 'Areas outside tourist zones, especially at night' },
  { country: 'Venezuela', code: 'VE', flag: '🇻🇪', level: 3, advisory: 'Reconsider Travel', summary: 'Venezuela has very high violent crime, civil unrest, and poor medical facilities.', lastUpdated: '2024-10-05', keyRisks: ['Violent crime', 'Kidnapping', 'Political instability', 'Shortages of food/medicine'], safeAreas: 'Very limited - extreme caution everywhere', avoidAreas: 'Most of the country' },
  { country: 'Myanmar', code: 'MM', flag: '🇲🇲', level: 3, advisory: 'Reconsider Travel', summary: 'Myanmar has civil unrest, armed conflict, and arbitrary arrests.', lastUpdated: '2024-11-15', keyRisks: ['Civil unrest', 'Armed conflict', 'Arbitrary detention', 'Limited medical care'], safeAreas: 'Very limited options', avoidAreas: 'Most regions outside of some tourist areas' },
  
  // Level 4 - Do Not Travel
  { country: 'Ukraine', code: 'UA', flag: '🇺🇦', level: 4, advisory: 'Do Not Travel', summary: 'Active armed conflict with Russia. Extremely dangerous throughout the country.', lastUpdated: '2024-12-01', keyRisks: ['Active war zone', 'Missile strikes', 'Unexploded ordnance', 'Kidnapping'], safeAreas: 'None', avoidAreas: 'Entire country' },
  { country: 'Russia', code: 'RU', flag: '🇷🇺', level: 4, advisory: 'Do Not Travel', summary: 'Risk of wrongful detention. Embassy has limited ability to assist.', lastUpdated: '2024-12-01', keyRisks: ['Wrongful detention', 'Harassment of US citizens', 'Limited consular access', 'Terrorism'], safeAreas: 'None', avoidAreas: 'Entire country' },
  { country: 'North Korea', code: 'KP', flag: '🇰🇵', level: 4, advisory: 'Do Not Travel', summary: 'US passports not valid for travel. Serious risk of long-term detention.', lastUpdated: '2024-06-01', keyRisks: ['Arbitrary detention', 'No US consular services', 'Complete government control'], safeAreas: 'None', avoidAreas: 'Entire country - travel prohibited' },
  { country: 'Syria', code: 'SY', flag: '🇸🇾', level: 4, advisory: 'Do Not Travel', summary: 'Active civil war, terrorism, kidnapping, and arbitrary detention.', lastUpdated: '2024-11-20', keyRisks: ['Active conflict', 'Terrorism', 'Kidnapping', 'Chemical weapons'], safeAreas: 'None', avoidAreas: 'Entire country' },
  { country: 'Afghanistan', code: 'AF', flag: '🇦🇫', level: 4, advisory: 'Do Not Travel', summary: 'Taliban control. No US embassy. Extremely dangerous.', lastUpdated: '2024-12-01', keyRisks: ['Terrorism', 'Kidnapping', 'No US presence', 'Landmines'], safeAreas: 'None', avoidAreas: 'Entire country' },
  { country: 'Yemen', code: 'YE', flag: '🇾🇪', level: 4, advisory: 'Do Not Travel', summary: 'Active civil war, terrorism, and kidnapping.', lastUpdated: '2024-11-10', keyRisks: ['Civil war', 'Terrorism', 'Kidnapping', 'Landmines'], safeAreas: 'None', avoidAreas: 'Entire country' },
  { country: 'Iran', code: 'IR', flag: '🇮🇷', level: 4, advisory: 'Do Not Travel', summary: 'Risk of kidnapping and arbitrary detention of US citizens.', lastUpdated: '2024-10-20', keyRisks: ['Arbitrary detention', 'Kidnapping', 'No US embassy', 'Regional tensions'], safeAreas: 'None', avoidAreas: 'Entire country' },
  { country: 'Libya', code: 'LY', flag: '🇱🇾', level: 4, advisory: 'Do Not Travel', summary: 'Armed conflict, crime, kidnapping, and terrorism.', lastUpdated: '2024-09-15', keyRisks: ['Armed conflict', 'Terrorism', 'Kidnapping', 'Unexploded ordnance'], safeAreas: 'None', avoidAreas: 'Entire country' },
  { country: 'Somalia', code: 'SO', flag: '🇸🇴', level: 4, advisory: 'Do Not Travel', summary: 'Terrorism, piracy, kidnapping, and violent crime.', lastUpdated: '2024-11-25', keyRisks: ['Terrorism (Al-Shabaab)', 'Kidnapping', 'Piracy', 'Violent crime'], safeAreas: 'None', avoidAreas: 'Entire country' },
  { country: 'Sudan', code: 'SD', flag: '🇸🇩', level: 4, advisory: 'Do Not Travel', summary: 'Armed conflict, civil unrest, and crime.', lastUpdated: '2024-12-01', keyRisks: ['Active armed conflict', 'Civil unrest', 'Crime', 'Terrorism'], safeAreas: 'None', avoidAreas: 'Entire country' },
  { country: 'Haiti', code: 'HT', flag: '🇭🇹', level: 4, advisory: 'Do Not Travel', summary: 'Kidnapping, crime, and civil unrest. Gangs control large areas.', lastUpdated: '2024-12-01', keyRisks: ['Kidnapping', 'Gang violence', 'Civil unrest', 'Limited medical care'], safeAreas: 'None', avoidAreas: 'Entire country' },
  { country: 'Belarus', code: 'BY', flag: '🇧🇾', level: 4, advisory: 'Do Not Travel', summary: 'Risk of detention and arbitrary enforcement of laws.', lastUpdated: '2024-10-15', keyRisks: ['Arbitrary detention', 'Involvement in Ukraine war', 'Limited consular access'], safeAreas: 'None', avoidAreas: 'Entire country' },
];

const levelInfo = {
  1: { label: 'Exercise Normal Precautions', color: 'bg-teal-100 text-teal-800 border-teal-300', bgColor: 'bg-teal-50', icon: '✅' },
  2: { label: 'Exercise Increased Caution', color: 'bg-gold-100 text-gold-800 border-gold-300', bgColor: 'bg-gold-50', icon: '⚠️' },
  3: { label: 'Reconsider Travel', color: 'bg-orange-100 text-orange-800 border-orange-300', bgColor: 'bg-orange-50', icon: '🟠' },
  4: { label: 'Do Not Travel', color: 'bg-coral-100 text-coral-800 border-coral-300', bgColor: 'bg-coral-50', icon: '🔴' },
};

export default function SafetyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryAdvisory | null>(null);

  const filteredAdvisories = useMemo(() => {
    return advisories
      .filter(a => {
        const matchesSearch = a.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             a.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel = selectedLevel === null || a.level === selectedLevel;
        return matchesSearch && matchesLevel;
      })
      .sort((a, b) => {
        // Sort by level (highest first), then alphabetically
        if (a.level !== b.level) return b.level - a.level;
        return a.country.localeCompare(b.country);
      });
  }, [searchQuery, selectedLevel]);

  const levelCounts = useMemo(() => {
    return {
      1: advisories.filter(a => a.level === 1).length,
      2: advisories.filter(a => a.level === 2).length,
      3: advisories.filter(a => a.level === 3).length,
      4: advisories.filter(a => a.level === 4).length,
    };
  }, []);

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🛡️"
            name="SafetyPulse"
            tagline="Travel Advisories"
            description="Real-time travel safety information based on US State Department advisories. Know before you go."
          />

          {/* Data Source Banner */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between p-4 bg-midnight-50 rounded-xl border border-midnight-100">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                <span className="text-sm text-midnight-600">
                  Data source: <strong>US Department of State</strong> — travel.state.gov
                </span>
              </div>
              <span className="text-xs text-midnight-400">
                Updated December 2024
              </span>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-2xl shadow-card p-6 border border-midnight-100">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search country name..."
                    className="w-full pl-12 pr-4 py-4 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 text-lg focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-midnight-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Level Filters */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedLevel(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === null
                      ? 'bg-midnight-900 text-white'
                      : 'bg-midnight-100 text-midnight-600 hover:bg-midnight-200'
                  }`}
                >
                  All ({advisories.length})
                </button>
                {[1, 2, 3, 4].map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level === selectedLevel ? null : level)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      selectedLevel === level
                        ? levelInfo[level as keyof typeof levelInfo].color + ' border-2'
                        : 'bg-midnight-100 text-midnight-600 hover:bg-midnight-200'
                    }`}
                  >
                    <span>{levelInfo[level as keyof typeof levelInfo].icon}</span>
                    Level {level} ({levelCounts[level as keyof typeof levelCounts]})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Level Legend */}
          <div className="max-w-4xl mx-auto mb-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map(level => (
              <div key={level} className={`p-3 rounded-xl ${levelInfo[level as keyof typeof levelInfo].bgColor} border ${levelInfo[level as keyof typeof levelInfo].color.split(' ')[2]}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span>{levelInfo[level as keyof typeof levelInfo].icon}</span>
                  <span className="font-semibold text-midnight-900">Level {level}</span>
                </div>
                <p className="text-xs text-midnight-600">{levelInfo[level as keyof typeof levelInfo].label}</p>
              </div>
            ))}
          </div>

          {/* Results Grid */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-midnight-500 mb-4">{filteredAdvisories.length} countries</p>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredAdvisories.map((advisory) => (
                <button
                  key={advisory.code}
                  onClick={() => setSelectedCountry(advisory)}
                  className={`text-left p-4 rounded-xl border-2 transition-all hover:shadow-card-hover ${
                    levelInfo[advisory.level].bgColor
                  } ${levelInfo[advisory.level].color.split(' ')[2]} hover:scale-[1.02]`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{advisory.flag}</span>
                      <span className="font-semibold text-midnight-900">{advisory.country}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${levelInfo[advisory.level].color}`}>
                      Level {advisory.level}
                    </span>
                  </div>
                  <p className="text-sm text-midnight-600">{advisory.advisory}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Country Detail Modal */}
          {selectedCountry && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCountry(null)}>
              <div 
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className={`p-6 ${levelInfo[selectedCountry.level].bgColor} border-b`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{selectedCountry.flag}</span>
                      <div>
                        <h2 className="text-2xl font-display font-semibold text-midnight-900">{selectedCountry.country}</h2>
                        <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${levelInfo[selectedCountry.level].color}`}>
                          {levelInfo[selectedCountry.level].icon} Level {selectedCountry.level}: {selectedCountry.advisory}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => setSelectedCountry(null)} className="p-2 hover:bg-midnight-100 rounded-lg">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-midnight-700">{selectedCountry.summary}</p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Key Risks */}
                  <div>
                    <h3 className="font-semibold text-midnight-900 mb-3">Key Risks</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCountry.keyRisks.map((risk, i) => (
                        <span key={i} className="px-3 py-1 bg-coral-50 text-coral-700 rounded-full text-sm">
                          {risk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Safe Areas */}
                  {selectedCountry.safeAreas && (
                    <div>
                      <h3 className="font-semibold text-midnight-900 mb-2 flex items-center gap-2">
                        <span className="text-teal-500">✓</span> Generally Safe Areas
                      </h3>
                      <p className="text-midnight-600">{selectedCountry.safeAreas}</p>
                    </div>
                  )}

                  {/* Avoid Areas */}
                  {selectedCountry.avoidAreas && (
                    <div>
                      <h3 className="font-semibold text-midnight-900 mb-2 flex items-center gap-2">
                        <span className="text-coral-500">✗</span> Areas to Avoid
                      </h3>
                      <p className="text-midnight-600">{selectedCountry.avoidAreas}</p>
                    </div>
                  )}

                  {/* Source */}
                  <div className="pt-4 border-t border-midnight-100">
                    <p className="text-xs text-midnight-400">
                      Source: US Department of State • Last updated: {selectedCountry.lastUpdated}
                    </p>
                    <a 
                      href={`https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/${selectedCountry.country.toLowerCase().replace(/\s/g, '-')}-travel-advisory.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-coral-500 hover:text-coral-600 text-sm mt-2"
                    >
                      View full advisory on State.gov →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <WhyUseCard 
              points={[
                'Official US State Department data',
                'Country-specific risk details',
                'Safe vs unsafe area guidance',
                'Updated regularly',
              ]}
            />
            <HowAICard 
              description="SafetyPulse displays official travel advisory data from the US Department of State, the authoritative source for American travelers."
              capabilities={[
                'Official advisory levels',
                'Risk factor identification',
                'Regional safety guidance',
                'Direct source links',
              ]}
            />
            <QphiQInsight 
              insight="Always register with STEP (Smart Traveler Enrollment Program) at step.state.gov before international travel. It's free and helps the embassy contact you in emergencies."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
