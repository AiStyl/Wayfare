import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';

const tools = [
  {
    name: 'FlightRadar',
    tagline: 'Fare Intelligence',
    description: 'Track prices across airlines, get fare predictions, and never overpay for flights again.',
    icon: '✈️',
    href: '/flights',
    badge: { text: 'Popular', type: 'popular' as const },
    features: ['Real-time price tracking', 'Fare predictions', 'Price alerts'],
  },
  {
    name: 'StayCompare',
    tagline: 'Hotel Price Compare',
    description: 'See the real price after fees. Compare hotels across all booking sites instantly.',
    icon: '🏨',
    href: '/hotels',
    badge: { text: 'Save $50+', type: 'save' as const },
    features: ['Side-by-side comparison', 'True cost calculator', 'Review aggregation'],
  },
  {
    name: 'TripForge',
    tagline: 'AI Itinerary Builder',
    description: 'Describe your ideal trip and get a complete, bookable itinerary in seconds.',
    icon: '🗺️',
    href: '/planner',
    badge: { text: 'Popular', type: 'popular' as const },
    features: ['Natural language planning', 'One-click booking', 'Budget optimization'],
  },
  {
    name: 'PointsMax',
    tagline: 'Rewards Optimizer',
    description: 'Calculate your points value and find the best travel credit cards for your spending.',
    icon: '💳',
    href: '/points',
    badge: { text: 'Save $200+', type: 'save' as const },
    features: ['Points value calculator', 'Card recommendations', 'Sign-up bonus tracker'],
  },
  {
    name: 'VisaCheck',
    tagline: 'Entry Requirements',
    description: 'Know exactly what you need before you go. Visa, vaccination, and entry requirements.',
    icon: '🛂',
    href: '/visa',
    features: ['Passport-specific info', 'E-visa links', 'Health requirements'],
  },
  {
    name: 'PackSmart',
    tagline: 'AI Packing Assistant',
    description: 'Get a personalized packing list based on destination, weather, and trip type.',
    icon: '🎒',
    href: '/packing',
    features: ['Weather-aware lists', 'Activity-specific gear', 'Carry-on optimizer'],
  },
  {
    name: 'SafetyPulse',
    tagline: 'Travel Advisory Hub',
    description: 'Real-time safety information from official sources. Health alerts and security advisories.',
    icon: '🛡️',
    href: '/safety',
    features: ['State Dept integration', 'Health alerts', 'Emergency contacts'],
  },
  {
    name: 'CurrencyIQ',
    tagline: 'Smart Currency Tools',
    description: 'Real exchange rates, cost of living data, and ATM fee avoidance tips.',
    icon: '💱',
    href: '/currency',
    features: ['Real-time rates', 'Bank fee comparison', 'Tipping guides'],
  },
  {
    name: 'LocalLens',
    tagline: 'Destination Intelligence',
    description: 'Insider guides with local tips, hidden gems, and bookable experiences.',
    icon: '📍',
    href: '/guides',
    badge: { text: 'New', type: 'new' as const },
    features: ['Local picks', 'Hidden gems', 'Bookable tours'],
  },
  {
    name: 'JetLagRx',
    tagline: 'Recovery Planner',
    description: 'Beat jet lag with a personalized sleep schedule and timing recommendations.',
    icon: '😴',
    href: '/jetlag',
    features: ['Custom sleep schedule', 'Light exposure timing', 'Meal timing tips'],
  },
  {
    name: 'RentalScout',
    tagline: 'Car Rental Finder',
    description: 'Compare car rental prices with insurance and fees included. No surprises.',
    icon: '🚗',
    href: '/cars',
    features: ['All major providers', 'True cost with fees', 'Insurance comparison'],
  },
  {
    name: 'TripGuard',
    tagline: 'Travel Insurance Hub',
    description: 'Compare travel insurance policies and find the right coverage for your trip.',
    icon: '🔒',
    href: '/insurance',
    badge: { text: 'Recommended', type: 'recommended' as const },
    features: ['Policy comparison', 'Coverage analysis', 'Instant quotes'],
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient orbs */}
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-coral-200/30 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gold-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-purple-200/20 rounded-full blur-3xl" />
            
            {/* Floating airplane */}
            <div className="absolute top-1/3 opacity-10 animate-plane">
              <svg className="w-16 h-16 text-coral-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg shadow-midnight-900/5 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-midnight-600">12 AI-Powered Travel Tools</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-semibold text-midnight-900 mb-6 animate-slide-up stagger-1">
              <span className="gradient-text">Compare.</span> Plan.<br />
              Book. <span className="gradient-text">Save.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-midnight-600 max-w-3xl mx-auto mb-10 animate-slide-up stagger-2">
              WAYFARE combines AI intelligence with real-time data from the world&apos;s best travel sources. 
              Plan smarter trips and save money on every booking.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-3">
              <a 
                href="/planner"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:shadow-coral-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg"
              >
                Start Planning
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="#tools"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-midnight-200 text-midnight-700 font-semibold rounded-xl hover:border-coral-400 hover:text-coral-500 transition-all duration-200 text-lg"
              >
                Explore Tools
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-midnight-400 animate-fade-in stagger-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm">Real-time data</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm">No sign-up required</span>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-midnight-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Tools Grid Section */}
        <section id="tools" className="py-24 bg-gradient-to-b from-white to-midnight-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-midnight-900 mb-4">
                12 Tools for Smarter Travel
              </h2>
              <p className="text-lg text-midnight-600 max-w-2xl mx-auto">
                From finding the cheapest flights to beating jet lag, WAYFARE has everything you need 
                to plan, book, and enjoy your perfect trip.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <div 
                  key={tool.name}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ToolCard {...tool} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-midnight-900 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full" style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30z\' fill=\'%23fff\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")',
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
                How WAYFARE Works
              </h2>
              <p className="text-lg text-midnight-300 max-w-2xl mx-auto">
                We aggregate data from the world&apos;s best travel sources and use AI to help you 
                make smarter decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Real-Time Data',
                  description: 'We pull live data from Skyscanner, Booking.com, State Dept, and more — so you always get current information.',
                  icon: '📡',
                },
                {
                  step: '02',
                  title: 'AI Analysis',
                  description: 'Our AI analyzes prices, patterns, and preferences to give you personalized recommendations.',
                  icon: '🧠',
                },
                {
                  step: '03',
                  title: 'Save Money',
                  description: 'Get the best deals, avoid hidden fees, and maximize your travel rewards on every trip.',
                  icon: '💰',
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="bg-midnight-800/50 backdrop-blur-sm rounded-2xl p-8 border border-midnight-700 hover:border-coral-500/50 transition-colors">
                    <div className="text-6xl mb-6">{item.icon}</div>
                    <div className="text-coral-400 text-sm font-mono mb-2">Step {item.step}</div>
                    <h3 className="text-xl font-display font-semibold mb-3">{item.title}</h3>
                    <p className="text-midnight-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-coral-50 via-white to-gold-50" />
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-coral-400 to-coral-500 rounded-2xl text-4xl mb-8 animate-float shadow-lg shadow-coral-400/30">
              ✈️
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-midnight-900 mb-4">
              Ready to Plan Your Next Adventure?
            </h2>
            <p className="text-lg text-midnight-600 mb-8 max-w-2xl mx-auto">
              Start with TripForge — describe your dream trip in plain English and get 
              a complete itinerary in seconds.
            </p>
            <a 
              href="/planner"
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-semibold rounded-xl shadow-lg shadow-coral-400/25 hover:shadow-xl hover:shadow-coral-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-lg"
            >
              Start Planning Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
