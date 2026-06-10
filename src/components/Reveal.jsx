import { motion } from 'framer-motion'

// Fades + slides content into view on scroll.
// direction: 'up' | 'down' | 'left' | 'right'  (where it slides FROM)
const offset = {
  up: { x: 0, y: 50 },
  down: { x: 0, y: -50 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) {
  const from = offset[direction] || offset.up
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
