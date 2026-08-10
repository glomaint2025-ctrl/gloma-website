import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FooterScene from '../three/FooterScene'
import { useMagnetic } from '../lib/useMagnetic'
import { useIsMobile } from '../lib/useIsMobile'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const wordmark = 'GLOMA'

export default function FooterCTA() {
  const sectionRef = useRef(null)
  const lettersRef = useRef([])
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const startRef = useMagnetic(0.35)
  const emailRef = useMagnetic(0.35)

  useEffect(() => {
    if (reducedMotion || !lettersRef.current.length) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lettersRef.current,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28 md:py-40">
      {!isMobile && (
        <div className="absolute inset-0 opacity-60">
          <FooterScene />
        </div>
      )}
      <div className="absolute inset-0 accent-glow opacity-40" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <span className="section-label text-white/60">Connect</span>
        <h2 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-[1.05]">
          Let&rsquo;s build <span className="text-gradient-accent">something</span>
        </h2>
        <p className="mt-6 text-white/60 text-lg max-w-xl mx-auto">
          Tell us about your project — we&rsquo;d love to help you grow.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            ref={startRef}
            href="#contact"
            className="px-9 py-4 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white font-semibold"
          >
            Start a project
          </a>
          <a
            ref={emailRef}
            href="mailto:info@glomaint.com"
            className="px-9 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            info@glomaint.com
          </a>
        </div>
      </div>

      <div className="relative mt-24 md:mt-32 overflow-hidden">
        <h3 className="text-center font-heading font-extrabold text-white/10 leading-none text-[20vw] md:text-[14vw] select-none">
          {wordmark.split('').map((letter, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span ref={(el) => (lettersRef.current[i] = el)} className="inline-block">
                {letter}
              </span>
            </span>
          ))}
        </h3>
      </div>
    </section>
  )
}
