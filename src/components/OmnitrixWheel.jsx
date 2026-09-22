import React from 'react'
import { soundFX } from '../utils/audio'

export default function OmnitrixWheel({ aliens, selectedAlienId, onSelectAlien }) {
  return (
    <div className="omnitrix-wheel-container">
      <div className="wheel-title-badge">SELECT ALIEN PROFILE</div>
      <div className="wheel-alien-grid">
        {aliens.map((alien, index) => {
          const isSelected = selectedAlienId === alien.id
          return (
            <button
              key={alien.id}
              className={`wheel-alien-btn ${isSelected ? 'selected' : ''}`}
              style={{
                borderColor: isSelected ? alien.themeColor : 'rgba(255,255,255,0.15)',
                boxShadow: isSelected ? `0 0 20px ${alien.glowColor}` : 'none'
              }}
              onClick={() => {
                soundFX.playDialRotate()
                soundFX.playAlienSelect(alien.audioTone)
                onSelectAlien(alien.id)
              }}
            >
              <div 
                className="wheel-dot-indicator" 
                style={{ backgroundColor: alien.themeColor }} 
              />
              <div className="wheel-alien-info">
                <span className="wheel-num">0{index + 1}</span>
                <span className="wheel-name">{alien.name}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
