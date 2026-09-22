import React from 'react'
import { soundFX } from '../utils/audio'

export default function Navigation({ aliens, activeSection, onSelectAlien, onSelectHero, isSoundMuted, onToggleSound }) {
  return (
    <header className="omni-nav-header">
      {/* Brand / Logo */}
      <div 
        className="nav-brand" 
        onClick={() => {
          soundFX.playClick()
          onSelectHero()
        }}
      >
        <div className="nav-omnitrix-icon" />
        <span className="nav-brand-text">OMNITRIX // V2.0</span>
      </div>

      {/* Navigation Pills */}
      <nav className="nav-alien-links">
        <button
          className={`nav-link-btn ${activeSection === 'hero' ? 'active' : ''}`}
          onClick={() => {
            soundFX.playDialRotate()
            onSelectHero()
          }}
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
              onClick={() => {
                soundFX.playAlienSelect(alien.audioTone)
                onSelectAlien(alien.id)
              }}
            >
              {alien.name.toUpperCase()}
            </button>
          )
        })}
      </nav>

      {/* Sound Toggle Control */}
      <div className="nav-controls">
        <button
          className="sound-toggle-btn"
          onClick={onToggleSound}
          title={isSoundMuted ? "Unmute Audio FX" : "Mute Audio FX"}
        >
          {isSoundMuted ? "🔇 SFX OFF" : "🔊 SFX ON"}
        </button>
      </div>
    </header>
  )
}
