// Futuristic Web Audio Synthesizer for Omnitrix & Alien SFX

class SoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgMusicTimer = null;
    this.isBGMPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playDialRotate() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  playOmnitrixActivate() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    
    // High energy ascending whistle
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.3);
    osc.frequency.exponentialRampToValueAtTime(1760, t + 0.7);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

    // Filter for sci-fi resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, t);
    filter.frequency.linearRampToValueAtTime(2400, t + 0.7);
    filter.Q.value = 4;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.8);
  }

  playTransformation() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Sub bass drop
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(250, t);
    sub.frequency.exponentialRampToValueAtTime(40, t + 0.6);
    subGain.gain.setValueAtTime(0.4, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    sub.connect(subGain);
    subGain.connect(this.ctx.destination);
    sub.start(t);
    sub.stop(t + 0.8);

    // Laser burst
    const laser = this.ctx.createOscillator();
    const laserGain = this.ctx.createGain();
    laser.type = 'sawtooth';
    laser.frequency.setValueAtTime(1500, t);
    laser.frequency.exponentialRampToValueAtTime(200, t + 0.4);
    laserGain.gain.setValueAtTime(0.3, t);
    laserGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    laser.connect(laserGain);
    laserGain.connect(this.ctx.destination);
    laser.start(t);
    laser.stop(t + 0.5);
  }

  playAlienSelect(freq = 440) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 0.8, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.15);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.25);
  }

  // Futuristic Ambient Background Soundtrack
  startAmbientMusic() {
    if (this.isMuted || this.isBGMPlaying) return;
    this.init();
    if (!this.ctx) return;

    this.isBGMPlaying = true;
    const notes = [130.81, 155.56, 174.61, 196.00, 233.08, 261.63]; // C minor sci-fi pentatonic
    let step = 0;

    this.bgMusicTimer = setInterval(() => {
      if (this.isMuted || !this.ctx) return;
      const t = this.ctx.currentTime;
      const freq = notes[step % notes.length];
      step++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, t);
      filter.frequency.exponentialRampToValueAtTime(180, t + 1.2);

      gain.gain.setValueAtTime(0.03, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.4);
    }, 700);
  }

  stopAmbientMusic() {
    this.isBGMPlaying = false;
    if (this.bgMusicTimer) {
      clearInterval(this.bgMusicTimer);
      this.bgMusicTimer = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbientMusic();
    }
    return this.isMuted;
  }
}

export const soundFX = new SoundFX();
