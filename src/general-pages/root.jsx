import React, { useState, useRef, useEffect } from 'react';
import '../index.css';
import '../.components/celestial.css';
import { decrypt } from '../.components/encrypt';

const env = import.meta.env;

const letters_to_convert_to_quote = 55;

// Sample Sins & Virtues list
const SINS_AND_VIRTUES = [
  // Deadly Sins
  'pride', 'greed', 'lust', 'envy', 'gluttony', 'wrath', 'sloth', 'ignorance', 'love', 'dominance',
  // Cardinal Virtues
  'chastity', 'temperance', 'charity', 'diligence', 'patience', 'gratitude', 'humility', 'apathy', 'curiosity', 'submission'
];

// Unblurrable Guidance Hints
const HINTS = [
  "Maybe you can explore the subpages by exploring https://unicodemagazine.github.io/celestials/<insert word> to explore this arg's subpages. Forexample, try \"lilith\"!",
  "These judgment speaks of sins and virtues. Maybe the deadly ones could be potential solutions...",
  "Could the names of these celestials be potential subpages?",
  "There are 7 devils for each deadly sin. Explore their names!",
  "Who holds the remaining 3 sins? Maybe the first human holds one …",
  "Funfact, Adam had a wife before Eve!",
  "Why is God exempt from commiting sins himself?"
];

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
  { id: 'terra', displayName: 'Terra', maxLetters: parseMaxLetters(env.VITE_TERRA_QUOTE_LENGTH), isBlurred: "" },
  { id: 'luna', displayName: 'Luna', maxLetters: parseMaxLetters(env.VITE_LUNA_QUOTE_LENGTH), isBlurred: "Virtues and sins alike hold reverence in time."},
  { id: 'mars', displayName: 'Mars', maxLetters: parseMaxLetters(env.VITE_MARS_QUOTE_LENGTH), isBlurred: "" },
  { id: 'jupiter', displayName: 'Jupiter', maxLetters: parseMaxLetters(env.VITE_JUPITER_QUOTE_LENGTH), isBlurred: "" },
  { id: 'saturn', displayName: 'Saturn', maxLetters: parseMaxLetters(env.VITE_SATURN_QUOTE_LENGTH), isBlurred: "" },
  { id: 'uranus', displayName: 'Uranus', maxLetters: parseMaxLetters(env.VITE_URANUS_QUOTE_LENGTH), isBlurred: "" },
  { id: 'neptune', displayName: 'Neptune', maxLetters: parseMaxLetters(env.VITE_NEPTUNE_QUOTE_LENGTH), isBlurred: "" },
  { id: 'pluto', displayName: 'Pluto', maxLetters: parseMaxLetters(env.VITE_PLUTO_QUOTE_LENGTH), isBlurred: "Beyond mere judgements, lies a chronical." },
];

const WARNING_THRESHOLD = 12;

// Embedded Keyframe & Component Styles
const PAGE_STYLES = `
  @keyframes pulseOnceAnimation {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 rgba(210, 100%, 78%, 0);
    }
    50% {
      transform: scale(1.03);
      box-shadow: 0 0 20px var(--mystic-border, hsl(210, 100%, 78%));
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 rgba(210, 100%, 78%, 0);
    }
  }

  .pulse-once {
    animation: pulseOnceAnimation 0.5s ease-in-out 1;
  }

  /* Hint Boxes Styles */
  .hints-section {
    margin-top: 2.5rem;
    width: 100%;
  }

  .hints-header-title {
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    color: var(--mystic-border, #00f3ff);
    letter-spacing: 3px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 1.25rem;
    text-shadow: 0 0 8px rgba(0, 243, 255, 0.4);
  }

  .hints-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .hint-box {
    background: rgba(11, 15, 25, 0.85);
    border: 1px solid rgba(0, 243, 255, 0.25);
    border-radius: 4px;
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;
  }

  .hint-box:hover {
    border-color: var(--mystic-border, #00f3ff);
    box-shadow: 0 0 12px rgba(0, 243, 255, 0.25);
    transform: translateY(-1px);
  }

  .hint-box-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    color: var(--mystic-border, #00f3ff);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.4rem;
  }

  .hint-text {
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    line-height: 1.4;
    color: #e0e7ff;
    transition: filter 0.4s ease, opacity 0.4s ease;
    word-break: break-word;
  }

  .hint-text.blurred {
    filter: blur(6px);
    opacity: 0.4;
  }

  .hint-text.revealed {
    filter: blur(0);
    opacity: 1;
  }
`;

