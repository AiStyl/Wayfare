'use client';

import { useState, useMemo } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface PackingItem {
  id: string;
  name: string;
  category: string;
  essential: boolean;
  quantity: number;
  shopUrl?: string;
  shopName?: string;
}

type TripType = 'beach' | 'city' | 'adventure' | 'business' | 'winter' | 'backpacking';
type Climate = 'tropical' | 'temperate' | 'cold' | 'desert';
type Duration = '1-3' | '4-7' | '8-14' | '15+';

// Base packing items by category
const baseItems: Record<string, PackingItem[]> = {
  essentials: [
    { id: 'passport', name: 'Passport', category: 'Documents', essential: true, quantity: 1 },
    { id: 'id', name: 'ID / Driver\'s License', category: 'Documents', essential: true, quantity: 1 },
    { id: 'credit-cards', name: 'Credit/Debit Cards', category: 'Documents', essential: true, quantity: 2 },
    { id: 'cash', name: 'Cash (local currency)', category: 'Documents', essential: true, quantity: 1 },
    { id: 'phone', name: 'Phone + Charger', category: 'Electronics', essential: true, quantity: 1 },
    { id: 'medications', name: 'Prescription Medications', category: 'Health', essential: true, quantity: 1 },
    { id: 'insurance-card', name: 'Travel Insurance Card', category: 'Documents', essential: true, quantity: 1 },
  ],
  clothing: [
    { id: 'underwear', name: 'Underwear', category: 'Clothing', essential: true, quantity: 5 },
    { id: 'socks', name: 'Socks', category: 'Clothing', essential: true, quantity: 5 },
    { id: 'tshirts', name: 'T-shirts / Tops', category: 'Clothing', essential: true, quantity: 4 },
    { id: 'pants', name: 'Pants / Shorts', category: 'Clothing', essential: true, quantity: 2 },
    { id: 'sleepwear', name: 'Sleepwear', category: 'Clothing', essential: false, quantity: 1 },
  ],
  toiletries: [
    { id: 'toothbrush', name: 'Toothbrush + Toothpaste', category: 'Toiletries', essential: true, quantity: 1 },
    { id: 'deodorant', name: 'Deodorant', category: 'Toiletries', essential: true, quantity: 1 },
    { id: 'shampoo', name: 'Shampoo / Conditioner', category: 'Toiletries', essential: false, quantity: 1 },
    { id: 'sunscreen', name: 'Sunscreen', category: 'Toiletries', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=travel+sunscreen', shopName: 'Amazon' },
    { id: 'razor', name: 'Razor / Shaving Kit', category: 'Toiletries', essential: false, quantity: 1 },
  ],
  electronics: [
    { id: 'power-bank', name: 'Power Bank', category: 'Electronics', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=travel+power+bank', shopName: 'Amazon' },
    { id: 'adapter', name: 'Universal Power Adapter', category: 'Electronics', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=universal+travel+adapter', shopName: 'Amazon' },
    { id: 'headphones', name: 'Headphones / Earbuds', category: 'Electronics', essential: false, quantity: 1 },
    { id: 'camera', name: 'Camera', category: 'Electronics', essential: false, quantity: 1 },
  ],
};

// Trip-type specific items
const tripTypeItems: Record<TripType, PackingItem[]> = {
  beach: [
    { id: 'swimsuit', name: 'Swimsuit', category: 'Beach', essential: true, quantity: 2 },
    { id: 'flip-flops', name: 'Flip Flops / Sandals', category: 'Beach', essential: true, quantity: 1 },
    { id: 'beach-towel', name: 'Beach Towel', category: 'Beach', essential: false, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=quick+dry+travel+towel', shopName: 'Amazon' },
    { id: 'sunglasses', name: 'Sunglasses', category: 'Beach', essential: true, quantity: 1 },
    { id: 'sun-hat', name: 'Sun Hat', category: 'Beach', essential: false, quantity: 1 },
    { id: 'aloe', name: 'Aloe Vera Gel', category: 'Beach', essential: false, quantity: 1 },
    { id: 'waterproof-bag', name: 'Waterproof Phone Pouch', category: 'Beach', essential: false, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=waterproof+phone+pouch', shopName: 'Amazon' },
    { id: 'reef-safe-sunscreen', name: 'Reef-Safe Sunscreen', category: 'Beach', essential: true, quantity: 1 },
  ],
  city: [
    { id: 'walking-shoes', name: 'Comfortable Walking Shoes', category: 'City', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=comfortable+walking+shoes+travel', shopName: 'Amazon' },
    { id: 'day-bag', name: 'Day Bag / Crossbody', category: 'City', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=anti+theft+travel+bag', shopName: 'Amazon' },
    { id: 'smart-casual', name: 'Smart Casual Outfit', category: 'City', essential: false, quantity: 1 },
    { id: 'umbrella', name: 'Compact Umbrella', category: 'City', essential: false, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=compact+travel+umbrella', shopName: 'Amazon' },
    { id: 'guidebook', name: 'City Map / Guidebook', category: 'City', essential: false, quantity: 1 },
    { id: 'light-jacket', name: 'Light Jacket / Cardigan', category: 'City', essential: true, quantity: 1 },
  ],
  adventure: [
    { id: 'hiking-boots', name: 'Hiking Boots', category: 'Adventure', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=hiking+boots', shopName: 'Amazon' },
    { id: 'hiking-pants', name: 'Quick-Dry Pants', category: 'Adventure', essential: true, quantity: 2 },
    { id: 'backpack', name: 'Daypack (20-30L)', category: 'Adventure', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=hiking+daypack', shopName: 'Amazon' },
    { id: 'water-bottle', name: 'Reusable Water Bottle', category: 'Adventure', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=insulated+water+bottle', shopName: 'Amazon' },
    { id: 'first-aid', name: 'First Aid Kit', category: 'Adventure', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=travel+first+aid+kit', shopName: 'Amazon' },
    { id: 'headlamp', name: 'Headlamp / Flashlight', category: 'Adventure', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=rechargeable+headlamp', shopName: 'Amazon' },
    { id: 'rain-jacket', name: 'Waterproof Rain Jacket', category: 'Adventure', essential: true, quantity: 1 },
    { id: 'bug-spray', name: 'Insect Repellent', category: 'Adventure', essential: true, quantity: 1 },
    { id: 'trekking-poles', name: 'Trekking Poles', category: 'Adventure', essential: false, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=collapsible+trekking+poles', shopName: 'Amazon' },
  ],
  business: [
    { id: 'suit', name: 'Business Suit / Dress', category: 'Business', essential: true, quantity: 1 },
    { id: 'dress-shoes', name: 'Dress Shoes', category: 'Business', essential: true, quantity: 1 },
    { id: 'dress-shirts', name: 'Dress Shirts / Blouses', category: 'Business', essential: true, quantity: 3 },
    { id: 'laptop', name: 'Laptop + Charger', category: 'Business', essential: true, quantity: 1 },
    { id: 'laptop-bag', name: 'Laptop Bag', category: 'Business', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=professional+laptop+bag', shopName: 'Amazon' },
    { id: 'business-cards', name: 'Business Cards', category: 'Business', essential: false, quantity: 1 },
    { id: 'notebook', name: 'Notebook + Pen', category: 'Business', essential: false, quantity: 1 },
    { id: 'belt', name: 'Belt', category: 'Business', essential: true, quantity: 1 },
    { id: 'garment-bag', name: 'Garment Bag', category: 'Business', essential: false, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=travel+garment+bag', shopName: 'Amazon' },
  ],
  winter: [
    { id: 'winter-coat', name: 'Winter Coat', category: 'Winter', essential: true, quantity: 1 },
    { id: 'thermal-underwear', name: 'Thermal Base Layers', category: 'Winter', essential: true, quantity: 2, shopUrl: 'https://www.amazon.com/s?k=thermal+underwear', shopName: 'Amazon' },
    { id: 'warm-sweater', name: 'Warm Sweaters / Fleece', category: 'Winter', essential: true, quantity: 2 },
    { id: 'winter-boots', name: 'Waterproof Winter Boots', category: 'Winter', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=waterproof+winter+boots', shopName: 'Amazon' },
    { id: 'gloves', name: 'Warm Gloves', category: 'Winter', essential: true, quantity: 1 },
    { id: 'beanie', name: 'Beanie / Warm Hat', category: 'Winter', essential: true, quantity: 1 },
    { id: 'scarf', name: 'Scarf', category: 'Winter', essential: false, quantity: 1 },
    { id: 'hand-warmers', name: 'Hand Warmers', category: 'Winter', essential: false, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=hand+warmers', shopName: 'Amazon' },
    { id: 'lip-balm', name: 'Lip Balm (SPF)', category: 'Winter', essential: true, quantity: 1 },
  ],
  backpacking: [
    { id: 'travel-backpack', name: 'Travel Backpack (40-60L)', category: 'Backpacking', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=travel+backpack+40L', shopName: 'Amazon' },
    { id: 'packing-cubes', name: 'Packing Cubes', category: 'Backpacking', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=packing+cubes', shopName: 'Amazon' },
    { id: 'quick-dry-towel', name: 'Quick-Dry Microfiber Towel', category: 'Backpacking', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=microfiber+travel+towel', shopName: 'Amazon' },
    { id: 'padlock', name: 'TSA Lock / Padlock', category: 'Backpacking', essential: true, quantity: 2, shopUrl: 'https://www.amazon.com/s?k=tsa+lock', shopName: 'Amazon' },
    { id: 'earplugs', name: 'Earplugs + Eye Mask', category: 'Backpacking', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=travel+sleep+kit', shopName: 'Amazon' },
    { id: 'money-belt', name: 'Money Belt', category: 'Backpacking', essential: true, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=travel+money+belt', shopName: 'Amazon' },
    { id: 'hostel-sheet', name: 'Sleep Sheet / Liner', category: 'Backpacking', essential: false, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=travel+sleep+sheet', shopName: 'Amazon' },
    { id: 'dry-bag', name: 'Dry Bag', category: 'Backpacking', essential: false, quantity: 1, shopUrl: 'https://www.amazon.com/s?k=waterproof+dry+bag', shopName: 'Amazon' },
  ],
};

const tripTypeLabels: Record<TripType, { label: string; icon: string }> = {
  beach: { label: 'Beach / Resort', icon: '🏖️' },
  city: { label: 'City Break', icon: '🏙️' },
  adventure: { label: 'Adventure / Hiking', icon: '🥾' },
  business: { label: 'Business Trip', icon: '💼' },
  winter: { label: 'Winter / Ski', icon: '❄️' },
  backpacking: { label: 'Backpacking', icon: '🎒' },
};

export default function PackingPage() {
  const [tripType, setTripType] = useState<TripType | ''>('');
  const [duration, setDuration] = useState<Duration>('4-7');
  const [generated, setGenerated] = useState(false);
  const [packedItems, setPackedItems] = useState<Set<string>>(new Set());

  const packingList = useMemo(() => {
    if (!tripType) return [];

    const items: PackingItem[] = [];
    
    // Add base essentials
    items.push(...baseItems.essentials);
    
    // Adjust clothing quantities based on duration
    const durationMultiplier = duration === '1-3' ? 0.6 : duration === '4-7' ? 1 : duration === '8-14' ? 1.5 : 2;
    baseItems.clothing.forEach(item => {
      items.push({
        ...item,
        quantity: Math.ceil(item.quantity * durationMultiplier),
      });
    });
    
    // Add toiletries and electronics
    items.push(...baseItems.toiletries);
    items.push(...baseItems.electronics);
    
    // Add trip-type specific items
    items.push(...tripTypeItems[tripType]);

    return items;
  }, [tripType, duration]);

  const togglePacked = (itemId: string) => {
    setPackedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const packedCount = packedItems.size;
  const totalCount = packingList.length;
  const progress = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  const handleGenerate = () => {
    if (tripType) {
      setGenerated(true);
      setPackedItems(new Set());
    }
  };

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: Record<string, PackingItem[]> = {};
    packingList.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [packingList]);

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🎒"
            name="PackSmart"
            tagline="Packing List Generator"
            description="Never forget anything again. Get a personalized packing list based on your trip type and duration."
          />

          {/* Generator Form */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              <h3 className="text-lg font-display font-semibold text-midnight-900 mb-6">
                Tell us about your trip
              </h3>

              {/* Trip Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight-600 mb-3">
                  What type of trip?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(Object.keys(tripTypeLabels) as TripType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => setTripType(type)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        tripType === type
                          ? 'border-coral-400 bg-coral-50'
                          : 'border-midnight-200 hover:border-coral-300 hover:bg-coral-50/50'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{tripTypeLabels[type].icon}</span>
                      <span className="font-medium text-midnight-900">{tripTypeLabels[type].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight-600 mb-3">
                  Trip duration
                </label>
                <div className="flex flex-wrap gap-3">
                  {(['1-3', '4-7', '8-14', '15+'] as Duration[]).map(d => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        duration === d
                          ? 'bg-coral-500 text-white'
                          : 'bg-midnight-50 text-midnight-600 hover:bg-coral-50'
                      }`}
                    >
                      {d === '15+' ? '15+ days' : `${d} days`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!tripType}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🎒 Generate Packing List
              </button>
            </div>
          </div>

          {/* Packing List Results */}
          {generated && tripType && packingList.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
              {/* Progress Header */}
              <div className="bg-white rounded-2xl p-6 border border-midnight-100 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-midnight-900">
                      Your {tripTypeLabels[tripType].icon} {tripTypeLabels[tripType].label} Packing List
                    </h2>
                    <p className="text-midnight-500">{duration === '15+' ? '15+' : duration} days · {totalCount} items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-coral-500">{progress}%</p>
                    <p className="text-sm text-midnight-500">packed</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="h-3 bg-midnight-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-coral-400 to-coral-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Categorized Items */}
              <div className="space-y-6">
                {Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category} className="bg-white rounded-2xl border border-midnight-100 overflow-hidden">
                    <div className="px-6 py-4 bg-midnight-50 border-b border-midnight-100">
                      <h3 className="font-semibold text-midnight-900">{category}</h3>
                    </div>
                    <div className="divide-y divide-midnight-100">
                      {items.map(item => (
                        <div 
                          key={item.id}
                          className={`px-6 py-4 flex items-center justify-between gap-4 transition-colors ${
                            packedItems.has(item.id) ? 'bg-green-50/50' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => togglePacked(item.id)}
                              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                packedItems.has(item.id)
                                  ? 'bg-teal-500 border-teal-500 text-white'
                                  : 'border-midnight-300 hover:border-coral-400'
                              }`}
                            >
                              {packedItems.has(item.id) && (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                            <div>
                              <p className={`font-medium ${packedItems.has(item.id) ? 'text-midnight-400 line-through' : 'text-midnight-900'}`}>
                                {item.name}
                                {item.essential && (
                                  <span className="ml-2 text-xs text-coral-500 font-normal">Essential</span>
                                )}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-sm text-midnight-500">Qty: {item.quantity}</p>
                              )}
                            </div>
                          </div>
                          {item.shopUrl && (
                            <a
                              href={item.shopUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 text-sm bg-gold-100 hover:bg-gold-200 text-gold-800 rounded-lg transition-colors flex items-center gap-1"
                            >
                              🛒 Shop
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Print / Save Actions */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-midnight-100 hover:bg-midnight-200 text-midnight-700 font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  🖨️ Print List
                </button>
                <button
                  onClick={() => setPackedItems(new Set())}
                  className="px-6 py-3 bg-midnight-100 hover:bg-midnight-200 text-midnight-700 font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  🔄 Reset Checkboxes
                </button>
              </div>
            </div>
          )}

          {/* Travel Gear Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-xl font-display font-semibold text-midnight-900 mb-6 text-center">
              Essential Travel Gear
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: 'Packing Cubes', icon: '📦', desc: 'Stay organized', url: 'https://www.amazon.com/s?k=packing+cubes' },
                { name: 'Travel Adapter', icon: '🔌', desc: 'Power anywhere', url: 'https://www.amazon.com/s?k=universal+travel+adapter' },
                { name: 'Neck Pillow', icon: '💤', desc: 'Sleep on flights', url: 'https://www.amazon.com/s?k=travel+neck+pillow' },
                { name: 'Toiletry Bag', icon: '🧴', desc: 'TSA-approved', url: 'https://www.amazon.com/s?k=tsa+toiletry+bag' },
                { name: 'Luggage Scale', icon: '⚖️', desc: 'Avoid fees', url: 'https://www.amazon.com/s?k=luggage+scale' },
                { name: 'Travel Wallet', icon: '👝', desc: 'RFID blocking', url: 'https://www.amazon.com/s?k=rfid+travel+wallet' },
              ].map(item => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl border border-midnight-100 p-4 hover:shadow-card-hover hover:border-coral-200 transition-all flex items-center gap-4"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <p className="font-medium text-midnight-900">{item.name}</p>
                    <p className="text-sm text-midnight-500">{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
            <p className="text-xs text-midnight-400 text-center mt-4">
              Links go to Amazon. WAYFARE may earn a commission on purchases.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <WhyUseCard 
              points={[
                'Customized for your trip type',
                'Adjusts for trip duration',
                'Interactive checklist',
                'Links to buy what you need',
              ]}
            />
            <HowAICard 
              description="PackSmart generates lists based on trip type, duration, and common travel needs. Quantities adjust automatically."
              capabilities={[
                '6 trip type templates',
                'Duration-based quantities',
                'Essential item flagging',
                'Category organization',
              ]}
            />
            <QphiQInsight 
              insight="Roll clothes instead of folding — it saves space and reduces wrinkles. Packing cubes are a game-changer for staying organized."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
