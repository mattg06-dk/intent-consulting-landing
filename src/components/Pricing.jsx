import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Check } from 'lucide-react'
import { BRAND } from '../brand'

const TIERS = [
  {
    name: 'Diagnostic',
    subtitle: 'Founder Bottleneck Audit',
    description: 'For founders who want clarity on where they are stuck and a prioritised roadmap to get free.',
    features: [
      'Full founder dependency audit',
      'AI opportunity assessment',
      'Prioritised 90-day extraction plan',
      'One follow-up calibration call',
    ],
    cta: BRAND.cta,
    highlighted: false,
  },
  {
    name: 'Build',
    subtitle: 'Full Infrastructure Deployment',
    description: 'Deep implementation: AI agents, SOPs, workflows, and dashboards deployed into your business.',
    badge: 'Most selected',
    features: [
      'Everything in Diagnostic',
      'Custom AI agent design & deployment',
      'Workflow and SOP library build-out',
      '12-week embedded implementation',
    ],
    cta: BRAND.cta,
    highlighted: true,
  },
  {
    name: 'Scale',
    subtitle: 'Ongoing Growth Architecture',
    description: 'For founders who want a long-term partner to maintain, iterate, and scale the infrastructure as the business grows.',
    features: [
      'Everything in Build',
      'Quarterly infrastructure reviews',
      'Continuous agent optimisation',
      'On-call strategic support',
    ],
    cta: 'Arrange a private call',
    highlighted: false,
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="engage" ref={sectionRef} className="py-24 md:py-36">
      <div className="section-shell">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-data text-clay block mb-4">ENGAGE WITH INTENT</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Choose how deeply{' '}
            <span className="text-drama text-clay-soft text-4xl md:text-5xl lg:text-6xl">
              we build with you.
            </span>
          </h2>
          <p className="mt-6 text-charcoal/50 text-base md:text-lg leading-relaxed">
            Every engagement begins with a founder call. Pricing is scoped to your business, not pulled from a menu.
          </p>
        </div>

        {/* Tier grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card relative flex flex-col p-8 border transition-transform duration-300 hover:-translate-y-1 ${
                tier.highlighted
                  ? 'bg-moss text-cream border-moss-light'
                  : 'card-surface'
              }`}
              style={{ borderRadius: '2rem' }}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-8 px-3 py-1 text-data bg-clay text-cream" style={{ borderRadius: '1rem' }}>
                  {tier.badge}
                </span>
              )}

              <h3 className="text-xl font-bold tracking-tight">{tier.name}</h3>
              <p className={`text-data mt-1 ${tier.highlighted ? 'text-cream/50' : 'text-charcoal/40'}`}>
                {tier.subtitle}
              </p>
              <p className={`mt-4 text-sm leading-relaxed ${tier.highlighted ? 'text-cream/70' : 'text-charcoal/50'}`}>
                {tier.description}
              </p>

              <ul className="mt-6 flex-1 flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className={`shrink-0 mt-0.5 ${tier.highlighted ? 'text-clay-soft' : 'text-clay'}`}
                    />
                    <span className={`text-sm ${tier.highlighted ? 'text-cream/80' : 'text-charcoal/60'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`magnetic-btn mt-8 text-sm text-center ${
                  tier.highlighted
                    ? 'bg-clay text-cream'
                    : 'bg-charcoal/[0.04] text-charcoal border border-charcoal/[0.08]'
                }`}
              >
                <span className={`btn-bg ${tier.highlighted ? 'bg-cream' : 'bg-clay/10'}`} />
                <span className="btn-label justify-center">
                  {tier.cta} <ArrowRight size={14} />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
