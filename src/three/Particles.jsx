import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// One draw call for the whole drift field — cheap regardless of count.
export default function Particles({ count = 250, color = '#7C3AED' }) {
  const pointsRef = useRef(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    return arr
  }, [count])

  useFrame((state) => {
    const p = pointsRef.current
    if (!p) return
    p.rotation.y = state.clock.elapsedTime * 0.02
    p.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={color} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}
