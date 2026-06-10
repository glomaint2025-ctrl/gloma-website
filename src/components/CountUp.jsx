import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Animates a number from 0 up to `end` when it scrolls into view.
// Use `suffix` for things like "+" or "%".
export default function CountUp({ end, suffix = '', duration = 1800, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let startTime
    let frame
    const step = (now) => {
      if (!startTime) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      // easeOutCubic for a premium slow-down
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, end, duration])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
