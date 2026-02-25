import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  {
    number: '01',
    title: 'Map the dependency',
    body: 'We audit every decision, process, and workflow that currently requires the founder. The output is a heat map of your bottleneck exposure and a prioritised extraction plan.',
    tags: ['Timeline calibrated to your business', 'NDA-protected, founder-led'],
    bg: 'bg-moss',
    Motif: HelixMotif,
  },
  {
    number: '02',
    title: 'Build the infrastructure',
    body: 'Our team designs and deploys the actual systems — AI agents, SOPs, workflows, and dashboards — that replace founder involvement with reliable, repeatable execution.',
    tags: ['Implemented, not recommended', 'AI-native from day one'],
    bg: 'bg-charcoal',
    Motif: ScannerMotif,
  },
  {
    number: '03',
    title: 'Scale the system',
    body: 'With the founder extracted from operations, we stress-test the infrastructure under growth conditions and iterate until the business scales without proportionally more of your time.',
    tags: ['Growth without founder drag', 'Quarterly recalibration built in'],
    bg: 'bg-surface',
    Motif: WaveformMotif,
  },
]

export default function Protocol() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)

      cards.forEach((card, i) => {
        // Pin each card
        ScrollTrigger.create({
          trigger: card,
          start: `top ${80 + i * 10}px`,
          end: i < cards.length - 1 ? `+=${window.innerHeight * 0.8}` : 'bottom bottom',
          pin: true,
          pinSpacing: i < cards.length - 1,
        })

        // Scale down previous cards when next card appears
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1]
          gsap.to(card, {
            scrollTrigger: {
              trigger: nextCard,
              start: 'top bottom',
              end: `top ${80 + i * 10}px`,
              scrub: 0.5,
            },
            scale: 0.92,
            opacity: 0.4,
            filter: 'blur(8px)',
            ease: 'none',
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="protocol" ref={sectionRef} className="py-24 md:py-36">
      <div className="section-shell mb-16">
        <span className="text-data text-clay block mb-4">THE INTENT PROTOCOL</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight max-w-3xl">
          Three phases.{' '}
          <span className="text-drama text-clay-soft text-4xl md:text-5xl lg:text-6xl">
            One transformation.
          </span>
        </h2>
        <p className="mt-6 text-charcoal/50 text-base md:text-lg leading-relaxed max-w-2xl">
          Each phase pins in place as you scroll&nbsp;&mdash; a visual record of how your business evolves from founder-dependent to founder-led.
        </p>
      </div>

      {/* Stacking cards */}
      <div className="flex flex-col gap-6">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`${step.bg} text-cream mx-auto w-full max-w-6xl min-h-[80vh] flex items-center overflow-hidden`}
            style={{ borderRadius: '2.5rem' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 w-full">
              {/* Content */}
              <div className="flex flex-col justify-center">
                <span className="font-data text-sm text-cream/30 tracking-[0.3em] mb-4">
                  STEP {step.number}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  {step.title}
                </h3>
                <p className="text-cream/60 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                  {step.body}
                </p>
                <div className="flex flex-wrap gap-3">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-data px-3 py-1.5 bg-cream/[0.06] border border-cream/[0.08] text-cream/40"
                      style={{ borderRadius: '1rem' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* SVG Motif */}
              <div className="flex items-center justify-center">
                <step.Motif />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SVG MOTIFS
   ───────────────────────────────────────────── */

function HelixMotif() {
  return (
    <div className="w-full max-w-[280px] aspect-square relative">
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ animation: 'spin 20s linear infinite' }}>
        {/* Outer ring */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2
          const x = 100 + Math.cos(angle) * 75
          const y = 100 + Math.sin(angle) * 75
          return (
            <circle
              key={`outer-${i}`}
              cx={x}
              cy={y}
              r={3}
              fill={i % 3 === 0 ? '#CC5833' : 'rgba(242,240,233,0.15)'}
            />
          )
        })}
        {/* Inner ring (counter-rotate via opposite visual) */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2 + 0.3
          const x = 100 + Math.cos(angle) * 45
          const y = 100 + Math.sin(angle) * 45
          return (
            <circle
              key={`inner-${i}`}
              cx={x}
              cy={y}
              r={2.5}
              fill={i % 4 === 0 ? '#CC5833' : 'rgba(242,240,233,0.1)'}
            />
          )
        })}
        {/* Center */}
        <circle cx="100" cy="100" r="6" fill="none" stroke="#CC5833" strokeWidth="1.5" opacity="0.4" />
        <circle cx="100" cy="100" r="2" fill="#CC5833" opacity="0.6" />
      </svg>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

function ScannerMotif() {
  return (
    <div className="w-full max-w-[280px] aspect-square relative">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Dot grid */}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={30 + col * 20}
              cy={30 + row * 20}
              r={2}
              fill="rgba(242,240,233,0.12)"
            />
          ))
        )}
        {/* Scanning line */}
        <rect
          x="20"
          width="160"
          height="2"
          rx="1"
          fill="#CC5833"
          opacity="0.6"
        >
          <animate
            attributeName="y"
            values="25;175;25"
            dur="4s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
          />
        </rect>
        {/* Glow behind scanner line */}
        <rect
          x="20"
          width="160"
          height="20"
          rx="4"
          fill="#CC5833"
          opacity="0.08"
        >
          <animate
            attributeName="y"
            values="15;165;15"
            dur="4s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
          />
        </rect>
      </svg>
    </div>
  )
}

function WaveformMotif() {
  const pathD = 'M10,100 Q30,40 50,100 Q70,160 90,100 Q110,40 130,100 Q150,160 170,100 Q190,40 210,100'

  return (
    <div className="w-full max-w-[280px] aspect-square relative flex items-center justify-center">
      <svg viewBox="0 0 220 200" className="w-full h-full">
        {/* Static baseline */}
        <line x1="10" y1="100" x2="210" y2="100" stroke="rgba(242,240,233,0.06)" strokeWidth="1" />

        {/* Waveform trail (faint) */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(242,240,233,0.08)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Animated waveform */}
        <path
          d={pathD}
          fill="none"
          stroke="#CC5833"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="300"
          opacity="0.7"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="300;0;-300"
            dur="3s"
            repeatCount="indefinite"
            calcMode="linear"
          />
        </path>

        {/* Pulse dot at center */}
        <circle cx="110" cy="100" r="4" fill="#CC5833" opacity="0.5">
          <animate
            attributeName="r"
            values="3;6;3"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0.9;0.5"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  )
}
