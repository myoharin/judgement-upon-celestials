import React, { useState, useEffect, useRef } from 'react';
import '../.components/mystic.css';
import { decrypt } from '../.components/encrypt';

const env = import.meta.env;

// Embedded Keyframe & Input Styles for Mars
const MARS_STYLES = `
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

  .mars-password-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.5rem 0;
  }

  .mars-password-input {
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

  .mars-password-input:focus {
    border-color: var(--mystic-border, #af514c);
    box-shadow: 0 0 12px rgba(175, 81, 76, 0.4);
  }
`;

export default function Mars() {
  const [password, setPassword] = useState('');
  const [decryptedResult, setDecryptedResult] = useState('');
  const combinedRef = useRef(null);

  // Trigger pulse animation when input matches "MAMMON"
  const isLuciferMatch = password.trim().toUpperCase() === 'LUCIFER';

  // Handle input: allow only uppercase A-Z, max 6 letters
  const handlePasswordChange = (e) => {
    const uppercaseOnly = e.target.value
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 7);
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

      const cipherText = env.VITE_MARS_QUOTE;

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
      <style>{MARS_STYLES}</style>

      <div className="mystic-card theme-mars" style={{ width: 'fit-content', minWidth: '40rem', margin: '5rem' }}>
        <div className="card-letter">Mars</div>
        <div className="corner top left"></div>
        <div className="corner top right"></div>
        <div className="corner bottom left"></div>
        <div className="corner bottom right"></div>

        <div className="card-corner-letter top-left">O</div>
        <div className="card-corner-letter bottom-right">O</div>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          Once a contender for prosperity, <br />
          He would be good friend's whom entrapped by Venus. <br />
        </p>

        <table>
          <thead>
            <tr>
              <th>Character</th>
              <th>Hex Code</th>
              <th>Character</th>
              <th>Hex Code</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>A</strong></td><td><code>0x41</code></td><td><strong>N</strong></td><td><code>0x4E</code></td></tr>
            <tr><td><strong>B</strong></td><td><code>0x42</code></td><td><strong>O</strong></td><td><code>0x4F</code></td></tr>
            <tr><td><strong>C</strong></td><td><code>0x43</code></td><td><strong>P</strong></td><td><code>0x50</code></td></tr>
            <tr><td><strong>D</strong></td><td><code>0x44</code></td><td><strong>Q</strong></td><td><code>0x51</code></td></tr>
            <tr><td><strong>E</strong></td><td><code>0x45</code></td><td><strong>R</strong></td><td><code>0x52</code></td></tr>
            <tr><td><strong>F</strong></td><td><code>0x46</code></td><td><strong>S</strong></td><td><code>0x53</code></td></tr>
            <tr><td><strong>G</strong></td><td><code>0x47</code></td><td><strong>T</strong></td><td><code>0x54</code></td></tr>
            <tr><td><strong>H</strong></td><td><code>0x48</code></td><td><strong>U</strong></td><td><code>0x55</code></td></tr>
            <tr><td><strong>I</strong></td><td><code>0x49</code></td><td><strong>V</strong></td><td><code>0x56</code></td></tr>
            <tr><td><strong>J</strong></td><td><code>0x4A</code></td><td><strong>W</strong></td><td><code>0x57</code></td></tr>
            <tr><td><strong>K</strong></td><td><code>0x4B</code></td><td><strong>X</strong></td><td><code>0x58</code></td></tr>
            <tr><td><strong>L</strong></td><td><code>0x4C</code></td><td><strong>Y</strong></td><td><code>0x59</code></td></tr>
            <tr><td><strong>M</strong></td><td><code>0x4D</code></td><td><strong>Z</strong></td><td><code>0x5A</code></td></tr>
          </tbody>
        </table>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center', fontSize: '2rem' }}>
          <b>
           ◦ – ◦ ◦ <br />
          ◦ ◦ – <br />
          – ◦ – ◦ <br />
          ◦ ◦ <br />
          ◦ ◦ – ◦ <br />
          ◦ <br />
          ◦ – ◦ <br /> 
          </b>
        </p>

        <p style={{ lineHeight: '1.5', marginBottom: '1rem', textAlign: 'center' }}>
          To place him so close to Eve, how ironic.
        </p>

        {/* 6-Letter Password Input Box */}
        <div className="mars-password-container">
          <label className="celestial-label" style={{ marginBottom: '0.5rem', minWidth: '12rem'}}>
            An alternate name, <br />
            the most dazzling  <br />
            time of day.
          </label>
          <input
            type="text"
            maxLength={7}
            value={password}
            onChange={handlePasswordChange}
            placeholder="______"
            className={`mars-password-input ${isLuciferMatch ? 'pulse-once' : ''}`}
          />
        </div>

        {/* Real-Time Decrypted Output Box */}
        <div className="combined-box-section theme-mars">
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