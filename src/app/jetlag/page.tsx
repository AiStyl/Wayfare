'use client';

import { useState, useMemo } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

// City timezone data (UTC offsets)
interface CityTimezone {
  city: string;
  country: string;
  timezone: string;
  utcOffset: number; // hours from UTC
  flag: string;
}

const cities: CityTimezone[] = [
  // North America
  { city: 'New York', country: 'USA', timezone: 'America/New_York', utcOffset: -5, flag: '🇺🇸' },
  { city: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles', utcOffset: -8, flag: '🇺🇸' },
  { city: 'Chicago', country: 'USA', timezone: 'America/Chicago', utcOffset: -6, flag: '🇺🇸' },
  { city: 'Denver', country: 'USA', timezone: 'America/Denver', utcOffset: -7, flag: '🇺🇸' },
  { city: 'Phoenix', country: 'USA', timezone: 'America/Phoenix', utcOffset: -7, flag: '🇺🇸' },
  { city: 'Miami', country: 'USA', timezone: 'America/New_York', utcOffset: -5, flag: '🇺🇸' },
  { city: 'Seattle', country: 'USA', timezone: 'America/Los_Angeles', utcOffset: -8, flag: '🇺🇸' },
  { city: 'Honolulu', country: 'USA', timezone: 'Pacific/Honolulu', utcOffset: -10, flag: '🇺🇸' },
  { city: 'Toronto', country: 'Canada', timezone: 'America/Toronto', utcOffset: -5, flag: '🇨🇦' },
  { city: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver', utcOffset: -8, flag: '🇨🇦' },
  { city: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', utcOffset: -6, flag: '🇲🇽' },
  
  // Europe
  { city: 'London', country: 'UK', timezone: 'Europe/London', utcOffset: 0, flag: '🇬🇧' },
  { city: 'Paris', country: 'France', timezone: 'Europe/Paris', utcOffset: 1, flag: '🇫🇷' },
  { city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', utcOffset: 1, flag: '🇩🇪' },
  { city: 'Rome', country: 'Italy', timezone: 'Europe/Rome', utcOffset: 1, flag: '🇮🇹' },
  { city: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid', utcOffset: 1, flag: '🇪🇸' },
  { city: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', utcOffset: 1, flag: '🇳🇱' },
  { city: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich', utcOffset: 1, flag: '🇨🇭' },
  { city: 'Vienna', country: 'Austria', timezone: 'Europe/Vienna', utcOffset: 1, flag: '🇦🇹' },
  { city: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm', utcOffset: 1, flag: '🇸🇪' },
  { city: 'Dublin', country: 'Ireland', timezone: 'Europe/Dublin', utcOffset: 0, flag: '🇮🇪' },
  { city: 'Lisbon', country: 'Portugal', timezone: 'Europe/Lisbon', utcOffset: 0, flag: '🇵🇹' },
  { city: 'Athens', country: 'Greece', timezone: 'Europe/Athens', utcOffset: 2, flag: '🇬🇷' },
  { city: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', utcOffset: 3, flag: '🇹🇷' },
  { city: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', utcOffset: 3, flag: '🇷🇺' },
  
  // Asia
  { city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', utcOffset: 9, flag: '🇯🇵' },
  { city: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', utcOffset: 9, flag: '🇰🇷' },
  { city: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', utcOffset: 8, flag: '🇨🇳' },
  { city: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai', utcOffset: 8, flag: '🇨🇳' },
  { city: 'Hong Kong', country: 'China', timezone: 'Asia/Hong_Kong', utcOffset: 8, flag: '🇭🇰' },
  { city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', utcOffset: 8, flag: '🇸🇬' },
  { city: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', utcOffset: 7, flag: '🇹🇭' },
  { city: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', utcOffset: 8, flag: '🇲🇾' },
  { city: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', utcOffset: 5.5, flag: '🇮🇳' },
  { city: 'New Delhi', country: 'India', timezone: 'Asia/Kolkata', utcOffset: 5.5, flag: '🇮🇳' },
  { city: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', utcOffset: 4, flag: '🇦🇪' },
  { city: 'Tel Aviv', country: 'Israel', timezone: 'Asia/Jerusalem', utcOffset: 2, flag: '🇮🇱' },
  { city: 'Taipei', country: 'Taiwan', timezone: 'Asia/Taipei', utcOffset: 8, flag: '🇹🇼' },
  { city: 'Manila', country: 'Philippines', timezone: 'Asia/Manila', utcOffset: 8, flag: '🇵🇭' },
  { city: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', utcOffset: 7, flag: '🇮🇩' },
  { city: 'Bali', country: 'Indonesia', timezone: 'Asia/Makassar', utcOffset: 8, flag: '🇮🇩' },
  
  // Oceania
  { city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', utcOffset: 11, flag: '🇦🇺' },
  { city: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne', utcOffset: 11, flag: '🇦🇺' },
  { city: 'Brisbane', country: 'Australia', timezone: 'Australia/Brisbane', utcOffset: 10, flag: '🇦🇺' },
  { city: 'Perth', country: 'Australia', timezone: 'Australia/Perth', utcOffset: 8, flag: '🇦🇺' },
  { city: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', utcOffset: 13, flag: '🇳🇿' },
  
  // South America
  { city: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', utcOffset: -3, flag: '🇧🇷' },
  { city: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', utcOffset: -3, flag: '🇦🇷' },
  { city: 'Lima', country: 'Peru', timezone: 'America/Lima', utcOffset: -5, flag: '🇵🇪' },
  { city: 'Bogotá', country: 'Colombia', timezone: 'America/Bogota', utcOffset: -5, flag: '🇨🇴' },
  { city: 'Santiago', country: 'Chile', timezone: 'America/Santiago', utcOffset: -3, flag: '🇨🇱' },
  
  // Africa & Middle East
  { city: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', utcOffset: 2, flag: '🇪🇬' },
  { city: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg', utcOffset: 2, flag: '🇿🇦' },
  { city: 'Cape Town', country: 'South Africa', timezone: 'Africa/Johannesburg', utcOffset: 2, flag: '🇿🇦' },
  { city: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi', utcOffset: 3, flag: '🇰🇪' },
  { city: 'Casablanca', country: 'Morocco', timezone: 'Africa/Casablanca', utcOffset: 1, flag: '🇲🇦' },
];

interface ScheduleItem {
  time: string;
  activity: string;
  icon: string;
  description: string;
  importance: 'critical' | 'recommended' | 'optional';
}

interface JetLagPlan {
  departureCity: CityTimezone;
  arrivalCity: CityTimezone;
  timeDifference: number;
  direction: 'east' | 'west';
  recoveryDays: number;
  summary: string;
  beforeFlight: ScheduleItem[];
  duringFlight: ScheduleItem[];
  afterArrival: ScheduleItem[];
  lightExposure: { avoid: string; seek: string };
}

export default function JetlagPage() {
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [plan, setPlan] = useState<JetLagPlan | null>(null);

  const generatePlan = useMemo(() => {
    return (): JetLagPlan | null => {
      const departure = cities.find(c => c.city === departureCity);
      const arrival = cities.find(c => c.city === arrivalCity);
      
      if (!departure || !arrival) return null;

      // Calculate time difference (positive = traveling east, negative = west)
      let timeDiff = arrival.utcOffset - departure.utcOffset;
      
      // Normalize for shortest path across date line
      if (timeDiff > 12) timeDiff -= 24;
      if (timeDiff < -12) timeDiff += 24;
      
      const absTimeDiff = Math.abs(timeDiff);
      const direction: 'east' | 'west' = timeDiff > 0 ? 'east' : 'west';
      
      // Science: body adjusts ~1-1.5 hours per day, eastward travel is harder
      const recoveryDays = Math.ceil(absTimeDiff * (direction === 'east' ? 1.0 : 0.75));
      
      // Generate light exposure recommendations based on direction
      // Eastward: need to advance clock (get morning light, avoid evening light)
      // Westward: need to delay clock (avoid morning light, get evening light)
      const lightExposure = direction === 'east'
        ? { 
            seek: 'Get bright light in the MORNING at your destination (6am-10am local time)',
            avoid: 'Avoid bright light in the EVENING (after 4pm) for first 2-3 days'
          }
        : {
            seek: 'Get bright light in the EVENING at your destination (4pm-8pm local time)',
            avoid: 'Avoid bright light in the early MORNING (before 10am) for first 2-3 days'
          };

      const beforeFlight: ScheduleItem[] = [
        { 
          time: '3 days before', 
          activity: direction === 'east' ? 'Shift sleep earlier' : 'Shift sleep later', 
          icon: '🌙', 
          description: direction === 'east' 
            ? `Go to bed 1 hour earlier each night. Your body is moving ${absTimeDiff} hours ahead.`
            : `Stay up 1 hour later each night. Your body is moving ${absTimeDiff} hours back.`,
          importance: 'recommended' 
        },
        { 
          time: '2 days before', 
          activity: 'Increase hydration', 
          icon: '💧', 
          description: 'Drink extra water. Flying dehydrates you, which worsens jet lag symptoms.',
          importance: 'recommended' 
        },
        { 
          time: 'Day before', 
          activity: 'Avoid alcohol', 
          icon: '🚫', 
          description: 'Alcohol disrupts REM sleep and worsens jet lag. Skip it starting now.',
          importance: 'critical' 
        },
      ];

      const duringFlight: ScheduleItem[] = [
        { 
          time: 'At boarding', 
          activity: `Set watch to ${arrival.city} time`, 
          icon: '⌚', 
          description: `Immediately start thinking in ${arrival.city} time (UTC${arrival.utcOffset >= 0 ? '+' : ''}${arrival.utcOffset}).`,
          importance: 'critical' 
        },
        { 
          time: 'In-flight', 
          activity: `Sleep if it's night in ${arrival.city}`, 
          icon: '😴', 
          description: 'Use eye mask, earplugs, and skip the movie if it would be nighttime at your destination.',
          importance: 'critical' 
        },
        { 
          time: 'Every 2 hours', 
          activity: 'Walk and stretch', 
          icon: '🚶', 
          description: 'Movement helps circulation and reduces fatigue. Walk the aisle.',
          importance: 'recommended' 
        },
        { 
          time: 'Throughout flight', 
          activity: 'Stay hydrated, limit caffeine', 
          icon: '💧', 
          description: `Drink water every hour. No caffeine after ${direction === 'east' ? '2pm' : '6pm'} ${arrival.city} time.`,
          importance: 'critical' 
        },
      ];

      const afterArrival: ScheduleItem[] = [
        { 
          time: 'Upon arrival', 
          activity: lightExposure.seek.split('(')[0], 
          icon: '☀️', 
          description: lightExposure.seek,
          importance: 'critical' 
        },
        { 
          time: 'First day', 
          activity: 'Stay awake until 9pm local', 
          icon: '👀', 
          description: 'No naps longer than 20 minutes. Push through the fatigue — this is the hardest but most important day.',
          importance: 'critical' 
        },
        { 
          time: 'First evening', 
          activity: 'Light dinner, no screens', 
          icon: '🍽️', 
          description: 'Eat early (by 7pm local). Avoid blue light from screens 2 hours before bed.',
          importance: 'recommended' 
        },
        { 
          time: 'Days 2-3', 
          activity: 'Maintain local meal times', 
          icon: '📅', 
          description: `Wake and eat at the same time each day. Your body\'s clock syncs to meal times too.`,
          importance: 'critical' 
        },
        { 
          time: 'Optional', 
          activity: 'Consider melatonin', 
          icon: '💊', 
          description: direction === 'east' 
            ? '0.5-3mg melatonin at your target bedtime (10pm local) for 2-3 nights. Consult your doctor.'
            : 'Melatonin is less useful for westward travel. Focus on light exposure instead.',
          importance: 'optional' 
        },
      ];

      const summary = absTimeDiff <= 3
        ? `${absTimeDiff} hour time difference — mild jet lag. You should adjust within 1-2 days with proper light exposure.`
        : absTimeDiff <= 6
        ? `${absTimeDiff} hour time difference traveling ${direction}. Moderate jet lag expected — following this plan can reduce symptoms significantly.`
        : absTimeDiff <= 9
        ? `${absTimeDiff} hour time difference traveling ${direction}. Significant jet lag — expect ${recoveryDays} days for full adjustment. The first 48 hours are critical.`
        : `${absTimeDiff} hour time difference traveling ${direction}. This is one of the toughest routes. Full adjustment takes ${recoveryDays}+ days. Light exposure timing is everything.`;

      return {
        departureCity: departure,
        arrivalCity: arrival,
        timeDifference: absTimeDiff,
        direction,
        recoveryDays,
        summary,
        beforeFlight,
        duringFlight,
        afterArrival,
        lightExposure,
      };
    };
  }, [departureCity, arrivalCity]);

  const handleGeneratePlan = () => {
    const newPlan = generatePlan();
    setPlan(newPlan);
  };

  const importanceColors = {
    critical: 'bg-coral-100 text-coral-700 border-coral-200',
    recommended: 'bg-teal-100 text-teal-700 border-teal-200',
    optional: 'bg-midnight-100 text-midnight-600 border-midnight-200',
  };

  // Get current local times for both cities if selected
  const getCurrentTimes = () => {
    const now = new Date();
    const dep = cities.find(c => c.city === departureCity);
    const arr = cities.find(c => c.city === arrivalCity);
    
    if (!dep || !arr) return null;
    
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    
    const depHours = (utcHours + dep.utcOffset + 24) % 24;
    const arrHours = (utcHours + arr.utcOffset + 24) % 24;
    
    const formatTime = (h: number, m: number) => {
      const period = h >= 12 ? 'PM' : 'AM';
      const hour = h % 12 || 12;
      return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
    };
    
    return {
      departure: formatTime(depHours, utcMinutes),
      arrival: formatTime(arrHours, utcMinutes),
    };
  };

  const currentTimes = getCurrentTimes();

  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ToolPageHeader 
            icon="😴"
            name="JetLagRx"
            tagline="Recovery Planner"
            description="Get a personalized jet lag recovery plan based on circadian science. Real timezone data, real recommendations."
          />

          {/* Calculator */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              {/* Live Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                <span className="text-sm text-midnight-500">
                  Real timezone calculations based on circadian science
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Departure City</label>
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    <option value="">Select departure city</option>
                    {cities.map(city => (
                      <option key={`dep-${city.city}-${city.country}`} value={city.city}>
                        {city.flag} {city.city}, {city.country} (UTC{city.utcOffset >= 0 ? '+' : ''}{city.utcOffset})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Arrival City</label>
                  <select
                    value={arrivalCity}
                    onChange={(e) => setArrivalCity(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400"
                  >
                    <option value="">Select arrival city</option>
                    {cities.map(city => (
                      <option key={`arr-${city.city}-${city.country}`} value={city.city}>
                        {city.flag} {city.city}, {city.country} (UTC{city.utcOffset >= 0 ? '+' : ''}{city.utcOffset})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Current Times Display */}
              {currentTimes && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-midnight-50 rounded-xl mb-6">
                  <div className="text-center">
                    <p className="text-xs text-midnight-500">Current time in {departureCity}</p>
                    <p className="text-lg font-semibold text-midnight-900">{currentTimes.departure}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-midnight-500">Current time in {arrivalCity}</p>
                    <p className="text-lg font-semibold text-midnight-900">{currentTimes.arrival}</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleGeneratePlan}
                disabled={!departureCity || !arrivalCity || departureCity === arrivalCity}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🧠 Create My Jet Lag Plan
              </button>
            </div>
          </div>

          {/* Results */}
          {plan && (
            <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
              {/* Summary Card */}
              <div className="bg-gradient-to-br from-midnight-900 to-purple-900 rounded-3xl p-8 text-white mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">✈️</span>
                      <h2 className="text-2xl font-display font-semibold">
                        {plan.departureCity.flag} {plan.departureCity.city} → {plan.arrivalCity.flag} {plan.arrivalCity.city}
                      </h2>
                    </div>
                    <p className="text-purple-200">
                      {plan.timeDifference} hours {plan.direction} • UTC{plan.departureCity.utcOffset >= 0 ? '+' : ''}{plan.departureCity.utcOffset} → UTC{plan.arrivalCity.utcOffset >= 0 ? '+' : ''}{plan.arrivalCity.utcOffset}
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-purple-200 text-sm">Expected recovery</p>
                    <p className="text-4xl font-bold">{plan.recoveryDays} days</p>
                  </div>
                </div>
                <p className="text-purple-100 leading-relaxed">{plan.summary}</p>
              </div>

              {/* Light Exposure Card - Critical */}
              <div className="bg-gold-50 border-2 border-gold-300 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-display font-semibold text-gold-900 mb-4 flex items-center gap-2">
                  ☀️ Light Exposure — The #1 Factor
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-xl">
                    <p className="text-sm font-medium text-teal-700 mb-1">✓ SEEK light</p>
                    <p className="text-midnight-700">{plan.lightExposure.seek}</p>
                  </div>
                  <div className="p-4 bg-white rounded-xl">
                    <p className="text-sm font-medium text-coral-700 mb-1">✗ AVOID light</p>
                    <p className="text-midnight-700">{plan.lightExposure.avoid}</p>
                  </div>
                </div>
              </div>

              {/* Schedule Sections */}
              <div className="space-y-8">
                {[
                  { title: 'Before Your Flight', icon: '📅', items: plan.beforeFlight, color: 'purple' },
                  { title: 'During Your Flight', icon: '✈️', items: plan.duringFlight, color: 'coral' },
                  { title: 'After You Arrive', icon: '🌅', items: plan.afterArrival, color: 'teal' },
                ].map((section) => (
                  <div key={section.title} className="bg-white rounded-2xl border border-midnight-100 overflow-hidden">
                    <div className="px-6 py-4 bg-midnight-50 border-b border-midnight-100">
                      <h3 className="text-xl font-display font-semibold text-midnight-900 flex items-center gap-3">
                        <span className="text-2xl">{section.icon}</span>
                        {section.title}
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <div className="w-10 h-10 bg-midnight-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-sm font-medium text-midnight-500">{item.time}</span>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${importanceColors[item.importance]}`}>
                                {item.importance}
                              </span>
                            </div>
                            <p className="font-medium text-midnight-900">{item.activity}</p>
                            <p className="text-sm text-midnight-500">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <WhyUseCard 
              points={[
                'Real timezone calculations',
                'Science-based circadian recommendations',
                'Eastward vs westward specific advice',
                'Light exposure timing guidance',
              ]}
            />
            <HowAICard 
              description="JetLagRx calculates your actual time zone shift and generates recommendations based on circadian rhythm science."
              capabilities={[
                'UTC offset calculations',
                'Circadian phase adjustment',
                'Light exposure timing',
                'Recovery time estimation',
              ]}
            />
            <QphiQInsight 
              insight="The #1 mistake: napping on arrival day. Push through until at least 9pm local time — one hard day beats a week of poor sleep."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
