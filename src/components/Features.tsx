import {
  ClipboardList,
  Brain,
  ShoppingCart,
  SplitSquareHorizontal,
  LayoutDashboard,
  TrendingDown,
  type LucideIcon,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
  accent: string;
}

const FEATURES: Feature[] = [
  {
    icon: ClipboardList,
    title: 'Waste Logging',
    description:
      'Simple, fast data entry for daily food waste across kitchens, counters, and service lines. No complex hardware required.',
    highlights: ['Photo-based logging', 'Meal & shift tagging', 'Multi-canteen support'],
    accent: 'from-orange-500 to-amber-500',
  },
  {
    icon: Brain,
    title: 'Predictive Consumption Models',
    description:
      'AI analyzes historical data, day-of-week patterns, and seasonal trends to forecast how much food each meal will actually need.',
    highlights: ['Day-ahead forecasting', 'Seasonal adjustment', 'Confidence scoring'],
    accent: 'from-blue-500 to-cyan-500',
  },
  {
    icon: ShoppingCart,
    title: 'Procurement Suggestions',
    description:
      'Receive AI-driven ordering recommendations that align purchases with predicted demand — reducing over-buying and spoilage.',
    highlights: ['Auto-adjusted quantities', 'Vendor integration ready', 'Budget-aware alerts'],
    accent: 'from-green-500 to-emerald-500',
  },
  {
    icon: SplitSquareHorizontal,
    title: 'Waste Segregation Guidance',
    description:
      'Step-by-step guidance for proper segregation of organic, recyclable, and hazardous waste — compliant with Indian regulations.',
    highlights: ['Color-coded guides', 'Compliance checklists', 'Staff training modules'],
    accent: 'from-purple-500 to-pink-500',
  },
  {
    icon: LayoutDashboard,
    title: 'Sustainability Dashboards',
    description:
      'Visual, exportable reports on waste trends, cost savings, and environmental impact — ready for committee meetings and audits.',
    highlights: ['One-click PDF reports', 'Real-time metrics', 'Year-over-year comparison'],
    accent: 'from-orange-600 to-red-500',
  },
  {
    icon: TrendingDown,
    title: 'Cost Analytics',
    description:
      'Track exactly how much money is being saved through waste reduction, with clear breakdowns by kitchen, meal, and time period.',
    highlights: ['ROI tracking', 'Per-meal cost analysis', 'Budget variance alerts'],
    accent: 'from-teal-500 to-green-600',
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`card card-hover reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} shadow-lg`}
      >
        <feature.icon className="h-6 w-6 text-white" strokeWidth={2} />
      </div>
      <h3 className="font-display text-lg font-bold text-ink-900">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{feature.description}</p>
      <ul className="mt-5 space-y-2">
        {feature.highlights.map((h) => (
          <li key={h} className="flex items-center gap-2 text-xs font-medium text-ink-600">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-100">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
            </span>
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}


export function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="section-label mx-auto mb-5">
            <ClipboardList className="h-3.5 w-3.5" />
            Core Features
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            Everything you need to run a <span className="gradient-text">zero-waste kitchen</span>
          </h2>
          <p className="mt-5 text-lg text-ink-500 text-balance">
            Six powerful modules that work together seamlessly — from the moment food is ordered to the moment waste is logged.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
