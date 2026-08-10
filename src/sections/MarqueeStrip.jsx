import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { getLenis } from '../lib/lenis'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

function Strip({ text, direction = 1, baseSpeed = 40 }) {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion || !trackRef.current) return

    tweenRef.current = gsap.fromTo(
      trackRef.current,
      { xPercent: direction > 0 ? 0 : -50 },
      { xPercent: direction > 0 ? -50 : 0, duration: baseSpeed, ease: 'none', repeat: -1 }
    )

    const lenis = getLenis()
    const onScroll = ({ velocity }) => {
      const scale = gsap.utils.clamp(0.4, 3, 1 + Math.abs(velocity) * 0.05)
      tweenRef.current?.timeScale(scale)
    }
    lenis?.on('scroll', onScroll)

    return () => {
      tweenRef.current?.kill()
      lenis?.off('scroll', onScroll)
    }
  }, [direction, baseSpeed, reducedMotion])

  const words = Array(6).fill(text)

  return (
    <div className="overflow-hidden py-4 whitespace-nowrap">
      <div ref={trackRef} className="inline-flex w-max">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="text-outline text-[10vw] md:text-[6vw] font-heading font-extrabold px-6">
            {w}
          </span>
        ))}
      </div>
    </div>
  )
}

// Two huge outlined marquees running opposite directions, speeding up with
// scroll velocity (via the shared Lenis instance).
export default function MarqueeStrip() {
  return (
    <div className="relative bg-[#0A0A0F] py-6 border-y border-white/5 overflow-hidden">
      <Strip text="GLOMA INTERNATIONAL • " direction={1} baseSpeed={38} />
      <Strip text="TECH • CONTENT • SOCIAL • " direction={-1} baseSpeed={44} />
    </div>
  )
}
