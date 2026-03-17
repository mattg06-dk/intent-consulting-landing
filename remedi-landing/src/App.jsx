import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Stethoscope, Activity, ArrowRight, Clock, ShieldCheck } from 'lucide-react'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

const BRAND = {
  name: 'Remedi Health',
  tagline: 'Private testing & healthcare clinic',
  purpose:
    'Premium healthcare helping you live better for longer through longevity, menopause support, and guided weight management.',
  cta: 'Book a Consultation',
}

const VALUE_PROPS = [
  'Longevity',
  'Menopause Support',
  'Guided Weight Management',
]

const heroBackground =
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2000&q=80'

const textureImage =
  'https://images.unsplash.com/photo-1534448584797-4c3037474f49?auto=format&fit=crop&w=1600&q=80'

const protocolTextures = [
  'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1600&q=80',
]

function useGsapContext(ref, deps = []) {
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {}, ref)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const el = navRef.current
    if (!el) return

    const hero = document.querySelector('#hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.classList.add('scrolled')
        } else {
          el.classList.remove('scrolled')
        }
      },
      {
        root: null,
        threshold: 0.3,
      },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const scrollToId = (id) => {
    const el = document.querySelector(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav ref={navRef} className="nav-pill">
      <button
        type="button"
        className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
        onClick={() => scrollToId('#hero')}
      >
        <span className="h-6 w-6 rounded-full bg-accent/15 text-accent flex items-center justify-center">
          <Stethoscope size={14} />
        </span>
        <span className="font-heading">{BRAND.name}</span>
      </button>
      <div className="hidden md:flex items-center gap-6">
        <button
          type="button"
          className="nav-link"
          onClick={() => scrollToId('#features')}
        >
          Longevity
        </button>
        <button
          type="button"
          className="nav-link"
          onClick={() => scrollToId('#philosophy')}
        >
          Philosophy
        </button>
        <button
          type="button"
          className="nav-link"
          onClick={() => scrollToId('#protocol')}
        >
          Protocol
        </button>
        <button
          type="button"
          className="nav-link"
          onClick={() => scrollToId('#pricing')}
        >
          Membership
        </button>
      </div>
      <button
        type="button"
        className="magnetic-button hidden sm:inline-flex"
        onClick={() => scrollToId('#cta')}
      >
        <span className="bg-swipe" />
        <span className="label flex items-center gap-2">
          {BRAND.cta}
          <ArrowRight size={16} />
        </span>
      </button>
    </nav>
  )
}

