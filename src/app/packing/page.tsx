'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface PackingItem {
  name: string;
  quantity: number;
  category: string;
  essential: boolean;
  packed: boolean;
}

interface PackingList {
  destination: string;
  weather: string;
  temperature: string;
  categories: {
    name: string;
    icon: string;
    items: PackingItem[];
  }[];
}

export default function PackingPage() {
  const [destination, setDestination] = useState('');
  const [tripType, setTripType] = useState('leisure');
  const [duration, setDuration] = useState('7');
  const [travelDate, setTravelDate] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [packingList, setPackingList] = useState<PackingList | null>(null);
  const [packedItems, setPackedItems] = useState<Set<string>>(new Set());

  const activityOptions = [
    { id: 'beach', label: '🏖️ Beach', icon: '🏖️' },
    { id: 'hiking', label: '🥾 Hiking', icon: '🥾' },
    { id: 'business', label: '💼 Business', icon: '💼' },
    { id: 'nightlife', label: '🎉 Nightlife', icon: '🎉' },
    { id: 'photography', label: '📷 Photography', icon: '📷' },
    { id: 'winter-sports', label: '⛷️ Winter Sports', icon: '⛷️' },
  ];

  const handleGenerate = async () => {
    if (!destination) return;
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const demoList: PackingList = {
      destination: destination,
      weather: 'Partly Cloudy',
      temperature: '65-78°F (18-26°C)',
      categories: [
        {
          name: 'Clothing',
          icon: '👕',
          items: [
            { name: 'T-shirts', quantity: parseInt(duration), category: 'Clothing', essential: true, packed: false },
            { name: 'Pants/Shorts', quantity: Math.ceil(parseInt(duration) / 2), category: 'Clothing', essential: true, packed: false },
            { name: 'Underwear', quantity: parseInt(duration) + 2, category: 'Clothing', essential: true, packed: false },
            { name: 'Socks', quantity: parseInt(duration), category: 'Clothing', essential: true, packed: false },
            { name: 'Light jacket', quantity: 1, category: 'Clothing', essential: true, packed: false },
            { name: 'Comfortable walking shoes', quantity: 1, category: 'Clothing', essential: true, packed: false },
            { name: 'Sandals/flip-flops', quantity: 1, category: 'Clothing', essential: false, packed: false },
          ],
        },
        {
          name: 'Toiletries',
          icon: '🧴',
          items: [
            { name: 'Toothbrush & toothpaste', quantity: 1, category: 'Toiletries', essential: true, packed: false },
            { name: 'Deodorant', quantity: 1, category: 'Toiletries', essential: true, packed: false },
            { name: 'Shampoo (travel size)', quantity: 1, category: 'Toiletries', essential: true, packed: false },
            { name: 'Sunscreen', quantity: 1, category: 'Toiletries', essential: true, packed: false },
            { name: 'Razor', quantity: 1, category: 'Toiletries', essential: false, packed: false },
            { name: 'Medications', quantity: 1, category: 'Toiletries', essential: true, packed: false },
          ],
        },
        {
          name: 'Electronics',
          icon: '📱',
          items: [
            { name: 'Phone + charger', quantity: 1, category: 'Electronics', essential: true, packed: false },
            { name: 'Power adapter', quantity: 1, category: 'Electronics', essential: true, packed: false },
            { name: 'Portable battery pack', quantity: 1, category: 'Electronics', essential: false, packed: false },
            { name: 'Camera', quantity: 1, category: 'Electronics', essential: false, packed: false },
            { name: 'Headphones', quantity: 1, category: 'Electronics', essential: false, packed: false },
          ],
        },
        {
          name: 'Documents',
          icon: '📄',
          items: [
            { name: 'Passport', quantity: 1, category: 'Documents', essential: true, packed: false },
            { name: 'Travel insurance docs', quantity: 1, category: 'Documents', essential: true, packed: false },
            { name: 'Hotel confirmations', quantity: 1, category: 'Documents', essential: true, packed: false },
            { name: 'Credit cards', quantity: 2, category: 'Documents', essential: true, packed: false },
            { name: 'Emergency contacts list', quantity: 1, category: 'Documents', essential: true, packed: false },
          ],
        },
        {
          name: 'Miscellaneous',
          icon: '🎒',
          items: [
            { name: 'Day bag/backpack', quantity: 1, category: 'Miscellaneous', essential: true, packed: false },
            { name: 'Reusable water bottle', quantity: 1, category: 'Miscellaneous', essential: false, packed: false },
            { name: 'Travel pillow', quantity: 1, category: 'Miscellaneous', essential: false, packed: false },
            { name: 'Snacks', quantity: 1, category: 'Miscellaneous', essential: false, packed: false },
          ],
        },
      ],
    };

    // Add activity-specific items
    if (activities.includes('beach')) {
      demoList.categories[0].items.push(
        { name: 'Swimsuit', quantity: 2, category: 'Clothing', essential: true, packed: false },
        { name: 'Beach towel', quantity: 1, category: 'Clothing', essential: false, packed: false }
      );
    }
    if (activities.includes('hiking')) {
      demoList.categories[0].items.push(
        { name: 'Hiking boots', quantity: 1, category: 'Clothing', essential: true, packed: false },
        { name: 'Quick-dry clothing', quantity: 2, category: 'Clothing', essential: true, packed: false }
      );
    }

    setPackingList(demoList);
    setIsGenerating(false);
  };

  const togglePacked = (itemName: string) => {
    setPackedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  const totalItems = packingList?.categories.reduce((sum, cat) => sum + cat.items.length, 0) || 0;
  const packedCount = packedItems.size;
  const progressPercent = totalItems > 0 ? Math.round((packedCount / totalItems) * 100) : 0;

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🎒"
            name="PackSmart"
            tagline="AI Packing Assistant"
            description="Get a personalized packing list based on your destination, weather, trip type, and planned activities."
          />

          {/* Input Form */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Tokyo, Japan"
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Trip Type</label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    <option value="leisure">🏖️ Leisure</option>
                    <option value="business">💼 Business</option>
                    <option value="adventure">🏔️ Adventure</option>
                    <option value="backpacking">🎒 Backpacking</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    <option value="3">3 days</option>
                    <option value="5">5 days</option>
                    <option value="7">1 week</option>
                    <option value="14">2 weeks</option>
                    <option value="21">3 weeks</option>
                    <option value="30">1 month</option>
                  </select>
                </div>
              </div>

              {/* Activities */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight-600 mb-3">Planned Activities</label>
                <div className="flex flex-wrap gap-2">
                  {activityOptions.map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => setActivities(prev => 
                        prev.includes(activity.id) 
                          ? prev.filter(a => a !== activity.id)
                          : [...prev, activity.id]
                      )}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activities.includes(activity.id)
                          ? 'bg-coral-500 text-white'
                          : 'bg-midnight-50 text-midnight-600 hover:bg-midnight-100'
                      }`}
                    >
                      {activity.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!destination || isGenerating}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:shadow-coral-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating Your List...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Generate Packing List
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Packing List */}
          {packingList && (
            <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
              {/* Weather & Progress */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">⛅</span>
                    <div>
                      <p className="text-teal-100 text-sm">Weather in {packingList.destination}</p>
                      <p className="text-2xl font-semibold">{packingList.weather}</p>
                      <p className="text-teal-100">{packingList.temperature}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-midnight-100 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-midnight-600">Packing Progress</span>
                    <span className="text-coral-500 font-semibold">{packedCount}/{totalItems} items</span>
                  </div>
                  <div className="h-3 bg-midnight-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-coral-400 to-coral-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-sm text-midnight-500 mt-2">
                    {progressPercent === 100 ? '🎉 All packed!' : `${100 - progressPercent}% left to pack`}
                  </p>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-6">
                {packingList.categories.map((category) => (
                  <div key={category.name} className="bg-white rounded-2xl border border-midnight-100 overflow-hidden">
                    <div className="px-6 py-4 bg-midnight-50 border-b border-midnight-100 flex items-center justify-between">
                      <h3 className="font-display font-semibold text-midnight-900 flex items-center gap-2">
                        <span className="text-xl">{category.icon}</span>
                        {category.name}
                      </h3>
                      <span className="text-sm text-midnight-500">
                        {category.items.filter(i => packedItems.has(i.name)).length}/{category.items.length}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="grid sm:grid-cols-2 gap-2">
                        {category.items.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => togglePacked(item.name)}
                            className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                              packedItems.has(item.name)
                                ? 'bg-teal-50 text-teal-700'
                                : 'bg-midnight-50 text-midnight-700 hover:bg-midnight-100'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              packedItems.has(item.name)
                                ? 'bg-teal-500 border-teal-500'
                                : 'border-midnight-300'
                            }`}>
                              {packedItems.has(item.name) && (
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <span className={packedItems.has(item.name) ? 'line-through' : ''}>
                              {item.name}
                              {item.quantity > 1 && <span className="text-midnight-400 ml-1">×{item.quantity}</span>}
                            </span>
                            {item.essential && (
                              <span className="ml-auto text-xs bg-coral-100 text-coral-600 px-2 py-0.5 rounded-full">
                                Essential
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <button className="px-6 py-3 bg-midnight-900 hover:bg-midnight-800 text-white font-medium rounded-xl transition-colors">
                  📥 Download PDF
                </button>
                <button className="px-6 py-3 bg-white border border-midnight-200 hover:border-coral-400 text-midnight-700 font-medium rounded-xl transition-colors">
                  ✉️ Email List
                </button>
                <button 
                  onClick={() => setPackedItems(new Set())}
                  className="px-6 py-3 bg-white border border-midnight-200 hover:border-midnight-300 text-midnight-500 font-medium rounded-xl transition-colors"
                >
                  ↻ Reset
                </button>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WhyUseCard 
              points={[
                'Weather-aware packing suggestions',
                'Activity-specific gear recommendations',
                'Interactive checklist with progress tracking',
                'Export to PDF or email',
              ]}
            />
            <HowAICard 
              description="PackSmart analyzes your destination's weather forecast and trip activities to generate a personalized packing list."
              capabilities={[
                'Weather forecast integration',
                'Activity-based recommendations',
                'Quantity optimization',
                'Carry-on vs checked suggestions',
              ]}
            />
            <QphiQInsight 
              insight="Roll clothes instead of folding to save space and reduce wrinkles. Packing cubes are a game-changer for organization — color code by outfit or day."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
