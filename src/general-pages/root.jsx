import React, { useState, useRef, useEffect } from 'react';
import '../index.css';
import '../.components/celestial.css';
import { encrypt, decrypt } from '../.components/encrypt';

const env = import.meta.env;

const letters_to_convert_to_quote = 55;

// Sins & Virtues list
const SINS_AND_VIRTUES = [
  'pride', 'greed', 'lust', 'envy', 'gluttony', 'wrath', 'sloth', 'ignorance', 'love', 'dominance',
  'chastity', 'temperance', 'charity', 'diligence', 'patience', 'gratitude', 'humility', 'apathy', 'curiosity', 'submission'
];

// Guidance Hints
const HINTS = [
  "Maybe you can explore the subpages by exploring https://unicodemagazine.github.io/celestials/<insert word> to explore this arg's subpages. Forexample, try \"lilith\" or \"earth\"!",
  "These judgment speaks of sins and virtues. Maybe the deadly ones could be potential solutions...",
  "Could the names of these celestials be potential subpages?",
  "There are three puzzles here, one to determine each sins the celetsials hold, another to determine each virtue they possess.",
  "There are 7 devils for each deadly sin. Explore their names!",
  "The two blurred celestials, what do you think they could be? Certainly not planets, could be what was once one, or one that turns the tides.",
  "Who holds the remaining 3 sins? Maybe the first human holds one …",
  "The third puzzle, is to determine the message left each of them for keepsake, if you haven't determine each of their character length already.",
  "Funfact, Adam had a wife before Eve!",
  "Why is God exempt from commiting sins himself? He is afterall IGNORANT to all the pain he's caused."
];

const parseMaxLetters = (val) => Number(val) || 20;
const countLetters = (str) => (str.match(/[a-zA-Z]/g) || []).length;

const caesarCipher = (str, shift = 0) => {
  const normShift = ((shift % 26) + 26) % 26;
  return str.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    const base = code >= 97 ? 97 : 65;
    return String.fromCharCode(((code - base + normShift) % 26) + base);
  });
};

const CELESTIALS_CONFIG = [
  { id: 'mercury', displayName: 'Mercury', maxLetters: parseMaxLetters(env.VITE_MERCURY_QUOTE_LENGTH), isBlurred: "", quoteCheck: env.VITE_MERCURY_QUOTE_CHECK },
  { id: 'venus', displayName: 'Venus', maxLetters: parseMaxLetters(env.VITE_VENUS_QUOTE_LENGTH), isBlurred: "", quoteCheck: env.VITE_VENUS_QUOTE_CHECK },
  { id: 'terra', displayName: 'Terra', maxLetters: parseMaxLetters(env.VITE_TERRA_QUOTE_LENGTH), isBlurred: "", quoteCheck: env.VITE_TERRA_QUOTE_CHECK },
  { id: 'luna', displayName: 'Luna', maxLetters: parseMaxLetters(env.VITE_LUNA_QUOTE_LENGTH), isBlurred: "Virtues and sins alike hold reverence in time.", quoteCheck: env.VITE_LUNA_QUOTE_CHECK },
  { id: 'mars', displayName: 'Mars', maxLetters: parseMaxLetters(env.VITE_MARS_QUOTE_LENGTH), isBlurred: "", quoteCheck: env.VITE_MARS_QUOTE_CHECK },
  { id: 'jupiter', displayName: 'Jupiter', maxLetters: parseMaxLetters(env.VITE_JUPITER_QUOTE_LENGTH), isBlurred: "", quoteCheck: env.VITE_JUPITER_QUOTE_CHECK },
  { id: 'saturn', displayName: 'Saturn', maxLetters: parseMaxLetters(env.VITE_SATURN_QUOTE_LENGTH), isBlurred: "", quoteCheck: env.VITE_SATURN_QUOTE_CHECK },
  { id: 'uranus', displayName: 'Uranus', maxLetters: parseMaxLetters(env.VITE_URANUS_QUOTE_LENGTH), isBlurred: "", quoteCheck: env.VITE_URANUS_QUOTE_CHECK },
  { id: 'neptune', displayName: 'Neptune', maxLetters: parseMaxLetters(env.VITE_NEPTUNE_QUOTE_LENGTH), isBlurred: "", quoteCheck: env.VITE_NEPTUNE_QUOTE_CHECK },
  { id: 'pluto', displayName: 'Pluto', maxLetters: parseMaxLetters(env.VITE_PLUTO_QUOTE_LENGTH), isBlurred: "Beyond mere judgements, lies a chronical.", quoteCheck: env.VITE_PLUTO_QUOTE_CHECK },
];

const WARNING_THRESHOLD = 12;

