import React, { useState, useEffect, useRef } from 'react'
import { ALIENS } from './data/aliens'
import AlienWorld from './scenes/AlienWorld'
import Hero from './components/Hero'
import AlienDetails from './components/AlienDetails'
import Navigation from './components/Navigation'
import LoadingScreen from './components/LoadingScreen'
import OmnitrixWheel from './components/OmnitrixWheel'
import FinalSection from './components/FinalSection'
import { soundFX } from './utils/audio'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const [isOmnitrixActivated, setIsOmnitrixActivated] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [isSoundMuted, setIsSoundMuted] = useState(false)
  const [mouseReaction, setMouseReaction] = useState({ x: 0, y: 0 })

  const heroRef = useRef(null)
  const alienRefs = useRef({})
  const finalRef = useRef(null)

  // Track mouse for subtle 3D parallax
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1
    const y = -(e.clientY / window.innerHeight) * 2 + 1
    setMouseReaction({ x, y })
  }

  // Scroll spy to update active 3D character and lighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120

      if (isAtBottom || (finalRef.current && scrollPos >= finalRef.current.offsetTop - 80)) {
        setActiveSection('final')
        return
      }

      for (let i = ALIENS.length - 1; i >= 0; i--) {
        const alien = ALIENS[i]
        const el = alienRefs.current[alien.id]
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(alien.id)
          return
        }
      }

      setActiveSection('hero')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation jumping
  const scrollToAlien = (alienId) => {
    const el = alienRefs.current[alienId]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToHero = () => {
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Enter Omnitrix Action
  const handleEnterExperience = () => {
    setIsOmnitrixActivated(true)
    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 800)

    setTimeout(() => {
      setIsOmnitrixActivated(false)
      scrollToAlien('heatblast')
    }, 900)
  }

  // Transformation Action
  const handleTransform = (alien) => {
    setIsTransforming(true)
    setShowFlash(true)

    setTimeout(() => {
      setShowFlash(false)
    }, 850)

    setTimeout(() => {
      setIsTransforming(false)
    }, 1200)
  }

  const handleToggleSound = () => {
    const muted = soundFX.toggleMute()
    setIsSoundMuted(muted)
  }

  const currentAlien = ALIENS.find((a) => a.id === activeSection) || ALIENS[0]

  return (
    <div className="app-container" onMouseMove={handleMouseMove}>
      {/* Cinematic Loading Screen */}
      {isLoading && (
        <LoadingScreen onLoaded={() => setIsLoading(false)} />
      )}

      {/* Screen Transformation Flash */}
      {showFlash && <div className="transformation-flash-overlay" />}

      {/* Persistent 3D Three.js World */}
      <AlienWorld
        activeSection={activeSection}
        currentAlien={currentAlien}
        isOmnitrixActivated={isOmnitrixActivated || isTransforming}
        mouseReaction={mouseReaction}
        onOmnitrixClick={() => {
          soundFX.playDialRotate()
          setIsOmnitrixActivated(!isOmnitrixActivated)
        }}
      />

      {/* Top Header Navigation */}
      <Navigation
        aliens={ALIENS}
        activeSection={activeSection}
        onSelectAlien={scrollToAlien}
        onSelectHero={scrollToHero}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Scrollable Content */}
      <main className="main-scroll-content">
        {/* Section 1: Hero Omnitrix Core */}
        <section ref={heroRef} id="hero-section" className="hero-scroll-section">
          <Hero 
            onEnterExperience={handleEnterExperience} 
            isActivated={isOmnitrixActivated} 
          />
        </section>

        {/* Section 2..6: Five Alien Showcase Sections */}
        {ALIENS.map((alien) => (
          <section
            key={alien.id}
            id={alien.id}
            ref={(el) => (alienRefs.current[alien.id] = el)}
            className="alien-scroll-section"
          >
            <AlienDetails
              alien={alien}
              onTransform={handleTransform}
              isTransforming={isTransforming}
            />
          </section>
        ))}

        {/* Section 7: Final Conclusion */}
        <div ref={finalRef}>
          <FinalSection onRestart={scrollToHero} />
        </div>
      </main>

      {/* Bottom Floating Alien Wheel Selector */}
      {activeSection !== 'hero' && activeSection !== 'final' && (
        <OmnitrixWheel
          aliens={ALIENS}
          selectedAlienId={activeSection}
          onSelectAlien={scrollToAlien}
        />
      )}
    </div>
  )
}
