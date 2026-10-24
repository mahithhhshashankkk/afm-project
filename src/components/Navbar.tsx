import { useEffect, useState } from 'react';
import { Menu, X, Recycle, ChevronDown } from 'lucide-react';

const PRIMARY_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Impact', href: '#impact' },
  { label: 'Pricing', href: '#pricing' },
];

const SECONDARY_LINKS = [
  { label: 'Benefits', href: '#benefits' },
  { label: 'ROI Calculator', href: '#roi-calculator' },
  { label: 'Case Studies', href: '#case-studies' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm shadow-ink-900/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-8">
        {/* Logo */}
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-600/30">
            <Recycle className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight text-ink-900">
            Waste<span className="text-primary-600">Hero</span>
          </span>
        </a>

        {/* Primary nav links — desktop */}
        <div className="hidden items-center gap-0.5 xl:flex">
          {PRIMARY_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-[13px] font-semibold text-ink-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              {link.label}
            </a>
          ))}

          {/* More dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-semibold text-ink-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              More
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-full mt-1 w-52 rounded-xl border border-ink-100 bg-white p-1.5 shadow-xl shadow-ink-900/10">
                {SECONDARY_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMoreOpen(false)}
                    className="block rounded-lg px-3.5 py-2.5 text-[13px] font-semibold text-ink-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side actions — desktop */}
        <div className="hidden items-center gap-2 xl:flex">
          <a href="#admin" className="btn-ghost text-[13px]">
            Admin
          </a>
          <a href="#contact" className="btn-primary text-[13px]">
            Request Demo
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass border-t border-ink-100 px-6 py-4 xl:hidden">
          <div className="flex flex-col gap-1">
            {PRIMARY_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </a>
            ))}
            {SECONDARY_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <a href="#admin" onClick={() => setOpen(false)} className="btn-ghost flex-1 justify-center text-sm">
                Admin
              </a>
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary flex-1 justify-center text-sm">
                Request Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
