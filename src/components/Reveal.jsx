import { motion } from 'framer-motion'

// Wrap anything in <Reveal>...</Reveal> and it fades + slides up
// gently when it scrolls into view. delay (in seconds) staggers items.
export default function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
