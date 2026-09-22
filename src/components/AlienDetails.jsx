import React from 'react'
import { soundFX } from '../utils/audio'

export default function AlienDetails({ alien, onTransform, isTransforming }) {
  if (!alien) return null

  return (
    <div className="alien-details-hud">
      {/* Species & Homeworld badge */}
      <div className="alien-badge-row">
        <span className="alien-badge">
          CLASS: {alien.species.toUpperCase()}
        </span>
        <span className="alien-badge-dim">
          ORIGIN: {alien.homeworld.toUpperCase()}
        </span>
      </div>

      {alien.image && (
        <div className="alien-portrait-container" style={{ borderColor: alien.themeColor }}>
          <img 
            src={alien.image} 
            alt={alien.name} 
            className="alien-portrait-img" 
          />
          <div className="portrait-scanline-overlay" />
          <div className="portrait-dna-tag" style={{ color: alien.themeColor }}>
            DNA // {alien.id.toUpperCase()}
          </div>
        </div>
      )}

      {/* Main Titles */}
      <h2 className="alien-title" style={{ textShadow: `0 0 30px ${alien.glowColor}` }}>
        {alien.name}
      </h2>
      <p className="alien-tagline" style={{ color: alien.themeColor }}>
        {alien.tagline}
      </p>

      {/* Core Power info */}
      <div className="alien-power-box" style={{ borderColor: alien.themeColor }}>
        <span className="alien-power-label">PRIMARY ATTRIBUTE</span>
        <div className="alien-power-val">{alien.power}</div>
      </div>

      {/* Description */}
      <p className="alien-description">
        {alien.description}
      </p>

      {/* Stat Progress Bars */}
      <div className="alien-stats-grid">
        <div className="stat-row">
          <div className="stat-meta">
            <span>STRENGTH</span>
            <span>{alien.strength}%</span>
          </div>
          <div className="stat-bar-track">
            <div 
              className="stat-bar-fill" 
              style={{ 
                width: `${alien.strength}%`, 
                backgroundColor: alien.themeColor,
                boxShadow: `0 0 12px ${alien.glowColor}`
              }} 
            />
          </div>
        </div>

        <div className="stat-row">
          <div className="stat-meta">
            <span>SPEED</span>
            <span>{alien.speed}%</span>
          </div>
          <div className="stat-bar-track">
            <div 
              className="stat-bar-fill" 
              style={{ 
                width: `${alien.speed}%`, 
                backgroundColor: alien.themeColor,
                boxShadow: `0 0 12px ${alien.glowColor}`
              }} 
            />
          </div>
        </div>

        <div className="stat-row">
          <div className="stat-meta">
            <span>ENERGY OUTPUT</span>
            <span>{alien.energy}%</span>
          </div>
          <div className="stat-bar-track">
            <div 
              className="stat-bar-fill" 
              style={{ 
                width: `${alien.energy}%`, 
                backgroundColor: alien.themeColor,
                boxShadow: `0 0 12px ${alien.glowColor}`
              }} 
            />
          </div>
        </div>

        <div className="stat-row">
          <div className="stat-meta">
            <span>DEFENSE MATRIX</span>
            <span>{alien.defense}%</span>
          </div>
          <div className="stat-bar-track">
            <div 
              className="stat-bar-fill" 
              style={{ 
                width: `${alien.defense}%`, 
                backgroundColor: alien.themeColor,
                boxShadow: `0 0 12px ${alien.glowColor}`
              }} 
            />
          </div>
        </div>
      </div>

      {/* Ability List */}
      <div className="alien-abilities-section">
        <h4 className="abilities-title">TACTICAL CAPABILITIES</h4>
        <div className="abilities-pills">
          {alien.abilities.map((ability, idx) => (
            <span key={idx} className="ability-pill" style={{ borderColor: `${alien.themeColor}55` }}>
              <span className="ability-dot" style={{ backgroundColor: alien.themeColor }} />
              {ability}
            </span>
          ))}
        </div>
      </div>

      {/* Transform Action CTA */}
      <div className="alien-action-row">
        <button
          className="btn-transform"
          onClick={() => {
            soundFX.playTransformation()
            onTransform && onTransform(alien)
          }}
          disabled={isTransforming}
          style={{
            borderColor: alien.themeColor,
            boxShadow: `0 0 25px ${alien.glowColor}`
          }}
        >
          <span className="btn-icon">⚡</span>
          {isTransforming ? "TRANSFORMING DNA..." : `TRANSFORM INTO ${alien.name.toUpperCase()}`}
        </button>
      </div>
    </div>
  )
}
