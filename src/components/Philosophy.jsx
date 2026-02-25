import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const TEXTURE_IMAGE = 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1600&q=80'

export default function Philosophy() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on texture
      gsap.to('.philo-texture', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -80,
        ease: 'none',
      })

      // Word-by-word reveal for the manifesto lines
      const words = sectionRef.current.querySelectorAll('.philo-word')
      gsap.from(words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out',
      })

      // Fade in the secondary elements
      gsap.from('.philo-fade', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-charcoal text-cream overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="philo-texture absolute inset-0 bg-cover bg-center opacity-[0.07]"
        style={{ backgroundImage: `url(${TEXTURE_IMAGE})` }}
      />

      <div className="section-shell relative z-10">
        <span className="text-data text-clay block mb-6 philo-fade">OUR PHILOSOPHY</span>

        <div className="max-w-4xl">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-16 philo-fade">
            Built for the founder who wants to{' '}
            <span className="text-drama text-clay-soft text-4xl md:text-5xl lg:text-6xl">lead,</span>{' '}
            not operate.
          </h2>

          {/* Neutral statement */}
          <div className="mb-12">
            <p className="text-cream/40 text-lg md:text-xl leading-relaxed">
              {splitWords('Most consulting focuses on strategy decks, offsite workshops, and recommendations that collect dust.')}
            </p>
          </div>

          {/* Drama statement */}
          <div>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-[1.3] font-light">
              <span className="philo-word inline-block mr-[0.3em] text-cream/60">We</span>
              <span className="philo-word inline-block mr-[0.3em] text-cream/60">focus</span>
              <span className="philo-word inline-block mr-[0.3em] text-cream/60">on:</span>
              <span className="philo-word inline-block mr-[0.3em] text-drama text-clay text-3xl md:text-4xl lg:text-5xl">implemented</span>
              <span className="philo-word inline-block mr-[0.3em] text-drama text-clay text-3xl md:text-4xl lg:text-5xl">systems,</span>
              <span className="philo-word inline-block mr-[0.3em] text-cream/70">autonomous</span>
              <span className="philo-word inline-block mr-[0.3em] text-cream/70">agents,</span>
              <span className="philo-word inline-block mr-[0.3em] text-cream/60">and</span>
              <span className="philo-word inline-block mr-[0.3em] text-cream/60">a</span>
              <span className="philo-word inline-block mr-[0.3em] text-cream/60">business</span>
              <span className="philo-word inline-block mr-[0.3em] text-cream/60">that</span>
              <span className="philo-word inline-block mr-[0.3em] text-drama text-clay text-3xl md:text-4xl lg:text-5xl">runs</span>
              <span className="philo-word inline-block mr-[0.3em] text-drama text-clay text-3xl md:text-4xl lg:text-5xl">without</span>
              <span className="philo-word inline-block mr-[0.3em] text-drama text-clay text-3xl md:text-4xl lg:text-5xl">you</span>
              <span className="philo-word inline-block mr-[0.3em] text-cream/60">in</span>
              <span className="philo-word inline-block mr-[0.3em] text-cream/60">every</span>
              <span className="philo-word inline-block text-drama text-clay text-3xl md:text-4xl lg:text-5xl">seat.</span>
            </p>
          </div>

          {/* Subtext */}
          <p className="philo-fade mt-16 text-cream/30 text-base md:text-lg leading-relaxed max-w-2xl">
            Every engagement is a system handoff. Our work is not about automation&nbsp;&mdash; it&rsquo;s about giving you back the strategic altitude you lost.
          </p>
        </div>
      </div>
    </section>
  )
}

function splitWords(text) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="philo-word inline-block mr-[0.3em]">
      {word}
    </span>
  ))
}
