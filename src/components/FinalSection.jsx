import React from 'react'
import { soundFX } from '../utils/audio'

export default function FinalSection({ onRestart }) {
  return (
    <section className="final-section-wrap">
      <div className="final-hud-card">
        <div className="final-omnitrix-seal">
          <div className="seal-glow-ring" />
          <div className="seal-hourglass-icon" />
        </div>

        <h2 className="final-main-title">
          THE OMNITRIX HAS CHOSEN
        </h2>

        <p className="final-subtitle">
          YOUR ALIEN JOURNEY BEGINS
        </p>

        <p className="final-description">
          All five DNA matrices have been verified and calibrated. Galvanic defensive systems remain at 100% operational readiness across all sectors.
        </p>

        <div className="final-button-row">
          <button 
            className="btn-restart-experience"
            onClick={() => {
              soundFX.playOmnitrixActivate()
              onRestart()
            }}
          >
            <span className="btn-icon">↺</span>
            RESTART EXPERIENCE
          </button>
        </div>
      </div>
    </section>
  )
}
