import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Spinner({ shape }) {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.4
    ref.current.rotation.y += delta * 0.6
  })
  return (
    <mesh ref={ref}>
      {shape === 'sphere' && <sphereGeometry args={[0.9, 24, 24]} />}
      {shape === 'torus' && <torusGeometry args={[0.7, 0.28, 16, 48]} />}
      {shape === 'cube' && <boxGeometry args={[1.1, 1.1, 1.1]} />}
      <meshStandardMaterial
        color="#7C3AED"
        emissive="#22D3EE"
        emissiveIntensity={0.15}
        roughness={0.25}
        metalness={0.6}
      />
    </mesh>
  )
}

// A tiny self-contained scene — one primitive slowly spinning. Used one per
// service card; trivial geometry keeps six of these cheap.
export default function IconMesh({ shape = 'cube' }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 3], fov: 40 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 3]} intensity={1} />
      <Spinner shape={shape} />
    </Canvas>
  )
}
