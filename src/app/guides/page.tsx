'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface LocalGuide {
  category: string;
  icon: string;
  items: {
    name: string;
    description: string;
    priceRange: string;
    rating: number;
    insiderTip: string;
    bookable?: boolean;
  }[];
}

const tokyoGuide: LocalGuide[] = [
  {
    category: 'Hidden Gems',
    icon: '💎',
    items: [
      { name: 'Yanaka Ginza', description: 'Old-school shopping street that escaped WWII bombing, full of traditional crafts and street food', priceRange: 'Free', rating: 4.8, insiderTip: 'Visit at sunset when the "Yuyake Dandan" stairs glow orange' },
      { name: 'Shimokitazawa', description: 'Bohemian neighborhood with vintage shops, indie theaters, and hole-in-the-wall bars', priceRange: '$-$$', rating: 4.7, insiderTip: 'Best on weekday afternoons when shops are less crowded' },
      { name: 'Kiyosumi Garden', description: 'Serene traditional garden away from tourist crowds, stunning rock arrangements', priceRange: '$', rating: 4.6, insiderTip: 'Combine with nearby Blue Bottle Coffee original Japan location' },
    ],
  },
  {
    category: 'Local Eats',
    icon: '🍜',
    items: [
      { name: 'Fuunji', description: 'Legendary tsukemen (dipping ramen) spot — expect a line but worth every minute', priceRange: '$$', rating: 4.9, insiderTip: 'Order "tokumori" for extra noodles, same price' },
      { name: 'Ginza Kyubey', description: 'Where Tokyo\'s elite eat sushi. Omakase experience at the counter is unforgettable', priceRange: '$$$$', rating: 4.9, insiderTip: 'Lunch is half the price of dinner, same quality', bookable: true },
      { name: 'Omoide Yokocho', description: 'Atmospheric alley of tiny yakitori bars under the train tracks in Shinjuku', priceRange: '$-$$', rating: 4.5, insiderTip: 'Start with "torikawa" (chicken skin) — the local test' },
    ],
  },
  {
    category: 'Experiences',
    icon: '🎌',
    items: [
      { name: 'TeamLab Borderless', description: 'Immersive digital art museum — one of Tokyo\'s most unique attractions', priceRange: '$$$', rating: 4.8, insiderTip: 'Book tickets 2+ weeks ahead, go on weekday mornings', bookable: true },
      { name: 'Sumo Morning Practice', description: 'Watch sumo wrestlers train at a "heya" (stable) — authentic and free with reservation', priceRange: 'Free', rating: 4.9, insiderTip: 'Email stables directly, be silent and respectful', bookable: true },
      { name: 'Sake Tasting in Nihonbashi', description: 'Sample premium sake from across Japan at curated tasting rooms', priceRange: '$$', rating: 4.6, insiderTip: 'Ask for "junmai daiginjo" — the premium tier' },
    ],
  },
  {
    category: 'Neighborhoods',
    icon: '🏙️',
    items: [
      { name: 'Nakameguro', description: 'Hip area along a canal, best in cherry blossom season, great cafes and boutiques', priceRange: '$$', rating: 4.7, insiderTip: 'Evening canal walk during sakura season is magical' },
      { name: 'Koenji', description: 'Punk rock history, vintage shopping, and authentic izakayas', priceRange: '$-$$', rating: 4.5, insiderTip: 'Visit during Awa Odori festival in August' },
      { name: 'Daikanyama', description: 'Tokyo\'s Brooklyn — designer boutiques, Tsutaya Books, and upscale vibes', priceRange: '$$$', rating: 4.6, insiderTip: 'Tsutaya Books is open until 2am and has a bar' },
    ],
  },
];

