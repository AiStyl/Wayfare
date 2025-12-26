'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

const sampleTrips = [
  "7-day romantic getaway in Italy, focusing on wine regions and coastal towns",
  "10-day family adventure in Japan with a 6-year-old",
  "5-day budget backpacking trip through Portugal",
  "2-week road trip across Iceland's Ring Road",
];

interface DayPlan {
  day: number;
  title: string;
  location: string;
  activities: {
    time: string;
    activity: string;
    details: string;
    cost?: string;
    bookingLink?: string;
  }[];
  accommodation: {
    name: string;
    type: string;
    price: string;
  };
  meals: string[];
}

interface Itinerary {
  title: string;
  duration: string;
  totalBudget: string;
  highlights: string[];
  days: DayPlan[];
}

export default function TripForgePage() {
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [activeDay, setActiveDay] = useState(0);

  const handleGenerate = async () => {
    if (!query.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call with demo data
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Demo itinerary based on query
    const demoItinerary: Itinerary = {
      title: query.includes('Italy') ? 'Romantic Italian Escape' : 
             query.includes('Japan') ? 'Family Adventure in Japan' :
             query.includes('Portugal') ? 'Portugal Budget Explorer' :
             'Your Custom Adventure',
      duration: query.match(/(\d+)[\s-]*(day|week)/i)?.[0] || '7 days',
      totalBudget: query.toLowerCase().includes('budget') ? '$1,200 - $1,800' : 
                   query.toLowerCase().includes('luxury') ? '$5,000 - $8,000' :
                   '$2,500 - $3,500',
      highlights: [
        'Curated local experiences',
        'Optimal route planning',
        'Mix of iconic sites and hidden gems',
        'Restaurant recommendations from locals',
      ],
      days: [
        {
          day: 1,
          title: 'Arrival & City Exploration',
          location: 'Rome, Italy',
          activities: [
            {
              time: '2:00 PM',
              activity: 'Airport Arrival & Hotel Check-in',
              details: 'Private transfer from FCO to city center',
              cost: '$45',
            },
            {
              time: '4:00 PM',
              activity: 'Trastevere Neighborhood Walk',
              details: 'Wander cobblestone streets, visit Santa Maria church',
              cost: 'Free',
            },
            {
              time: '7:30 PM',
              activity: 'Welcome Dinner at Da Enzo',
              details: 'Authentic Roman cuisine, reservations recommended',
              cost: '$60-80',
              bookingLink: '#',
            },
          ],
          accommodation: {
            name: 'Hotel Campo de\' Fiori',
            type: 'Boutique Hotel',
            price: '$180/night',
          },
          meals: ['Dinner at Da Enzo al 29 (Roman classics)'],
        },
        {
          day: 2,
          title: 'Ancient Rome',
          location: 'Rome, Italy',
          activities: [
            {
              time: '8:30 AM',
              activity: 'Colosseum & Roman Forum',
              details: 'Skip-the-line guided tour, arena floor access',
              cost: '$65',
              bookingLink: '#',
            },
            {
              time: '1:00 PM',
              activity: 'Lunch at Roscioli',
              details: 'Famous deli and restaurant',
              cost: '$35-45',
            },
            {
              time: '3:00 PM',
              activity: 'Palatine Hill & Circus Maximus',
              details: 'Self-guided exploration',
              cost: 'Included with morning ticket',
            },
            {
              time: '6:00 PM',
              activity: 'Sunset Aperitivo',
              details: 'Rooftop drinks near Piazza Navona',
              cost: '$20',
            },
          ],
          accommodation: {
            name: 'Hotel Campo de\' Fiori',
            type: 'Boutique Hotel',
            price: '$180/night',
          },
          meals: ['Breakfast at hotel', 'Lunch at Roscioli', 'Dinner at leisure'],
        },
        {
          day: 3,
          title: 'Vatican & Art',
          location: 'Rome → Tuscany',
          activities: [
            {
              time: '8:00 AM',
              activity: 'Vatican Museums & Sistine Chapel',
              details: 'Early entry tour before crowds',
              cost: '$85',
              bookingLink: '#',
            },
            {
              time: '12:00 PM',
              activity: 'St. Peter\'s Basilica',
              details: 'Optional dome climb for panoramic views',
              cost: 'Free (dome: $10)',
            },
            {
              time: '3:00 PM',
              activity: 'Train to Florence',
              details: 'High-speed Frecciarossa, 1.5 hours',
              cost: '$45',
              bookingLink: '#',
            },
            {
              time: '6:00 PM',
              activity: 'Florence Arrival & Evening Stroll',
              details: 'Walk across Ponte Vecchio at sunset',
              cost: 'Free',
            },
          ],
          accommodation: {
            name: 'Hotel Davanzati',
            type: 'Historic Hotel',
            price: '$200/night',
          },
          meals: ['Early breakfast', 'Light lunch near Vatican', 'Florentine dinner'],
        },
      ],
    };
    
    setItinerary(demoItinerary);
    setIsGenerating(false);
  };

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="🗺️"
            name="TripForge"
            tagline="AI Itinerary Builder"
            description="Describe your dream trip in plain English and get a complete, day-by-day itinerary with activities, restaurants, and booking links."
          />

          {/* Main Input Area */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-3xl shadow-elevated p-8 border border-midnight-100">
              <label className="block text-lg font-display font-medium text-midnight-900 mb-4">
                Describe your ideal trip
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 7-day romantic getaway in Italy focusing on wine regions and coastal towns, mid-range budget, visiting in October..."
                className="w-full h-32 px-6 py-4 bg-midnight-50 border border-midnight-200 rounded-2xl text-midnight-900 placeholder:text-midnight-400 focus:outline-none focus:border-coral-400 focus:ring-4 focus:ring-coral-400/20 transition-all duration-200 resize-none text-lg"
              />
              
              {/* Sample prompts */}
              <div className="mt-4 flex flex-wrap gap-2">
                {sampleTrips.map((trip, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(trip)}
                    className="px-4 py-2 bg-midnight-50 hover:bg-coral-50 text-midnight-600 hover:text-coral-600 text-sm rounded-full transition-colors"
                  >
                    {trip.slice(0, 40)}...
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={!query.trim() || isGenerating}
                className="mt-6 w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:shadow-coral-400/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isGenerating ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Crafting Your Perfect Itinerary...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Itinerary
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Itinerary */}
          {itinerary && (
            <div className="mb-16 animate-fade-in">
              {/* Itinerary Header */}
              <div className="bg-gradient-to-br from-midnight-900 to-midnight-800 rounded-3xl p-8 md:p-12 text-white mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold mb-2">
                      {itinerary.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-midnight-300">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {itinerary.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Est. {itinerary.totalBudget}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors">
                      Export PDF
                    </button>
                    <button className="px-6 py-3 bg-coral-500 hover:bg-coral-600 rounded-xl font-medium transition-colors">
                      Save Trip
                    </button>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {itinerary.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-midnight-200">
                      <svg className="w-4 h-4 text-coral-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              {/* Day Navigation */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
                {itinerary.days.map((day, i) => (
                  <button
                    key={day.day}
                    onClick={() => setActiveDay(i)}
                    className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all ${
                      activeDay === i 
                        ? 'bg-coral-500 text-white shadow-lg shadow-coral-400/25' 
                        : 'bg-white text-midnight-600 hover:bg-coral-50 border border-midnight-100'
                    }`}
                  >
                    Day {day.day}
                  </button>
                ))}
              </div>

              {/* Day Details */}
              {itinerary.days[activeDay] && (
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Activities */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-midnight-100 overflow-hidden">
                      <div className="px-6 py-4 bg-midnight-50 border-b border-midnight-100">
                        <h3 className="text-xl font-display font-semibold text-midnight-900">
                          {itinerary.days[activeDay].title}
                        </h3>
                        <p className="text-midnight-500 mt-1">
                          📍 {itinerary.days[activeDay].location}
                        </p>
                      </div>
                      <div className="p-6">
                        <div className="space-y-6">
                          {itinerary.days[activeDay].activities.map((activity, i) => (
                            <div key={i} className="flex gap-4">
                              <div className="flex-shrink-0 w-20 text-sm font-medium text-coral-500">
                                {activity.time}
                              </div>
                              <div className="flex-1 pb-6 border-b border-midnight-100 last:border-0 last:pb-0">
                                <h4 className="font-medium text-midnight-900 mb-1">
                                  {activity.activity}
                                </h4>
                                <p className="text-midnight-500 text-sm mb-2">
                                  {activity.details}
                                </p>
                                <div className="flex items-center gap-4">
                                  {activity.cost && (
                                    <span className="text-sm text-teal-600 font-medium">
                                      {activity.cost}
                                    </span>
                                  )}
                                  {activity.bookingLink && (
                                    <a href={activity.bookingLink} className="text-sm text-coral-500 hover:text-coral-600 font-medium">
                                      Book Now →
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Accommodation */}
                    <div className="bg-white rounded-2xl border border-midnight-100 p-6">
                      <h4 className="font-display font-medium text-midnight-900 mb-4 flex items-center gap-2">
                        <span className="text-xl">🏨</span>
                        Accommodation
                      </h4>
                      <div className="space-y-2">
                        <p className="font-medium text-midnight-900">
                          {itinerary.days[activeDay].accommodation.name}
                        </p>
                        <p className="text-sm text-midnight-500">
                          {itinerary.days[activeDay].accommodation.type}
                        </p>
                        <p className="text-coral-500 font-medium">
                          {itinerary.days[activeDay].accommodation.price}
                        </p>
                        <button className="mt-2 w-full py-2 px-4 bg-midnight-900 hover:bg-midnight-800 text-white text-sm font-medium rounded-lg transition-colors">
                          Check Availability
                        </button>
                      </div>
                    </div>

                    {/* Meals */}
                    <div className="bg-white rounded-2xl border border-midnight-100 p-6">
                      <h4 className="font-display font-medium text-midnight-900 mb-4 flex items-center gap-2">
                        <span className="text-xl">🍽️</span>
                        Recommended Meals
                      </h4>
                      <ul className="space-y-2">
                        {itinerary.days[activeDay].meals.map((meal, i) => (
                          <li key={i} className="text-sm text-midnight-600 flex items-start gap-2">
                            <span className="text-coral-400">•</span>
                            {meal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <WhyUseCard 
              points={[
                'Save hours of trip planning research',
                'Get optimized routes between attractions',
                'Discover local favorites and hidden gems',
                'One-click booking links for everything',
              ]}
            />
            <HowAICard 
              description="TripForge uses AI to understand your travel style, preferences, and constraints to build personalized itineraries."
              capabilities={[
                'Natural language understanding',
                'Route optimization algorithms',
                'Real-time availability checking',
                'Budget-aware recommendations',
              ]}
            />
            <QphiQInsight 
              insight="For romantic Italy trips, consider visiting Cinque Terre in shoulder season (late September) — fewer crowds, mild weather, and the grape harvest makes for beautiful scenery."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
