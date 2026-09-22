import React, { useEffect, useState } from 'react'
import { soundFX } from '../utils/audio'

export default function LoadingScreen({ onLoaded }) {
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const steps = [
      { p: 20, delay: 150 },
      { p: 45, delay: 400 },
      { p: 70, delay: 700 },
      { p: 90, delay: 1000 },
      { p: 100, delay: 1300 }
    ]

    const timeouts = steps.map((step) => {
      return setTimeout(() => {
        setProgress(step.p)
        if (step.p === 100) {
          setIsReady(true)
        }
      }, step.delay)
    })

    return () => timeouts.forEach((t) => clearTimeout(t))
  }, [])

  const handleLaunch = () => {
    soundFX.init()
    soundFX.playOmnitrixActivate()
    soundFX.startAmbientMusic()
    setIsFading(true)
    setTimeout(() => {
      onLoaded()
    }, 500)
  }

  // Auto-launch if user doesn't click after 100%
  useEffect(() => {
    if (isReady) {
      const autoTimer = setTimeout(() => {
        handleLaunch()
      }, 1200)
      return () => clearTimeout(autoTimer)
    }
  }, [isReady])

  return (
    <div 
      className={`loading-overlay ${isFading ? 'fade-out' : ''}`}
      onClick={handleLaunch}
    >
      <div className="loading-content">
        {/* Animated Omnitrix Dial Ring */}
        <div className="loading-dial-spinner">
          <div className="loading-dial-core">
            <div className="loading-hourglass-shape" />
          </div>
        </div>

        {/* Text and Percentage */}
        <h2 className="loading-title">INITIALIZING OMNITRIX...</h2>
        <div className="loading-subtext">CALIBRATING DNA MATRIX V2.0</div>

        <div className="loading-bar-container">
          <div 
            className="loading-bar-fill" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        <div className="loading-percent-text">
          {progress}%
        </div>

        {isReady && (
          <button className="btn-launch-omni" onClick={handleLaunch}>
            <span className="launch-pulse" />
            ENTER THE OMNITRIX ARCHIVE
          </button>
        )}
      </div>
    </div>
  )
}
