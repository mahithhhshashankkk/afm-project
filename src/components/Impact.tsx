import { Leaf, Wind, Recycle, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const IMPACT_CARDS = [
  {
    icon: UtensilsCrossed,
    metric: '4,200',
    unit: 'meals saved',
    description: 'Per campus annually — food that would have been wasted is redirected or better planned.',
    color: 'text-primary-600',
    bg: 'bg-primary-50',
  },
  {
    icon: Wind,
    metric: '1.2T',
    unit: 'CO₂ avoided',
    description: 'Greenhouse gas emissions prevented through reduced production and disposal of wasted food.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Recycle,
    metric: '850 kg',
    unit: 'waste diverted',
    description: 'Organic waste properly segregated and redirected to composting or bio-gas facilities.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Leaf,
    metric: '40%',
    unit: 'less surplus',
    description: 'Average reduction in excess food prepared, thanks to AI-driven demand prediction.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
];

export function Impact() {
  const { ref, visible } = useReveal();

  return (
    <section id="impact" className="relative overflow-hidden bg-ink-900 py-24 lg:py-32">
      <div className="absolute inset-0 bg-dot-pattern opacity-10" />
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-green-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-300">
            <Leaf className="h-3.5 w-3.5" />
            Sustainability Impact
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Every kilogram saved is a <span className="text-primary-400">win for the planet</span>
          </h2>
          <p className="mt-5 text-lg text-ink-400 text-balance">
            Food waste isn't just a financial problem — it's one of the largest contributors to climate change.
            WasteHero turns your campus into a measurable force for environmental good.
          </p>
        </div>

        <div ref={ref} className={`reveal ${visible ? 'visible' : ''} mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
          {IMPACT_CARDS.map((card, i) => (
            <div
              key={card.unit}
              className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:bg-white/10 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg} transition-transform duration-300 group-hover:scale-110`}>
                <card.icon className={`h-6 w-6 ${card.color}`} strokeWidth={2} />
              </div>
              <p className="mt-5 font-display text-4xl font-extrabold text-white">
                {card.metric}
              </p>
              <p className={`text-sm font-bold ${card.color}`}>{card.unit}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-400">{card.description}</p>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-primary-600/20 to-orange-600/10 p-8 backdrop-blur-sm lg:flex-row lg:p-10">
          <div className="text-center lg:text-left">
            <h3 className="font-display text-2xl font-bold text-white">
              Ready to see your campus numbers here?
            </h3>
            <p className="mt-2 text-sm text-ink-300">
              Start a pilot project and measure your impact within 30 days.
            </p>
          </div>
          <a href="#contact" className="btn-primary shrink-0">
            Start Your Pilot
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
