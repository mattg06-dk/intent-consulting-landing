import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { BRAND } from '../brand'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80'

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('.hero-bg', { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6 })
        .fromTo('.hero-tag', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.9')
        .fromTo('.hero-line-1', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
        .fromTo('.hero-line-2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.7')
        .fromTo('.hero-desc', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo('.hero-cta', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100dvh] flex items-end overflow-hidden"
    >
      {/* Background image */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
      </div>

      {/* Content */}
      <div className="section-shell relative z-10 pb-16 md:pb-24 pt-32">
        {/* Tag pill */}
        <div className="hero-tag flex items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-data text-cream/70 bg-cream/[0.08] backdrop-blur-sm border border-cream/[0.1]" style={{ borderRadius: '2rem' }}>
            <span className="pulse-dot bg-clay" />
            AI Infrastructure for Founders
          </span>
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl">
          <span className="hero-line-1 block text-cream font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
            Leverage is the
          </span>
          <span className="hero-line-2 block text-drama text-clay-soft text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] mt-1">
            founder's edge.
          </span>
        </h1>

        {/* Description */}
        <p className="hero-desc max-w-xl mt-8 text-cream/60 text-base md:text-lg leading-relaxed font-light">
          {BRAND.fullName} builds the AI systems that free you from the business you built&nbsp;&mdash; so you can lead it.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mt-10">
          <a
            href="#engage"
            className="hero-cta magnetic-btn bg-clay text-cream text-sm"
          >
            <span className="btn-bg bg-cream" />
            <span className="btn-label">
              {BRAND.cta} <ArrowRight size={16} />
            </span>
          </a>
          <a
            href="#method"
            className="hero-cta inline-flex items-center gap-2 text-sm text-cream/50 font-medium transition-colors duration-300 hover:text-cream"
          >
            <span className="pulse-dot bg-moss-light" />
            See the method
            <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
