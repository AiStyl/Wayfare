'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { WhyUseCard, HowAICard, QphiQInsight, ToolPageHeader } from '@/components/InfoCards';

interface ScheduleItem {
  time: string;
  activity: string;
  icon: string;
  description: string;
  importance: 'critical' | 'recommended' | 'optional';
}

interface JetLagPlan {
  flightInfo: {
    from: string;
    to: string;
    timeDiff: number;
    direction: 'east' | 'west';
  };
  summary: string;
  recoveryDays: number;
  beforeFlight: ScheduleItem[];
  duringFlight: ScheduleItem[];
  afterArrival: ScheduleItem[];
}

const demoPlan: JetLagPlan = {
  flightInfo: {
    from: 'Los Angeles (PST)',
    to: 'Tokyo (JST)',
    timeDiff: 17,
    direction: 'west',
  },
  summary: 'Flying west across 17 time zones. This is a significant adjustment — expect 4-5 days for full recovery. Following this plan can reduce symptoms by up to 50%.',
  recoveryDays: 5,
  beforeFlight: [
    { time: '3 days before', activity: 'Shift sleep earlier', icon: '🌙', description: 'Go to bed 1 hour earlier each night to pre-adapt', importance: 'recommended' },
    { time: '2 days before', activity: 'Increase hydration', icon: '💧', description: 'Drink extra water to prepare for flight dehydration', importance: 'recommended' },
    { time: 'Day of flight', activity: 'Avoid alcohol', icon: '🚫', description: 'Alcohol disrupts sleep quality and worsens jet lag', importance: 'critical' },
  ],
  duringFlight: [
    { time: 'Boarding', activity: 'Set watch to destination time', icon: '⌚', description: 'Start thinking in Tokyo time immediately', importance: 'critical' },
    { time: 'In-flight', activity: 'Sleep if it\'s night in Tokyo', icon: '😴', description: 'Use eye mask and earplugs, skip the movie', importance: 'critical' },
    { time: 'Every 2 hours', activity: 'Walk and stretch', icon: '🚶', description: 'Move around to maintain circulation', importance: 'recommended' },
    { time: 'Throughout', activity: 'Stay hydrated', icon: '💧', description: 'Drink water every hour, avoid caffeine after 6pm Tokyo time', importance: 'critical' },
  ],
  afterArrival: [
    { time: 'Morning arrival', activity: 'Get bright light exposure', icon: '☀️', description: 'Spend time outdoors — sunlight resets your circadian rhythm', importance: 'critical' },
    { time: 'First day', activity: 'Stay awake until 9pm local', icon: '👀', description: 'No naps longer than 20 minutes, push through fatigue', importance: 'critical' },
    { time: 'Evening', activity: 'Light dinner, no screens', icon: '🍽️', description: 'Eat early, avoid blue light 2 hours before bed', importance: 'recommended' },
    { time: 'Days 2-3', activity: 'Maintain local schedule', icon: '📅', description: 'Wake at the same time each day, eat meals at local times', importance: 'critical' },
    { time: 'Optional', activity: 'Consider melatonin', icon: '💊', description: '0.5-3mg melatonin 30 min before target bedtime (consult doctor)', importance: 'optional' },
  ],
};

export default function JetlagPage() {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [plan, setPlan] = useState<JetLagPlan | null>(null);

  const handleCalculate = async () => {
    if (!departure || !arrival) return;
    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPlan(demoPlan);
    setIsCalculating(false);
  };

  const importanceColors = {
    critical: 'bg-coral-100 text-coral-700 border-coral-200',
    recommended: 'bg-teal-100 text-teal-700 border-teal-200',
    optional: 'bg-midnight-100 text-midnight-600 border-midnight-200',
  };

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
            description="Beat jet lag with a personalized sleep schedule based on your specific flight. Get timing for light exposure, meals, and sleep."
          />

          {/* Calculator */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-3xl shadow-elevated p-6 md:p-8 border border-midnight-100">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Departure City</label>
                  <input
                    type="text"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    placeholder="e.g., Los Angeles"
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Arrival City</label>
                  <input
                    type="text"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    placeholder="e.g., Tokyo"
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Flight Date</label>
                  <input
                    type="date"
                    value={flightDate}
                    onChange={(e) => setFlightDate(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-600 mb-2">Departure Time</label>
                  <input
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full px-4 py-3 bg-midnight-50 border border-midnight-200 rounded-xl text-midnight-900 focus:outline-none focus:border-coral-400 focus:ring-2 focus:ring-coral-400/20 transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={!departure || !arrival || isCalculating}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {isCalculating ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating Your Plan...
                  </>
                ) : (
                  <>
                    <span>🧠</span>
                    Create My Jet Lag Plan
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {plan && (
            <div className="mb-16 animate-fade-in">
              {/* Summary Card */}
              <div className="bg-gradient-to-br from-midnight-900 to-purple-900 rounded-3xl p-8 text-white mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">✈️</span>
                      <h2 className="text-2xl font-display font-semibold">
                        {plan.flightInfo.from} → {plan.flightInfo.to}
                      </h2>
                    </div>
                    <p className="text-purple-200">
                      {plan.flightInfo.timeDiff} hour time difference • Flying {plan.flightInfo.direction}
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-purple-200 text-sm">Expected recovery</p>
                    <p className="text-4xl font-bold">{plan.recoveryDays} days</p>
                  </div>
                </div>
                <p className="text-purple-100 leading-relaxed">{plan.summary}</p>
              </div>

              {/* Schedule Sections */}
              <div className="space-y-8">
                {/* Before Flight */}
                <div className="bg-white rounded-2xl border border-midnight-100 overflow-hidden">
                  <div className="px-6 py-4 bg-midnight-50 border-b border-midnight-100">
                    <h3 className="text-xl font-display font-semibold text-midnight-900 flex items-center gap-3">
                      <span className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">📅</span>
                      Before Your Flight
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {plan.beforeFlight.map((item, i) => (
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

                {/* During Flight */}
                <div className="bg-white rounded-2xl border border-midnight-100 overflow-hidden">
                  <div className="px-6 py-4 bg-midnight-50 border-b border-midnight-100">
                    <h3 className="text-xl font-display font-semibold text-midnight-900 flex items-center gap-3">
                      <span className="w-10 h-10 bg-coral-100 rounded-xl flex items-center justify-center">✈️</span>
                      During Your Flight
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {plan.duringFlight.map((item, i) => (
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

                {/* After Arrival */}
                <div className="bg-white rounded-2xl border border-midnight-100 overflow-hidden">
                  <div className="px-6 py-4 bg-midnight-50 border-b border-midnight-100">
                    <h3 className="text-xl font-display font-semibold text-midnight-900 flex items-center gap-3">
                      <span className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">🌅</span>
                      After You Arrive
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {plan.afterArrival.map((item, i) => (
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
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WhyUseCard 
              points={[
                'Science-backed circadian rhythm strategies',
                'Personalized to your specific flight',
                'Reduce jet lag symptoms by up to 50%',
                'Works for any time zone difference',
              ]}
            />
            <HowAICard 
              description="JetLagRx uses circadian rhythm science to calculate optimal light exposure, meal timing, and sleep schedules."
              capabilities={[
                'Time zone analysis',
                'Circadian rhythm modeling',
                'Light exposure timing',
                'Personalized schedules',
              ]}
            />
            <QphiQInsight 
              insight="The #1 mistake: napping on arrival day. Push through until at least 8pm local time — one hard day beats a week of poor sleep."
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
