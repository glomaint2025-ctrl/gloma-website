import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import FloatingKnot from './FloatingKnot'
import Particles from './Particles'
import { useIsMobile } from '../lib/useIsMobile'

export default function HeroScene() {
  const isMobile = useIsMobile()

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 4, 4]} intensity={1.2} />
      <directionalLight position={[-4, -2, -4]} intensity={0.5} color="#22D3EE" />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <FloatingKnot interactive={!isMobile} />
        <Particles count={isMobile ? 80 : 250} />
      </Suspense>
    </Canvas>
  )
}
