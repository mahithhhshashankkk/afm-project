import { Check, Sparkles, Rocket, Building, ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface Plan {
  icon: typeof Rocket;
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const PLANS: Plan[] = [
  {
    icon: Rocket,
    name: 'Pilot Project',
    tagline: 'Perfect for testing on a single kitchen or hostel',
    price: '₹15,000',
    period: '/ 3-month pilot',
    features: [
      'Single kitchen or hostel',
      'Waste logging & basic analytics',
      'Predictive consumption model (trained on your data)',
      'Weekly sustainability summary',
      'Email support',
      'Onboarding session for staff',
    ],
    cta: 'Start a Pilot',
    highlighted: false,
  },
  {
    icon: Sparkles,
    name: 'Campus Plan',
    tagline: 'Full deployment across multiple kitchens and hostels',
    price: '₹8,000',
    period: '/ month per campus',
    features: [
      'Unlimited kitchens & hostels',
      'Full AI prediction & procurement engine',
      'Advanced sustainability dashboards',
      'Waste segregation guidance & compliance',
      'Custom report generation for committees',
      'Priority support & quarterly review',
      'Multi-campus benchmarking',
    ],
    cta: 'Schedule a Demo',
    highlighted: true,
  },
  {
    icon: Building,
    name: 'University Enterprise',
    tagline: 'Multi-campus institutions with 1000+ residents',
    price: 'Custom',
    period: 'tailored to your needs',
    features: [
      'Everything in Campus Plan',
      'Dedicated account manager',
      'Custom integrations with existing systems',
      'ESG reporting templates & exports',
      'On-site training workshops',
      'SLA-backed support',
      'Annual sustainability audit',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} relative flex flex-col rounded-3xl border-2 p-8 transition-all duration-300 ${
        plan.highlighted
          ? 'border-primary-500 bg-white shadow-2xl shadow-primary-500/15 lg:scale-105 lg:-mt-4'
          : 'border-ink-100 bg-white hover:border-primary-200 hover:shadow-xl'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {plan.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
        plan.highlighted ? 'bg-primary-600 shadow-lg shadow-primary-600/30' : 'bg-ink-100'
      }`}>
        <plan.icon className={`h-6 w-6 ${plan.highlighted ? 'text-white' : 'text-ink-600'}`} strokeWidth={2} />
      </div>

      <h3 className="mt-5 font-display text-xl font-bold text-ink-900">{plan.name}</h3>
      <p className="mt-1 text-sm text-ink-400">{plan.tagline}</p>

      <div className="mt-6 border-y border-ink-100 py-6">
        <div className="flex items-baseline gap-1">
          <span className={`font-display text-4xl font-extrabold ${plan.highlighted ? 'text-primary-600' : 'text-ink-900'}`}>
            {plan.price}
          </span>
          <span className="text-sm font-medium text-ink-400">{plan.period}</span>
        </div>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              plan.highlighted ? 'bg-primary-100' : 'bg-green-100'
            }`}>
              <Check className={`h-3 w-3 ${plan.highlighted ? 'text-primary-600' : 'text-green-600'}`} strokeWidth={3} />
            </span>
            <span className="font-medium text-ink-600">{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`mt-8 w-full ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} justify-center`}
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-ink-50 py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="section-label mx-auto mb-5">
            <Rocket className="h-3.5 w-3.5" />
            Pricing & Plans
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            Start small. Scale when you're <span className="gradient-text">ready</span>.
          </h2>
          <p className="mt-5 text-lg text-ink-500 text-balance">
            Begin with a focused pilot, then expand across your campus. No long-term contracts, no hidden fees.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-400">
          All plans include onboarding, staff training materials, and a dedicated support channel.
        </p>
      </div>
    </section>
  );
}
