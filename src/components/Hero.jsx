import React, { useRef, useState, useEffect } from 'react'
import { soundFX } from '../utils/audio'

export default function Hero({ onEnterExperience, isActivated }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1.0)

  // Start video on mount
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.volume = 1.0
    video.muted = false

    video.play().then(() => {
      setIsPlaying(true)
      setIsMuted(false)
    }).catch(() => {
      // If browser security blocks audio autoplay, start muted
      video.muted = true
      video.play().then(() => {
        setIsPlaying(true)
        setIsMuted(true)
      }).catch((err) => console.log("Autoplay wait:", err))
    })
  }, [])

  // 1. PLAY / PAUSE BUTTON
  const handlePlayPause = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Play error:", err))
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  // 2. MUTE / UNMUTE BUTTON
  const handleToggleMute = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    soundFX.init()
    if (video.muted) {
      video.muted = false
      if (video.volume === 0) {
        video.volume = 1.0
        setVolume(1.0)
      }
      setIsMuted(false)
      soundFX.startAmbientMusic()
    } else {
      video.muted = true
      setIsMuted(true)
      soundFX.stopAmbientMusic()
    }
  }

  // 3. VOLUME UP BUTTON (+)
  const handleVolumeUp = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    soundFX.init()
    const newVol = Math.min(1.0, Math.round((video.volume + 0.15) * 100) / 100)
    video.volume = newVol
    video.muted = false
    setVolume(newVol)
    setIsMuted(false)
    soundFX.startAmbientMusic()
  }

  // 4. VOLUME DOWN BUTTON (-)
  const handleVolumeDown = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    const newVol = Math.max(0.0, Math.round((video.volume - 0.15) * 100) / 100)
    video.volume = newVol
    setVolume(newVol)
    if (newVol === 0) {
      video.muted = true
      setIsMuted(true)
    }
  }

  // 5. SLIDER DRAG
  const handleSliderChange = (e) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return

    const newVol = parseFloat(e.target.value)
    video.volume = newVol
    setVolume(newVol)
    if (newVol === 0) {
      video.muted = true
      setIsMuted(true)
    } else {
      video.muted = false
      setIsMuted(false)
      soundFX.init()
      soundFX.startAmbientMusic()
    }
  }

  return (
    <div className="hero-split-container">
      {/* LEFT SIDE: Cinematic Video Player */}
      <div className="hero-video-card">
        <div className="hero-video-header">
          <div className="video-status-dot" />
          <span className="video-header-title">OMNITRIX ARCHIVE TRANSMISSION</span>
          <span className="video-live-tag">LIVE FEED</span>
        </div>

        <div className="hero-video-viewport" onClick={handlePlayPause}>
          <video
            ref={videoRef}
            src="/video/vintagecartoon_pindown.io_1790073873.mp4"
            autoPlay
            loop
            playsInline
            className="hero-video-element"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={() => {
              if (videoRef.current) {
                setIsMuted(videoRef.current.muted)
                setVolume(videoRef.current.volume)
              }
            }}
          />
          <div className="video-scanline-fx" />
          <div className="video-corner-bracket top-left" />
          <div className="video-corner-bracket top-right" />
          <div className="video-corner-bracket bottom-left" />
          <div className="video-corner-bracket bottom-right" />

          {/* Active Audio Wave Indicator */}
          {!isMuted && isPlaying && (
            <div className="audio-equalizer-pill">
              <span className="eq-bar eq-1" />
              <span className="eq-bar eq-2" />
              <span className="eq-bar eq-3" />
              <span className="eq-bar eq-4" />
              <span className="eq-text">AUDIO ACTIVE ({Math.round(volume * 100)}%)</span>
            </div>
          )}

          {/* Big Play overlay icon when paused */}
          {!isPlaying && (
            <div className="video-play-center-btn">
              <span>▶</span>
            </div>
          )}
        </div>

        {/* Video Audio & Playback Controls Bar */}
        <div className="hero-video-controls">
          {/* Button 1: Play / Pause */}
          <button 
            type="button"
            className="video-ctrl-btn" 
            onClick={handlePlayPause}
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
          </button>

          {/* Button 2: Sound Mute / Unmute */}
          <button 
            type="button"
            className={`video-ctrl-btn ${!isMuted ? 'active-audio' : ''}`}
            onClick={handleToggleMute}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {!isMuted ? "🔊 SOUND ON" : "🔇 SOUND MUTED"}
          </button>

          {/* Button 3: Volume Controls (+ / - / Slider) */}
          <div className="video-volume-slider-wrap">
            <button 
              type="button"
              className="vol-step-btn" 
              onClick={handleVolumeDown} 
              title="Decrease Volume (-15%)"
            >
              -
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleSliderChange}
              onInput={handleSliderChange}
              className="video-volume-slider"
            />
            <button 
              type="button"
              className="vol-step-btn" 
              onClick={handleVolumeUp} 
              title="Increase Volume (+15%)"
            >
              +
            </button>
            <span className="vol-percent-badge">{isMuted ? '0%' : `${Math.round(volume * 100)}%`}</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Ben 10 HUD */}
      <div className="hero-hud-frame">
        <div className="hero-system-status">
          <span className="pulse-beacon" />
          GALVANIC BIO-ENERGY LINK: SYNCHRONIZED
        </div>

        <h1 className="hero-main-title">
          BEN 10
        </h1>
        <div className="hero-subtitle">
          THE ALIEN WORLD AWAITS
        </div>

        <p className="hero-lead-description">
          Access the Level 20 Galvanic transformation database. Unleash prime alien DNA sequences, engage kinetic combat matrices, and command elemental cosmic powers.
        </p>

        <div className="hero-action-cluster">
          <button 
            type="button"
            className="btn-enter-omnitrix"
            onClick={() => {
              soundFX.init()
              soundFX.playOmnitrixActivate()
              onEnterExperience()
            }}
            disabled={isActivated}
          >
            <span className="btn-glow-layer" />
            <span className="btn-text">
              {isActivated ? "CALIBRATING MATRIX..." : "ENTER THE OMNITRIX"}
            </span>
          </button>
        </div>

        <div className="hero-scroll-cue">
          <span className="scroll-arrow-anim">↓</span>
          <span>SCROLL TO EXPLORE ALIEN COLLECTION</span>
        </div>
      </div>
    </div>
  )
}
