import { ArrowRight, Play, Sparkles, TrendingDown, Leaf, BarChart3 } from 'lucide-react';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 via-white to-white" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary-200/30 blur-3xl" />
      <div className="absolute -left-20 top-40 h-[400px] w-[400px] rounded-full bg-primary-100/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <div className="section-label mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Campus Sustainability
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-6xl">
            Cut campus food waste by up to{' '}
            <span className="gradient-text">30%</span> with AI
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500 text-balance">
            WasteHero is a lightweight, easy-to-deploy platform that helps hostel and
            canteen managers track waste, predict consumption, and reduce costs — all
            while building a greener campus.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-primary text-base">
              Request a Demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#how-it-works" className="btn-secondary text-base">
              <Play className="h-4 w-4" />
              See How It Works
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <div className="flex -space-x-3">
              {['bg-primary-400', 'bg-primary-500', 'bg-primary-600', 'bg-ink-600'].map((c, i) => (
                <div key={i} className={`h-10 w-10 rounded-full border-2 border-white ${c}`} />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-700">Trusted by forward-thinking campuses</p>
              <p className="text-xs text-ink-400">Pilot programs across India</p>
            </div>
          </div>
        </div>

        {/* Right: dashboard preview card */}
        <div className="relative animate-fade-up" style={{ animationDelay: '0.15s' }}>
          {/* Floating badges */}
          <div className="absolute -left-4 top-20 z-20 animate-float">
            <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl shadow-ink-900/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                <TrendingDown className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink-900">28% Less Waste</p>
                <p className="text-[11px] text-ink-400">This month</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 top-64 z-20 animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl shadow-ink-900/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                <Leaf className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink-900">1.2T CO₂ Saved</p>
                <p className="text-[11px] text-ink-400">Annual projection</p>
              </div>
            </div>
          </div>

          {/* Main dashboard mockup */}
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-2xl shadow-ink-900/10">
            <div className="flex items-center justify-between border-b border-ink-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs font-semibold text-ink-400">WasteHero Dashboard</span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: 'Waste Logged', value: '142 kg', color: 'text-primary-600' },
                { label: 'Cost Saved', value: '₹18.5k', color: 'text-green-600' },
                { label: 'Meals Saved', value: '38', color: 'text-blue-600' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-ink-50 p-3">
                  <p className="text-[11px] font-medium text-ink-400">{s.label}</p>
                  <p className={`mt-1 text-sm font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="mt-5 rounded-xl border border-ink-100 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-ink-600">Weekly Waste Trend</p>
                <BarChart3 className="h-4 w-4 text-primary-500" />
              </div>
              <div className="flex items-end justify-between gap-2 h-32">
                {[
                  { d: 'M', h: '70%', c: 'bg-primary-300' },
                  { d: 'T', h: '85%', c: 'bg-primary-400' },
                  { d: 'W', h: '60%', c: 'bg-primary-300' },
                  { d: 'T', h: '45%', c: 'bg-primary-500' },
                  { d: 'F', h: '38%', c: 'bg-primary-500' },
                  { d: 'S', h: '52%', c: 'bg-primary-400' },
                  { d: 'S', h: '30%', c: 'bg-primary-600' },
                ].map((bar) => (
                  <div key={bar.d} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={`w-full rounded-t-md ${bar.c} transition-all duration-700 hover:opacity-80`}
                      style={{ height: bar.h }}
                    />
                    <span className="text-[10px] font-medium text-ink-400">{bar.d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI suggestion */}
            <div className="mt-4 flex items-start gap-3 rounded-xl bg-gradient-to-r from-primary-50 to-orange-50 p-4 border border-primary-100">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <div>
                <p className="text-xs font-bold text-primary-800">AI Procurement Tip</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-ink-500">
                  Reduce rice order by 12 kg next week — historical trend shows lower weekend consumption.
                </p>
              </div>
            </div>
          </div>

          {/* Pulse ring */}
          <div className="absolute -bottom-4 left-12 z-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary-400 animate-pulse-ring" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 shadow-lg">
                <Leaf className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
