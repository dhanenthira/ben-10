import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Omnitrix({ isActivated, selectedAlien, onClick }) {
  const groupRef = useRef()
  const dialRef = useRef()
  const coreGlowRef = useRef()
  const ringRef = useRef()

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Idle floating bobbing animation
    const t = state.clock.getElapsedTime()
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.12

    // Mouse tilt reaction
    const targetRotX = (state.pointer.y * 0.3)
    const targetRotY = (state.pointer.x * 0.4)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05)

    // Omnitrix dial rotation
    if (dialRef.current) {
      if (isActivated) {
        dialRef.current.rotation.z += delta * 4.0
      } else {
        dialRef.current.rotation.z += delta * 0.4
      }
    }

    // Emissive pulsing glow
    if (coreGlowRef.current) {
      const pulse = Math.sin(t * 3.5) * 0.35 + 1.2
      coreGlowRef.current.intensity = isActivated ? 8.0 : pulse * 2.5
    }

    // Outer decorative ring slow rotation
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.2
    }
  })

  // Theme color dynamically based on activation or alien
  const primaryGlow = isActivated ? "#55ff00" : (selectedAlien ? selectedAlien.themeColor : "#00ff66")

  return (
    <group ref={groupRef} onClick={onClick} dispose={null}>
      {/* Dynamic Point Light from Omnitrix Core */}
      <pointLight 
        ref={coreGlowRef} 
        color={primaryGlow} 
        intensity={3} 
        distance={8} 
        decay={2} 
      />

      {/* Main Base Wrist/Gauntlet Mount (Metallic Graphite) */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.5, 32]} />
        <meshStandardMaterial 
          color="#161a1d" 
          metalness={0.9} 
          roughness={0.25} 
        />
      </mesh>

      {/* Outer Armor Ring with Green Accents */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.65, 1.65, 0.35, 16]} />
        <meshStandardMaterial 
          color="#0b0e11" 
          metalness={0.85} 
          roughness={0.3} 
          wireframe={false}
        />
      </mesh>

      {/* Bezel Ring with metallic notches */}
      <mesh ref={ringRef} position={[0, 0.1, 0]}>
        <torusGeometry args={[1.4, 0.12, 16, 32]} />
        <meshStandardMaterial 
          color="#343a40" 
          metalness={0.95} 
          roughness={0.15} 
        />
      </mesh>

      {/* Raised Dial Mechanism */}
      <group position={[0, isActivated ? 0.45 : 0.22, 0]}>
        {/* Outer Dial Bezel */}
        <mesh>
          <cylinderGeometry args={[1.2, 1.25, 0.3, 32]} />
          <meshStandardMaterial 
            color="#212529" 
            metalness={0.9} 
            roughness={0.2} 
          />
        </mesh>

        {/* 4 Green Bezel Markers */}
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, idx) => (
          <mesh 
            key={idx} 
            position={[Math.cos(angle) * 1.15, 0.12, Math.sin(angle) * 1.15]}
          >
            <boxGeometry args={[0.15, 0.1, 0.15]} />
            <meshStandardMaterial 
              color="#00ff66" 
              emissive="#00ff66" 
              emissiveIntensity={1.5} 
            />
          </mesh>
        ))}

        {/* Core Glass Lens */}
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.05, 32]} />
          <meshPhysicalMaterial 
            color="#05140d" 
            transmission={0.6} 
            opacity={0.85} 
            transparent 
            roughness={0.1} 
            ior={1.5} 
          />
        </mesh>

        {/* Rotating Omnitrix Face with Classic Hourglass Silhouette */}
        <group ref={dialRef} position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* Black Background Disc */}
          <mesh>
            <circleGeometry args={[0.9, 32]} />
            <meshStandardMaterial color="#000000" metalness={0.5} roughness={0.5} />
          </mesh>

          {/* Hourglass Green Neon Top Triangle */}
          <mesh position={[0, 0.35, 0.01]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.42, 0.65, 3]} />
            <meshStandardMaterial 
              color={primaryGlow} 
              emissive={primaryGlow} 
              emissiveIntensity={2.5} 
            />
          </mesh>

          {/* Hourglass Green Neon Bottom Triangle */}
          <mesh position={[0, -0.35, 0.01]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.42, 0.65, 3]} />
            <meshStandardMaterial 
              color={primaryGlow} 
              emissive={primaryGlow} 
              emissiveIntensity={2.5} 
            />
          </mesh>

          {/* Center Energy Node */}
          <mesh position={[0, 0, 0.02]}>
            <circleGeometry args={[0.12, 16]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#ffffff" 
              emissiveIntensity={3} 
            />
          </mesh>
        </group>
      </group>

      {/* Hologram Projector Ring */}
      <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 1.85, 32]} />
        <meshBasicMaterial 
          color="#00ff66" 
          transparent 
          opacity={isActivated ? 0.8 : 0.35} 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </group>
  )
}
