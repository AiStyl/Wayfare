import Link from 'next/link';

interface ToolCardProps {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  href: string;
  badge?: {
    text: string;
    type: 'popular' | 'new' | 'save' | 'recommended';
  };
  features: string[];
  gradient?: string;
}

const badgeStyles = {
  popular: 'bg-coral-100 text-coral-700',
  new: 'bg-purple-100 text-purple-700',
  save: 'bg-teal-100 text-teal-700',
  recommended: 'bg-gold-100 text-gold-700',
};

export default function ToolCard({
  name,
  tagline,
  description,
  icon,
  href,
  badge,
  features,
}: ToolCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="relative bg-white rounded-2xl p-6 border border-midnight-100/50 hover:border-coral-200 hover:shadow-[0_12px_40px_-8px_rgba(15,23,41,0.15)] hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-coral-50/0 to-gold-50/0 group-hover:from-coral-50/50 group-hover:to-gold-50/30 transition-all duration-500 rounded-2xl pointer-events-none" />
        
        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-midnight-50 to-midnight-100 rounded-xl text-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              {icon}
            </div>
            {badge && (
              <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${badgeStyles[badge.type]}`}>
                {badge.text}
              </span>
            )}
          </div>

          {/* Title & Tagline */}
          <h3 className="text-lg font-display font-semibold text-midnight-900 mb-1 group-hover:text-coral-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-coral-500 font-medium mb-3">
            {tagline}
          </p>

          {/* Description */}
          <p className="text-midnight-600 text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-4">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-midnight-500">
                <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-2 text-coral-500 font-medium text-sm group-hover:gap-3 transition-all">
            Launch {name}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