function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    if (!heroRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          duration: 1.2,
          ease: 'power3.out',
        },
      })

      tl.from('.hero-bg', { scale: 1.08, opacity: 0, duration: 1.6 })
      tl.from(
        '.hero-tagline',
        {
          y: 40,
          opacity: 0,
        },
        '-=1.1',
      )
      tl.from(
        '.hero-line-1',
        {
          y: 40,
          opacity: 0,
        },
        '-=0.8',
      )
      tl.from(
        '.hero-line-2',
        {
          y: 40,
          opacity: 0,
        },
        '-=1.0',
      )
      tl.from(
        '.hero-cta, .hero-secondary',
        {
          y: 32,
          opacity: 0,
          stagger: 0.08,
        },
        '-=0.8',
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100dvh] items-stretch justify-center pt-20 pb-10"
    >
      <div className="noise-overlay" />
      <div className="section-shell flex w-full items-stretch">
        <div className="relative flex-1 overflow-hidden rounded-hero bg-primary shadow-soft">
          <div
            className="hero-bg absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(4,7,17,0.95), rgba(8,18,28,0.8), rgba(8,18,28,0.6)), url(${heroBackground})`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(47,185,169,0.32),transparent_60%),radial-gradient(circle_at_80%_120%,rgba(123,227,213,0.28),transparent_55%)]" />

          <div className="relative flex h-full flex-col justify-end px-6 pb-10 pt-24 sm:px-10 sm:pb-14 md:px-14 md:pb-16 lg:px-20 lg:pb-20">
            <div className="mb-6 flex items-center gap-3 hero-tagline">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-200 border border-borderSoft backdrop-blur-md">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <Activity size={12} />
                </span>
                Reveal · Reassure · Renew
              </span>
              <span className="hidden text-[11px] text-slate-400 md:inline">
                Longevity · Menopause · Weight Management
              </span>
            </div>

            <div className="max-w-xl space-y-4 sm:space-y-5">
              <div className="hero-line-1 font-heading text-xs font-semibold uppercase tracking-[0.28em] text-slate-200/80">
                Precision private care is the
              </div>
              <div className="hero-line-2">
                <div className="font-heading text-[2.5rem] leading-tight text-slate-50 sm:text-[3rem] md:text-[3.4rem]">
                  <span className="font-semibold">
                    Remedi Health
                  </span>{' '}
                  is your
                </div>
                <div className="mt-1 font-drama text-[3.4rem] italic leading-[0.8] text-accent sm:text-[4.2rem] md:text-[4.8rem] lg:text-[5.4rem]">
                  longevity clinic.
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 hero-cta">
                <button
                  type="button"
                  className="magnetic-button w-full justify-center sm:w-auto"
                  onClick={() => {
                    const el = document.querySelector('#cta')
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  <span className="bg-swipe" />
                  <span className="label flex items-center gap-2">
                    {BRAND.cta}
                    <ArrowRight size={16} />
                  </span>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-2xl-soft border border-borderSoft bg-surface/60 px-5 py-3 text-xs font-medium text-slate-200 shadow-surface backdrop-blur-md transition-transform duration-300 hover:-translate-y-[1px]"
                  onClick={() => {
                    const el = document.querySelector('#protocol')
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accentSoft animate-pulse-soft" />
                  View the Remedi protocol
                </button>
              </div>
              <div className="hero-secondary max-w-xs text-xs text-slate-300/90">
                Based in Winchester, Remedi Health offers private diagnostics, menopause and
                longevity care, and guided weight management with clinicians who listen first, then
                design a plan around your life.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const shufflerRef = useRef(null)
  const [shuffleItems, setShuffleItems] = useState([
    'Biological age & advanced bloods',
    'Sleep, stress & recovery insights',
    'Cardiometabolic risk & heart health',
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setShuffleItems((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
      if (shufflerRef.current) {
        gsap.fromTo(
          shufflerRef.current.querySelectorAll('.shuffler-card'),
          {
            y: 18,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            stagger: 0.06,
          },
        )
      }
    }, 3100)

    return () => clearInterval(interval)
  }, [])

  const [typedText, setTypedText] = useState('')
  const [messageIndex, setMessageIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const menopauseMessages = [
    'MENOPAUSE | Tailored HRT and non-hormonal options based on your story.',
    'SYMPTOMS | Hot flushes, sleep, mood, cognition — mapped and managed.',
    'SUPPORT | Continuous follow-up, not one-off appointments.',
  ]

  useEffect(() => {
    const current = menopauseMessages[messageIndex]
    const timeout = setTimeout(() => {
      if (charIndex < current.length) {
        setTypedText((prev) => prev + current.charAt(charIndex))
        setCharIndex((c) => c + 1)
      } else {
        setTimeout(() => {
          setTypedText('')
          setCharIndex(0)
          setMessageIndex((idx) => (idx + 1) % menopauseMessages.length)
        }, 1800)
      }
    }, 35)

    return () => clearTimeout(timeout)
  }, [charIndex, messageIndex])

  const schedulerRef = useRef(null)

  useEffect(() => {
    if (!schedulerRef.current) return

    const ctx = gsap.context(() => {
      const days = schedulerRef.current.querySelectorAll('.day-cell')
      const cursor = schedulerRef.current.querySelector('.cursor-icon')
      const saveButton = schedulerRef.current.querySelector('.save-button')

      if (!cursor || !saveButton || days.length === 0) return

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: 'power2.inOut' },
      })

      tl.set(cursor, { opacity: 0, scale: 0.9 })
      tl.set(days, { borderColor: 'rgba(148,163,184,0.35)', backgroundColor: 'transparent' })

      days.forEach((day, idx) => {
        const rect = day.getBoundingClientRect()
        const parentRect = schedulerRef.current.getBoundingClientRect()
        const x = rect.left - parentRect.left + rect.width / 2 - 10
        const y = rect.top - parentRect.top + rect.height / 2 - 10

        tl.to(
          cursor,
          {
            opacity: 1,
            x,
            y,
            duration: 0.7,
          },
          idx === 0 ? 'start' : '>-0.1',
        )
        tl.to(
          day,
          {
            scale: 0.95,
            backgroundColor: 'rgba(47,185,169,0.12)',
            borderColor: 'rgba(47,185,169,0.8)',
            duration: 0.25,
          },
          '<',
        )
        tl.to(
          day,
          {
            scale: 1,
            duration: 0.2,
          },
          '>-0.1',
        )
      })

      const saveRect = saveButton.getBoundingClientRect()
      const parentRect = schedulerRef.current.getBoundingClientRect()
      const saveX = saveRect.left - parentRect.left + saveRect.width / 2 - 10
      const saveY = saveRect.top - parentRect.top + saveRect.height / 2 - 10

      tl.to(cursor, {
        x: saveX,
        y: saveY,
        duration: 0.9,
      })
      tl.to(
        saveButton,
        {
          scale: 0.96,
          backgroundColor: 'rgba(47,185,169,1)',
          duration: 0.18,
        },
        '<',
      )
      tl.to(saveButton, {
        scale: 1,
        backgroundColor: 'rgba(15,23,42,1)',
        duration: 0.22,
      })
      tl.to(cursor, { opacity: 0, duration: 0.6 })
    }, schedulerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="features"
      className="relative py-20 sm:py-24"
    >
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.26em] text-accentSoft">
              {BRAND.name} protocol
            </p>
            <h2 className="mt-2 font-heading text-[1.9rem] font-semibold text-slate-50 sm:text-[2.2rem]">
              Three lenses on every patient journey.
            </h2>
          </div>
          <p className="max-w-md text-xs text-slate-400">
            We treat health as a long-term collaboration. Each feature below is a live surface from
            your Remedi operating system — not static marketing.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="relative overflow-hidden rounded-2xl-soft border border-borderSoft bg-surface/90 p-4 shadow-surface backdrop-blur-xl sm:p-6">
            <header className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-heading text-sm font-semibold text-slate-50">
                  Longevity Diagnostic Shuffler
                </h3>
                <p className="mt-1 text-[11px] text-slate-400">
                  {VALUE_PROPS[0]} · we rotate focus across systems, not single markers.
                </p>
              </div>
              <div className="rounded-2xl-soft bg-accent/15 px-3 py-1 text-[10px] font-medium text-accent">
                LIVE STACK
              </div>
            </header>
            <div
              ref={shufflerRef}
              className="relative mt-3 h-40 sm:h-44"
            >
              <div className="absolute inset-0">
                {shuffleItems.map((label, index) => (
                  <div
                    key={label}
                    className="shuffler-card absolute inset-x-2 mx-1 flex items-center justify-between rounded-2xl-soft border border-borderSoft bg-primary/80 px-4 py-3 text-xs text-slate-100 shadow-surface"
                    style={{
                      top: `${index * 18}px`,
                      transform: `scale(${1 - index * 0.08})`,
                      opacity: 1 - index * 0.2,
                      zIndex: 10 - index,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-[10px] font-semibold text-accent">
                        {index === 0 ? 'NOW' : index === 1 ? 'NEXT' : 'LATER'}
                      </span>
                      <span>{label}</span>
                    </div>
                    <span className="font-data text-[10px] text-accentSoft">
                      {index === 0 ? 'FOCUS • 12 weeks' : index === 1 ? 'IN QUEUE' : 'ON DECK'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-2xl-soft border border-borderSoft bg-surface/90 p-4 shadow-surface backdrop-blur-xl sm:p-6">
            <header className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-heading text-sm font-semibold text-slate-50">
                  Menopause Telemetry Typewriter
                </h3>
                <p className="mt-1 text-[11px] text-slate-400">
                  {VALUE_PROPS[1]} · translated into a live, human-readable feed.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" />
                <span className="font-data text-[10px] uppercase tracking-[0.18em] text-accentSoft">
                  Live Feed
                </span>
              </div>
            </header>
            <div className="rounded-2xl-soft border border-borderSoft bg-primary/70 px-4 py-4">
              <div className="mb-3 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-data">
                  CHANNEL · MENO-OS
                </span>
                <span className="font-data text-slate-500">
                  24/7 clinician-backed
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl-soft bg-black/40 px-3 py-3 font-data text-[11px] text-emerald-100">
                <span className="text-accentSoft">▶</span>
                <span className="whitespace-pre-wrap">
                  {typedText}
                  <span className="ml-[1px] inline-block h-[1em] w-[2px] translate-y-[1px] bg-accent animate-cursor-blink" />
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-slate-500">
                <span>Every consultation updates this stream.</span>
                <span className="font-data text-slate-400">SYNC • SECURE • CLINICIAN LED</span>
              </div>
            </div>
          </article>

          <article
            ref={schedulerRef}
            className="relative overflow-hidden rounded-2xl-soft border border-borderSoft bg-surface/90 p-4 shadow-surface backdrop-blur-xl sm:p-6"
          >
            <header className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-heading text-sm font-semibold text-slate-50">
                  Guided Weight Management Scheduler
                </h3>
                <p className="mt-1 text-[11px] text-slate-400">
                  {VALUE_PROPS[2]} · structured like a weekly protocol, not a crash plan.
                </p>
              </div>
              <div className="rounded-2xl-soft bg-primary/70 px-3 py-1 text-[10px] font-medium text-slate-300 border border-borderSoft">
                WEEKLY PLAYBOOK
              </div>
            </header>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-slate-500">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                  <div
                    key={d}
                    className="day-cell flex aspect-square items-center justify-center rounded-2xl-soft border border-borderSoft bg-primary/60 text-slate-300"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-data text-slate-400">
                  PROTOCOL · MOVEMENT · NUTRITION · RECOVERY
                </span>
                <button
                  type="button"
                  className="save-button inline-flex items-center gap-1 rounded-2xl-soft bg-primary px-3 py-1.5 text-[10px] font-medium text-slate-100 border border-borderSoft"
                >
                  Save this week
                </button>
              </div>
              <svg
                className="pointer-events-none absolute left-4 top-8 h-6 w-6 cursor-icon text-slate-100"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 3.5L18.5 12L12.9 13.7L15.8 20.5L12.7 22L9.8 15.2L6 18.3Z"
                />
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Philosophy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const words = sectionRef.current.querySelectorAll('.philo-word')
      gsap.from(words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 32,
        opacity: 0,
        ease: 'power3.out',
        duration: 0.9,
        stagger: 0.08,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const industry = 'private healthcare'

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-0 bg-surface" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(8,18,28,0.9), rgba(8,18,28,0.96)), url(${textureImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="section-shell relative">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.26em] text-accentSoft">
              Our philosophy
            </p>
            <h2 className="mt-2 font-heading text-[1.8rem] font-semibold text-slate-50 sm:text-[2.1rem]">
              A clinic built around your future self.
            </h2>
          </div>
          <p className="max-w-md text-xs text-slate-400">
            Every appointment is a data point, but our work is not about numbers — it&apos;s about
            translating them into a calmer, longer, better life.
          </p>
        </div>

        <div className="space-y-8">
          <p className="max-w-2xl text-sm text-slate-300">
            Most {industry} focuses on{' '}
            <span className="font-semibold text-slate-100">
              single symptoms, one-off tests, and rushed decisions.
            </span>
          </p>
          <div className="max-w-3xl text-3xl font-drama italic leading-tight text-slate-50 sm:text-[2.6rem] md:text-[3rem]">
            {`We focus on:`}{' '}
            <span className="philo-word text-accent">
              longitudinal data,
            </span>{' '}
            <span className="philo-word">
              human conversation,
            </span>{' '}
            <span className="philo-word">
              and a protocol that
            </span>{' '}
            <span className="philo-word text-accentSoft">
              actually fits your life.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')

      cards.forEach((card, idx) => {
        const isTop = idx === cards.length - 1
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top center',
            end: '+=120%',
            scrub: true,
            pin: isTop,
            pinSpacing: true,
          },
        })

        tl.fromTo(
          card,
          {
            scale: 0.92,
            opacity: 0.4,
            filter: 'blur(10px)',
          },
          {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power3.out',
          },
        )

        if (idx > 0) {
          const under = cards[idx - 1]
          tl.to(
            under,
            {
              scale: 0.9,
              opacity: 0.5,
              filter: 'blur(20px)',
              ease: 'power2.inOut',
            },
            '<',
          )
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const steps = [
    {
      step: 'STEP 01',
      title: 'Reveal your baseline',
      body: 'Deep diagnostic testing — from bloods and biomarkers to genetics — mapped against your goals, not just reference ranges.',
      texture: protocolTextures[0],
      motif: 'helix',
    },
    {
      step: 'STEP 02',
      title: 'Design the protocol',
      body: 'Our clinicians translate data into a menopause, longevity, or weight plan that can live inside your real week.',
      texture: protocolTextures[1],
      motif: 'scan',
    },
    {
      step: 'STEP 03',
      title: 'Renew, then repeat',
      body: 'We iterate with you — retesting, adjusting doses, and refining behaviour so your “future self” feels within reach.',
      texture: protocolTextures[2],
      motif: 'wave',
    },
  ]

  return (
    <section
      id="protocol"
      ref={containerRef}
      className="relative py-24 sm:py-28"
    >
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.26em] text-accentSoft">
              The Remedi protocol
            </p>
            <h2 className="mt-2 font-heading text-[1.9rem] font-semibold text-slate-50 sm:text-[2.2rem]">
              A sticky, stacking archive of your health.
            </h2>
          </div>
          <p className="max-w-md text-xs text-slate-400">
            Each phase of the protocol pins in place as you scroll, creating a visual memory of how
            your care evolves over time.
          </p>
        </div>
      </div>

      <div className="relative">
        {steps.map((step, idx) => (
          <div
            key={step.step}
            className="protocol-card mb-12"
          >
            <div className="section-shell">
              <div className="relative overflow-hidden rounded-3xl-soft border border-borderSoft bg-surface/95 px-6 py-8 shadow-soft backdrop-blur-2xl sm:px-10 sm:py-10 lg:px-14 lg:py-12">
                <div
                  className="pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(8,18,28,0.9), rgba(8,18,28,0.96)), url(${step.texture})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
                  <div className="space-y-4">
                    <p className="font-data text-[11px] uppercase tracking-[0.18em] text-accentSoft">
                      {step.step}
                    </p>
                    <h3 className="font-heading text-[1.6rem] font-semibold text-slate-50 sm:text-[1.9rem]">
                      {step.title}
                    </h3>
                    <p className="max-w-xl text-sm text-slate-300">
                      {step.body}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/70 px-3 py-1 font-data border border-borderSoft">
                        <Clock size={12} className="text-accentSoft" />
                        Timeline calibrated around your life
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/70 px-3 py-1 font-data border border-borderSoft">
                        <ShieldCheck size={12} className="text-accentSoft" />
                        GPhC-registered, clinician-led
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 rounded-3xl-soft bg-black/40" />
                    <div className="relative flex h-full items-center justify-center rounded-3xl-soft border border-borderSoft bg-black/40 p-6">
                      {step.motif === 'helix' && (
                        <svg
                          viewBox="0 0 200 200"
                          className="h-48 w-48 text-accentSoft"
                        >
                          <defs>
                            <linearGradient
                              id="helix"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#2FB9A9" />
                              <stop offset="100%" stopColor="#7BE3D5" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M40 20C80 40 120 80 160 100C120 120 80 160 40 180"
                            fill="none"
                            stroke="url(#helix)"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <path
                            d="M160 20C120 40 80 80 40 100C80 120 120 160 160 180"
                            fill="none"
                            stroke="url(#helix)"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                      {step.motif === 'scan' && (
                        <svg
                          viewBox="0 0 200 200"
                          className="h-48 w-48 text-accentSoft"
                        >
                          <defs>
                            <linearGradient
                              id="scan"
                              x1="0%"
                              y1="0%"
                              x2="0%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#7BE3D5" />
                              <stop offset="100%" stopColor="#2FB9A9" />
                            </linearGradient>
                          </defs>
                          <g stroke="rgba(148,163,184,0.4)" strokeWidth="0.5">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <line
                                // eslint-disable-next-line react/no-array-index-key
                                key={i}
                                x1={20}
                                x2={180}
                                y1={20 + i * 16}
                                y2={20 + i * 16}
                              />
                            ))}
                            {Array.from({ length: 10 }).map((_, i) => (
                              <line
                                // eslint-disable-next-line react/no-array-index-key
                                key={i}
                                x1={20 + i * 16}
                                x2={20 + i * 16}
                                y1={20}
                                y2={180}
                              />
                            ))}
                          </g>
                          <rect
                            x="20"
                            y="40"
                            width="160"
                            height="8"
                            fill="url(#scan)"
                          >
                            <animate
                              attributeName="y"
                              values="40;150;40"
                              dur="4s"
                              repeatCount="indefinite"
                            />
                          </rect>
                        </svg>
                      )}
                      {step.motif === 'wave' && (
                        <svg
                          viewBox="0 0 200 200"
                          className="h-48 w-48 text-accentSoft"
                        >
                          <defs>
                            <linearGradient
                              id="wave"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#2FB9A9" />
                              <stop offset="100%" stopColor="#7BE3D5" />
                            </linearGradient>
                          </defs>
                          <path
                            id="wavePath"
                            d="M10 100 Q 40 40, 70 100 T 130 100 T 190 100"
                            fill="none"
                            stroke="url(#wave)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="300"
                            strokeDashoffset="300"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              from="300"
                              to="0"
                              dur="3s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section
      id="pricing"
      className="relative py-20 sm:py-24"
    >
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-heading font-semibold uppercase tracking-[0.26em] text-accentSoft">
              Membership
            </p>
            <h2 className="mt-2 font-heading text-[1.9rem] font-semibold text-slate-50 sm:text-[2.2rem]">
              Choose how deeply we travel with you.
            </h2>
          </div>
          <p className="max-w-md text-xs text-slate-400">
            Pricing is indicative and can be adapted to your local market. What matters is the
            level of access, not just the number on the invoice.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl-soft border border-borderSoft bg-surface/80 p-6 shadow-surface backdrop-blur-xl">
            <div className="mb-4 text-[11px] font-heading uppercase tracking-[0.22em] text-slate-400">
              Essential
            </div>
            <h3 className="mb-2 text-lg font-heading font-semibold text-slate-50">
              Foundation Health
            </h3>
            <p className="mb-6 text-xs text-slate-400">
              For those wanting a clear baseline and targeted next steps.
            </p>
            <ul className="mb-6 space-y-2 text-xs text-slate-300">
              <li>• Comprehensive initial consultation</li>
              <li>• Core blood panel & key markers</li>
              <li>• Follow-up to review results</li>
              <li>• Access to travel & vaccination services</li>
            </ul>
            <button
              type="button"
              className="magnetic-button w-full justify-center"
            >
              <span className="bg-swipe" />
              <span className="label flex items-center justify-center gap-2">
                {BRAND.cta}
                <ArrowRight size={16} />
              </span>
            </button>
          </div>

          <div className="relative overflow-hidden rounded-3xl-soft border border-accent/80 bg-accent px-6 py-8 text-primary shadow-soft backdrop-blur-xl lg:-translate-y-3">
            <div className="absolute right-6 top-6 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]">
              Most selected
            </div>
            <div className="mb-4 text-[11px] font-heading uppercase tracking-[0.22em]">
              Performance
            </div>
            <h3 className="mb-2 text-lg font-heading font-semibold">
              Longevity & Menopause
            </h3>
            <p className="mb-6 text-xs text-primary/80">
              Deep testing, menopause or weight management support, and ongoing calibration.
            </p>
            <ul className="mb-6 space-y-2 text-xs text-primary/90">
              <li>• Advanced biomarker & genetics options</li>
              <li>• Personalised menopause or weight protocol</li>
              <li>• Quarterly review consultations</li>
              <li>• Priority access to clinicians</li>
            </ul>
            <button
              type="button"
              className="magnetic-button w-full justify-center border border-primary/20 bg-primary text-slate-50 shadow-soft"
            >
              <span className="bg-swipe" />
              <span className="label flex items-center justify-center gap-2">
                {BRAND.cta}
                <ArrowRight size={16} />
              </span>
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl-soft border border-borderSoft bg-surface/80 p-6 shadow-surface backdrop-blur-xl">
            <div className="mb-4 text-[11px] font-heading uppercase tracking-[0.22em] text-slate-400">
              Enterprise
            </div>
            <h3 className="mb-2 text-lg font-heading font-semibold text-slate-50">
              Executive & Partner
            </h3>
            <p className="mb-6 text-xs text-slate-400">
              For individuals and couples who want fully concierge care.
            </p>
            <ul className="mb-6 space-y-2 text-xs text-slate-300">
              <li>• Bespoke diagnostics & longevity roadmap</li>
              <li>• Unlimited messaging between reviews</li>
              <li>• Coordination with your wider care team</li>
              <li>• Discreet, priority scheduling</li>
            </ul>
            <button
              type="button"
              className="magnetic-button w-full justify-center"
            >
              <span className="bg-swipe" />
              <span className="label flex items-center justify-center gap-2">
                Arrange a private call
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section
      id="cta"
      className="relative pb-20 pt-4 sm:pb-24"
    >
      <div className="section-shell">
        <div className="overflow-hidden rounded-3xl-soft border border-borderSoft bg-surface/95 px-6 py-8 shadow-soft backdrop-blur-2xl sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr),minmax(0,0.8fr)]">
            <div className="space-y-4">
              <p className="text-xs font-heading font-semibold uppercase tracking-[0.26em] text-accentSoft">
                {BRAND.name} Winchester
              </p>
              <h2 className="font-heading text-[1.9rem] font-semibold text-slate-50 sm:text-[2.2rem]">
                Ready to discover a healthier version of yourself?
              </h2>
              <p className="max-w-xl text-sm text-slate-300">
                Share what you&apos;re seeking help with — menopause, long-term health, weight, or
                “all of the above” — and our team will match you with the right consultation type.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/70 px-3 py-1 font-data border border-borderSoft">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
                  System operational — appointments available
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/70 px-3 py-1 font-data border border-borderSoft">
                  Average wait &lt; 7 days
                </span>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl-soft border border-borderSoft bg-primary/70 p-5 text-xs text-slate-200">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Name</label>
                  <input
                    className="w-full rounded-2xl-soft border border-borderSoft bg-black/20 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="First and last name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Email</label>
                  <input
                    className="w-full rounded-2xl-soft border border-borderSoft bg-black/20 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">
                  What would you like to discuss?
                </label>
                <select className="w-full rounded-2xl-soft border border-borderSoft bg-black/20 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-accent">
                  <option>Longevity & general health</option>
                  <option>Menopause support</option>
                  <option>Guided weight management</option>
                  <option>Something else</option>
                </select>
              </div>
              <button
                type="button"
                className="magnetic-button mt-2 w-full justify-center"
              >
                <span className="bg-swipe" />
                <span className="label flex items-center justify-center gap-2">
                  {BRAND.cta}
                  <ArrowRight size={16} />
                </span>
              </button>
              <p className="text-[10px] text-slate-500">
                By requesting a consultation, you agree that Remedi Health may contact you regarding
                clinic availability and services. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-10 rounded-t-4xl-soft bg-black/80 px-4 pb-8 pt-10 text-xs text-slate-400 sm:px-6 lg:px-8">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr),minmax(0,1fr)]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Stethoscope size={18} />
              </span>
              <div>
                <div className="font-heading text-sm font-semibold">{BRAND.name}</div>
                <div className="text-[11px] text-slate-400">{BRAND.tagline}</div>
              </div>
            </div>
            <p className="max-w-sm text-[11px] text-slate-500">
              A private healthcare clinic and registered pharmacy based in Winchester, Hampshire —
              committed to reveal, reassure, and renew.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Navigation
            </div>
            <div className="flex flex-col gap-1 text-[11px] text-slate-500">
              <button
                type="button"
                className="text-left transition-transform duration-200 hover:-translate-y-[1px] hover:text-slate-300"
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Services overview
              </button>
              <button
                type="button"
                className="text-left transition-transform duration-200 hover:-translate-y-[1px] hover:text-slate-300"
                onClick={() => document.querySelector('#protocol')?.scrollIntoView({ behavior: 'smooth' })}
              >
                The Remedi protocol
              </button>
              <button
                type="button"
                className="text-left transition-transform duration-200 hover:-translate-y-[1px] hover:text-slate-300"
                onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Membership options
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              System status
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl-soft bg-primary/70 px-3 py-2 font-data text-[11px] text-slate-100 border border-borderSoft">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
              <span>System operational · accepting new patients</span>
            </div>
            <p className="text-[10px] text-slate-500">
              {year} © {BRAND.name}. All rights reserved. This page is a conceptual landing experience built for
              Remedi Health in the style of a cinematic digital instrument.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const appRef = useRef(null)
  useGsapContext(appRef, [])

  return (
    <div
      ref={appRef}
      className="min-h-screen bg-primary text-slate-50"
    >
      <Navbar />
      <main className="pb-10">
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
