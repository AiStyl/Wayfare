'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const tools = [
  { name: 'FlightRadar', href: '/flights', icon: '✈️' },
  { name: 'StayCompare', href: '/hotels', icon: '🏨' },
  { name: 'TripForge', href: '/planner', icon: '🗺️' },
  { name: 'PointsMax', href: '/points', icon: '💳' },
  { name: 'VisaCheck', href: '/visa', icon: '🛂' },
  { name: 'PackSmart', href: '/packing', icon: '🎒' },
  { name: 'SafetyPulse', href: '/safety', icon: '🛡️' },
  { name: 'CurrencyIQ', href: '/currency', icon: '💱' },
  { name: 'LocalLens', href: '/guides', icon: '📍' },
  { name: 'JetLagRx', href: '/jetlag', icon: '😴' },
  { name: 'RentalScout', href: '/cars', icon: '🚗' },
  { name: 'TripGuard', href: '/insurance', icon: '🔒' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-midnight-900/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-coral-400 to-coral-500 rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-300" />
              <span className="relative text-white text-xl">✈</span>
            </div>
            <span className="text-xl font-display font-semibold text-midnight-900 tracking-tight">
              WAYFARE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                onBlur={() => setTimeout(() => setToolsOpen(false), 200)}
                className="flex items-center gap-2 text-midnight-600 hover:text-coral-500 font-medium transition-colors"
              >
                Tools
                <svg 
                  className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {toolsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white rounded-2xl shadow-elevated border border-midnight-100 p-6 animate-slide-down">
                  <div className="grid grid-cols-3 gap-3">
                    {tools.map((tool) => (
                      <Link
                        key={tool.name}
                        href={tool.href}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-coral-50 transition-colors group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">
                          {tool.icon}
                        </span>
                        <span className="font-medium text-midnight-700 group-hover:text-coral-600">
                          {tool.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/about" 
              className="text-midnight-600 hover:text-coral-500 font-medium transition-colors"
            >
              About
            </Link>

            <Link 
              href="/privacy" 
              className="text-midnight-600 hover:text-coral-500 font-medium transition-colors"
            >
              Privacy
            </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link
              href="/planner"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-coral-400 to-coral-500 text-white font-medium rounded-xl shadow-lg shadow-coral-400/20 hover:shadow-xl hover:shadow-coral-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Plan a Trip</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="lg:hidden p-2 text-midnight-600 hover:text-coral-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {toolsOpen && (
        <div className="lg:hidden bg-white border-t border-midnight-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 gap-3">
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-coral-50 transition-colors"
                  onClick={() => setToolsOpen(false)}
                >
                  <span className="text-xl">{tool.icon}</span>
                  <span className="font-medium text-midnight-700">{tool.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
