import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';

const tools = [
  { name: 'FlightRadar', icon: '✈️', desc: 'Flight price tracking & predictions', href: '/flights' },
  { name: 'StayCompare', icon: '🏨', desc: 'Hotel price comparison', href: '/hotels' },
  { name: 'TripForge', icon: '🗺️', desc: 'AI itinerary builder', href: '/planner' },
  { name: 'PointsMax', icon: '💳', desc: 'Credit card rewards optimizer', href: '/points' },
  { name: 'VisaCheck', icon: '🛂', desc: 'Entry requirements checker', href: '/visa' },
  { name: 'PackSmart', icon: '🎒', desc: 'AI packing assistant', href: '/packing' },
  { name: 'SafetyPulse', icon: '🛡️', desc: 'Travel safety advisories', href: '/safety' },
  { name: 'CurrencyIQ', icon: '💱', desc: 'Currency & exchange tools', href: '/currency' },
  { name: 'LocalLens', icon: '📍', desc: 'Destination guides', href: '/guides' },
  { name: 'JetLagRx', icon: '😴', desc: 'Jet lag recovery plans', href: '/jetlag' },
  { name: 'RentalScout', icon: '🚗', desc: 'Car rental comparison', href: '/cars' },
  { name: 'TripGuard', icon: '🔒', desc: 'Travel insurance hub', href: '/insurance' },
];

const dataSources = [
  { name: 'Skyscanner', type: 'Flights', logo: '✈️' },
  { name: 'Amadeus', type: 'Flights & Hotels', logo: '🌐' },
  { name: 'Booking.com', type: 'Hotels', logo: '🏨' },
  { name: 'Expedia', type: 'Hotels & Cars', logo: '🗺️' },
  { name: 'U.S. State Department', type: 'Safety Advisories', logo: '🏛️' },
  { name: 'CDC', type: 'Health Advisories', logo: '🏥' },
  { name: 'OpenWeather', type: 'Weather Data', logo: '🌤️' },
  { name: 'ExchangeRate API', type: 'Currency Rates', logo: '💱' },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-coral-400 to-coral-500 rounded-2xl text-4xl mb-6 shadow-lg shadow-coral-400/30">
              ✈️
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-midnight-900 mb-6">
              About WAYFARE
            </h1>
            <p className="text-xl text-midnight-600 max-w-3xl mx-auto leading-relaxed">
              We&apos;re building the most comprehensive travel intelligence platform — combining AI with real-time data to help you plan smarter trips and save money.
            </p>
          </div>

          {/* Mission */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-semibold text-midnight-900 mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-midnight-600 leading-relaxed">
                <p>
                  Travel planning is broken. You spend hours comparing prices across 10 different sites, never sure if you&apos;re getting the best deal. Hidden fees surprise you at checkout. You don&apos;t know if you should book now or wait.
                </p>
                <p>
                  WAYFARE fixes this by aggregating data from the world&apos;s best travel sources and using AI to give you clear, actionable recommendations. We show you the TRUE price including all fees, predict when prices will rise or fall, and help you maximize your travel rewards.
                </p>
                <p>
                  Our goal is simple: <strong className="text-midnight-900">save you time and money on every trip.</strong>
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-coral-50 to-gold-50 rounded-3xl p-8 border border-coral-100">
              <h3 className="text-xl font-display font-semibold text-midnight-900 mb-6">
                Why Trust WAYFARE?
              </h3>
              <ul className="space-y-4">
                {[
                  'We show real prices, including all taxes and fees',
                  'Our AI predictions are based on historical data',
                  'We disclose all affiliate relationships',
                  'We never sell your personal data',
                  'Free to use — no hidden subscriptions',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-midnight-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="bg-midnight-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-semibold text-white mb-4">
                12 Tools for Every Traveler
              </h2>
              <p className="text-midnight-300 max-w-2xl mx-auto">
                From finding the cheapest flights to beating jet lag, we&apos;ve got you covered.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tools.map((tool) => (
                <Link 
                  key={tool.name}
                  href={tool.href}
                  className="bg-midnight-800/50 hover:bg-midnight-800 border border-midnight-700 hover:border-coral-500/50 rounded-xl p-4 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-1">{tool.name}</h3>
                  <p className="text-sm text-midnight-400">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-semibold text-midnight-900 mb-4">
                Powered by Trusted Sources
              </h2>
              <p className="text-midnight-600 max-w-2xl mx-auto">
                We aggregate real-time data from industry-leading travel APIs and official government sources.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {dataSources.map((source) => (
                <div 
                  key={source.name}
                  className="bg-white rounded-xl border border-midnight-100 p-6 text-center hover:shadow-card-hover transition-shadow"
                >
                  <div className="text-4xl mb-3">{source.logo}</div>
                  <h3 className="font-semibold text-midnight-900 mb-1">{source.name}</h3>
                  <p className="text-sm text-midnight-500">{source.type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Make Money */}
        <section className="bg-gradient-to-br from-midnight-50 to-coral-50/30 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-semibold text-midnight-900 mb-4">
                How We Make Money
              </h2>
              <p className="text-midnight-600">
                Transparency is a core value. Here&apos;s exactly how WAYFARE generates revenue.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-midnight-100 p-8 space-y-6">
              {[
                {
                  title: 'Affiliate Commissions',
                  desc: 'When you click through to book with our partners (airlines, hotels, insurance companies), we may earn a commission. This doesn\'t cost you anything extra.',
                },
                {
                  title: 'Credit Card Referrals',
                  desc: 'Our PointsMax tool recommends travel credit cards. If you apply and are approved, we may receive a referral bonus from the card issuer.',
                },
                {
                  title: 'Featured Placements',
                  desc: 'Some partners may pay for enhanced visibility. We clearly label any sponsored or featured content.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-coral-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-coral-600 font-semibold">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-midnight-900 mb-1">{item.title}</h3>
                    <p className="text-midnight-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-midnight-500 mt-6">
              Our recommendations prioritize your best interest. Affiliate relationships do not influence our rankings or advice.
            </p>
          </div>
        </section>

        {/* Powered By */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-midnight-400 mb-4">Powered by</p>
            <a 
              href="https://qphiq.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-coral-500 to-coral-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <span className="text-2xl">⚡</span>
              QphiQ
            </a>
            <p className="text-midnight-500 mt-4 max-w-lg mx-auto">
              WAYFARE is part of the QphiQ family of AI-powered intelligence platforms.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-midnight-900 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-display font-semibold text-white mb-4">
              Questions? Get in Touch
            </h2>
            <p className="text-midnight-300 mb-6">
              We&apos;d love to hear from you — feedback, partnership inquiries, or just to say hi.
            </p>
            <a 
              href="mailto:hello@wayfare.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-midnight-900 font-medium rounded-xl hover:bg-midnight-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hello@wayfare.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
