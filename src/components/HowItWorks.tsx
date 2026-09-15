import { ClipboardList, Brain, ShoppingCart, BarChart3, ArrowRight, type LucideIcon } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface Step {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
  duration: string;
}

const STEPS: Step[] = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Log Your Waste',
    description:
      'Canteen and hostel staff log daily food waste in under 60 seconds using a simple mobile-friendly form. No training required, no special hardware.',
    duration: 'Day 1–7',
  },
  {
    icon: Brain,
    number: '02',
    title: 'AI Learns Your Patterns',
    description:
      'Our predictive engine analyzes 2–3 weeks of your data to understand consumption patterns by day, meal, season, and kitchen.',
    duration: 'Week 2–4',
  },
  {
    icon: ShoppingCart,
    number: '03',
    title: 'Get Smart Suggestions',
    description:
      'Receive daily procurement recommendations calibrated to your predicted demand, so you buy exactly what you need — no more, no less.',
    duration: 'Week 4+',
  },
  {
    icon: BarChart3,
    number: '04',
    title: 'Report & Improve',
    description:
      'Generate sustainability reports for admin committees, track cost savings month-over-month, and continuously refine your operations.',
    duration: 'Ongoing',
  },
];

function StepCard({ step, index }: { step: Step; index: number }) {
  const { ref, visible } = useReveal();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} flex flex-col gap-6 md:flex-row md:items-center ${
        isEven ? '' : 'md:flex-row-reverse'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Content */}
      <div className="flex-1">
        <div className={`card card-hover ${isEven ? 'md:text-left' : 'md:text-right'}`}>
          <div className={`flex items-center gap-4 ${isEven ? '' : 'md:flex-row-reverse'}`}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 shadow-lg shadow-primary-600/25">
              <step.icon className="h-6 w-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="font-mono text-xs font-bold text-primary-500">{step.duration}</p>
              <h3 className="font-display text-xl font-bold text-ink-900">{step.title}</h3>
            </div>
          </div>
          <p className={`mt-4 text-sm leading-relaxed text-ink-500 ${isEven ? '' : 'md:text-right'}`}>
            {step.description}
          </p>
        </div>
      </div>

      {/* Number circle */}
      <div className="relative flex items-center justify-center md:w-32">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary-200 bg-white font-display text-2xl font-extrabold text-primary-600 shadow-lg">
          {step.number}
        </div>
        {index < STEPS.length - 1 && (
          <div
            className={`hidden absolute h-full w-0.5 bg-gradient-to-b from-primary-200 to-primary-100 md:block ${
              isEven ? 'left-1/2 top-8' : 'left-1/2 top-8'
            }`}
            style={{ height: '120%', transform: 'translateX(-50%)' }}
          />
        )}
      </div>

      {/* Spacer */}
      <div className="hidden flex-1 md:block" />
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-ink-50 py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="section-label mx-auto mb-5">
            <ArrowRight className="h-3.5 w-3.5" />
            How It Works
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            From data to decisions in <span className="gradient-text">four simple steps</span>
          </h2>
          <p className="mt-5 text-lg text-ink-500 text-balance">
            Deploy in days, not months. WasteHero is designed to be lightweight and intuitive — your staff will be up and running immediately.
          </p>
        </div>

        <div className="mt-20 space-y-12">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
