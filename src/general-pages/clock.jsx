import React, { useState, useEffect, useRef } from 'react';
import '../index.css';
import '../.components/celestial.css';
import '../.components/mystic.css';

// Target Date: Thursday, October 1st at 12:00 AM
const getTargetDate = () => {
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 9, 1, 0, 0, 0); // Month 9 = October (0-indexed)

  // If Oct 1st has already passed this year, set to next year
  if (now > target) {
    target = new Date(year + 1, 9, 1, 0, 0, 0);
  }
  return target;
};

// Embedded styles matching celestial theme
const CLOCK_STYLES = `
  .clock-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    width: 100%;
    margin: 2rem 0;
  }

  @media (max-width: 640px) {
    .clock-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .clock-unit-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(11, 15, 25, 0.85);
    border: 1px solid var(--mystic-border, #00f3ff);
    border-radius: 6px;
    padding: 1.25rem 0.5rem;
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.15);
    transition: all 0.3s ease;
  }

  .clock-unit-box:hover {
    box-shadow: 0 0 25px rgba(0, 243, 255, 0.35);
    border-color: #ffffff;
  }

  .clock-number {
    font-family: 'Courier New', monospace;
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--mystic-text, #ffffff);
    text-shadow: 0 0 12px var(--mystic-border, #00f3ff);
    letter-spacing: 2px;
  }

  .clock-label {
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--mystic-border, #00f3ff);
    margin-top: 0.5rem;
    opacity: 0.85;
  }

  .clock-status-text {
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    letter-spacing: 2px;
    color: var(--mystic-border, #00f3ff);
    text-align: center;
    text-transform: uppercase;
    animation: textSulfurGlow 2.5s infinite ease-in-out;
  }
`;

export default function Clock() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
  });

  const combinedRef = useRef(null);

  useEffect(() => {
    const targetDate = getTargetDate();

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isFinished: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format single digit numbers with leading zeroes
  const formatNum = (num) => String(num).padStart(2, '0');

  return (
    <div className="celestial-canvas">
      <style>{CLOCK_STYLES}</style>

      <div className="celestial-container">
        <div className="mystic-card theme-root">
          {/* Card Corner Accents */}
          <div className="corner top left"></div>
          <div className="corner top right"></div>
          <div className="corner bottom left"></div>
          <div className="corner bottom right"></div>

          {/* Main Chromatic Title */}
          <div className="title-wrapper">
            <h1 className="rgb-split-title" style={{ textAlign: 'center', padding: '1rem' }}>
              ARG LAUNCH
            </h1>
          </div>

          {/* Countdown Grid Units */}
          <div className="clock-grid">
            <div className="clock-unit-box">
              <span className="clock-number">{formatNum(timeLeft.days)}</span>
              <span className="clock-label">Days</span>
            </div>

            <div className="clock-unit-box">
              <span className="clock-number">{formatNum(timeLeft.hours)}</span>
              <span className="clock-label">Hours</span>
            </div>

            <div className="clock-unit-box">
              <span className="clock-number">{formatNum(timeLeft.minutes)}</span>
              <span className="clock-label">Minutes</span>
            </div>

            <div className="clock-unit-box">
              <span className="clock-number">{formatNum(timeLeft.seconds)}</span>
              <span className="clock-label">Seconds</span>
            </div>
          </div>

          {/* Combined Output Status Section */}
          <div className="combined-box-section">
            <label className="celestial-label combined-label">
              {timeLeft.isFinished ? "UNICODE HAS LAUNCHED!" : "COUNT DOWN TO UNICODE LAUNCH"}
            </label>
            <textarea
              ref={combinedRef}
              readOnly
              rows={1}
              value={
                timeLeft.isFinished
                  ? "THE ARG HAS BEGUN. FIRST 10 PARTICIPANTS GET BRAGGING RIGHTS"
                  : `OCTOBER 1ST, 00:00 AM — Unicode Offical Launch`
              }
              className="combined-textarea clock-status-text"
            />
          </div>
        </div>
      </div>
    </div>
  );
}