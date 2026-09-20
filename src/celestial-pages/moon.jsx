import React, { useState, useEffect, useRef } from 'react';
import '../.components/mystic.css';
import { decrypt } from '../.components/encrypt';

const env = import.meta.env;

// Embedded Keyframe & Input Styles for luna
const luna_STYLES = `
  @keyframes pulseOnceAnimation {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 rgba(46, 125, 50, 0);
    }
    50% {
      transform: scale(1.04);
      box-shadow: 0 0 20px var(--mystic-border, #af614c);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 rgba(46, 125, 50, 0);
    }
  }

  .pulse-once {
    animation: pulseOnceAnimation 0.5s ease-in-out 1;
  }

  .luna-password-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.5rem 0;
  }

  .luna-password-input {
    width: 12rem;
    text-align: center;
    font-family: 'Courier New', monospace;
    font-size: 1.25rem;
    font-weight: bold;
    letter-spacing: 6px;
    text-transform: uppercase;
    padding: 0.6rem 0.8rem;
    background: rgba(11, 15, 25, 0.85);
    border: 1px solid var(--mystic-border, #7d312e);
    color: var(--mystic-text, #e0e7ff);
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .luna-password-input:focus {
    border-color: var(--mystic-border, #af514c);
    box-shadow: 0 0 12px rgba(175, 81, 76, 0.4);
  }
`;

export default function luna() {
  const [password, setPassword] = useState('');
  const [decryptedResult, setDecryptedResult] = useState('');
  const combinedRef = useRef(null);

  // Trigger pulse animation when input matches "MAMMON"
  const isAsmosMatch = password.trim().toUpperCase() === 'ASMOSDEUS';

  // Handle input: allow only uppercase A-Z, max 6 letters
  const handlePasswordChange = (e) => {
    const uppercaseOnly = e.target.value
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 9);
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

      const cipherText = env.VITE_LUNA_QUOTE;

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
      <style>{luna_STYLES}</style>

      <div className="mystic-card theme-luna" style={{ width: 'fit-content', minWidth: '40rem', margin: '5rem' }}>
        <div className="card-letter">Luna</div>
        <div className="corner top left"></div>
        <div className="corner top right"></div>
        <div className="corner bottom left"></div>
        <div className="corner bottom right"></div>

        <div className="card-corner-letter top-left">⏾</div>
        <div className="card-corner-letter bottom-right">⏾</div>


        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          Ofcourse, each sin has their devil in kind, <br />
          but I didn't know their influence extends to the sky.
        </p>

        <code>
          https://&lt;master&gt;.github.io/&lt;slave&gt;/
        </code>

        <br />

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          My dear sherpard still sleep stills. <br />
          Is it not dangerous to let your dearling wander so freely?
        </p>

        <code>
          https://github.com/&lt;master&gt;/&lt;slave&gt;
        </code>

        {/* 6-Letter Password Input Box */}
        <div className="luna-password-container">
          <label className="celestial-label" style={{ marginBottom: '0.5rem', minWidth: '12rem'}}>
            The moonlight has a rosey tint. <br />
          </label>
          <input
            type="text"
            maxLength={9}
            value={password}
            onChange={handlePasswordChange}
            placeholder="______"
            className={`luna-password-input ${isAsmosMatch ? 'pulse-once' : ''}`}
          />
        </div>

        {/* Real-Time Decrypted Output Box */}
        <div className="combined-box-section theme-luna">
          <textarea
            ref={combinedRef}
            readOnly
            rows={1}
            value={decryptedResult}
            placeholder="Even the barbaric deserve to witness _ _ _ _."
            className="combined-textarea"
          />
        </div>
      </div>
    </div>
  );
}