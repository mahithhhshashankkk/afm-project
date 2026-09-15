import { useState } from 'react';
import {
  Building2,
  ChefHat,
  Leaf,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface Stakeholder {
  icon: LucideIcon;
  role: string;
  title: string;
  benefits: string[];
  accent: string;
  iconBg: string;
}

const STAKEHOLDERS: Stakeholder[] = [
  {
    icon: Building2,
    role: 'Administrators',
    title: 'Clear oversight, measurable ROI',
    benefits: [
      'Real-time dashboards across all campus kitchens',
      'Sustainability reports ready for board meetings',
      'Track cost savings and environmental impact at a glance',
      'Lightweight deployment — no IT infrastructure overhaul',
    ],
    accent: 'border-primary-500 bg-primary-50',
    iconBg: 'bg-primary-600',
  },
  {
    icon: ChefHat,
    role: 'Canteen & Hostel Managers',
    title: 'Simplify daily operations',
    benefits: [
      '60-second waste logging from any phone or tablet',
      'AI tells you exactly how much to order and cook',
      'Reduce end-of-day food surplus and spoilage',
      'Segregation guides keep staff compliant and confident',
    ],
    accent: 'border-green-500 bg-green-50',
    iconBg: 'bg-green-600',
  },
  {
    icon: Leaf,
    role: 'Sustainability Officers',
    title: 'Data-driven environmental goals',
    benefits: [
      'Track CO₂ avoided, meals saved, and waste diverted',
      'Year-over-year comparison for ESG reporting',
      'Visual exports for grant applications and audits',
      'Benchmark performance across multiple campuses',
    ],
    accent: 'border-blue-500 bg-blue-50',
    iconBg: 'bg-blue-600',
  },
  {
    icon: GraduationCap,
    role: 'Student Communities',
    title: 'Be part of the change',
    benefits: [
      'Transparency into campus food sustainability efforts',
      'Visible impact builds community pride and engagement',
      'Supports zero-waste and eco-club initiatives',
      'Real numbers for student sustainability campaigns',
    ],
    accent: 'border-purple-500 bg-purple-50',
    iconBg: 'bg-purple-600',
  },
];

function StakeholderPanel({ stakeholder, active }: { stakeholder: Stakeholder; active: boolean }) {
  if (!active) return null;
  return (
    <div className="animate-fade-in rounded-2xl border-2 border-ink-100 bg-white p-8 lg:p-10">
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stakeholder.iconBg} shadow-lg`}>
          <stakeholder.icon className="h-6 w-6 text-white" strokeWidth={2} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary-500">{stakeholder.role}</p>
          <h3 className="font-display text-xl font-bold text-ink-900">{stakeholder.title}</h3>
        </div>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {stakeholder.benefits.map((b) => (
          <li key={b} className="flex items-start gap-3 rounded-xl bg-ink-50 p-4">
            <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${stakeholder.iconBg}`}>
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
            <span className="text-sm font-medium leading-relaxed text-ink-600">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Benefits() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, visible } = useReveal();

  return (
    <section id="benefits" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="section-label mx-auto mb-5">
            <Building2 className="h-3.5 w-3.5" />
            Benefits For Every Stakeholder
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            Built for everyone who keeps your campus <span className="gradient-text">running</span>
          </h2>
          <p className="mt-5 text-lg text-ink-500 text-balance">
            WasteHero delivers value at every level — from the kitchen counter to the boardroom.
          </p>
        </div>

        <div
          ref={ref}
          className={`reveal ${visible ? 'visible' : ''} mt-14`}
        >
          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-3">
            {STAKEHOLDERS.map((s, i) => (
              <button
                key={s.role}
                onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-2.5 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                  activeIndex === i
                    ? s.accent
                    : 'border-ink-100 bg-white text-ink-500 hover:border-ink-200'
                }`}
              >
                <s.icon className="h-4 w-4" />
                {s.role}
              </button>
            ))}
          </div>

          {/* Active panel */}
          <div className="mt-8">
            {STAKEHOLDERS.map((s, i) => (
              <StakeholderPanel key={s.role} stakeholder={s} active={activeIndex === i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
