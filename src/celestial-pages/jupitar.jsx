import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import '../.components/crossword.css';
import '../.components/mystic.css'; 
import '../.components/celestial.css';
import { decrypt } from '../.components/encrypt';
import jupitarCrossword from '../../assets/jupitar_crossword.png';


const env = import.meta.env;

// --- 1. BACKGROUND IMAGE MICRO-ADJUSTMENTS ---
const IMAGE_CONFIG = {
  url: jupitarCrossword,
  offsetX: 7,              // Move left/right (px)
  offsetY: 17 ,             // Move up/down (px)
  scale: 0.995,              // Zoom image in/out
  opacity: 0.85,           // Image opacity
};

// --- 2. CROSSWORD CONFIGURATION & CELL PIXEL SIZES ---
const GRID_ROWS = 36;
const GRID_COLS = 29;
const CELL_WIDTH_PX = 30;  
const CELL_HEIGHT_PX = 30; 

const WORDS_CONFIG = [
  { id: '1A', answer: 'WRATH', startRow: 12, startCol: 3, direction: 'across', isVirtuous: false },
  { id: '2D', answer: 'GRATITUDE', startRow: 9, startCol: 6, direction: 'down', isVirtuous: true },
  { id: '3A', answer: 'ENVY', startRow: 17, startCol: 6, direction: 'across', isVirtuous: false },
  { id: '4A', answer: 'LUST', startRow: 15, startCol: 8, direction: 'across', isVirtuous: false },
  { id: '4D', answer: 'LOVE', startRow: 15, startCol: 8, direction: 'down', isVirtuous: false },
  { id: '5A', answer: 'CURIOSITY', startRow: 11, startCol: 11, direction: 'across', isVirtuous: true },
  { id: '5D', answer: 'CHASTITY', startRow: 11, startCol: 11, direction: 'down', isVirtuous: true },
  { id: '6D', answer: 'CHARITY', startRow: 8, startCol: 13, direction: 'down', isVirtuous: true },
  { id: '7A', answer: 'SLOTH', startRow: 9, startCol: 16, direction: 'across', isVirtuous: false },
  { id: '8A', answer: 'TEMPERANCE', startRow: 7, startCol: 16, direction: 'across', isVirtuous: true },
  { id: '9D', answer: 'APATHY', startRow: 6, startCol: 19, direction: 'down', isVirtuous: true },
  { id: '10A', answer: 'HUMILITY', startRow: 21, startCol: 6, direction: 'across', isVirtuous: true },
  { id: '11D', answer: 'DILIGENCE', startRow: 20, startCol: 11, direction: 'down', isVirtuous: true },
  { id: '12A', answer: 'GREED', startRow: 24, startCol: 11, direction: 'across', isVirtuous: false },
  { id: '13A', answer: 'PATIENCE', startRow: 21, startCol: 15, direction: 'across', isVirtuous: true },
  { id: '13D', answer: 'PRIDE', startRow: 21, startCol: 15, direction: 'down', isVirtuous: false },
  { id: '14A', answer: 'IGNORANCE', startRow: 23, startCol: 15, direction: 'across', isVirtuous: false },
  { id: '15D', answer: 'GLUTTONY', startRow: 17, startCol: 17, direction: 'down', isVirtuous: false },
  { id: '16A', answer: 'SUBMISSION', startRow: 19, startCol: 16, direction: 'across', isVirtuous: true },
  { id: '17A', answer: 'DOMINANCE', startRow: 26, startCol: 5, direction: 'across', isVirtuous: false },
  
];

const buildGridMap = () => {
  const map = {};
  WORDS_CONFIG.forEach((word) => {
    const letters = word.answer.toUpperCase().split('');
    letters.forEach((char, index) => {
      const r = word.direction === 'down' ? word.startRow + index : word.startRow;
      const c = word.direction === 'across' ? word.startCol + index : word.startCol;
      const key = `${r}-${c}`;

      if (!map[key]) {
        map[key] = { solution: char, words: [word.id] };
      } else {
        map[key].words.push(word.id);
      }
    });
  });
  return map;
};

