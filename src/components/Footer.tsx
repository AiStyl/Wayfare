import Link from 'next/link';

const tools = [
  { name: 'FlightRadar', href: '/flights' },
  { name: 'StayCompare', href: '/hotels' },
  { name: 'TripForge', href: '/planner' },
  { name: 'PointsMax', href: '/points' },
  { name: 'VisaCheck', href: '/visa' },
  { name: 'PackSmart', href: '/packing' },
  { name: 'SafetyPulse', href: '/safety' },
  { name: 'CurrencyIQ', href: '/currency' },
  { name: 'LocalLens', href: '/guides' },
  { name: 'JetLagRx', href: '/jetlag' },
  { name: 'RentalScout', href: '/cars' },
  { name: 'TripGuard', href: '/insurance' },
];

const dataSources = [
  'Skyscanner',
  'Booking.com',
  'Expedia',
  'TripAdvisor',
  'State Dept',
  'Amadeus',
  'OpenWeather',
  'exchangerate.host',
];

export default function Footer() {
  return (
    <footer className="bg-midnight-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-coral-400 to-coral-500 rounded-xl rotate-3" />
                <span className="relative text-white text-xl">✈</span>
              </div>
              <span className="text-xl font-display font-semibold tracking-tight">
                WAYFARE
              </span>
            </Link>
            <p className="text-midnight-300 text-sm leading-relaxed mb-6">
              Compare. Plan. Book. Save.<br />
              AI-powered travel intelligence for smarter trips.
            </p>
            <a 
              href="mailto:hello@wayfare.com" 
              className="inline-flex items-center gap-2 text-coral-400 hover:text-coral-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              hello@wayfare.com
            </a>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-display font-medium text-lg mb-6">Tools</h4>
            <ul className="space-y-3">
              {tools.slice(0, 6).map((tool) => (
                <li key={tool.name}>
                  <Link 
                    href={tool.href}
                    className="text-midnight-300 hover:text-coral-400 transition-colors text-sm"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-medium text-lg mb-6 opacity-0 pointer-events-none">More</h4>
            <ul className="space-y-3">
              {tools.slice(6).map((tool) => (
                <li key={tool.name}>
                  <Link 
                    href={tool.href}
                    className="text-midnight-300 hover:text-coral-400 transition-colors text-sm"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="font-display font-medium text-lg mb-6">Data Sources</h4>
            <ul className="space-y-3">
              {dataSources.map((source) => (
                <li key={source} className="text-midnight-400 text-sm">
                  {source}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-midnight-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-midnight-400 text-sm">
              © {new Date().getFullYear()} WAYFARE. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy" 
                className="text-midnight-400 hover:text-coral-400 transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-midnight-400 hover:text-coral-400 transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
            <p className="text-midnight-500 text-xs">
              Powered by{' '}
              <a 
                href="https://qphiq.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-coral-400 hover:text-coral-300 transition-colors"
              >
                QphiQ
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="border-t border-midnight-800 bg-midnight-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-midnight-300 text-sm text-center leading-relaxed">
            <strong className="text-coral-400">Disclaimer:</strong> WAYFARE provides information for general guidance only. 
            Travel requirements, prices, and availability change frequently. Always verify information with official sources, 
            airlines, hotels, and government websites before making travel decisions. WAYFARE is not responsible for any 
            inaccuracies or changes in third-party data. Financial and visa information is not professional advice — 
            consult qualified professionals for specific situations. Some links may be affiliate links.
          </p>
        </div>
      </div>
    </footer>
  );
}
