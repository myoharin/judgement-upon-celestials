import React, { useState } from 'react';

export function DemonicPhrase({ phrase, extraFunc=() => {}, copy=true }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!phrase) return;
    try {
      await navigator.clipboard.writeText(phrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy phrase:', err);
    }
  };

  return (
    <div className="demonic-phrase-wrapper">
      <span className="demonic-phrase">{phrase}</span>

      {copy && (
        <button
          type="button"
          className={`demonic-copy-btn ${copied ? 'copied' : ''}`}
          onClick={() => { handleCopy(); extraFunc(); }}
          aria-label="Copy demonic phrase"
        >
          <span className="copy-icon">{copied ? '✓' : '⎘'}</span>
        </button>
      )}
    </div>
  );
}