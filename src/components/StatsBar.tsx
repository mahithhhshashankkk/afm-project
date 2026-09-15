import { TrendingDown, IndianRupee, Leaf, Users } from 'lucide-react';

const STATS = [
  { icon: TrendingDown, value: '30%', label: 'Average waste reduction', sub: 'within first 3 months' },
  { icon: IndianRupee, value: '₹2.4L', label: 'Annual cost savings', sub: 'per 200-resident hostel' },
  { icon: Leaf, value: '1.2T', label: 'CO₂ emissions avoided', sub: 'per campus per year' },
  { icon: Users, value: '200+', label: 'Residents supported', sub: 'minimum campus size' },
];

export function StatsBar() {
  return (
    <section className="relative -mt-2 border-y border-ink-100 bg-ink-900 py-12">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600/20">
              <stat.icon className="h-5 w-5 text-primary-400" />
            </div>
            <p className="font-display text-3xl font-extrabold text-white lg:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm font-semibold text-ink-200">{stat.label}</p>
            <p className="text-xs text-ink-400">{stat.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
