import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Pass `videoSrc` once a real showreel file exists — until then it renders a
// styled placeholder poster.
export default function Showreel({ videoSrc }) {
  const sectionRef = useRef(null)
  const frameRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frameRef.current,
        { scale: 0.72, borderRadius: 32 },
        {
          scale: 1,
          borderRadius: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} id="showreel" className="relative bg-[#0A0A0F] py-24 md:py-32 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
        <span className="section-label text-white/60">Showreel</span>
        <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Made in <span className="text-gradient-accent">Motion</span>
        </h2>
      </div>

      <div className="flex justify-center px-6">
        <div
          ref={frameRef}
          className="relative w-full max-w-5xl aspect-video overflow-hidden border border-white/10 bg-gradient-to-br from-[#7C3AED]/25 via-[#0A0A0F] to-[#22D3EE]/20"
        >
          {videoSrc ? (
            <video src={videoSrc} className="w-full h-full object-cover" autoPlay muted loop playsInline />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur grid place-items-center border border-white/20">
                  <span className="text-3xl text-white ml-1">▶</span>
                </div>
                <span className="text-white/50 text-sm tracking-widest uppercase">Showreel coming soon</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
