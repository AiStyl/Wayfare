'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';
import CityAutocomplete from '@/components/CityAutocomplete';

interface Activity {
  time: string;
  title: string;
  description: string;
  type: 'attraction' | 'food' | 'activity' | 'transport' | 'free-time' | 'shopping' | 'nature' | 'nightlife';
  duration: string;
  cost: string;
  tip?: string;
  bookUrl?: string;
}

interface DayPlan {
  day: number;
  theme: string;
  activities: Activity[];
}

type TravelStyle = 'relaxed' | 'balanced' | 'intensive';
type Interest = 'culture' | 'food' | 'nature' | 'nightlife' | 'shopping' | 'history' | 'adventure' | 'photography';

// Curated destination data for popular cities
const destinationData: Record<string, { activities: Activity[]; tips: string[] }> = {
  'Tokyo': {
    activities: [
      { time: '09:00', title: 'Senso-ji Temple', description: 'Tokyo\'s oldest and most famous Buddhist temple in Asakusa', type: 'attraction', duration: '2 hours', cost: 'Free', tip: 'Go early to avoid crowds and explore Nakamise shopping street', bookUrl: 'https://www.viator.com/searchResults/all?text=sensoji+temple' },
      { time: '12:00', title: 'Tsukiji Outer Market', description: 'Fresh sushi and street food at the famous fish market area', type: 'food', duration: '1.5 hours', cost: '$15-30', tip: 'Try tamagoyaki (Japanese omelet) and fresh sashimi' },
      { time: '14:00', title: 'teamLab Borderless', description: 'Immersive digital art museum experience', type: 'activity', duration: '3 hours', cost: '$30', tip: 'Book tickets online 2+ weeks ahead', bookUrl: 'https://www.viator.com/searchResults/all?text=teamlab+tokyo' },
      { time: '18:00', title: 'Shibuya Crossing', description: 'World\'s busiest pedestrian crossing and Hachiko statue', type: 'attraction', duration: '1 hour', cost: 'Free', tip: 'Watch from Starbucks above for aerial view' },
      { time: '19:30', title: 'Izakaya Dinner', description: 'Traditional Japanese pub experience with small plates', type: 'food', duration: '2 hours', cost: '$30-50', tip: 'Try yakitori, edamame, and sake', bookUrl: 'https://www.viator.com/searchResults/all?text=tokyo+food+tour' },
      { time: '10:00', title: 'Meiji Shrine', description: 'Serene Shinto shrine in a forested park', type: 'attraction', duration: '1.5 hours', cost: 'Free', tip: 'Walk through the towering torii gates in Yoyogi Park' },
      { time: '13:00', title: 'Harajuku & Takeshita Street', description: 'Youth fashion and quirky shops', type: 'shopping', duration: '2 hours', cost: 'Varies', tip: 'Try a crepe from one of the many stands' },
      { time: '16:00', title: 'Shinjuku Gyoen', description: 'Beautiful garden with Japanese, French, and English sections', type: 'nature', duration: '2 hours', cost: '$5', tip: 'Perfect for cherry blossoms in spring' },
      { time: '19:00', title: 'Golden Gai', description: 'Tiny bars in narrow alleys of Shinjuku', type: 'nightlife', duration: '3 hours', cost: '$20-40', tip: 'Some bars charge a cover fee - check before entering' },
      { time: '09:00', title: 'Akihabara', description: 'Electronics, anime, and gaming district', type: 'shopping', duration: '3 hours', cost: 'Varies', tip: 'Visit a maid cafe for the full experience' },
      { time: '14:00', title: 'Tokyo Skytree', description: 'Observation deck with panoramic city views', type: 'attraction', duration: '2 hours', cost: '$20', tip: 'Go near sunset for day and night views', bookUrl: 'https://www.viator.com/searchResults/all?text=tokyo+skytree' },
      { time: '17:00', title: 'Ramen Dinner', description: 'Authentic Tokyo-style ramen', type: 'food', duration: '1 hour', cost: '$10-15', tip: 'Try Ichiran for solo booth experience' },
    ],
    tips: ['Get a Suica/Pasmo card for easy train travel', 'Download Google Maps offline - addresses are confusing', 'Convenience stores (7-Eleven, Lawson) have great food'],
  },
  'Paris': {
    activities: [
      { time: '09:00', title: 'Eiffel Tower', description: 'Iconic iron lattice tower with city views', type: 'attraction', duration: '2-3 hours', cost: '$30', tip: 'Book skip-the-line tickets online', bookUrl: 'https://www.viator.com/searchResults/all?text=eiffel+tower+tickets' },
      { time: '13:00', title: 'Café Lunch in Saint-Germain', description: 'Classic French café experience', type: 'food', duration: '1.5 hours', cost: '$20-35', tip: 'Try croque monsieur and café crème' },
      { time: '15:00', title: 'Louvre Museum', description: 'World\'s largest art museum - Mona Lisa, Venus de Milo', type: 'attraction', duration: '3-4 hours', cost: '$20', tip: 'Enter through Porte des Lions for shorter queues', bookUrl: 'https://www.viator.com/searchResults/all?text=louvre+skip+line' },
      { time: '19:30', title: 'Seine River Cruise', description: 'Evening boat tour past illuminated monuments', type: 'activity', duration: '1 hour', cost: '$15-25', tip: 'Book a dinner cruise for special occasions', bookUrl: 'https://www.viator.com/searchResults/all?text=paris+seine+cruise' },
      { time: '09:30', title: 'Montmartre & Sacré-Cœur', description: 'Artistic hilltop neighborhood with stunning basilica', type: 'attraction', duration: '3 hours', cost: 'Free', tip: 'Walk up the stairs for exercise or take the funicular' },
      { time: '13:00', title: 'Le Marais Walking', description: 'Trendy neighborhood with shops, falafel, and history', type: 'activity', duration: '2 hours', cost: 'Free', tip: 'Best falafel at L\'As du Fallafel on Rue des Rosiers' },
      { time: '16:00', title: 'Musée d\'Orsay', description: 'Impressionist art in a stunning former railway station', type: 'attraction', duration: '2-3 hours', cost: '$16', tip: 'Free first Sunday of month', bookUrl: 'https://www.viator.com/searchResults/all?text=orsay+museum' },
      { time: '20:00', title: 'Dinner in Latin Quarter', description: 'Traditional French bistro experience', type: 'food', duration: '2 hours', cost: '$40-60', tip: 'Try duck confit or boeuf bourguignon' },
      { time: '10:00', title: 'Palace of Versailles', description: 'Opulent royal château with stunning gardens', type: 'attraction', duration: '5-6 hours', cost: '$20', tip: 'Go on weekdays - extremely crowded on weekends', bookUrl: 'https://www.viator.com/searchResults/all?text=versailles+day+trip' },
      { time: '19:00', title: 'Champs-Élysées & Arc de Triomphe', description: 'Famous avenue and monument', type: 'attraction', duration: '2 hours', cost: '$15 for Arc', tip: 'Climb the Arc for amazing sunset views' },
    ],
    tips: ['Learn basic French phrases - locals appreciate the effort', 'Museums are free on first Sundays', 'Tipping is included in prices but small extra is appreciated'],
  },
  'New York': {
    activities: [
      { time: '08:00', title: 'Central Park Morning', description: 'Iconic urban park - Bethesda Fountain, Bow Bridge', type: 'nature', duration: '2 hours', cost: 'Free', tip: 'Rent a bike to cover more ground' },
      { time: '10:30', title: 'Metropolitan Museum of Art', description: 'One of the world\'s greatest art museums', type: 'attraction', duration: '3 hours', cost: '$30 (suggested)', tip: 'Focus on 2-3 sections - it\'s massive', bookUrl: 'https://www.viator.com/searchResults/all?text=met+museum+tour' },
      { time: '14:00', title: 'Times Square & Broadway', description: 'Bright lights and theater district', type: 'attraction', duration: '1 hour', cost: 'Free', tip: 'Book Broadway show tickets at TKTS booth for discounts', bookUrl: 'https://www.viator.com/searchResults/all?text=broadway+tickets' },
      { time: '16:00', title: 'High Line Walk', description: 'Elevated park on former railway tracks', type: 'nature', duration: '1.5 hours', cost: 'Free', tip: 'Enter at 14th St and walk to Hudson Yards' },
      { time: '19:00', title: 'Dinner in Chelsea Market', description: 'Food hall with diverse options', type: 'food', duration: '1.5 hours', cost: '$20-40', tip: 'Try Los Tacos No.1 or The Lobster Place' },
      { time: '09:00', title: 'Statue of Liberty & Ellis Island', description: 'Iconic symbol of freedom', type: 'attraction', duration: '4-5 hours', cost: '$24', tip: 'Book crown access months ahead if interested', bookUrl: 'https://www.viator.com/searchResults/all?text=statue+liberty+ferry' },
      { time: '15:00', title: 'Brooklyn Bridge Walk', description: 'Historic bridge with Manhattan skyline views', type: 'attraction', duration: '1 hour', cost: 'Free', tip: 'Walk from Brooklyn to Manhattan for best views' },
      { time: '17:00', title: 'DUMBO Brooklyn', description: 'Trendy neighborhood with iconic bridge view', type: 'activity', duration: '2 hours', cost: 'Free', tip: 'Get the classic photo at Washington St' },
      { time: '20:00', title: 'Pizza in Brooklyn', description: 'NYC-style pizza experience', type: 'food', duration: '1 hour', cost: '$15-25', tip: 'Try Juliana\'s or Grimaldi\'s' },
      { time: '10:00', title: '9/11 Memorial & Museum', description: 'Moving tribute to September 11 victims', type: 'attraction', duration: '2-3 hours', cost: '$33', tip: 'Memorial is free, museum requires ticket', bookUrl: 'https://www.viator.com/searchResults/all?text=911+memorial+museum' },
      { time: '14:00', title: 'One World Observatory', description: 'Views from tallest building in Western Hemisphere', type: 'attraction', duration: '1.5 hours', cost: '$43', tip: 'Go near sunset for best experience', bookUrl: 'https://www.viator.com/searchResults/all?text=one+world+observatory' },
    ],
    tips: ['Get an OMNY or MetroCard for subway', 'Walk when possible - many attractions are close', 'Tip 18-20% at restaurants'],
  },
};

