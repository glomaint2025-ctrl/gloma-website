import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// A 3D card that tilts toward the mouse and lifts up on hover.
// Wrap any content in <TiltCard>...</TiltCard>.
export default function TiltCard({ children, className = '', max = 12, ...rest }) {
  const ref = useRef(null)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  // Smooth the motion so it feels premium, not jittery
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [max, -max]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-max, max]), { stiffness: 150, damping: 18 })

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      whileHover={{ scale: 1.03 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