export default function Root() {
  // Load initial answers from LocalStorage or fallback to empty strings
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem('celestials_answers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved answers:', e);
      }
    }
    return CELESTIALS_CONFIG.reduce((acc, item) => ({ ...acc, [item.id]: '' }), {});
  });

  // Load revealed hints state from LocalStorage or default all to false
  const [revealedHints, setRevealedHints] = useState(() => {
    const saved = localStorage.getItem('celestials_hints');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved hints:', e);
      }
    }
    return {};
  });

  const [decryptedAnswer, setDecryptedAnswer] = useState('');
  const combinedRef = useRef(null);

  // Sync answers to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('celestials_answers', JSON.stringify(answers));
  }, [answers]);

  // Sync revealed hints to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('celestials_hints', JSON.stringify(revealedHints));
  }, [revealedHints]);

  // Concatenate all answers synchronously to use as decryption key and shift counter
  const combinedSubmission = CELESTIALS_CONFIG.map((item) => answers[item.id] || '').join('');

  // Shift advances dynamically by 1 for every letter added to the combined submission
  const currentShift = countLetters(combinedSubmission);

  // Determine decryption key based on Neptune input
  const determineKey = (neptuneAnswer = '') => {
    const val = neptuneAnswer.toLowerCase();
    if (val === "love") {
      return env.VITE_ENCRYPTED_REWARD_SINS;
    } else if (val === "apathy") {
      return env.VITE_ENCRYPTED_REWARD_VIRTUES;
    } else {
      return env.VITE_ENCRYPTED_REWARD_QUOTES;
    }
  };

  // Async decryption handling via useEffect
  useEffect(() => {
    let isMounted = true;

    const runDecrypt = async () => {
      const key = determineKey(answers['neptune']);
      if (!combinedSubmission || !key) {
        if (isMounted) setDecryptedAnswer(await decrypt(key, "SampleFallback"));
        return;
      }

      try {
        const result = await decrypt(key, combinedSubmission);
        if (isMounted) setDecryptedAnswer(result);
      } catch (err) {
        if (isMounted) setDecryptedAnswer('DecryptError');
      }
    };

    runDecrypt();

    return () => {
      isMounted = false;
    };
  }, [combinedSubmission, answers]);

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

  const toggleHint = (index) => {
    setRevealedHints((prev) => ({ ...prev, [index]: !prev[index] }));
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
      {/* Page & Animation Styles */}
      <style>{PAGE_STYLES}</style>

      <div className="celestial-container">
        <div className="mystic-card theme-root">
          <div className="corner top left"></div>
          <div className="corner top right"></div>
          <div className="corner bottom left"></div>
          <div className="corner bottom right"></div>

          {/* Main Chromatic Title */}
          <div className="title-wrapper">
            <h1 className="rgb-split-title" style={{ textAlign: 'center', padding: '1rem' }}>
              Celestials ARG
            </h1>
          </div>

          {/* 10 Submission Boxes */}
          <div className="celestial-grid">
            {CELESTIALS_CONFIG.map((celestial) => {
              const val = answers[celestial.id];
              const letterCount = countLetters(val);
              const showCounter = letterCount > WARNING_THRESHOLD;
              const isAtLimit = letterCount === celestial.maxLetters;

              // Check if input matches any sin or virtue exactly (case-insensitive)
              const isExactMatch = SINS_AND_VIRTUES.includes(val.trim().toLowerCase());

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
                      className={`celestial-input ${isExactMatch ? 'pulse-once' : ''}`}
                      value={val}
                      onChange={(e) =>
                        handleChange(celestial.id, e.target.value, celestial.maxLetters)
                      }
                      onInput={handleAutoResize}
                      onKeyDown={handleKeyDown}
                      placeholder={
                        celestial.isBlurred
                          ? celestial.isBlurred
                          : `Cast your judgement on ${celestial.displayName}...`
                      }
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
            <label className="celestial-label combined-label">What do you know of sins and virtues? What do you know of mine?</label>
            <textarea
              ref={combinedRef}
              readOnly
              rows={1}
              value={decryptedAnswer}
              placeholder="May the stars align..."
              className="combined-textarea"
            />
          </div>

          {/* Optional Guidance Hints Section */}
          <div className="hints-section">
            <div className="hints-header-title">Optional Hints!</div>
            <div className="hints-list">
              {HINTS.map((hintText, index) => {
                const isRevealed = Boolean(revealedHints[index]);
                return (
                  <div
                    key={index}
                    className="hint-box"
                    onClick={() => toggleHint(index)}
                  >
                    <div className="hint-box-header">
                      <span>Hint {index + 1}</span>
                      <span>{isRevealed ? 'Revealed' : 'Click to Unblur'}</span>
                    </div>
                    <div className={`hint-text ${isRevealed ? 'revealed' : 'blurred'}`}>
                      {hintText}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}