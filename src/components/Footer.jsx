import { BRAND } from '../brand'

const NAV_COLS = [
  {
    title: 'Method',
    links: [
      { label: 'Founder Freedom', href: '#method' },
      { label: 'Operational Infrastructure', href: '#method' },
      { label: 'Growth Readiness', href: '#method' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Philosophy', href: '#philosophy' },
      { label: 'Protocol', href: '#protocol' },
      { label: 'Engage', href: '#engage' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-charcoal text-cream/70 mt-24" style={{ borderRadius: '4rem 4rem 0 0' }}>
      <div className="section-shell py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5">
            <h3 className="text-2xl font-bold text-cream tracking-tight">{BRAND.name}</h3>
            <p className="text-data text-cream/40 mt-2 mb-6">{BRAND.tagline}</p>
            <p className="text-sm leading-relaxed text-cream/50 max-w-sm">
              {BRAND.fullName} builds AI systems, agents, and operational infrastructure that extract founders from the day-to-day&nbsp;&mdash; so they can lead.
            </p>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="text-data text-cream/40 mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-cream/50 transition-colors duration-200 hover:text-cream"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Status column */}
          <div className="md:col-span-3">
            <h4 className="text-data text-cream/40 mb-4">Status</h4>
            <div className="flex items-center gap-2 mb-6">
              <span className="pulse-dot bg-emerald-400" />
              <span className="font-data text-xs tracking-wider text-cream/50">System Operational</span>
            </div>
            <p className="text-xs text-cream/30 font-data tracking-wide">
              Accepting new clients
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-cream/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/30">
            &copy; 2026 {BRAND.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-cream/30">
            <a href="#" className="hover:text-cream/50 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cream/50 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
