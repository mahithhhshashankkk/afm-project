import { useState } from 'react';
import { ArrowRight, Mail, Phone, Building2, CheckCircle2, Recycle, AlertCircle, Loader2 } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';

export function ContactCTA() {
  const { ref, visible } = useReveal();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    institution: '',
    residents: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase.from('demo_requests').insert({
      name: form.name,
      email: form.email,
      institution: form.institution,
      residents: form.residents,
      message: form.message || null,
    });

    if (error) {
      setStatus('error');
      return;
    }

    setStatus('success');
  };

  const inputClass =
    'w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm font-medium text-ink-800 placeholder:text-ink-300 transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200';

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-orange-50" />
      <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl" />

      <div ref={ref} className={`reveal ${visible ? 'visible' : ''} relative mx-auto max-w-6xl px-6 lg:px-8`}>
        <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-2xl shadow-ink-900/10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: info */}
            <div className="relative flex flex-col justify-between bg-ink-900 p-10 lg:p-12">
              <div className="absolute inset-0 bg-dot-pattern opacity-10" />
              <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary-600/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-600/30">
                    <Recycle className="h-5 w-5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="font-display text-xl font-extrabold tracking-tight text-white">
                    Waste<span className="text-primary-400">Hero</span>
                  </span>
                </div>

                <h2 className="mt-8 font-display text-3xl font-extrabold leading-tight text-white text-balance">
                  Let's build a <span className="text-primary-400">greener campus</span> together
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink-400">
                  Schedule a 30-minute demo and we'll walk you through how WasteHero can be deployed
                  at your institution — tailored to your kitchens, your staff, and your goals.
                </p>
              </div>

              <div className="relative mt-10 space-y-4">
                <div className="flex items-center gap-3 text-sm text-ink-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                    <Mail className="h-4 w-4 text-primary-400" />
                  </div>
                  hello@wastehero.in
                </div>
                <div className="flex items-center gap-3 text-sm text-ink-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                    <Phone className="h-4 w-4 text-primary-400" />
                  </div>
                  +91 80 4567 8900
                </div>
                <div className="flex items-center gap-3 text-sm text-ink-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                    <Building2 className="h-4 w-4 text-primary-400" />
                  </div>
                  Bengaluru, Karnataka, India
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-10 lg:p-12">
              {status === 'success' ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-900">Thank you!</h3>
                  <p className="mt-2 text-sm text-ink-500">
                    We've received your request and will reach out within 24 hours to schedule your demo.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setForm({ name: '', email: '', institution: '', residents: '', message: '' });
                    }}
                    className="btn-ghost mt-6"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-xl font-bold text-ink-900">Request a Demo</h3>

                  {status === 'error' && (
                    <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                      <div>
                        <p className="text-sm font-bold text-red-800">Something went wrong</p>
                        <p className="mt-0.5 text-xs text-red-600">
                          We couldn't submit your request. Please try again or email us directly at hello@wastehero.in.
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                      Full Name
                    </label>
                    <input
                      required
                      disabled={status === 'loading'}
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      placeholder="Dr. Rajesh Kumar"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                        Work Email
                      </label>
                      <input
                        required
                        disabled={status === 'loading'}
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                        placeholder="rajesh@iit.ac.in"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                        Residents
                      </label>
                      <select
                        required
                        disabled={status === 'loading'}
                        value={form.residents}
                        onChange={(e) => setForm({ ...form, residents: e.target.value })}
                        className={inputClass}
                      >
                        <option value="">Select range</option>
                        <option>200–500</option>
                        <option>500–1,000</option>
                        <option>1,000–5,000</option>
                        <option>5,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                      Institution Name
                    </label>
                    <input
                      required
                      disabled={status === 'loading'}
                      type="text"
                      value={form.institution}
                      onChange={(e) => setForm({ ...form, institution: e.target.value })}
                      className={inputClass}
                      placeholder="Indian Institute of Technology, Delhi"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-500">
                      Message <span className="font-normal text-ink-300">(optional)</span>
                    </label>
                    <textarea
                      disabled={status === 'loading'}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                      className={inputClass}
                      placeholder="Tell us about your campus waste challenges..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center text-base disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Demo
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-ink-400">
                    No credit card required. We respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
