import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Glossy iridescent torus-knot: spins on its own, and the outer group tilts
// toward the pointer (lerped, not 1:1, so it feels weighty/premium).
export default function FloatingKnot({ interactive = true }) {
  const group = useRef(null)
  const mesh = useRef(null)

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.18
      mesh.current.rotation.y += delta * 0.26
    }
    if (group.current && interactive) {
      const targetX = state.pointer.y * 0.35
      const targetY = state.pointer.x * 0.35
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05)
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05)
    }
  })

  return (
    <group ref={group}>
      <mesh ref={mesh} scale={1.4}>
        <torusKnotGeometry args={[1, 0.32, 128, 16]} />
        <meshPhysicalMaterial
          color="#c9bdff"
          roughness={0.08}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={1}
          iridescenceIOR={1.3}
          envMapIntensity={1.4}
        />
      </mesh>
    </group>
  )
}
