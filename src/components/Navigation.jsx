import React, { useState, useEffect } from 'react'
import { soundFX } from '../utils/audio'

export default function Navigation({ aliens, activeSection, onSelectAlien, onSelectHero, isSoundMuted, onToggleSound }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('nav-menu-open', isMenuOpen)
    return () => document.body.classList.remove('nav-menu-open')
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const goHome = () => {
    soundFX.playClick()
    onSelectHero()
    closeMenu()
  }

  const goOmnitrix = () => {
    soundFX.playDialRotate()
    onSelectHero()
    closeMenu()
  }

  const goAlien = (alien) => {
    soundFX.playAlienSelect(alien.audioTone)
    onSelectAlien(alien.id)
    closeMenu()
  }

  return (
    <header className="omni-nav-header">
      <div className="nav-brand" onClick={goHome}>
        <div className="nav-omnitrix-icon" />
        <span className="nav-brand-text">OMNITRIX // V2.0</span>
        <span className="nav-brand-text-short">OMNITRIX</span>
      </div>

      <nav className="nav-alien-links">
        <button
          className={`nav-link-btn ${activeSection === 'hero' ? 'active' : ''}`}
          onClick={goOmnitrix}
        >
          OMNITRIX
        </button>

        {aliens.map((alien) => {
          const isActive = activeSection === alien.id
          return (
            <button
              key={alien.id}
              className={`nav-link-btn ${isActive ? 'active' : ''}`}
              style={{
                borderColor: isActive ? alien.themeColor : 'transparent',
                color: isActive ? alien.themeColor : 'var(--color-text-muted)',
                boxShadow: isActive ? `0 0 15px ${alien.glowColor}` : 'none'
              }}
              onClick={() => goAlien(alien)}
            >
              {alien.name.toUpperCase()}
            </button>
          )
        })}
      </nav>

      <div className="nav-controls">
        <button
          className="sound-toggle-btn"
          onClick={onToggleSound}
          title={isSoundMuted ? "Unmute Audio FX" : "Mute Audio FX"}
        >
          <span className="sound-toggle-full">{isSoundMuted ? "🔇 SFX OFF" : "🔊 SFX ON"}</span>
          <span className="sound-toggle-short">{isSoundMuted ? "🔇" : "🔊"}</span>
        </button>

        <button
          type="button"
          className={`nav-hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {isMenuOpen && (
        <div className="nav-mobile-backdrop" onClick={closeMenu} />
      )}

      <nav className={`nav-mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
        <button
          className={`nav-link-btn ${activeSection === 'hero' ? 'active' : ''}`}
          onClick={goOmnitrix}
        >
          OMNITRIX
        </button>

        {aliens.map((alien) => {
          const isActive = activeSection === alien.id
          return (
            <button
              key={alien.id}
              className={`nav-link-btn ${isActive ? 'active' : ''}`}
              style={{
                borderColor: isActive ? alien.themeColor : 'transparent',
                color: isActive ? alien.themeColor : 'var(--color-text-muted)',
                boxShadow: isActive ? `0 0 15px ${alien.glowColor}` : 'none'
              }}
              onClick={() => goAlien(alien)}
            >
              {alien.name.toUpperCase()}
            </button>
          )
        })}
      </nav>
    </header>
  )
}
