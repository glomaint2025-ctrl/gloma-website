import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Particles from './Particles'
import { useIsMobile } from '../lib/useIsMobile'

function WireSphere() {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshBasicMaterial color="#7C3AED" wireframe transparent opacity={0.35} />
    </mesh>
  )
}

export default function FooterScene() {
  const isMobile = useIsMobile()
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <WireSphere />
        <Particles count={isMobile ? 40 : 120} color="#22D3EE" />
      </Suspense>
    </Canvas>
  )
}
