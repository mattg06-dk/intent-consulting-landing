import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { BRAND } from '../brand'

const NAV_LINKS = [
  { label: 'Method', href: '#method' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Protocol', href: '#protocol' },
  { label: 'Engage', href: '#engage' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0.15 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`fixed left-1/2 top-4 z-40 flex -translate-x-1/2 items-center justify-between gap-6 px-3 py-2 text-sm font-medium transition-all duration-500 ${
        scrolled
          ? 'bg-cream/70 backdrop-blur-xl border border-charcoal/[0.08] text-charcoal shadow-[0_8px_32px_rgba(26,26,26,0.08)]'
          : 'bg-transparent border border-transparent text-cream'
      }`}
      style={{ borderRadius: '3rem', width: 'min(92vw, 720px)' }}
    >
      <a href="#" className="text-base font-bold tracking-tight pl-3">
        {BRAND.name}
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs font-medium tracking-wide transition-transform duration-200 hover:-translate-y-px"
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="#engage"
        className={`magnetic-btn text-xs ${
          scrolled ? 'bg-clay text-cream' : 'bg-cream/15 text-cream backdrop-blur-sm'
        }`}
        style={{ padding: '0.5rem 1.25rem', borderRadius: '2rem' }}
      >
        <span className="btn-label">
          {BRAND.cta} <ArrowRight size={14} />
        </span>
      </a>

      {/* Mobile menu button */}
      <button
        className="md:hidden flex flex-col gap-1 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 transition-transform duration-300 ${scrolled ? 'bg-charcoal' : 'bg-cream'} ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
        <span className={`block w-5 h-0.5 transition-opacity duration-300 ${scrolled ? 'bg-charcoal' : 'bg-cream'} ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 transition-transform duration-300 ${scrolled ? 'bg-charcoal' : 'bg-cream'} ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 flex flex-col gap-3 p-6 md:hidden bg-cream/90 backdrop-blur-xl border border-charcoal/[0.08] text-charcoal"
          style={{ borderRadius: '2rem' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
