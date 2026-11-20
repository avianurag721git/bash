/**
 * Web Audio API synthesizer for delightful, cute birthday sound effects.
 * Requires no external audio files, works completely offline and instantly.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEffectsEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function isSoundEffectsEnabled(): boolean {
  return soundEnabled;
}

/**
 * Stage 1: Card opening whoosh + sparkling harp chime
 */
export function playCardOpenSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Gentle airy whoosh
  const bufferSize = ctx.sampleRate * 0.4;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(1400, now + 0.35);
  filter.Q.value = 2;

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.01, now);
  noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.15);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  whiteNoise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  whiteNoise.start(now);
  whiteNoise.stop(now + 0.4);

  // Sparkling chime arpeggio: C5, E5, G5, C6
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.08);

    gain.gain.setValueAtTime(0.001, now + 0.1 + idx * 0.08);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.12 + idx * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5 + idx * 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + 0.1 + idx * 0.08);
    osc.stop(now + 0.6 + idx * 0.08);
  });
}

/**
 * Stage 2: Gentle blowing air sound when blowing candles
 */
export function playBlowSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const duration = 0.9;
  const bufferSize = ctx.sampleRate * duration;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.setValueAtTime(350, now);
  lowpass.frequency.linearRampToValueAtTime(800, now + 0.3);
  lowpass.frequency.exponentialRampToValueAtTime(150, now + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(lowpass);
  lowpass.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + duration);
}

/**
 * Candle extinguished sparkle / twinkle chime
 */
export function playSparkleSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Gentle bell glissando
  const pitches = [880, 1108.73, 1318.51, 1760, 2093];
  pitches.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + i * 0.07);

    gain.gain.setValueAtTime(0.001, now + i * 0.07);
    gain.gain.linearRampToValueAtTime(0.08, now + i * 0.07 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.07);
    osc.stop(now + i * 0.07 + 0.5);
  });
}

/**
 * Stage 3: Knife entering whoosh
 */
export function playKnifeEnterSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(740, now + 0.28);
  osc.frequency.exponentialRampToValueAtTime(440, now + 0.5);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.52);
}

/**
 * Stage 3: Cutting through soft cake / cream slice sound
 */
export function playCakeCutSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Soft cream slice swoosh
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(260, now);
  osc.frequency.linearRampToValueAtTime(140, now + 0.35);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.09, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.42);

  // Little sweet pop when slice frees
  const popOsc = ctx.createOscillator();
  const popGain = ctx.createGain();
  popOsc.type = "sine";
  popOsc.frequency.setValueAtTime(440, now + 0.28);
  popOsc.frequency.exponentialRampToValueAtTime(880, now + 0.42);

  popGain.gain.setValueAtTime(0.001, now + 0.28);
  popGain.gain.linearRampToValueAtTime(0.07, now + 0.32);
  popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

  popOsc.connect(popGain);
  popGain.connect(ctx.destination);

  popOsc.start(now + 0.28);
  popOsc.stop(now + 0.56);
}

/**
 * Celebration fanfare & confetti sound
 */
export function playCelebrationSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Happy celebration chords (F major to Bb to C major)
  const chordNotes = [
    { freq: 523.25, time: 0 },
    { freq: 659.25, time: 0.08 },
    { freq: 783.99, time: 0.16 },
    { freq: 1046.5, time: 0.24 },
    { freq: 1174.66, time: 0.36 },
    { freq: 1318.51, time: 0.48 },
  ];

  chordNotes.forEach(({ freq, time }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0.001, now + time);
    gain.gain.linearRampToValueAtTime(0.08, now + time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + 0.65);
  });
}

/**
 * Cute pop sound (for buttons, balloons, hearts)
 */
export function playPopSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(380, now);
  osc.frequency.exponentialRampToValueAtTime(820, now + 0.1);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

/**
 * Sky Shot: Rising rocket launch whistle / whoosh
 */
export function playSkyShotLaunchSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    // Whistling rocket tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(320 + Math.random() * 80, now);
    osc.frequency.exponentialRampToValueAtTime(1100 + Math.random() * 300, now + 0.55);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.62);

    // Friction whoosh noise
    const bufferSize = Math.floor(ctx.sampleRate * 0.5);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(2200, now + 0.5);
    filter.Q.value = 3;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(0.04, now + 0.12);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.55);
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Sky Shot: Explosive burst / boom + sparkle decay
 */
export function playSkyShotBurstSound(deep = true) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  try {
    // 1. Deep low-frequency percussion boom
    const boomOsc = ctx.createOscillator();
    const boomGain = ctx.createGain();
    boomOsc.type = "sine";
    boomOsc.frequency.setValueAtTime(deep ? 130 : 160, now);
    boomOsc.frequency.exponentialRampToValueAtTime(36, now + 0.38);

    boomGain.gain.setValueAtTime(0.18, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    boomOsc.connect(boomGain);
    boomGain.connect(ctx.destination);
    boomOsc.start(now);
    boomOsc.stop(now + 0.45);

    // 2. High-energy burst noise
    const noiseDuration = 0.7;
    const bufferSize = Math.floor(ctx.sampleRate * noiseDuration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.18));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.65);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.68);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.7);

    // 3. Shimmering high sparkles
    playCrackleSound(now + 0.15);
  } catch {
    // Ignore audio errors gracefully
  }
}

/**
 * Crackling firework stars (Dragon's eggs crackles)
 */
export function playCrackleSound(delayStartTime?: number) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const start = delayStartTime ?? ctx.currentTime;

  try {
    const popCount = 5 + Math.floor(Math.random() * 5);
    for (let i = 0; i < popCount; i++) {
      const popTime = start + 0.05 + Math.random() * 0.35;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1400 + Math.random() * 1200, popTime);

      gain.gain.setValueAtTime(0.001, popTime);
      gain.gain.linearRampToValueAtTime(0.035, popTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, popTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(popTime);
      osc.stop(popTime + 0.045);
    }
  } catch {
    // Ignore
  }
}
