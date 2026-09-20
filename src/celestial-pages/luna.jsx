import React, { useState, useEffect, useRef } from 'react';
import '../.components/mystic.css';

// ASCII brightness ramp from shadow to peak reflection
const PALETTE = [' ', '.', '·', ':', '-', '=', '+', '*', '#', '%', '@'];

// Story texts cycled through once max speed is triggered
const STORY_TEXTS = [
  "Overpopulation",
  "Hubris of Lust",
  "the humans call it \"moon\"",
  "try that instead",
  "Sigh, how distasteful."
];

const FLAT_BUNNY_ASCII = `  /\\_/\\
  (x x)
   v v
  /   \\
 (     )`;

export default function Luna() {
  const [phaseAngle, setPhaseAngle] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [rot, setRot] = useState({ x: 0.2, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMaxed, setIsMaxed] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const MAX_SPEED = 1000;

  // Phase animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseAngle((prev) => (prev + 0.03 * speed) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, [speed]);

  // Global window listeners so dragging never drops when moving quickly off the element
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e) => {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;

      setRot((prev) => ({
        x: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev.x + deltaY * 0.012)),
        y: prev.y + deltaX * 0.012,
      }));

      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => setIsDragging(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const [endingClicks, setEndingClicks] = useState(0);
  const endingClicksToRedirect = 6;
  // Handles speed acceleration until MAX_SPEED, then advances text story
  const handleButtonClick = () => {
    if (isMaxed) {
      if (dialogueIndex < STORY_TEXTS.length - 1) {
        setDialogueIndex((prev) => prev + 1);
      }
      else {
        setEndingClicks((prev) => {
          const newEndingClicks = prev + 1;
          if (newEndingClicks >= endingClicksToRedirect) {
            window.location.href = "/judgement-upon-celestials/moon";
          }
          return newEndingClicks;
        });
      }
      return;
    }

    const newSpeed = speed * 1.1;

    if (newSpeed >= MAX_SPEED) {
      setSpeed(0.1); // Spin super slowly and freeze speed controls
      setIsMaxed(true);
    } else {
      setSpeed(newSpeed);
    }
  };

  // Generates 3D ASCII Sphere Frame
  const generateAsciiMoon = () => {
    const width = 36;
    const height = 18;
    const radius = 8.0;
    const aspect = 0.52;

    const lightX = Math.cos(phaseAngle);
    const lightZ = Math.sin(phaseAngle);
    const lightY = 0.25;

    let frame = '';

    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        const x = (c - width / 2) * aspect;
        const y = r - height / 2;
        const distSq = x * x + y * y;

        if (distSq <= radius * radius) {
          const z = Math.sqrt(radius * radius - distSq);

          const nx = x / radius;
          const ny = y / radius;
          const nz = z / radius;

          const x1 = nx * Math.cos(rot.y) + nz * Math.sin(rot.y);
          const y1 = ny;
          const z1 = -nx * Math.sin(rot.y) + nz * Math.cos(rot.y);

          const rx = x1;
          const ry = y1 * Math.cos(rot.x) - z1 * Math.sin(rot.x);
          const rz = y1 * Math.sin(rot.x) + z1 * Math.cos(rot.x);

          const c1 = Math.sin(2.5 * rx) * Math.cos(2.5 * ry) * Math.sin(2.5 * rz);
          const c2 = Math.sin(5.0 * rx + 1.2) * Math.sin(5.0 * ry) * Math.cos(5.0 * rz);
          const crater = c1 * 0.5 + c2 * 0.35;

          const dot = nx * lightX + ny * lightY + nz * lightZ;

          if (dot <= 0) {
            frame += ' ';
          } else {
            const limbDarkening = Math.pow(nz, 0.45);
            let intensity = dot * (1.0 + crater * 0.45) * limbDarkening;
            intensity = Math.max(0, Math.min(1, intensity));
            const charIdx = Math.floor(intensity * (PALETTE.length - 1));
            frame += PALETTE[charIdx];
          }
        } else {
          frame += ' ';
        }
      }
      frame += '\n';
    }
    return frame;
  };

  // Dynamic button label calculation
  const getButtonContent = () => {
    if (isMaxed) {
      return STORY_TEXTS[dialogueIndex];
    }

    const bunnyCount = Math.round(speed) - 1;
    if (bunnyCount <= 0) {
      return "Is that a bunny?";
    }

    return Array.from({ length: bunnyCount }).map(() => '૮꒰ ˶• ༝ •˶꒱ა ♡ ').join('');
  };

  return (
    <div
      style={{
        background: 'hsl(272, 32%, 8%)',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <div className="mystic-card theme-luna" style={{ width: 'fit-content', minWidth: '30rem' }}>
        <div className="card-letter">Luna</div>
        <div className="corner top left"></div>
        <div className="corner top right"></div>
        <div className="corner bottom left"></div>
        <div className="corner bottom right"></div>

        <div className="card-corner-letter top-left">☾</div>
        <div className="card-corner-letter bottom-right">☾</div>

        <br />
        <h1 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>
          A figure of love, or is it a figure of something less?
        </h1>
        <h1 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>
          I too hold a name, too generic,
        </h1>
        <h1 style={{ fontSize: '1.2rem' }}>
          to do me just.
        </h1>

        {/* ASCII Flat Bunny Overlay (Appears on top of the moon once maxed) */}
        {isMaxed && (
          <pre
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              lineHeight: '1.0',
              fontSize: '0.8rem',
              color: 'var(--mystic-border, #e0e7ff)',
              textShadow: '0 0 6px var(--mystic-border, rgba(224, 231, 255, 0.4))',
              margin: '1rem auto -1rem auto',
              userSelect: 'none',
              textAlign: 'center',
            }}
          >
            {FLAT_BUNNY_ASCII}
          </pre>
        )}

        {/* Interactive 3D ASCII Canvas */}
        <pre
          onPointerDown={handlePointerDown}
          style={{
            fontFamily: '"Courier New", Courier, monospace',
            lineHeight: '1.0',
            letterSpacing: '0px',
            fontSize: '0.8rem',
            color: 'var(--mystic-border, #e0e7ff)',
            textShadow: '0 0 6px var(--mystic-border, rgba(224, 231, 255, 0.4))',
            margin: '1.5rem auto',
            userSelect: 'none',
            touchAction: 'none',
            cursor: isDragging ? 'grabbing' : 'grab',
            textAlign: 'center',
          }}
        >
          {generateAsciiMoon()}
        </pre>

        <button
          className="mystic-button"
          onClick={handleButtonClick}
          style={{ height: 'fit-content', padding: '0.5rem 1rem' }}
        >
          <span className="left"></span>
          <span className="right"></span>
          {getButtonContent()}
        </button>
      </div>
    </div>
  );
}