const PAGE_STYLES = `
  @keyframes pulseOnceAnimation {
    0% { transform: scale(1); box-shadow: 0 0 0 rgba(210, 100%, 78%, 0); }
    50% { transform: scale(1.03); box-shadow: 0 0 20px var(--mystic-border, hsl(210, 100%, 78%)); }
    100% { transform: scale(1); box-shadow: 0 0 0 rgba(210, 100%, 78%, 0); }
  }

  .pulse-once { animation: pulseOnceAnimation 0.5s ease-in-out 1; }

  .hints-section { margin-top: 2.5rem; width: 100%; }

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

  .hints-list { display: flex; flex-direction: column; gap: 0.75rem; }

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

  .hint-text.blurred { filter: blur(6px); opacity: 0.4; }
  .hint-text.revealed { filter: blur(0); opacity: 1; }
`;

export default function Root() {
  // Track start time on initial page visit
  useEffect(() => {
    if (!localStorage.getItem('arg_start_time')) {
      localStorage.setItem('arg_start_time', new Date().toISOString());
    }
  }, []);

  // Load initial answers from LocalStorage
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

  // Load revealed hints state
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
  const [quoteMatches, setQuoteMatches] = useState({});
  const combinedRef = useRef(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('celestials_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('celestials_hints', JSON.stringify(revealedHints));
  }, [revealedHints]);

  const combinedSubmission = CELESTIALS_CONFIG.map((item) => answers[item.id] || '').join('');
  const currentShift = countLetters(combinedSubmission);

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

  // Async decryption handling
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

  // Quote match verifier
  useEffect(() => {
    let isMounted = true;

    const checkQuotes = async () => {
      const entries = await Promise.all(
        CELESTIALS_CONFIG.map(async (celestial) => {
          const val = answers[celestial.id];
          if (!val || !celestial.quoteCheck) return [celestial.id, false];
          const result = await encrypt(env.VITE_CHECK_PLAINTEXT, val);
          return [celestial.id, result === celestial.quoteCheck];
        })
      );
      if (isMounted) setQuoteMatches(Object.fromEntries(entries));
    };

    checkQuotes();

    return () => {
      isMounted = false;
    };
  }, [answers]);

  // Check final box against Reward Check env vars and store encrypted completion time
  useEffect(() => {
    let isMounted = true;

    const checkRewards = async () => {
      if (!decryptedAnswer) return;

      const now = new Date().toISOString();
      const checkKey = env.VITE_CHECK_KEY;

      const sinCheck = env.VITE_SIN_REWARD_CHECK;
      const virtueCheck = env.VITE_VIRTUE_REWARD_CHECK || env.VITE_VIRTUE_REWARD_CHECK;
      const quoteCheck = env.VITE_QUOTE_REWARD_CHECK;

      const trimmedVal = await encrypt(decryptedAnswer, checkKey);

      const saveReward = async (storageKey, key) => {
        if (!localStorage.getItem(storageKey) && key) {
          const encryptedTime = await encrypt(now, key);
          if (isMounted) {
            localStorage.setItem(storageKey, encryptedTime);
          }
        }
      };

      if (sinCheck && trimmedVal === sinCheck.trim()) {
        await saveReward('sin_reward_attained', env.VITE_SIN_REWARD_KEY);
      }
      if (virtueCheck && trimmedVal === virtueCheck.trim()) {
        await saveReward('virtue_reward_attained', env.VITE_VIRTUE_REWARD_KEY);
      }
      if (quoteCheck && trimmedVal === quoteCheck.trim()) {
        await saveReward('quote_reward_attained', env.VITE_QUOTE_REWARD_KEY);
      }
    };

    checkRewards();

    return () => {
      isMounted = false;
    };
  }, [decryptedAnswer]);

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
      <style>{PAGE_STYLES}</style>

      <div className="celestial-container">
        <div className="mystic-card theme-root">
          <div className="corner top left"></div>
          <div className="corner top right"></div>
          <div className="corner bottom left"></div>
          <div className="corner bottom right"></div>

          <div className="title-wrapper">
            <h1 className="rgb-split-title" style={{ textAlign: 'center', padding: '1rem' }}>
              Celestials ARG
            </h1>
          </div>

          <div className="celestial-grid">
            {CELESTIALS_CONFIG.map((celestial) => {
              const val = answers[celestial.id];
              const letterCount = countLetters(val);
              const showCounter = letterCount > WARNING_THRESHOLD;
              const isAtLimit = letterCount === celestial.maxLetters;

              const isExactMatch = SINS_AND_VIRTUES.includes(val.trim().toLowerCase()) || Boolean(quoteMatches[celestial.id]);

              return (
                <div key={celestial.id} className="celestial-box">
                  <label
                    className={`celestial-label ${celestial.isBlurred ? 'blurred glitch' : ''}`}
                    data-underscores={'_'.repeat(celestial.displayName.length)}
                  >
                    {celestial.isBlurred
                      ? caesarCipher(celestial.displayName, currentShift + celestial.displayName.length * 9)
                      : celestial.displayName}
                  </label>

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