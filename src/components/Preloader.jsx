import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

// Plays once per browser session (sessionStorage-gated) so it doesn't replay
// on every client-side route change, only the first real page load.
export default function Preloader() {
  const reducedMotion = usePrefersReducedMotion()
  const [show, setShow] = useState(
    () => typeof window !== 'undefined' && !sessionStorage.getItem('gloma_preloaded')
  )
  const countRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (!show) return
    sessionStorage.setItem('gloma_preloaded', '1')

    if (reducedMotion) {
      setShow(false)
      return
    }

    const counter = { val: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(wrapRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => setShow(false),
        })
      },
    })
    tl.to(counter, {
      val: 100,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = Math.round(counter.val)
      },
    })

    return () => tl.kill()
  }, [show, reducedMotion])

  if (!show) return null

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[999] bg-[#0A0A0F] grid place-items-center"
    >
      <div className="flex flex-col items-center gap-6">
        <img src="/logo.jpg" alt="Gloma" className="h-14 w-14 rounded-xl object-cover ring-1 ring-white/20" />
        <div className="text-6xl md:text-7xl font-heading font-extrabold text-white tabular-nums">
          <span ref={countRef}>0</span>
          <span className="text-gradient-accent">%</span>
        </div>
      </div>
    </div>
  )
}
