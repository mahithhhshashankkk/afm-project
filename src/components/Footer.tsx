import { Recycle, Mail, Phone, Building2, ArrowUpRight, Heart } from 'lucide-react';

const FOOTER_LINKS = [
  {
    title: 'Platform',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Request Demo', href: '#contact' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'For Administrators', href: '#benefits' },
      { label: 'For Canteen Managers', href: '#benefits' },
      { label: 'For Sustainability Officers', href: '#benefits' },
      { label: 'For Student Communities', href: '#benefits' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About WasteHero', href: '#top' },
      { label: 'Sustainability Impact', href: '#impact' },
      { label: 'Pilot Programs', href: '#pricing' },
      { label: 'Contact Us', href: '#contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 pt-16 pb-8">
      <div className="absolute inset-0 bg-dot-pattern opacity-5" />
      <div className="absolute top-0 left-1/2 h-64 w-full -translate-x-1/2 rounded-full bg-primary-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-2 gap-10 pb-12 lg:grid-cols-5 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-lg shadow-primary-600/30">
                <Recycle className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                Waste<span className="text-primary-400">Hero</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              AI-driven waste management for Indian colleges and universities. Reduce costs, cut food waste, and build a sustainable campus.
            </p>
            <div className="mt-5 space-y-2">
              <a href="mailto:hello@wastehero.in" className="flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-primary-400">
                <Mail className="h-4 w-4" />
                hello@wastehero.in
              </a>
              <a href="tel:+918045678900" className="flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-primary-400">
                <Phone className="h-4 w-4" />
                +91 80 4567 8900
              </a>
              <p className="flex items-center gap-2 text-sm text-ink-400">
                <Building2 className="h-4 w-4" />
                Bengaluru, Karnataka, India
              </p>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-bold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-ink-400 transition-colors hover:text-primary-400"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-ink-500">
            © 2026 WasteHero. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-ink-500 transition-colors hover:text-primary-400">Privacy Policy</a>
            <a href="#" className="text-xs text-ink-500 transition-colors hover:text-primary-400">Terms of Service</a>
            <a href="#" className="text-xs text-ink-500 transition-colors hover:text-primary-400">Cookie Policy</a>
          </div>
          <p className="flex items-center gap-1.5 text-xs text-ink-500">
            Made with <Heart className="h-3 w-3 fill-primary-500 text-primary-500" /> for a greener India
          </p>
        </div>
      </div>
    </footer>
  );
}
