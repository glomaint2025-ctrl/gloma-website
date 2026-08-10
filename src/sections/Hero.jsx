import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScene from '../three/HeroScene'
import { useIsMobile } from '../lib/useIsMobile'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const words = ['Your', 'Partner', 'in', 'Digital', 'Evolution']

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasWrapRef = useRef(null)
  const wordsRef = useRef([])
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) return

      gsap.fromTo(
        wordsRef.current,
        { yPercent: 120 },
        { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.08, delay: 0.3 }
      )

      if (canvasWrapRef.current) {
        gsap.to(canvasWrapRef.current, {
          scale: 1.35,
          y: 120,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0A0A0F] text-white"
    >
      <div ref={canvasWrapRef} className="absolute inset-0">
        {!isMobile ? <HeroScene /> : <div className="absolute inset-0 accent-glow" />}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(10,10,15,0.9)_100%)]" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <span className="section-label text-white/60">Gloma International — Creative Tech &amp; Content Studio</span>

        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold leading-[0.98] tracking-tight">
          {words.map((w, i) => (
            <span key={w} className="word-mask mr-4">
              <span
                ref={(el) => (wordsRef.current[i] = el)}
                className={`inline-block ${i >= 3 ? 'text-gradient-accent' : ''}`}
              >
                {w}
              </span>
            </span>
          ))}
        </h1>

        <p className="mt-7 text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed">
          All-in-one tech, content and social media solutions — engineered for
          brands that want to lead, not follow.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href="#work"
            data-cursor="view"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white font-semibold hover:scale-105 transition-transform"
          >
            View Our Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Start Your Project
          </a>
        </div>
      </div>

      {!reducedMotion && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/50">Scroll to explore</span>
          <span className="block w-px h-10 bg-gradient-to-b from-[#7C3AED] to-transparent animate-pulse" />
        </div>
      )}
    </section>
  )
}
