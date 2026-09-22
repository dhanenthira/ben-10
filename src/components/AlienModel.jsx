import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Image } from '@react-three/drei'
import * as THREE from 'three'

// 1. HEATBLAST - Pyronite Fire Manipulator
function HeatblastModel({ mouseReaction }) {
  const group = useRef()
  const emberGroup = useRef()
  const haloRef = useRef()

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.8) * 0.25 + (mouseReaction.x * 0.35)
      group.current.rotation.x = -mouseReaction.y * 0.15
      group.current.position.y = Math.sin(t * 2) * 0.08
    }
    if (emberGroup.current) {
      emberGroup.current.rotation.y += delta * 0.6
      emberGroup.current.rotation.z += delta * 0.2
    }
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.4
    }
  })

  return (
    <group ref={group}>
      {/* 3D Holographic Character Plane */}
      <group position={[0, 0.0, 0]}>
        <Image
          url="/images/heatblast.jpg"
          scale={[1.65, 2.95]}
          transparent
          radius={0.12}
        />
        
        {/* Glowing Fiery Backplate Aura */}
        <mesh position={[0, 0, -0.04]}>
          <planeGeometry args={[1.75, 3.05]} />
          <meshBasicMaterial 
            color="#ff4500" 
            transparent 
            opacity={0.35} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Outer Magma Rock Frame */}
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[1.82, 3.12, 0.06]} />
          <meshStandardMaterial 
            color="#1f0b04" 
            metalness={0.8} 
            roughness={0.4} 
            emissive="#ff3300"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Fiery Orbital Halo */}
      <group ref={haloRef} position={[0, 0.0, 0]}>
        <mesh>
          <torusGeometry args={[1.75, 0.02, 8, 32]} />
          <meshBasicMaterial color="#ff7700" transparent opacity={0.65} />
        </mesh>
      </group>

      {/* Orbiting Fire Embers */}
      <group ref={emberGroup}>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos(i * 0.45) * (1.3 + (i % 3) * 0.25),
              (i % 7) * 0.4 - 1.2,
              Math.sin(i * 0.45) * (1.3 + (i % 3) * 0.25)
            ]}
          >
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshStandardMaterial color="#ffff00" emissive="#ff4400" emissiveIntensity={5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// 2. FOUR ARMS - Massive Tetramand Titan
function FourArmsModel({ mouseReaction }) {
  const group = useRef()
  const shockwaveRef = useRef()
  const sparksRef = useRef()

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.7) * 0.25 + (mouseReaction.x * 0.35)
      group.current.rotation.x = -mouseReaction.y * 0.15
      group.current.position.y = Math.sin(t * 1.6) * 0.06
    }
    if (shockwaveRef.current) {
      shockwaveRef.current.rotation.z += delta * 0.8
    }
    if (sparksRef.current) {
      sparksRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={group}>
      {/* 3D Holographic Character Plane */}
      <group position={[0, 0.0, 0]}>
        <Image
          url="/images/fourarms.jpg"
          scale={[2.2, 2.5]}
          transparent
          radius={0.12}
        />
        
        {/* Crimson Energy Aura Backplate */}
        <mesh position={[0, 0, -0.04]}>
          <planeGeometry args={[2.3, 2.6]} />
          <meshBasicMaterial 
            color="#e61a35" 
            transparent 
            opacity={0.35} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Heavy Armor Bezel Frame */}
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[2.38, 2.68, 0.06]} />
          <meshStandardMaterial 
            color="#14080a" 
            metalness={0.85} 
            roughness={0.3} 
            emissive="#e61a35"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Heavy Impact Ground Shockwave Rings */}
      <group ref={shockwaveRef} position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[1.35, 1.5, 32]} />
          <meshBasicMaterial color="#e61a35" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <ringGeometry args={[1.65, 1.78, 32]} />
          <meshBasicMaterial color="#ff4d6d" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Floating Kinetic Impact Sparks */}
      <group ref={sparksRef}>
        {Array.from({ length: 18 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos(i * 0.5) * (1.4 + (i % 3) * 0.25),
              (i % 6) * 0.4 - 1.0,
              Math.sin(i * 0.5) * (1.4 + (i % 3) * 0.25)
            ]}
          >
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshStandardMaterial color="#ff2a4b" emissive="#ff0033" emissiveIntensity={4} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// 3. XLR8 - Hypersonic Kineceleran
function XLR8Model({ mouseReaction }) {
  const group = useRef()
  const vortexRef = useRef()
  const streaksRef = useRef()

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 1.2) * 0.25 + (mouseReaction.x * 0.35)
      group.current.rotation.x = -mouseReaction.y * 0.15
      group.current.position.y = Math.sin(t * 2.5) * 0.08
    }
    if (vortexRef.current) {
      vortexRef.current.rotation.z += delta * 2.5
    }
    if (streaksRef.current) {
      streaksRef.current.rotation.y += delta * 1.2
    }
  })

  return (
    <group ref={group}>
      {/* 3D Holographic Character Plane */}
      <group position={[0, 0.0, 0]}>
        <Image
          url="/images/xlr8.jpg"
          scale={[1.65, 2.95]}
          transparent
          radius={0.12}
        />
        
        {/* Hypersonic Cyan Aura Backplate */}
        <mesh position={[0, 0, -0.04]}>
          <planeGeometry args={[1.75, 3.05]} />
          <meshBasicMaterial 
            color="#00d2ff" 
            transparent 
            opacity={0.35} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Aerodynamic Carbon Frame */}
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[1.82, 3.12, 0.06]} />
          <meshStandardMaterial 
            color="#061219" 
            metalness={0.9} 
            roughness={0.2} 
            emissive="#00d2ff"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Kinetic Vortex Rings */}
      <group ref={vortexRef} position={[0, 0.0, 0]}>
        <mesh rotation={[-Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.75, 0.015, 8, 32]} />
          <meshBasicMaterial color="#00d2ff" transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.9, 0.012, 8, 32]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Hyper-Speed Kinetic Sparks */}
      <group ref={streaksRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos(i * 0.6) * (1.3 + (i % 3) * 0.25),
              (i % 7) * 0.4 - 1.2,
              Math.sin(i * 0.6) * (1.3 + (i % 3) * 0.25)
            ]}
          >
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshStandardMaterial color="#00ffff" emissive="#00e5ff" emissiveIntensity={5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// 4. DIAMONDHEAD - Crystalline Petrosapien Warrior
function DiamondheadModel({ mouseReaction }) {
  const group = useRef()
  const crystalAura = useRef()
  const prismRef = useRef()

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.7) * 0.25 + (mouseReaction.x * 0.35)
      group.current.rotation.x = -mouseReaction.y * 0.15
      group.current.position.y = Math.sin(t * 1.8) * 0.06
    }
    if (crystalAura.current) {
      crystalAura.current.rotation.y -= delta * 0.6
    }
    if (prismRef.current) {
      prismRef.current.rotation.z += delta * 0.4
    }
  })

  return (
    <group ref={group}>
      {/* 3D Holographic Character Plane */}
      <group position={[0, 0.0, 0]}>
        <Image
          url="/images/diamondhead.jpg"
          scale={[2.3, 2.45]}
          transparent
          radius={0.12}
        />
        
        {/* Crystalline Teal Aura Backplate */}
        <mesh position={[0, 0, -0.04]}>
          <planeGeometry args={[2.4, 2.55]} />
          <meshBasicMaterial 
            color="#00ffcc" 
            transparent 
            opacity={0.35} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Faceted Crystal Gemstone Frame */}
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[2.48, 2.63, 0.06]} />
          <meshStandardMaterial 
            color="#051c18" 
            metalness={0.9} 
            roughness={0.15} 
            emissive="#00ffcc"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Rotating Crystal Prism Aura */}
      <group ref={prismRef} position={[0, 0.0, 0]}>
        <mesh rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.75, 0.015, 6, 32]} />
          <meshBasicMaterial color="#00ffcc" transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.9, 0.012, 6, 32]} />
          <meshBasicMaterial color="#1de9b6" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Floating Geometric Crystal Shards */}
      <group ref={crystalAura}>
        {Array.from({ length: 16 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos(i * 0.6) * (1.4 + (i % 3) * 0.25),
              (i % 6) * 0.4 - 1.0,
              Math.sin(i * 0.6) * (1.4 + (i % 3) * 0.25)
            ]}
          >
            <octahedronGeometry args={[0.07, 0]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffbb" emissiveIntensity={3.5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// 5. UPGRADE - Galvanic Mechamorph Nanotech
function UpgradeModel({ mouseReaction }) {
  const group = useRef()
  const circuitRingRef = useRef()
  const nanotechRef = useRef()

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.8) * 0.25 + (mouseReaction.x * 0.35)
      group.current.rotation.x = -mouseReaction.y * 0.15
      group.current.position.y = Math.sin(t * 1.8) * 0.07
    }
    if (circuitRingRef.current) {
      circuitRingRef.current.rotation.z += delta * 1.2
      circuitRingRef.current.rotation.x += delta * 0.6
    }
    if (nanotechRef.current) {
      nanotechRef.current.rotation.y -= delta * 0.8
    }
  })

  return (
    <group ref={group}>
      {/* 3D Holographic Character Plane */}
      <group position={[0, 0.0, 0]}>
        <Image
          url="/images/upgrade.jpg"
          scale={[1.7, 2.95]}
          transparent
          radius={0.12}
        />
        
        {/* Neon Galvanic Green Aura Backplate */}
        <mesh position={[0, 0, -0.04]}>
          <planeGeometry args={[1.8, 3.05]} />
          <meshBasicMaterial 
            color="#00ff66" 
            transparent 
            opacity={0.35} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Biomechanical Cyber-Metal Frame */}
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[1.88, 3.12, 0.06]} />
          <meshStandardMaterial 
            color="#04120a" 
            metalness={0.9} 
            roughness={0.2} 
            emissive="#00ff66"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Cybernetic Nanotech Orbital Circuit Rings */}
      <group ref={circuitRingRef} position={[0, 0.0, 0]}>
        <mesh>
          <torusGeometry args={[1.75, 0.015, 8, 32]} />
          <meshBasicMaterial color="#00ff66" transparent opacity={0.7} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.9, 0.012, 8, 32]} />
          <meshBasicMaterial color="#a3ff00" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Floating Holographic Nanotech Code Cubes */}
      <group ref={nanotechRef}>
        {Array.from({ length: 18 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos(i * 0.5) * (1.4 + (i % 3) * 0.25),
              (i % 6) * 0.4 - 1.0,
              Math.sin(i * 0.5) * (1.4 + (i % 3) * 0.25)
            ]}
          >
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshStandardMaterial color="#00ff66" emissive="#00ff88" emissiveIntensity={4} wireframe={false} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// Master Alien 3D Model Switcher
export default function AlienModel({ alienId, mouseReaction = { x: 0, y: 0 } }) {
  switch (alienId) {
    case 'heatblast':
      return <HeatblastModel mouseReaction={mouseReaction} />
    case 'fourarms':
      return <FourArmsModel mouseReaction={mouseReaction} />
    case 'xlr8':
      return <XLR8Model mouseReaction={mouseReaction} />
    case 'diamondhead':
      return <DiamondheadModel mouseReaction={mouseReaction} />
    case 'upgrade':
      return <UpgradeModel mouseReaction={mouseReaction} />
    default:
      return <HeatblastModel mouseReaction={mouseReaction} />
  }
}