// Generic activities for cities not in database
const genericActivities: Activity[] = [
  { time: '09:00', title: 'City Walking Tour', description: 'Explore the historic center and main landmarks', type: 'activity', duration: '3 hours', cost: 'Free-$30', tip: 'Join a free walking tour and tip at the end', bookUrl: 'https://www.viator.com/searchResults/all?text=walking+tour' },
  { time: '12:30', title: 'Local Lunch', description: 'Try regional specialties at a local restaurant', type: 'food', duration: '1.5 hours', cost: '$15-30', tip: 'Ask locals for recommendations' },
  { time: '14:30', title: 'Main Museum or Attraction', description: 'Visit the city\'s most famous museum or landmark', type: 'attraction', duration: '2-3 hours', cost: '$10-25', tip: 'Book tickets online to skip lines' },
  { time: '18:00', title: 'Sunset Viewpoint', description: 'Find a rooftop or viewpoint for sunset', type: 'activity', duration: '1 hour', cost: 'Free-$15', tip: 'Check Google Maps for "viewpoint" near you' },
  { time: '19:30', title: 'Dinner Experience', description: 'Evening meal at a well-reviewed local spot', type: 'food', duration: '2 hours', cost: '$25-50', tip: 'Make reservations for popular places' },
  { time: '10:00', title: 'Neighborhood Exploration', description: 'Wander through a local neighborhood', type: 'activity', duration: '2 hours', cost: 'Free', tip: 'Get lost - best discoveries happen by accident' },
  { time: '14:00', title: 'Local Market', description: 'Browse local markets for food and crafts', type: 'shopping', duration: '2 hours', cost: 'Varies', tip: 'Great for souvenirs and local products' },
  { time: '17:00', title: 'Park or Garden', description: 'Relax in a local park or botanical garden', type: 'nature', duration: '1.5 hours', cost: 'Free-$10', tip: 'Perfect for people-watching' },
];

