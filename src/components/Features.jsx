import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layers, Radio, Calendar } from 'lucide-react'

/* ─────────────────────────────────────────────
   CARD 1 — Diagnostic Shuffler
   ───────────────────────────────────────────── */

const SHUFFLER_ITEMS = [
  { label: 'Decision dependency audit & delegation map', tag: 'NOW', tagSub: 'FOCUS — 6 weeks' },
  { label: 'AI agent deployment for repetitive founder tasks', tag: 'NEXT', tagSub: 'IN QUEUE' },
  { label: 'Leadership operating system design', tag: 'LATER', tagSub: 'ON DECK' },
]

function DiagnosticShuffler() {
  const [stack, setStack] = useState(SHUFFLER_ITEMS)

  useEffect(() => {
    const id = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3100)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="card-surface p-6 md:p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-clay" />
          <span className="text-data text-charcoal/40">LIVE STACK</span>
        </div>
      </div>
      <h3 className="text-lg font-bold tracking-tight mb-1">Founder Freedom Diagnostic</h3>
      <p className="text-sm text-charcoal/50 mb-6">Extract yourself from the bottleneck.</p>

      <div className="relative flex-1 min-h-[180px]">
        {stack.map((item, i) => {
          const isTop = i === 0
          const offset = i * 10
          const scale = 1 - i * 0.04
          const opacity = 1 - i * 0.25

          return (
            <div
              key={item.tag}
              className="absolute left-0 right-0 bg-cream border border-charcoal/[0.06] p-4"
              style={{
                borderRadius: '1.25rem',
                top: `${offset}px`,
                transform: `scale(${scale})`,
                opacity,
                zIndex: 10 - i,
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <p className={`text-sm leading-snug ${isTop ? 'text-charcoal' : 'text-charcoal/60'}`}>
                  {item.label}
                </p>
                <span className={`shrink-0 text-data px-2 py-0.5 rounded-full ${
                  isTop ? 'bg-clay/10 text-clay' : 'bg-charcoal/[0.04] text-charcoal/30'
                }`}>
                  {item.tag}
                </span>
              </div>
              {isTop && (
                <p className="text-data text-charcoal/30 mt-2">{item.tagSub}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CARD 2 — Telemetry Typewriter
   ───────────────────────────────────────────── */

const FEED_MESSAGES = [
  'WORKFLOW | Custom AI agent deployed for client onboarding. 4.2hrs/week recovered.',
  'SYSTEMS  | SOP library built and connected to execution layer. Zero drift.',
  'AGENTS   | Autonomous reporting pipeline active. Founder review time: 12min/week.',
  'DEPLOY   | Infrastructure handoff complete. Operational load reduced by 68%.',
]

function TelemetryTypewriter() {
  const [text, setText] = useState('')
  const [msgIdx, setMsgIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentMsg = FEED_MESSAGES[msgIdx]

    if (!isDeleting && charIdx < currentMsg.length) {
      const timer = setTimeout(() => {
        setText(currentMsg.slice(0, charIdx + 1))
        setCharIdx(charIdx + 1)
      }, 28)
      return () => clearTimeout(timer)
    }

    if (!isDeleting && charIdx === currentMsg.length) {
      const timer = setTimeout(() => setIsDeleting(true), 2200)
      return () => clearTimeout(timer)
    }

    if (isDeleting) {
      const timer = setTimeout(() => {
        setText('')
        setCharIdx(0)
        setIsDeleting(false)
        setMsgIdx((msgIdx + 1) % FEED_MESSAGES.length)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [charIdx, isDeleting, msgIdx])

  return (
    <div className="card-surface p-6 md:p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Radio size={16} className="text-clay" />
          <span className="text-data text-charcoal/40">OPS-INFRA</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="pulse-dot bg-clay" />
          <span className="text-data text-charcoal/40">Live Feed</span>
        </div>
      </div>
      <h3 className="text-lg font-bold tracking-tight mb-1">Operational Infrastructure Feed</h3>
      <p className="text-sm text-charcoal/50 mb-6">Systems that run, not reports that sit.</p>

      <div className="flex-1 flex items-start">
        <div className="w-full bg-charcoal/[0.03] border border-charcoal/[0.06] p-4" style={{ borderRadius: '1rem' }}>
          <p className="font-data text-xs leading-relaxed text-charcoal/70 min-h-[3rem]">
            <span className="text-clay">{'>'}</span>{' '}
            {text}
            <span
              className="inline-block w-[2px] h-[14px] bg-clay ml-0.5 align-middle"
              style={{ animation: 'cursorBlink 1.1s steps(2, start) infinite' }}
            />
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   CARD 3 — Cursor Protocol Scheduler
   ───────────────────────────────────────────── */

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const ACTIVE_DAYS = [1, 2, 3, 4, 5] // Mon-Fri

function CursorScheduler() {
  const containerRef = useRef(null)
  const cursorRef = useRef(null)
  const [activeDays, setActiveDays] = useState([])
  const [cursorPos, setCursorPos] = useState({ x: -20, y: -20, visible: false })
  const [saving, setSaving] = useState(false)
  const animating = useRef(false)

  const runAnimation = useCallback(async () => {
    if (animating.current) return
    animating.current = true

    const container = containerRef.current
    if (!container) return

    const cells = container.querySelectorAll('.day-cell')
    const saveBtn = container.querySelector('.save-btn')
    const containerRect = container.getBoundingClientRect()

    setActiveDays([])
    setSaving(false)

    // Show cursor
    setCursorPos({ x: 0, y: 0, visible: true })
    await wait(400)

    // Click each active day
    for (const dayIdx of ACTIVE_DAYS) {
      const cell = cells[dayIdx]
      if (!cell) continue
      const cellRect = cell.getBoundingClientRect()
      const x = cellRect.left - containerRect.left + cellRect.width / 2
      const y = cellRect.top - containerRect.top + cellRect.height / 2

      setCursorPos({ x, y, visible: true })
      await wait(350)
      setActiveDays((prev) => [...prev, dayIdx])
      await wait(200)
    }

    // Move to save button
    if (saveBtn) {
      const btnRect = saveBtn.getBoundingClientRect()
      const x = btnRect.left - containerRect.left + btnRect.width / 2
      const y = btnRect.top - containerRect.top + btnRect.height / 2
      setCursorPos({ x, y, visible: true })
      await wait(400)
      setSaving(true)
      await wait(800)
    }

    // Fade cursor
    setCursorPos((prev) => ({ ...prev, visible: false }))
    await wait(2000)

    animating.current = false
    runAnimation()
  }, [])

  useEffect(() => {
    const timer = setTimeout(runAnimation, 800)
    return () => {
      clearTimeout(timer)
      animating.current = true // prevent restart on cleanup
    }
  }, [runAnimation])

  return (
    <div className="card-surface p-6 md:p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-clay" />
          <span className="text-data text-charcoal/40">WEEKLY PLAYBOOK</span>
        </div>
      </div>
      <h3 className="text-lg font-bold tracking-tight mb-1">Intelligent Growth Protocol</h3>
      <p className="text-sm text-charcoal/50 mb-6">Scale without proportionally more founder time.</p>

      <div ref={containerRef} className="relative flex-1">
        {/* Animated cursor */}
        <svg
          ref={cursorRef}
          className="absolute pointer-events-none z-20 transition-all duration-300 ease-out"
          style={{
            left: cursorPos.x - 6,
            top: cursorPos.y - 2,
            opacity: cursorPos.visible ? 1 : 0,
            width: 20,
            height: 24,
          }}
          viewBox="0 0 20 24"
          fill="none"
        >
          <path
            d="M2 2L2 18L6 14L10 22L13 20.5L9 13L14 12L2 2Z"
            fill="#CC5833"
            stroke="#1A1A1A"
            strokeWidth="1.5"
          />
        </svg>

        {/* Weekly grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {DAYS.map((day, i) => (
            <div key={i} className="text-center">
              <span className="text-data text-charcoal/30 block mb-2">{day}</span>
              <div
                className={`day-cell aspect-square flex items-center justify-center border transition-all duration-300 ${
                  activeDays.includes(i)
                    ? 'bg-clay/15 border-clay/30 scale-[0.95]'
                    : 'bg-charcoal/[0.02] border-charcoal/[0.06]'
                }`}
                style={{ borderRadius: '0.75rem' }}
              >
                {activeDays.includes(i) && (
                  <div className="w-2 h-2 rounded-full bg-clay" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Save button */}
        <button
          className={`save-btn w-full py-2.5 text-xs font-medium tracking-wide border transition-all duration-300 ${
            saving
              ? 'bg-clay/10 border-clay/20 text-clay scale-[0.97]'
              : 'bg-charcoal/[0.02] border-charcoal/[0.06] text-charcoal/40'
          }`}
          style={{ borderRadius: '1rem' }}
        >
          {saving ? 'Quarter locked' : 'Lock in this quarter'}
        </button>

        <p className="text-data text-charcoal/25 mt-4 text-center">
          PROTOCOL &mdash; SYSTEMS &mdash; AI &mdash; SCALE
        </p>
      </div>
    </div>
  )
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/* ─────────────────────────────────────────────
   FEATURES SECTION
   ───────────────────────────────────────────── */

export default function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="method" ref={sectionRef} className="py-24 md:py-36">
      <div className="section-shell">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="text-data text-clay block mb-4">THE INTENT METHOD</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Three systems.{' '}
            <span className="text-drama text-clay-soft text-4xl md:text-5xl lg:text-6xl">
              One freed founder.
            </span>
          </h2>
          <p className="mt-6 text-charcoal/50 text-base md:text-lg leading-relaxed">
            Each surface below is a live artifact from the Intent operating philosophy&nbsp;&mdash; not static marketing.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card">
            <DiagnosticShuffler />
          </div>
          <div className="feature-card">
            <TelemetryTypewriter />
          </div>
          <div className="feature-card">
            <CursorScheduler />
          </div>
        </div>
      </div>
    </section>
  )
}
