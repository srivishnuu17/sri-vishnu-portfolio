import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Field({ count }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = t * 0.015
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05
    const targetX = state.pointer.x * 0.15
    const targetY = state.pointer.y * 0.1
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#8a90a0"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

export default function ParticleField() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const count = isMobile ? 250 : 900

  if (prefersReduced) return null

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, isMobile ? 1.25 : 2]}
        gl={{ antialias: false, alpha: true }}
      >
        <Field count={count} />
      </Canvas>
    </div>
  )
}