export default function PlannerPage() {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState(3);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('balanced');
  const [interests, setInterests] = useState<Interest[]>(['culture', 'food']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<DayPlan[] | null>(null);

  const toggleInterest = (interest: Interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const generateItinerary = async () => {
    if (!destination) return;

    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get city data or use generic
    const cityKey = Object.keys(destinationData).find(
      key => destination.toLowerCase().includes(key.toLowerCase())
    );
    
    const cityData = cityKey ? destinationData[cityKey] : null;
    const activities = cityData?.activities || genericActivities;

    // Generate day plans
    const days: DayPlan[] = [];
    const themes = ['Iconic Highlights', 'Local Favorites', 'Hidden Gems', 'Cultural Deep Dive', 'Relaxation Day', 'Adventure Day', 'Food & Markets'];
    
    // Activities per day based on travel style
    const activitiesPerDay = travelStyle === 'relaxed' ? 3 : travelStyle === 'balanced' ? 5 : 7;
    
    let activityIndex = 0;
    for (let day = 1; day <= duration; day++) {
      const dayActivities: Activity[] = [];
      
      for (let i = 0; i < activitiesPerDay && activityIndex < activities.length; i++) {
        dayActivities.push(activities[activityIndex % activities.length]);
        activityIndex++;
      }
      
      // Add free time for relaxed style
      if (travelStyle === 'relaxed' && dayActivities.length > 0) {
        dayActivities.push({
          time: '15:00',
          title: 'Free Time',
          description: 'Explore on your own or rest at your hotel',
          type: 'free-time',
          duration: '2-3 hours',
          cost: 'Free',
        });
      }

      days.push({
        day,
        theme: themes[(day - 1) % themes.length],
        activities: dayActivities,
      });
    }

    setItinerary(days);
    setIsGenerating(false);
  };

  const interestOptions: { id: Interest; label: string; icon: string }[] = [
    { id: 'culture', label: 'Culture', icon: '🎭' },
    { id: 'food', label: 'Food', icon: '🍜' },
    { id: 'nature', label: 'Nature', icon: '🌿' },
    { id: 'nightlife', label: 'Nightlife', icon: '🌙' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'history', label: 'History', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure', icon: '🧗' },
    { id: 'photography', label: 'Photography', icon: '📸' },
  ];

  const activityTypeIcons: Record<string, string> = {
    'attraction': '📍',
    'food': '🍽️',
    'activity': '🎯',
    'transport': '🚇',
    'free-time': '☕',
    'nature': '🌳',
    'shopping': '🛒',
    'nightlife': '🌙',
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
            tagline="AI Trip Planner"
            description="Get a personalized day-by-day itinerary crafted for your travel style and interests."
          />

          {/* Planner Form */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              {/* Destination */}
              <div className="mb-6">
                <CityAutocomplete
                  label="Where are you going?"
                  value={destination}
                  onChange={(value) => setDestination(value)}
                  placeholder="Enter destination city"
                />
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight-600 mb-3">
                  How many days?
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="flex-1 h-2 bg-midnight-100 rounded-lg appearance-none cursor-pointer accent-coral-500"
                  />
                  <span className="w-16 text-center font-semibold text-midnight-900 bg-midnight-50 px-3 py-2 rounded-lg">
                    {duration} {duration === 1 ? 'day' : 'days'}
                  </span>
                </div>
              </div>

              {/* Travel Style */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight-600 mb-3">
                  Travel pace
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { id: 'relaxed', label: 'Relaxed', desc: '3-4 activities/day', icon: '🧘' },
                    { id: 'balanced', label: 'Balanced', desc: '5-6 activities/day', icon: '⚖️' },
                    { id: 'intensive', label: 'Packed', desc: '7+ activities/day', icon: '🏃' },
                  ] as const).map(style => (
                    <button
                      key={style.id}
                      onClick={() => setTravelStyle(style.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        travelStyle === style.id
                          ? 'border-coral-400 bg-coral-50'
                          : 'border-midnight-200 hover:border-coral-300'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{style.icon}</span>
                      <span className="font-medium text-midnight-900 block">{style.label}</span>
                      <span className="text-xs text-midnight-500">{style.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-midnight-600 mb-3">
                  Your interests (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(interest => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                        interests.includes(interest.id)
                          ? 'bg-coral-500 text-white'
                          : 'bg-midnight-50 text-midnight-600 hover:bg-coral-50'
                      }`}
                    >
                      <span>{interest.icon}</span>
                      {interest.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateItinerary}
                disabled={!destination || isGenerating}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating your itinerary...
                  </>
                ) : (
                  <>
                    ✨ Generate Itinerary
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Itinerary */}
          {itinerary && (
            <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
              {/* Itinerary Header */}
              <div className="bg-gradient-to-r from-coral-500 to-gold-500 rounded-2xl p-6 text-white mb-6">
                <h2 className="text-2xl font-display font-semibold mb-2">
                  Your {destination} Itinerary
                </h2>
                <p className="opacity-90">
                  {duration} {duration === 1 ? 'day' : 'days'} · {travelStyle} pace · {interests.length} interests
                </p>
              </div>

              {/* Day Cards */}
              <div className="space-y-6">
                {itinerary.map(day => (
                  <div key={day.day} className="bg-white rounded-2xl border border-midnight-100 overflow-hidden">
                    {/* Day Header */}
                    <div className="px-6 py-4 bg-midnight-50 border-b border-midnight-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-midnight-900 text-lg">Day {day.day}</h3>
                          <p className="text-sm text-midnight-500">{day.theme}</p>
                        </div>
                        <span className="px-3 py-1 bg-coral-100 text-coral-700 text-sm font-medium rounded-full">
                          {day.activities.length} activities
                        </span>
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="divide-y divide-midnight-100">
                      {day.activities.map((activity, idx) => (
                        <div key={idx} className="px-6 py-4">
                          <div className="flex items-start gap-4">
                            <div className="text-center">
                              <span className="text-2xl">{activityTypeIcons[activity.type] || '📍'}</span>
                              <p className="text-xs text-midnight-400 mt-1">{activity.time}</p>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-midnight-900">{activity.title}</h4>
                              <p className="text-sm text-midnight-600 mt-1">{activity.description}</p>
                              <div className="flex flex-wrap gap-3 mt-2">
                                <span className="text-xs text-midnight-500">⏱️ {activity.duration}</span>
                                <span className="text-xs text-midnight-500">💰 {activity.cost}</span>
                              </div>
                              {activity.tip && (
                                <p className="text-sm text-teal-600 mt-2">💡 {activity.tip}</p>
                              )}
                            </div>
                            {activity.bookUrl && (
                              <a
                                href={activity.bookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 text-sm bg-coral-100 hover:bg-coral-200 text-coral-700 rounded-lg transition-colors whitespace-nowrap"
                              >
                                Book →
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 bg-midnight-100 hover:bg-midnight-200 text-midnight-700 font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  🖨️ Print Itinerary
                </button>
                <a
                  href={`https://www.viator.com/searchResults/all?text=${encodeURIComponent(destination + ' tours')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  🎫 Book Tours & Activities
                </a>
              </div>

              {/* Affiliate Disclosure */}
              <p className="text-xs text-midnight-400 text-center mt-4">
                Booking links go to Viator. WAYFARE may earn a commission on bookings.
              </p>
            </div>
          )}

          {/* Popular Destinations */}
          {!itinerary && (
            <div className="max-w-4xl mx-auto mb-12">
              <h3 className="text-xl font-display font-semibold text-midnight-900 mb-6 text-center">
                Popular Destinations
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {['Tokyo', 'Paris', 'New York', 'Barcelona', 'Bali', 'London'].map(city => (
                  <button
                    key={city}
                    onClick={() => setDestination(city)}
                    className="bg-white rounded-xl border border-midnight-100 p-4 hover:shadow-card-hover hover:border-coral-200 transition-all text-left"
                  >
                    <span className="text-2xl mb-2 block">
                      {city === 'Tokyo' ? '🗼' : city === 'Paris' ? '🗼' : city === 'New York' ? '🗽' : city === 'Barcelona' ? '🏰' : city === 'Bali' ? '🏝️' : '🎡'}
                    </span>
                    <p className="font-medium text-midnight-900">{city}</p>
                    <p className="text-sm text-midnight-500">View itinerary →</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <WhyUseCard 
              points={[
                'Personalized to your interests',
                'Adjustable travel pace',
                'Local tips included',
                'Book tours directly',
              ]}
            />
            <HowAICard 
              description="TripForge creates itineraries based on curated destination data, optimized for your travel style and interests."
              capabilities={[
                'Day-by-day planning',
                'Time estimates',
                'Cost estimates',
                'Insider tips',
              ]}
            />
            <QphiQInsight 
              insight="Don't over-plan! Leave buffer time for spontaneous discoveries. The best travel moments often aren't on any itinerary."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
