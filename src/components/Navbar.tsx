import { useEffect, useState } from 'react';
import { Menu, X, Recycle } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Impact', href: '#impact' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-600/30">
            <Recycle className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-ink-900">
            Waste<span className="text-primary-600">Hero</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#contact" className="btn-ghost">
            Sign In
          </a>
          <a href="#contact" className="btn-primary">
            Request Demo
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-ink-100 px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-ink-700 hover:bg-primary-50 hover:text-primary-700"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
              Request Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