const GRID_MAP = buildGridMap();

export default function Jupitar() {
  const [gridValues, setGridValues] = useState({});
  const [lockedWords, setLockedWords] = useState(new Set());
  const [decryptedResult, setDecryptedResult] = useState('');
  const [scale, setScale] = useState(1);
  
  const combinedRef = useRef(null);
  const wrapperRef = useRef(null);
  const inputRefs = useRef({});

  const stageWidth = GRID_COLS * CELL_WIDTH_PX;
  const stageHeight = GRID_ROWS * CELL_HEIGHT_PX;

  // Dynamically scale canvas down on mobile screens to fit 100% width
  useLayoutEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        const availableWidth = wrapperRef.current.clientWidth;
        if (availableWidth < stageWidth) {
          setScale(availableWidth / stageWidth);
        } else {
          setScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [stageWidth]);

  useEffect(() => {
    const newlyLocked = new Set(lockedWords);

    WORDS_CONFIG.forEach((word) => {
      let isCorrect = true;
      const letters = word.answer.toUpperCase().split('');

      letters.forEach((char, index) => {
        const r = word.direction === 'down' ? word.startRow + index : word.startRow;
        const c = word.direction === 'across' ? word.startCol + index : word.startCol;
        const key = `${r}-${c}`;
        
        if ((gridValues[key] || '').toUpperCase() !== char) {
          isCorrect = false;
        }
      });

      if (isCorrect) {
        newlyLocked.add(word.id);
      }
    });

    if (newlyLocked.size !== lockedWords.size) {
      setLockedWords(newlyLocked);
    }
  }, [gridValues, lockedWords]);

  const isCellLocked = (key) => {
    const cellData = GRID_MAP[key];
    if (!cellData) return false;
    return cellData.words.some((wordId) => lockedWords.has(wordId));
  };

  let combinedSubmission = '';
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const key = `${r}-${c}`;
      if (GRID_MAP[key]) {
        combinedSubmission += gridValues[key] || '';
      }
    }
  }

  useEffect(() => {
    let isMounted = true;

    const runDecrypt = async () => {
      if (!combinedSubmission || !env.VITE_CROSSWORD_REWARD) {
        if (isMounted) setDecryptedResult('');
        return;
      }

      try {
        const result = await decrypt(env.VITE_CROSSWORD_REWARD, combinedSubmission);
        if (isMounted) setDecryptedResult(result);
      } catch (err) {
        if (isMounted) setDecryptedResult('DecryptError');
      }
    };

    runDecrypt();
    return () => { isMounted = false; };
  }, [combinedSubmission]);

  useEffect(() => {
    if (combinedRef.current) {
      combinedRef.current.style.height = 'auto';
      combinedRef.current.style.height = `${combinedRef.current.scrollHeight}px`;
    }
  }, [decryptedResult, combinedSubmission]);

  const autoAdvance = (r, c) => {
    const downKey = `${r + 1}-${c}`;
    const rightKey = `${r}-${c + 1}`;

    const isDownActive = !!GRID_MAP[downKey];
    const isRightActive = !!GRID_MAP[rightKey];

    const isDownEmpty = isDownActive && !gridValues[downKey];
    const isRightEmpty = isRightActive && !gridValues[rightKey];

    let nextKey = null;

    if (isDownEmpty) {
      nextKey = downKey;
    } else if (isRightEmpty) {
      nextKey = rightKey;
    } else if (isDownActive) {
      nextKey = downKey;
    } else if (isRightActive) {
      nextKey = rightKey;
    }

    if (nextKey && inputRefs.current[nextKey]) {
      inputRefs.current[nextKey].focus();
      inputRefs.current[nextKey].select();
    }
  };

  const handleCellChange = (r, c, val) => {
    const key = `${r}-${c}`;
    if (isCellLocked(key)) return;

    const char = val.replace(/[^a-zA-Z]/g, '').slice(-1).toUpperCase();
    setGridValues((prev) => ({ ...prev, [key]: char }));

    if (char) {
      setTimeout(() => autoAdvance(r, c), 0);
    }
  };

  const handleKeyDown = (r, c, e) => {
    if (e.key === 'Enter') e.preventDefault();

    let targetKey = null;
    if (e.key === 'ArrowUp') targetKey = `${r - 1}-${c}`;
    else if (e.key === 'ArrowDown') targetKey = `${r + 1}-${c}`;
    else if (e.key === 'ArrowLeft') targetKey = `${r}-${c - 1}`;
    else if (e.key === 'ArrowRight') targetKey = `${r}-${c + 1}`;

    if (targetKey && inputRefs.current[targetKey]) {
      e.preventDefault();
      inputRefs.current[targetKey].focus();
      inputRefs.current[targetKey].select();
    }
  };

  return (
    
    <div className="celestial-canvas black-bg">
      <div className="mystic-card theme-jupiter">
        <div className="card-letter">Jupiter</div>
        <div className="corner top left"></div>
        <div className="corner top right"></div>
        <div className="corner bottom left"></div>
        <div className="corner bottom right"></div>

        <div className="card-corner-letter top-left">R</div>
        <div className="card-corner-letter bottom-right">R</div>

        <div className="crossword-container">
          <div className="crossword-scroll-wrapper" ref={wrapperRef}>
            {/* Scaled Bounds Box keeps flow space accurate */}
            <div
              className="crossword-scale-container"
              style={{
                width: `${stageWidth * scale}px`,
                height: `${stageHeight * scale}px`,
              }}
            >
              {/* Unified Stage */}
              <div
                className="crossword-stage"
                style={{
                  width: `${stageWidth}px`,
                  height: `${stageHeight}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              >
                <img
                  src={IMAGE_CONFIG.url}
                  alt="Crossword Blueprint"
                  className="crossword-bg-image"
                  style={{
                    transform: `translate(${IMAGE_CONFIG.offsetX}px, ${IMAGE_CONFIG.offsetY}px) scale(${IMAGE_CONFIG.scale})`,
                    opacity: IMAGE_CONFIG.opacity,
                  }}
                />

                <div
                  className="crossword-grid"
                  style={{
                    gridTemplateRows: `repeat(${GRID_ROWS}, ${CELL_HEIGHT_PX}px)`,
                    gridTemplateColumns: `repeat(${GRID_COLS}, ${CELL_WIDTH_PX}px)`,
                  }}
                >
                  {Array.from({ length: GRID_ROWS }).map((_, r) =>
                    Array.from({ length: GRID_COLS }).map((_, c) => {
                      const key = `${r}-${c}`;
                      const cellData = GRID_MAP[key];

                      if (!cellData) {
                        return <div key={key} className="crossword-cell empty" />;
                      }

                      const locked = isCellLocked(key);

                      // Fetch all word objects overlapping this specific cell
                      const cellWords = cellData.words.map((id) => WORDS_CONFIG.find((w) => w.id === id));

                      // Priority rule: 'sin' if connected to any sinful word, otherwise 'virtue'
                      const isConnectedToSin = cellWords.some((w) => w && w.isVirtuous === false);
                      const themeClass = isConnectedToSin ? 'sin' : 'virtue';

                      return (
                        <input
                          key={key}
                          ref={(el) => (inputRefs.current[key] = el)}
                          type="text"
                          value={gridValues[key] || ''}
                          readOnly={locked}
                          onChange={(e) => handleCellChange(r, c, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(r, c, e)}
                          onFocus={(e) => e.target.select()}
                          className={`crossword-cell active ${locked ? `locked ${themeClass}` : ''}`}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Decrypted Output Box */}
          <div className="combined-box-section theme-jupiter">
            <label className="celestial-label combined-label sun">Jupiter's Sin.  </label>
            <textarea
              ref={combinedRef}
              readOnly
              rows={1}
              value={decryptedResult || combinedSubmission}
              placeholder="In the face of the King of Gods, sinlings sears."
              className="combined-textarea"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 