export default function GuidesPage() {
  const [destination, setDestination] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [guide, setGuide] = useState<LocalGuide[] | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const popularDestinations = ['Tokyo', 'Paris', 'Barcelona', 'Bali', 'New York', 'Lisbon'];

  const handleSearch = async (dest?: string) => {
    const searchDest = dest || destination;
    if (!searchDest.trim()) return;
    
    setDestination(searchDest);
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setGuide(tokyoGuide);
    setIsSearching(false);
  };

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="📍"
            name="LocalLens"
            tagline="Destination Intelligence"
            description="Go beyond TripAdvisor. Get insider guides with hidden gems, local favorites, and bookable experiences curated by people who actually live there."
          />

          {/* Search */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              <label className="block text-lg font-display font-medium text-midnight-900 mb-4">
                Where are you headed?
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter a city or destination..."
                  className="flex-1 px-6 py-4 bg-midnight-50 border border-midnight-200 rounded-xl text-lg text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={() => handleSearch()}
                  disabled={isSearching}
                  className="px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {isSearching ? 'Loading...' : 'Explore'}
                </button>
              </div>

              {/* Popular Destinations */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-midnight-500">Popular:</span>
                {popularDestinations.map((dest) => (
                  <button
                    key={dest}
                    onClick={() => handleSearch(dest)}
                    className="px-4 py-1.5 bg-midnight-50 hover:bg-coral-50 text-midnight-600 hover:text-coral-600 text-sm rounded-full transition-colors"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Guide Results */}
          {guide && (
            <div className="mb-16 animate-fade-in">
              {/* Destination Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-display font-semibold text-midnight-900 mb-2">
                  {destination} Local Guide
                </h2>
                <p className="text-midnight-500">
                  Curated by locals and frequent visitors • Updated December 2024
                </p>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
                {guide.map((category, i) => (
                  <button
                    key={category.category}
                    onClick={() => setActiveCategory(i)}
                    className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                      activeCategory === i 
                        ? 'bg-coral-500 text-white shadow-lg shadow-coral-400/25' 
                        : 'bg-white text-midnight-600 hover:bg-coral-50 border border-midnight-100'
                    }`}
                  >
                    <span>{category.icon}</span>
                    {category.category}
                  </button>
                ))}
              </div>

              {/* Category Content */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guide[activeCategory].items.map((item) => (
                  <div 
                    key={item.name}
                    className="bg-white rounded-2xl border border-midnight-100 overflow-hidden hover:shadow-card-hover hover:border-coral-200 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-display font-semibold text-midnight-900">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1 px-2 py-1 bg-coral-50 rounded-lg">
                          <span className="text-coral-500 text-sm">★</span>
                          <span className="text-sm font-medium text-coral-700">{item.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-midnight-600 text-sm mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm text-midnight-500">
                          💰 {item.priceRange}
                        </span>
                      </div>

                      {/* Insider Tip */}
                      <div className="p-3 bg-gold-50 rounded-xl mb-4">
                        <p className="text-xs text-gold-800">
                          <span className="font-medium">💡 Insider Tip:</span> {item.insiderTip}
                        </p>
                      </div>

                      {item.bookable && (
                        <button className="w-full py-2 px-4 bg-coral-500 hover:bg-coral-600 text-white text-sm font-medium rounded-lg transition-colors">
                          Check Availability →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Download Guide CTA */}
              <div className="mt-12 bg-gradient-to-r from-midnight-900 to-midnight-800 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-coral-500/20 rounded-xl flex items-center justify-center text-2xl">
                    📱
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">Take this guide offline</p>
                    <p className="text-midnight-300">Download the PDF to access anywhere — no internet needed</p>
                  </div>
                </div>
                <button className="px-8 py-3 bg-white text-midnight-900 font-medium rounded-xl hover:bg-midnight-50 transition-colors">
                  Download PDF Guide
                </button>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WhyUseCard 
              points={[
                'Curated by locals, not algorithms',
                'Hidden gems not on TripAdvisor',
                'Insider tips you won\'t find elsewhere',
                'Bookable experiences with partners',
              ]}
            />
            <HowAICard 
              description="LocalLens combines AI curation with human expertise from locals and frequent travelers."
              capabilities={[
                'Local contributor network',
                'Real-time review analysis',
                'Seasonal recommendations',
                'Crowd-level predictions',
              ]}
            />
            <QphiQInsight 
              insight="For Tokyo first-timers: skip Shibuya Crossing at peak hours. Instead, view it from the Starbucks above (2nd floor) or visit at 6am when it's peacefully empty."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
