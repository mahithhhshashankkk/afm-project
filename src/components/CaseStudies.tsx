import { Quote, Star, ArrowRight, GraduationCap, TrendingDown, Leaf } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const CASE_STUDIES = [
  {
    name: 'IIT Bombay',
    location: 'Mumbai, Maharashtra',
    residents: '8,500',
    image: 'https://images.pexels.com/photos/20200756/pexels-photo-20200756.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quote:
      'Within three months of deploying WasteHero, our mess halls saw a 32% reduction in plate waste. The AI predictions helped our kitchen staff plan portions far more accurately.',
    author: 'Dr. Anil Sharma',
    role: 'Hostel Mess Committee Chair',
    stats: [
      { icon: TrendingDown, label: 'Waste reduced', value: '32%' },
      { icon: Leaf, label: 'CO₂ saved', value: '3.1T' },
      { icon: GraduationCap, label: 'Students', value: '8,500' },
    ],
  },
  {
    name: 'Christ University',
    location: 'Bengaluru, Karnataka',
    residents: '3,200',
    image: 'https://images.pexels.com/photos/5147364/pexels-photo-5147364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quote:
      'The sustainability dashboard transformed how we report to our green committee. What used to take weeks of manual data collection now updates automatically every day.',
    author: 'Prof. Maria Dsouza',
    role: 'Sustainability Coordinator',
    stats: [
      { icon: TrendingDown, label: 'Waste reduced', value: '28%' },
      { icon: Leaf, label: 'CO₂ saved', value: '1.4T' },
      { icon: GraduationCap, label: 'Students', value: '3,200' },
    ],
  },
  {
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    residents: '5,100',
    image: 'https://images.pexels.com/photos/14824327/pexels-photo-14824327.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quote:
      'The procurement tips alone saved us ₹4.2 lakhs in the first semester. WasteHero pays for itself many times over — and our students are more conscious of food waste now.',
    author: 'Mr. Rajesh Verma',
    role: 'Canteen Operations Manager',
    stats: [
      { icon: TrendingDown, label: 'Cost saved', value: '₹4.2L' },
      { icon: Leaf, label: 'CO₂ saved', value: '2.3T' },
      { icon: GraduationCap, label: 'Students', value: '5,100' },
    ],
  },
];

function CaseStudyCard({ study, index }: { study: typeof CASE_STUDIES[0]; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} group overflow-hidden rounded-3xl border border-ink-100 bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={study.image}
          alt={study.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <h3 className="font-display text-xl font-bold text-white">{study.name}</h3>
          <p className="text-xs text-ink-300">{study.location} · {study.residents} residents</p>
        </div>
      </div>

      <div className="p-7">
        <Quote className="h-7 w-7 text-primary-300" />
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{study.quote}</p>

        <div className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-display text-sm font-bold text-primary-700">
            {study.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-bold text-ink-900">{study.author}</p>
            <p className="text-xs text-ink-400">{study.role}</p>
          </div>
          <div className="ml-auto flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-primary-400 text-primary-400" />
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {study.stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-ink-50 p-3 text-center">
              <stat.icon className="mx-auto h-4 w-4 text-primary-500" />
              <p className="mt-2 font-display text-lg font-bold text-ink-900">{stat.value}</p>
              <p className="text-[10px] font-medium text-ink-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CaseStudies() {
  const { ref, visible } = useReveal();
  return (
    <section id="case-studies" className="relative overflow-hidden bg-ink-50 py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute right-1/4 top-0 h-80 w-80 rounded-full bg-primary-100/40 blur-3xl" />

      <div ref={ref} className={`reveal ${visible ? 'visible' : ''} relative mx-auto max-w-7xl px-6 lg:px-8`}>
        <div className="mx-auto max-w-2xl text-center">
          <div className="section-label mx-auto mb-5">
            <GraduationCap className="h-3.5 w-3.5" />
            Case Studies
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            Real campuses. <span className="gradient-text">Real results.</span>
          </h2>
          <p className="mt-5 text-lg text-ink-500 text-balance">
            From pilot programs to full campus deployments, here's how institutions across India
            are using WasteHero to cut waste and save money.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard key={study.name} study={study} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="btn-primary">
            Become our next success story
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
