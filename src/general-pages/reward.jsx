import React, { useState, useEffect } from 'react';
import '../index.css';
import '../.components/celestial.css';
import '../.components/mystic.css';
import { encrypt, decrypt } from '../.components/encrypt';

const env = import.meta.env;

const REWARD_TYPES = [
  {
    key: 'sin_reward_attained',
    title: 'Sin Reward',
    encKey: env.VITE_SIN_REWARD_KEY,
    themeClass: 'theme-sin',
  },
  {
    key: 'virtue_reward_attained',
    title: 'Virtue Reward',
    encKey: env.VITE_VIRTUE_REWARD_KEY,
    themeClass: 'theme-virtue',
  },
  {
    key: 'quote_reward_attained',
    title: 'Quote Reward',
    encKey: env.VITE_QUOTE_REWARD_KEY,
    themeClass: 'theme-quote',
  },
];

const REWARDS_STYLES = `
  .rewards-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    margin-top: 1.5rem;
  }

  .reward-card {
    background: rgba(11, 15, 25, 0.9);
    border: 1px solid var(--mystic-border, #00f3ff);
    border-radius: 6px;
    padding: 1.5rem;
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.15);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .reward-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 243, 255, 0.2);
    padding-bottom: 0.5rem;
  }

  .reward-title {
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--mystic-border, #00f3ff);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .reward-time {
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    color: #e0e7ff;
    opacity: 0.9;
  }

  .token-box-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .token-label {
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--mystic-border, #00f3ff);
  }

  .token-input-row {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .token-textarea {
    flex: 1;
    background: rgba(0, 0, 0, 0.85);
    border: 1px dashed rgba(0, 243, 255, 0.4);
    color: #ffffff;
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
    padding: 0.6rem 0.8rem;
    border-radius: 4px;
    resize: none;
    outline: none;
  }

  .copy-token-btn {
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 0.6rem 1rem;
    background: rgba(0, 243, 255, 0.1);
    color: var(--mystic-border, #00f3ff);
    border: 1px solid var(--mystic-border, #00f3ff);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .copy-token-btn:hover {
    background: var(--mystic-border, #00f3ff);
    color: #000000;
  }

  .locked-message-container {
    text-align: center;
    padding: 3rem 1rem;
    font-family: 'Courier New', monospace;
  }

  .locked-title {
    font-size: 1.5rem;
    color: #ff3c00;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(255, 60, 0, 0.5);
  }

  .locked-desc {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 1px;
  }
`;

export default function Rewards() {
  const [unlockedRewards, setUnlockedRewards] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const startTime = localStorage.getItem('arg_start_time') || 'UNKNOWN_START_TIME';
    const checkKey = env.VITE_CHECK_KEY;

    const processRewards = async () => {
      const results = [];

      for (const reward of REWARD_TYPES) {
        const storedEncrypted = localStorage.getItem(reward.key);
        if (storedEncrypted) {
          try {
            // Decrypt completion date and time
            const completionTime = reward.encKey
              ? await decrypt(storedEncrypted, reward.encKey)
              : 'Unknown Time';

            // Construct form submission plaintext
            const submissionPlaintext = `START:${startTime}|END:${completionTime}|REWARD:${reward.title}`;

            // Encrypt submission token using entity reward key
            const submissionToken = reward.encKey
              ? await encrypt(submissionPlaintext, reward.encKey)
              : await encrypt(submissionPlaintext, 'FALLBACK_KEY');

            results.push({
              ...reward,
              completionTime,
              submissionToken,
            });
          } catch (err) {
            console.error(`Failed to process ${reward.key}:`, err);
          }
        }
      }

      setUnlockedRewards(results);
      setIsLoaded(true);
    };

    processRewards();
  }, []);

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  if (!isLoaded) {
    return (
      <div className="celestial-canvas">
        <div className="mystic-card theme-root" style={{ textAlign: 'center', padding: '4rem' }}>
          <span style={{ fontFamily: "'Courier New', monospace", color: '#00f3ff' }}>
            LOADING...
          </span>
        </div>
      </div>
    );
  }

  const hasAccess = unlockedRewards.length > 0;

  return (
    <div className="celestial-canvas">
      <style>{REWARDS_STYLES}</style>

      <div className="celestial-container">
        <div className="mystic-card theme-root">
          <div className="corner top left"></div>
          <div className="corner top right"></div>
          <div className="corner bottom left"></div>
          <div className="corner bottom right"></div>

          <div className="title-wrapper">
            <h1 className="rgb-split-title" style={{ textAlign: 'center', padding: '1rem' }}>
              {hasAccess ? 'Submission Token' : 'Vault Sealed'}
            </h1>
            <h3 className="rgb-split-subtitle" style={{ textAlign: 'center', padding: '0.5rem' }}>

                {hasAccess ? 'Submit the tokens here: https://forms.gle/BphCCXJ24iDh5Pv96' : 'You need to complete the Celestials ARG to access your submission token.'}
            </h3>   
          </div>

          {!hasAccess ? (
            <div className="locked-message-container">
              <div className="locked-title">Access Denied</div>
              <p className="locked-desc">
                No completion seals detected. Don't worry, you will be directed to this page once you have attained them..
              </p>
            </div>
          ) : (
            <div className="rewards-list">
              {unlockedRewards.map((item, idx) => (
                <div key={item.key} className="reward-card">
                  <div className="reward-header">
                    <span className="reward-title">{item.title}</span>
                    <span className="reward-time">Completed: {item.completionTime}</span>
                  </div>

                  <div className="token-box-wrapper">
                    <span className="token-label">Google Forms Submission Token:</span>
                    <div className="token-input-row">
                      <textarea
                        readOnly
                        rows={2}
                        value={item.submissionToken}
                        className="token-textarea"
                      />
                      <button
                        type="button"
                        className="copy-token-btn"
                        onClick={() => handleCopy(item.submissionToken, idx)}
                      >
                        {copiedIndex === idx ? 'COPIED' : 'COPY TOKEN'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}