import React, { useState, useEffect, useRef } from 'react';
import '../.components/celestial.css';
import '../.components/mystic.css';
import LKND from '../../assets/LKND.mp3';

const AUDIO_SRC = LKND;

export default function Neptune() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  // Web Audio API & animation refs
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Visualizer configuration
  const barCount = 120;
  const radius = 60;
  const maxBarHeight = 42;
  const progressTrackRadius = 115;

  // Physics state buffers
  const heightsRef = useRef(new Float32Array(barCount));
  const velocitiesRef = useRef(new Float32Array(barCount));

  // Initialize Web Audio API on gesture
  const initAudioContext = () => {
    if (audioCtxRef.current) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.8;

    if (audioRef.current) {
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
    }

    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
  };

  // Calculate audio seek time from pointer coordinates
  const seekFromPointer = (e) => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (!canvas || !audio || !audio.duration) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;

    const progress = angle / (Math.PI * 2);
    audio.currentTime = progress * audio.duration;
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isDraggingRef.current) {
        seekFromPointer(e);
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distFromCenter = Math.hypot(x, y);

    if (distFromCenter >= progressTrackRadius - 15) {
      isDraggingRef.current = true;
      initAudioContext();
      seekFromPointer(e);
    } else {
      togglePlay();
    }
  };

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = 320;
    const displayHeight = 320;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);

    const centerX = displayWidth / 2;
    const centerY = displayHeight / 2;

    // Helper to render ring arcs at a steep vertical angle (-60 deg)
    const drawRingSystem = (startAngle, endAngle) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-Math.PI / 2); // Steep vertical tilt (~ -60°)

      // Outer Dust Ring (Galle Ring)
      ctx.beginPath();
      ctx.ellipse(0, 0, radius + 22, (radius + 22) * 0.35, 0, startAngle, endAngle);
      ctx.strokeStyle = 'rgba(23, 87, 150, 0.35)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      ctx.stroke();

      // Primary Glowing Ring (Adams & Le Verrier Ring)
      ctx.beginPath();
      ctx.ellipse(0, 0, radius + 15, (radius + 15) * 0.35, 0, startAngle, endAngle);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'var(--mystic-border, #175796)';
      ctx.stroke();

      // Inner Accent Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, radius + 8, (radius + 8) * 0.35, 0, startAngle, endAngle);
      ctx.strokeStyle = 'rgba(23, 87, 150, 0.5)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      const bufferLength = analyserRef.current?.frequencyBinCount || 0;
      const freqData = new Uint8Array(bufferLength);

      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(freqData);
      }

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // --- LAYER 1: BACK HALF OF RING SYSTEM (BEHIND PLANET) ---
      drawRingSystem(Math.PI, Math.PI * 2);

      // --- LAYER 2: DARK PLANET CORE (OBSCURES BACK RING) ---
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 1, 0, Math.PI * 2);
      ctx.fillStyle = 'hsl(220, 50%, 7%)';
      ctx.fill();

      // --- LAYER 3: LOGARITHMIC FREQUENCY SMOOTHED EQ BARS ---
      for (let i = 0; i < barCount; i++) {
        const currentH = heightsRef.current[i];

        if (isPlaying && freqData.length > 0) {
          const normIndex = i / barCount;
          const logScale = Math.pow(normIndex, 1.6);
          const floatBin = logScale * (bufferLength * 0.7);

          const lowBin = Math.floor(floatBin);
          const highBin = Math.min(bufferLength - 1, lowBin + 1);
          const weight = floatBin - lowBin;

          const rawAmp = freqData[lowBin] * (1 - weight) + freqData[highBin] * weight;
          const trebleBoost = 1 + normIndex * 0.45;
          const targetH = Math.round(Math.max(3, (rawAmp / 255) * maxBarHeight * trebleBoost));

          if (targetH > currentH) {
            heightsRef.current[i] += (targetH - currentH) * 0.4;
          } else {
            heightsRef.current[i] += (targetH - currentH) * 0.15;
          }
          velocitiesRef.current[i] = 1.5;
        } else {
          velocitiesRef.current[i] *= 1.14;
          const newH = currentH - velocitiesRef.current[i];
          heightsRef.current[i] = Math.max(3, newH);
        }

        const barHeight = heightsRef.current[i];
        const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2;

        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'var(--mystic-border, #175796)';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.shadowBlur = barHeight > 15 ? 6 : 2;
        ctx.shadowColor = 'var(--mystic-border, #175796)';
        ctx.stroke();
      }

      // --- LAYER 4: INNER BASELINE RING ---
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.79)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      ctx.stroke();

      // --- LAYER 5: FRONT HALF OF RING SYSTEM (OVER PLANET & BARS) ---
      drawRingSystem(0, Math.PI);

      // --- LAYER 6: CIRCULAR PROGRESS BAR & DRAGGABLE KNOB ---
      const currentTime = audioRef.current?.currentTime || 0;
      const duration = audioRef.current?.duration || 1;
      const progressRatio = Math.min(1, Math.max(0, currentTime / duration));

      const startAngle = -Math.PI / 2;
      const currentProgressAngle = startAngle + progressRatio * Math.PI * 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, progressTrackRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 0;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, progressTrackRadius, startAngle, currentProgressAngle);
      ctx.strokeStyle = 'var(--mystic-border, #175796)';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'var(--mystic-border, #175796)';
      ctx.stroke();

      const knobX = centerX + Math.cos(currentProgressAngle) * progressTrackRadius;
      const knobY = centerY + Math.sin(currentProgressAngle) * progressTrackRadius;

      ctx.beginPath();
      ctx.arc(knobX, knobY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'var(--mystic-border, #175796)';
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    initAudioContext();

    if (audioCtxRef.current?.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.error('Playback failed:', err);
        }
      }
    }
  };

  return (
    <div className="celestial-canvas black-bg">
      <div className="mystic-card theme-neptune">
        <div className="card-letter">Neptune</div>
        <div className="corner top left"></div>
        <div className="corner top right"></div>
        <div className="corner bottom left"></div>
        <div className="corner bottom right"></div>

        <div className="card-corner-letter top-left">C</div>
        <div className="card-corner-letter bottom-right">C</div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            style={{ width: '320px', height: '320px', cursor: 'pointer', touchAction: 'none' }}
          />

          <audio
            ref={audioRef}
            src={AUDIO_SRC}
            crossOrigin="anonymous"
            onCanPlay={() => setIsAudioLoaded(true)}
            onEnded={() => setIsPlaying(false)}
          />

          <button
            className="mystic-button"
            onClick={togglePlay}
            disabled={!isAudioLoaded}
            style={{ marginTop: '1rem', cursor: isAudioLoaded ? 'pointer' : 'not-allowed' }}
          >
            <span className="left"></span>
            <span className="right"></span>
            {!isAudioLoaded ? 'Loading...' : isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </div>
    </div>
  );
}