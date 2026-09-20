import React, { useState, useEffect, useRef } from 'react';
import '../.components/mystic.css';
import { decrypt } from '../.components/encrypt';

const env = import.meta.env;

// Embedded Keyframe & Input Styles for Terra
const TERRA_STYLES = `
  @keyframes pulseOnceAnimation {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 rgba(46, 125, 50, 0);
    }
    50% {
      transform: scale(1.04);
      box-shadow: 0 0 20px var(--mystic-border, #4caf50);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 rgba(46, 125, 50, 0);
    }
  }

  .pulse-once {
    animation: pulseOnceAnimation 0.5s ease-in-out 1;
  }

  .terra-password-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.5rem 0;
  }

  .terra-password-input {
    width: 12rem;
    text-align: center;
    font-family: 'Courier New', monospace;
    font-size: 1.25rem;
    font-weight: bold;
    letter-spacing: 6px;
    text-transform: uppercase;
    padding: 0.6rem 0.8rem;
    background: rgba(11, 15, 25, 0.85);
    border: 1px solid var(--mystic-border, #2e7d32);
    color: var(--mystic-text, #e0e7ff);
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .terra-password-input:focus {
    border-color: var(--mystic-border, #4caf50);
    box-shadow: 0 0 12px rgba(76, 175, 80, 0.4);
  }
`;

export default function Terra() {
  const [password, setPassword] = useState('');
  const [decryptedResult, setDecryptedResult] = useState('');
  const combinedRef = useRef(null);

  // Trigger pulse animation when input matches "MAMMON"
  const isMammonMatch = password.trim().toUpperCase() === 'MAMMON';

  // Handle input: allow only uppercase A-Z, max 6 letters
  const handlePasswordChange = (e) => {
    const uppercaseOnly = e.target.value
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 6);
    setPassword(uppercaseOnly);
  };

  // Async decryption logic
  useEffect(() => {
    let isMounted = true;

    const runDecrypt = async () => {
      if (!password) {
        if (isMounted) setDecryptedResult('');
        return;
      }

      const cipherText = env.VITE_TERRA_QUOTE;

      try {
        if (cipherText) {
          const result = await decrypt(cipherText, password);
          if (isMounted) setDecryptedResult(result);
        } else {
          const result = await decrypt('SampleFallbackEncryptedText', password);
          if (isMounted) setDecryptedResult(result);
        }
      } catch (err) {
        if (isMounted) setDecryptedResult('DecryptError');
      }
    };

    runDecrypt();

    return () => {
      isMounted = false;
    };
  }, [password]);

  // Auto-resize output textarea
  useEffect(() => {
    if (combinedRef.current) {
      combinedRef.current.style.height = 'auto';
      combinedRef.current.style.height = `${combinedRef.current.scrollHeight}px`;
    }
  }, [decryptedResult]);

  return (
    <div
      style={{
        background: 'hsl(140, 18%, 3%)',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <style>{TERRA_STYLES}</style>

      <div className="mystic-card theme-terra" style={{ width: 'fit-content', minWidth: '40rem', margin: '5rem' }}>
        <div className="card-letter">Terra</div>
        <div className="corner top left"></div>
        <div className="corner top right"></div>
        <div className="corner bottom left"></div>
        <div className="corner bottom right"></div>

        <div className="card-corner-letter top-left">N</div>
        <div className="card-corner-letter bottom-right">N</div>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          So lush with history. <br />
          Picked apart by crows. <br />
        </p>

        <table>
          <thead>
            <tr>
              <th>Character</th>
              <th>Morse Code</th>
              <th>Character</th>
              <th>Morse Code</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>A</strong></td><td><code>.-</code></td><td><strong>N</strong></td><td><code>-.</code></td></tr>
            <tr><td><strong>B</strong></td><td><code>-...</code></td><td><strong>O</strong></td><td><code>---</code></td></tr>
            <tr><td><strong>C</strong></td><td><code>-.-.</code></td><td><strong>P</strong></td><td><code>.--.</code></td></tr>
            <tr><td><strong>D</strong></td><td><code>-..</code></td><td><strong>Q</strong></td><td><code>--.-</code></td></tr>
            <tr><td><strong>E</strong></td><td><code>.</code></td><td><strong>R</strong></td><td><code>.-.</code></td></tr>
            <tr><td><strong>F</strong></td><td><code>..-.</code></td><td><strong>S</strong></td><td><code>...</code></td></tr>
            <tr><td><strong>G</strong></td><td><code>--.</code></td><td><strong>T</strong></td><td><code>-</code></td></tr>
            <tr><td><strong>H</strong></td><td><code>....</code></td><td><strong>U</strong></td><td><code>..-</code></td></tr>
            <tr><td><strong>I</strong></td><td><code>..</code></td><td><strong>V</strong></td><td><code>...-</code></td></tr>
            <tr><td><strong>J</strong></td><td><code>.---</code></td><td><strong>W</strong></td><td><code>.--</code></td></tr>
            <tr><td><strong>K</strong></td><td><code>-.-</code></td><td><strong>X</strong></td><td><code>-..-</code></td></tr>
            <tr><td><strong>L</strong></td><td><code>.-..</code></td><td><strong>Y</strong></td><td><code>-.--</code></td></tr>
            <tr><td><strong>M</strong></td><td><code>--</code></td><td><strong>Z</strong></td><td><code>--..</code></td></tr>
          </tbody>
        </table>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          0x4D x 3 <br />
          0x41 x 1 <br />
          0x4E x 1 <br />
          0x4O x 1 <br />
        </p>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          He's too strong for her to move. Does she plan to move away with her amour then?
        </p>

        {/* 6-Letter Password Input Box */}
        <div className="terra-password-container">
          <label className="celestial-label" style={{ marginBottom: '0.5rem', minWidth: '10rem'}}>
            The litte crow's beloved.
          </label>
          <input
            type="text"
            maxLength={6}
            value={password}
            onChange={handlePasswordChange}
            placeholder="______"
            className={`terra-password-input ${isMammonMatch ? 'pulse-once' : ''}`}
          />
        </div>

        {/* Real-Time Decrypted Output Box */}
        <div className="combined-box-section theme-terra">
          <textarea
            ref={combinedRef}
            readOnly
            rows={1}
            value={decryptedResult}
            placeholder="Could she remember?"
            className="combined-textarea"
          />
        </div>
      </div>
    </div>
  );
}