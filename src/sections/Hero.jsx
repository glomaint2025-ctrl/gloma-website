import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const words = ['Your', 'Partner', 'in', 'Digital', 'Evolution']

export default function Hero() {
  const sectionRef = useRef(null)
  const wordsRef = useRef([])
  const imageRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.fromTo(
          wordsRef.current,
          { yPercent: 120 },
          { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.08, delay: 0.3 }
        )
      }

      if (!reducedMotion && imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: 0 },
          {
            y: 90,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-deep text-white overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28"
    >
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <span className="section-label">Gloma International — Creative Tech &amp; Content Studio</span>

        <h1 className="font-serif mt-6 text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-semibold leading-[1] tracking-tight">
          {words.map((w, i) => (
            <span key={w} className="word-mask mr-4">
              <span
                ref={(el) => (wordsRef.current[i] = el)}
                className={`inline-block ${i >= 3 ? 'text-gold' : ''}`}
              >
                {w}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 mx-auto w-16 h-px bg-white/25" />

        <p className="mt-8 text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed">
          All-in-one tech, content and social media solutions — engineered for
          brands that want to lead, not follow.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href="#work"
            data-cursor="view"
            className="px-8 py-3.5 rounded-full bg-gold text-navy-deep font-semibold hover:bg-gold-light transition-colors"
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

      <div className="relative max-w-6xl mx-auto px-6 mt-20 md:mt-28">
        <div className="rounded-2xl overflow-hidden">
          <img
            ref={imageRef}
            src="/images/hero-1.jpg"
            alt=""
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {!reducedMotion && (
        <div className="relative mt-16 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/40">Scroll to explore</span>
          <span className="block w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      )}
    </section>
  )
}
