import React, { useState, useRef, useEffect } from 'react';
import '../index.css';
import '../.components/celestial.css';
import { decrypt } from '../.components/encrypt';

const env = import.meta.env;

const letters_to_convert_to_quote = 55;

// Helper: Safely parses env vars to numbers with a default fallback of 20
const parseMaxLetters = (val) => Number(val) || 20;

// Helper: Counts ONLY English letters (a-z, A-Z)
const countLetters = (str) => (str.match(/[a-zA-Z]/g) || []).length;

// Helper: Shifts a-z and A-Z characters by 'shift' places, wrapping around the alphabet
const caesarCipher = (str, shift = 0) => {
  const normShift = ((shift % 26) + 26) % 26;
  return str.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    const base = code >= 97 ? 97 : 65; // 97 = 'a', 65 = 'A'
    return String.fromCharCode(((code - base + normShift) % 26) + base);
  });
};

const CELESTIALS_CONFIG = [
  { id: 'mercury', displayName: 'Mercury', maxLetters: parseMaxLetters(env.VITE_MERCURY_QUOTE_LENGTH), isBlurred: "" },
  { id: 'venus', displayName: 'Venus', maxLetters: parseMaxLetters(env.VITE_VENUS_QUOTE_LENGTH), isBlurred: "" },
  { id: 'terra', displayName: 'Terra', maxLetters: parseMaxLetters(env.VITE_EARTH_QUOTE_LENGTH), isBlurred: "" },
  { id: 'luna', displayName: 'Luna', maxLetters: parseMaxLetters(env.VITE_LUNA_QUOTE_LENGTH), isBlurred: "Virtues and sins alike hold reverence in time."},
  { id: 'mars', displayName: 'Mars', maxLetters: parseMaxLetters(env.VITE_MARS_QUOTE_LENGTH), isBlurred: "" },
  { id: 'jupiter', displayName: 'Jupiter', maxLetters: parseMaxLetters(env.VITE_JUPITER_QUOTE_LENGTH), isBlurred: "" },
  { id: 'saturn', displayName: 'Saturn', maxLetters: parseMaxLetters(env.VITE_SATURN_QUOTE_LENGTH), isBlurred: "" },
  { id: 'uranus', displayName: 'Uranus', maxLetters: parseMaxLetters(env.VITE_URANUS_QUOTE_LENGTH), isBlurred: "" },
  { id: 'neptune', displayName: 'Neptune', maxLetters: parseMaxLetters(env.VITE_NEPTUNE_QUOTE_LENGTH), isBlurred: "" },
  { id: 'pluto', displayName: 'Pluto', maxLetters: parseMaxLetters(env.VITE_PLUTO_QUOTE_LENGTH), isBlurred: "Beyond mere judgements, lies a chronical." },
];

const WARNING_THRESHOLD = 12;

export default function Root() {
  const [answers, setAnswers] = useState(
    CELESTIALS_CONFIG.reduce((acc, item) => ({ ...acc, [item.id]: '' }), {})
  );
  const [decryptedAnswer, setDecryptedAnswer] = useState('');
  const combinedRef = useRef(null);

  // Concatenate all answers synchronously to use as decryption key and shift counter
  const combinedSubmission = CELESTIALS_CONFIG.map((item) => answers[item.id] || '').join('');

  // Shift advances dynamically by 1 for every letter added to the combined submission
  const currentShift = countLetters(combinedSubmission);

  // Async decryption handling via useEffect
  useEffect(() => {
    let isMounted = true;

    const runDecrypt = async () => {
      if (!combinedSubmission || !env.VITE_ENCRYPTED_REWARD_SINS) {
        if (isMounted) setDecryptedAnswer(await decrypt(env.VITE_ENCRYPTED_REWARD_SINS, "SampleFallback"));
        return;
      }

      try {
        if (combinedSubmission.length < letters_to_convert_to_quote) {
          const result = await decrypt(env.VITE_ENCRYPTED_REWARD_SINS, combinedSubmission);
          if (isMounted) setDecryptedAnswer(result);
        }
        else {
          const result = await decrypt(env.VITE_ENCRYPTED_REWARD_QUOTES, combinedSubmission);
          if (isMounted) setDecryptedAnswer(result);
        }
      } catch (err) {
        if (isMounted) setDecryptedAnswer('DecryptError');
      }
    };

    runDecrypt();

    return () => {
      isMounted = false;
    };
  }, [combinedSubmission]);

  // Auto-expand combined textarea whenever decryptedAnswer updates
  useEffect(() => {
    if (combinedRef.current) {
      combinedRef.current.style.height = 'auto';
      combinedRef.current.style.height = `${combinedRef.current.scrollHeight}px`;
    }
  }, [decryptedAnswer]);

  const handleChange = (id, value, maxLetters) => {
    const noNewlines = value.replace(/[\r\n]/g, '');
    if (countLetters(noNewlines) <= maxLetters) {
      setAnswers((prev) => ({ ...prev, [id]: noNewlines }));
    }
  };

  const handleAutoResize = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <div className="celestial-canvas">
      <div className="celestial-container">
        <div className="mystic-card theme-root">
        <div className="corner top left"></div>
        <div className="corner top right"></div>
        <div className="corner bottom left"></div>
        <div className="corner bottom right"></div>
          {/* Main Chromatic Title */}
          <div className="title-wrapper">
            <h1 className="rgb-split-title" style={{ textAlign: 'center', padding: '1rem' }}>
              Judgment upon <br /> Celestials
            </h1>
          </div>

          {/* 10 Submission Boxes */}
          <div className="celestial-grid">
            {CELESTIALS_CONFIG.map((celestial) => {
              const val = answers[celestial.id];
              const letterCount = countLetters(val);
              const showCounter = letterCount > WARNING_THRESHOLD;
              const isAtLimit = letterCount === celestial.maxLetters;

              return (
                <div key={celestial.id} className="celestial-box">
                  {/* Celestial Label */}
                  <label
                    className={`celestial-label ${celestial.isBlurred ? 'blurred glitch' : ''}`}
                    data-underscores={'_'.repeat(celestial.displayName.length)}
                  >
                    {celestial.isBlurred
                      ? caesarCipher(celestial.displayName, currentShift + celestial.displayName.length * 9)
                      : celestial.displayName}
                  </label>

                  {/* Input & Counter */}
                  <div className="input-wrapper">
                    <textarea
                      rows={1}
                      className="celestial-input"
                      value={val}
                      onChange={(e) =>
                        handleChange(celestial.id, e.target.value, celestial.maxLetters)
                      }
                      onInput={handleAutoResize}
                      onKeyDown={handleKeyDown}
                      placeholder={celestial.isBlurred ? celestial.isBlurred : `Cast your judgement on ${celestial.displayName}...`}
                    />
                    {showCounter && (
                      <span className={`letter-counter ${isAtLimit ? 'at-limit' : ''}`}>
                        {letterCount}/{celestial.maxLetters}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Combined Concatenated Output Box */}
          <div className="combined-box-section">
            <label className="celestial-label combined-label">Will your judgment match the stars?</label>
            <textarea
              ref={combinedRef}
              readOnly
              rows={1}
              value={decryptedAnswer}
              placeholder="May the stars align..."
              className="combined-textarea"
            />
          </div>
      </div>
      </div>
    </div>
  );
}