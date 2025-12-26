interface WhyUseCardProps {
  title?: string;
  points: string[];
}

export function WhyUseCard({ title = "Why Use This Tool", points }: WhyUseCardProps) {
  return (
    <div className="bg-gold-50 border border-gold-200 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="font-display font-semibold text-gold-900 mb-3">{title}</h3>
          <ul className="space-y-2">
            {points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gold-800">
                <svg className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface HowAICardProps {
  description: string;
  capabilities?: string[];
}

export function HowAICard({ description, capabilities }: HowAICardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-900 to-midnight-900 text-white border border-purple-800 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-purple-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="font-display font-semibold text-white mb-2">How We Use AI</h3>
          <p className="text-purple-200 text-sm leading-relaxed mb-3">
            {description}
          </p>
          {capabilities && capabilities.length > 0 && (
            <ul className="space-y-1.5">
              {capabilities.map((cap, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-purple-300">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  {cap}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

interface QphiQInsightProps {
  insight: string;
}

export function QphiQInsight({ insight }: QphiQInsightProps) {
  return (
    <div className="bg-gradient-to-br from-coral-600 to-coral-700 text-white border border-coral-500 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-coral-500/50 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-coral-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="font-display font-semibold text-white mb-2 flex items-center gap-2">
            QphiQ Insight
            <span className="text-xs font-normal text-coral-200 bg-coral-500/30 px-2 py-0.5 rounded-full">
              AI Analysis
            </span>
          </h3>
          <p className="text-coral-100 text-sm leading-relaxed">
            {insight}
          </p>
        </div>
      </div>
    </div>
  );
}

// Page Header Component for tool pages
interface ToolPageHeaderProps {
  icon: string;
  name: string;
  tagline: string;
  description: string;
}

export function ToolPageHeader({ icon, name, tagline, description }: ToolPageHeaderProps) {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-coral-50 to-coral-100 rounded-2xl text-4xl mb-6 animate-float">
        {icon}
      </div>
      <h1 className="text-4xl md:text-5xl font-display font-semibold text-midnight-900 mb-3">
        {name}
      </h1>
      <p className="text-xl text-coral-500 font-medium mb-4">
        {tagline}
      </p>
      <p className="text-midnight-600 text-lg max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}
