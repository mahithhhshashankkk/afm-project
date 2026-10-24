import { useState, useMemo } from 'react';
import { Calculator, TrendingDown, IndianRupee, Leaf, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k`;
  return `₹${Math.round(value)}`;
}

export function ROICalculator() {
  const { ref, visible } = useReveal();
  const [residents, setResidents] = useState(2000);
  const [wastePerDay, setWastePerDay] = useState(80);
  const [costPerKg, setCostPerKg] = useState(45);
  const [reductionRate, setReductionRate] = useState(30);

  const results = useMemo(() => {
    const dailyWasteKg = residents * (wastePerDay / 1000);
    const annualWasteKg = dailyWasteKg * 365;
    const annualWasteCost = annualWasteKg * costPerKg;
    const savedKg = annualWasteKg * (reductionRate / 100);
    const savedCost = annualWasteCost * (reductionRate / 100);
    const mealsSaved = Math.round(savedKg / 0.35);
    const co2Saved = (savedKg * 2.5).toFixed(1);
    const platformCost = residents >= 5000 ? 120000 : residents >= 1000 ? 96000 : 36000;
    const netSavings = savedCost - platformCost;
    const roi = ((netSavings / platformCost) * 100).toFixed(0);
    const paybackMonths = Math.ceil(platformCost / (savedCost / 12));

    return {
      dailyWasteKg: Math.round(dailyWasteKg),
      annualWasteKg: Math.round(annualWasteKg),
      annualWasteCost,
      savedKg: Math.round(savedKg),
      savedCost,
      mealsSaved,
      co2Saved,
      platformCost,
      netSavings,
      roi,
      paybackMonths,
    };
  }, [residents, wastePerDay, costPerKg, reductionRate]);

  const sliderClass =
    'w-full h-2 cursor-pointer appearance-none rounded-full bg-ink-200 accent-primary-600';

  return (
    <section id="roi-calculator" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary-100/40 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-green-100/30 blur-3xl" />

      <div ref={ref} className={`reveal ${visible ? 'visible' : ''} relative mx-auto max-w-7xl px-6 lg:px-8`}>
        <div className="mx-auto max-w-2xl text-center">
          <div className="section-label mx-auto mb-5">
            <Calculator className="h-3.5 w-3.5" />
            ROI Calculator
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-5xl">
            See your <span className="gradient-text">savings</span> in real time
          </h2>
          <p className="mt-5 text-lg text-ink-500 text-balance">
            Adjust the sliders to match your campus. We'll calculate your potential annual savings,
            environmental impact, and return on investment.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Sliders */}
          <div className="lg:col-span-2 space-y-8 rounded-3xl border border-ink-100 bg-ink-50/50 p-8">
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-ink-700">Campus Residents</label>
                <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-primary-600 shadow-sm">
                  {residents.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="10000"
                step="100"
                value={residents}
                onChange={(e) => setResidents(Number(e.target.value))}
                className={sliderClass}
              />
              <div className="mt-1 flex justify-between text-xs text-ink-400">
                <span>200</span>
                <span>10,000+</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-ink-700">Waste per Person / Day</label>
                <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-primary-600 shadow-sm">
                  {wastePerDay}g
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={wastePerDay}
                onChange={(e) => setWastePerDay(Number(e.target.value))}
                className={sliderClass}
              />
              <div className="mt-1 flex justify-between text-xs text-ink-400">
                <span>20g</span>
                <span>200g</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-ink-700">Cost per kg of Waste</label>
                <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-primary-600 shadow-sm">
                  ₹{costPerKg}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={costPerKg}
                onChange={(e) => setCostPerKg(Number(e.target.value))}
                className={sliderClass}
              />
              <div className="mt-1 flex justify-between text-xs text-ink-400">
                <span>₹20</span>
                <span>₹100</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-ink-700">Expected Waste Reduction</label>
                <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-primary-600 shadow-sm">
                  {reductionRate}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="1"
                value={reductionRate}
                onChange={(e) => setReductionRate(Number(e.target.value))}
                className={sliderClass}
              />
              <div className="mt-1 flex justify-between text-xs text-ink-400">
                <span>10%</span>
                <span>40%</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Big savings number */}
            <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-8">
              <div className="absolute inset-0 bg-dot-pattern opacity-10" />
              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-primary-600/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 text-primary-400">
                  <TrendingDown className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Annual Savings</span>
                </div>
                <p className="mt-3 font-display text-5xl font-extrabold text-white lg:text-6xl">
                  {formatINR(results.savedCost)}
                </p>
                <p className="mt-2 text-sm text-ink-400">
                  Based on {results.savedKg.toLocaleString('en-IN')} kg of waste prevented per year
                </p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <IndianRupee className="h-4 w-4 text-primary-400" />
                    <p className="mt-2 font-display text-2xl font-bold text-white">{results.roi}%</p>
                    <p className="text-xs text-ink-400">ROI</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <Calculator className="h-4 w-4 text-primary-400" />
                    <p className="mt-2 font-display text-2xl font-bold text-white">{results.paybackMonths}</p>
                    <p className="text-xs text-ink-400">Month payback</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <IndianRupee className="h-4 w-4 text-primary-400" />
                    <p className="mt-2 font-display text-2xl font-bold text-white">{formatINR(results.netSavings)}</p>
                    <p className="text-xs text-ink-400">Net savings</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <p className="mt-4 font-display text-3xl font-extrabold text-ink-900">{results.co2Saved}T</p>
                <p className="text-sm font-bold text-green-600">CO₂ avoided</p>
                <p className="mt-1 text-xs text-ink-400">Equivalent to planting {Math.round(Number(results.co2Saved) * 45)} trees</p>
              </div>
              <div className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                  <UtensilsCrossed className="h-5 w-5 text-primary-600" />
                </div>
                <p className="mt-4 font-display text-3xl font-extrabold text-ink-900">{results.mealsSaved.toLocaleString('en-IN')}</p>
                <p className="text-sm font-bold text-primary-600">Meals saved</p>
                <p className="mt-1 text-xs text-ink-400">Food redirected or better planned</p>
              </div>
              <div className="card card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <TrendingDown className="h-5 w-5 text-blue-600" />
                </div>
                <p className="mt-4 font-display text-3xl font-extrabold text-ink-900">{formatINR(results.annualWasteCost)}</p>
                <p className="text-sm font-bold text-blue-600">Current waste cost</p>
                <p className="mt-1 text-xs text-ink-400">What you're spending today</p>
              </div>
            </div>

            <a href="#contact" className="btn-primary w-full justify-center text-base">
              Get a Custom Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
