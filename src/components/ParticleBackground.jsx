import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleBackground({ count = 180, color = "#00ff66" }) {
  const pointsRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      scales[i] = Math.random() * 0.8 + 0.2
    }

    return { positions, scales }
  }, [count])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.03
    pointsRef.current.rotation.x += delta * 0.01
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}
