import { motion, useScroll, useSpring } from 'framer-motion'

// A thin gold bar pinned to the top that fills as you scroll the page.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-gold to-gold-light"
    />
  )
}
