import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import Omnitrix from '../components/Omnitrix'
import AlienModel from '../components/AlienModel'
import ParticleBackground from '../components/ParticleBackground'

// Camera Rig for Smooth Camera Movement
function CameraRig({ activeSection, mouseReaction }) {
  useFrame((state) => {
    let targetZ = 5.5
    let targetX = 0
    let targetY = 0

    if (activeSection === 'hero') {
      targetZ = 4.8
      targetX = state.pointer.x * 0.4
      targetY = state.pointer.y * 0.3
    } else if (activeSection === 'final') {
      targetZ = 5.0
      targetX = state.pointer.x * 0.2
      targetY = state.pointer.y * 0.2
    } else {
      // Alien viewing mode: offset camera slightly to frame 3D alien nicely on the right
      targetZ = 5.4
      targetX = 0.75 + (state.pointer.x * 0.25)
      targetY = state.pointer.y * 0.15
    }

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)
    state.camera.lookAt(targetX * 0.15, 0, 0)
  })

  return null
}

// Dynamic Alien Atmospheric Lighting Rig
function AlienLighting({ currentAlien, isHeroActive, isFinalActive }) {
  const lightColor = (isHeroActive || isFinalActive)
    ? "#00ff66" 
    : (currentAlien ? currentAlien.lightColor : "#00ff66")

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={1.8} 
        color="#ffffff" 
        castShadow 
      />
      <directionalLight 
        position={[-5, -4, -3]} 
        intensity={0.6} 
        color={lightColor} 
      />
      <pointLight 
        position={[0, 2, 3]} 
        color={lightColor} 
        intensity={2.5} 
        distance={10} 
      />
      <spotLight 
        position={[0, 6, 2]} 
        angle={0.6} 
        penumbra={0.8} 
        intensity={2} 
        color={lightColor} 
      />
    </>
  )
}

export default function AlienWorld({ 
  activeSection, 
  currentAlien, 
  isOmnitrixActivated, 
  mouseReaction,
  onOmnitrixClick
}) {
  const isHeroActive = activeSection === 'hero'
  const isFinalActive = activeSection === 'final'
  const isAlienActive = !isHeroActive && !isFinalActive

  return (
    <div className="three-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <CameraRig activeSection={activeSection} mouseReaction={mouseReaction} />
        
        {/* Dynamic Atmospheric Sci-Fi Lighting */}
        <AlienLighting 
          currentAlien={currentAlien} 
          isHeroActive={isHeroActive} 
          isFinalActive={isFinalActive}
        />

        {/* Ambient Floating Particle Cloud */}
        <ParticleBackground 
          count={200} 
          color={(isHeroActive || isFinalActive) ? "#00ff66" : currentAlien?.themeColor || "#00ff66"} 
        />

        {/* 3D Content Groups with Floating Physics */}
        {isAlienActive && (
          <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
            <group position={[1.35, 0.05, 0]}>
              <AlienModel 
                alienId={currentAlien?.id} 
                mouseReaction={mouseReaction} 
              />
            </group>
          </Float>
        )}

        {/* Subtle ground contact shadow */}
        <ContactShadows 
          position={[0, -2.4, 0]} 
          opacity={0.6} 
          scale={10} 
          blur={2} 
          far={4} 
        />
      </Canvas>
    </div>
  )
}
