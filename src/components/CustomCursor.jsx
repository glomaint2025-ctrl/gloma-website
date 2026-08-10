import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsMobile } from '../lib/useIsMobile'
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion'

// A small dot + a spring-trailing ring. Any element with data-cursor="view"
// (or any data-cursor value) makes the ring blow up and show that label.
export default function CustomCursor() {
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const disabled = isMobile || reducedMotion

  const [active, setActive] = useState(false)
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.5 })

  useEffect(() => {
    if (disabled) return
    document.body.classList.add('custom-cursor-active')

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e) => {
      const target = e.target.closest?.('[data-cursor]')
      if (target) {
        setActive(true)
        setLabel(target.dataset.cursor === 'view' ? 'View' : '')
      }
    }
    const onOut = (e) => {
      if (e.target.closest?.('[data-cursor]')) setActive(false)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [disabled, x, y])

  if (disabled) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9998] h-2 w-2 rounded-full bg-white pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ x, y }}
        animate={{ scale: active ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9997] rounded-full border border-white pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference grid place-items-center"
        style={{ x: ringX, y: ringY }}
        animate={{ width: active ? 88 : 34, height: active ? 88 : 34 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        {label && (
          <span className="text-[11px] font-semibold tracking-wide text-white uppercase">{label}</span>
        )}
      </motion.div>
    </>
  )
}
