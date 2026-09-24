import React, { useState, useEffect, useRef } from 'react';
import '../.components/demonic.css';
import { DemonicPhrase } from '../.components/demonic-phrase';
import { decrypt } from '../.components/encrypt';

const env = import.meta.env;

// Embedded styling for Asmodeus input & decryption output
const LILITH_STYLES = `
  .lilith-input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 32rem;
    margin: 1.5rem 0;
  }

  .lilith-key-input {
    width: 100%;
    text-align: center;
    font-family: 'Courier New', monospace;
    font-size: 1.1rem;
    letter-spacing: 3px;
    padding: 0.75rem 1rem;
    background: rgba(10, 2, 2, 0.85);
    border: 1px solid var(--theme-primary, #ff007f);
    color: #ffffff;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;
  }

  .lilith-key-input:focus {
    border-color: var(--theme-glow, #ff00ab);
    box-shadow: 0 0 15px var(--theme-primary, #ff007f);
  }

  .lilith-counter {
    align-self: flex-end;
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    color: var(--theme-primary, #ff007f);
    margin-top: 0.4rem;
    letter-spacing: 1px;
    opacity: 0.8;
  }

  .lilith-counter.at-limit {
    color: #ffffff;
    text-shadow: 0 0 8px var(--theme-glow, #ff00ab);
  }

  .lilith-output-box {
    width: 100%;
    max-width: 32rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .lilith-output-textarea {
    width: 100%;
    background: rgba(0, 0, 0, 0.9);
    border: 1px dashed var(--theme-primary, #ff007f);
    color: var(--theme-primary, #ff007f);
    font-family: 'Courier New', monospace;
    font-size: 0.95rem;
    padding: 0.8rem 1rem;
    border-radius: 4px;
    resize: none;
    outline: none;
    text-align: center;
    box-shadow: inset 0 0 10px rgba(255, 0, 127, 0.15);
    box-sizing: border-box;
    overflow: hidden;
  }
`;

// Large High-Density Flame Banner
const HERO_FLAME_ASCII = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣦⣀⠀⠀⠀⠀⠀⠀⢲⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡆⠀⠀⠀⠀⠀⠀⠀⠛⣦⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣷⣤⠀⠀⠀⠀⠀⢻⣿⣷⣄⢀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣷⣄⠀⠀⠀⠀⣿⣿⣿⣷⠱⣆⠀⠀⠀⢀⣾⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣽⣿⡆⠀⠀⠀⢸⣿⣞⣿⣧⢸⣷⣤⠀⢸⣿⣯⣿⠆⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡟⢰⣿⡷⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⣿⣦⡄⠀⠀⠀⠀⢻⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣟⣾⣿⠀⠀⠀⣼⣿⡏⣿⣿⠀⣿⣿⣗⠺⣿⣳⣿⣧⠀⠀⠀⠀⠀⠀⠀⣴⣿⡟⠀⣸⣿⡟⣽⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣆⠀⠀⠀⠀⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣦⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣯⢿⣿⡇⠀⣰⣿⡿⢸⣿⡿⠀⣼⣿⣻⡦⣿⣯⢿⣿⡆⠀⠀⠀⠀⢀⣾⣿⣿⠀⢠⣿⡿⢱⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⢯⣿⠀⠀⢠⠀⣼⣿⣻⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣷⡀⠀⠀⠀⠀⠀⣰⣿⣿⣞⣿⣿⠃⢀⣿⡿⣡⣿⡿⠃⢀⣿⣿⣽⣷⢹⣿⣻⢿⣿⡄⠀⠀⢀⣾⣿⢿⡇⠀⣾⣿⣱⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⠁⢀⡿⢰⣿⣣⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⡄⠀⠀⠀⢰⣿⣿⣻⣼⣿⡿⠀⢸⣿⢣⣿⡿⠁⣠⣿⣿⡟⣾⣿⢈⣿⣯⣟⣿⣷⠀⠀⣸⣿⣟⣿⡇⠀⣿⣧⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣳⣿⡟⠀⣾⡇⢸⣷⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⡄⠀⢠⣿⣿⢯⣳⣿⣿⣦⣄⠘⣿⣿⡿⠁⣴⣿⣿⢯⣽⣿⡟⢀⣿⣷⢯⣿⣿⡇⠀⣿⣿⣽⣻⣿⠀⣿⣷⣿⠇⠀⠀⠀⠀⣀⠀⠀⢀⣼⣿⣿⣳⢿⣿⠁⣰⣿⣇⢸⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣾⠇⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⢿⣷⠀⣿⣿⢯⣟⣼⣿⡇⢻⣿⣧⠘⣿⠃⣼⣿⡿⡽⣞⣿⣿⠁⢸⣿⣟⣮⢿⣿⡇⠀⣿⣿⢶⣻⣿⣇⠘⣿⣿⠀⠀⢀⣴⡿⠁⠀⣠⣿⢱⣿⣯⣽⣻⣿⠀⣿⡿⣿⡄⢻⣧⠀⠀⠀⠀⠀⠀⣴⣾⡟⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣰⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⢿⡇⢰⣿⣯⡟⣼⣿⣿⠁⠘⣿⣽⣧⠈⢰⣿⣯⡷⣛⣿⣿⠃⠀⣼⣿⣿⢼⣻⣿⡇⠀⢺⣿⡿⣼⣻⣿⣦⠘⠇⠀⣠⣿⡿⠁⠀⣰⣿⡟⢸⣿⣳⢾⡽⣿⣇⢸⣿⡿⣿⣆⠙⠀⠀⠀⠀⢀⣾⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⡿⣿⠃⣿⣟⣾⢡⡿⣿⡟⠀⠀⢿⣯⢿⡇⣼⣿⣞⡇⣿⣿⣯⠀⣼⣿⣿⠏⣾⣿⣟⣰⡇⠘⣿⣿⣳⣭⢿⣿⣧⠀⢠⣿⣿⡃⠀⢰⣿⡿⡇⠸⣿⣯⡇⢻⣿⣿⣯⣿⣿⣿⣿⣷⡀⠀⠀⢀⣿⣿⣻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠐⣿⣯⣿⣇⠱⣆⡀⠀⠀⠀⣸⣿⡿⣽⡿⢸⣿⢯⡇⢸⣟⣯⣟⠀⠀⣻⣿⣻⣿⢼⣷⣻⠄⢸⣿⣿⣿⣿⡿⠏⣸⣿⣿⣷⣿⡅⠀⢸⣿⣷⣏⣾⣻⣿⡆⢸⣿⢿⡅⠀⣾⣿⣻⣿⠐⣿⣿⣻⡄⠻⣽⣿⣯⣿⣷⣻⢿⣿⡆⠀⢸⣿⣟⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⣧⡀⠀⢻⣿⣾⣿⣆⠹⣿⣆⠀⢠⣿⣿⡽⣿⡇⢸⣿⢯⡇⢸⣯⢿⣿⡀⣠⣿⣟⡷⣿⢸⣿⡽⣇⠀⡹⠾⠟⠋⢀⣾⣿⣿⣻⣿⢿⡆⠀⢈⣿⣿⢾⡘⣷⣻⣷⣸⣿⢿⣧⠀⣿⣿⣽⣿⡆⠘⣿⣿⣽⡀⢹⡾⣿⣯⢻⣿⣯⢿⣿⡄⢸⣿⣯⢿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣿⣷⡀⠸⣿⣷⣻⣿⡀⣿⣿⡧⢼⣿⢷⣻⣿⡇⢹⣿⣟⡆⠈⣿⣻⢿⣷⣿⡿⣭⣿⡟⠘⣿⣟⣯⠀⠐⡀⢂⢠⣿⣿⣿⠍⣿⣿⢿⣿⣦⣼⣿⣟⣾⠇⢹⣯⢿⡏⣿⡿⣿⡀⢺⣿⣞⣿⣿⣦⣹⣿⣯⠇⠀⣿⣻⣿⠀⣿⣯⣟⣿⣷⠈⣿⣿⢯⡿⣿⣧⡀⠀⠀⠀⢀⣀⣤
⠀⠀⠀⣿⣿⣇⠀⣿⣷⣻⣿⡇⢹⣯⣿⣼⣿⡇⣿⣿⡇⠘⣿⣯⡗⠀⢜⢯⡿⡽⣯⢷⣯⣿⡷⢨⣿⣟⣾⠀⡼⠁⡌⣾⣿⣿⡏⠀⣿⣿⢯⡿⣿⣟⣿⡽⾾⠀⠐⣯⣿⣟⢿⣿⢿⣷⡜⣿⣯⠺⣟⡿⣿⣟⡿⡀⠀⡿⣽⣿⠀⣿⣿⢞⣿⡟⣲⡿⢻⣿⣳⢟⣿⣿⡄⠀⣴⣿⣿⠃
⠀⠀⣼⣿⣯⡇⣼⣿⢷⣻⣿⠀⣽⡿⣽⣿⣿⣽⢸⣿⣿⣤⣿⣯⡟⢧⠈⢢⡙⡿⠁⣾⢿⣿⡇⢸⣿⣟⣾⠰⡇⣸⠱⣟⣿⣷⡀⠀⣿⣿⣳⢻⡽⣿⡳⣽⢣⠇⢈⡷⣿⣏⠸⣿⣯⢿⣿⡹⣿⣷⡈⠙⠳⠟⠐⠀⠀⣿⣿⣇⣼⣿⣯⢿⣿⣷⣿⡇⠘⣿⣯⡛⣾⣿⣟⣿⢿⡟⠀
⠀⣼⣿⣿⣿⣽⣿⡿⣫⣿⡇⢰⣿⣟⣿⡏⣿⣿⣆⠹⢿⡿⣟⣷⡻⢸⡄⠀⢻⠃⠀⣿⣿⣿⣀⣾⣿⣽⡎⢸⠁⡏⠀⣿⣻⣿⣿⾾⣿⡿⣽⠃⢻⡷⣽⢋⡎⠀⣴⡿⣿⡿⢀⣿⣟⢺⣿⣧⠹⣿⣿⣄⠀⠙⡆⠀⠀⣿⣿⣿⣿⡟⣾⣿⣿⣿⡽⣇⠀⣹⣿⣽⠸⣿⣿⢨⣿⣿⣷⠀
⣼⣿⣟⣿⣿⣿⣿⢃⣿⣿⣷⣿⣿⢞⣿⡇⢸⣿⣽⡄⠠⡙⢿⣯⡗⢨⠀⠀⡘⠰⡰⠘⣿⢿⣿⢿⣻⡞⠁⡾⠀⢱⡐⠈⠷⣯⣟⣯⣟⡽⢏⠀⢨⡿⢁⡞⠀⢰⣿⣿⣿⠃⢈⣿⣿⡃⣿⣿⠄⢻⣿⣽⠀⠀⢧⡀⡆⢹⣾⡽⠃⣾⣿⡿⢸⣿⣽⣿⣦⣿⣿⡏⢘⣷⣿⢸⣿⢿⣿⡄
⣿⣿⢽⣿⣿⣿⢾⠀⢿⣻⢿⣯⠏⣾⣿⡇⠘⣿⣯⢿⠀⠙⣆⠹⠇⣤⠇⡄⡃⠀⡇⠀⢈⠙⠙⢋⡁⠀⠠⢹⠀⣄⠑⡌⠀⡀⠉⡈⢀⣰⡾⠀⣼⣣⠋⠇⡀⢺⣯⣿⡟⠀⢀⣿⣟⡇⣿⣿⡇⢸⣿⣾⠁⡆⢸⡇⢸⠈⡻⠀⢸⣟⣿⡇⠸⣿⣷⠻⣿⣿⠟⠀⣸⣿⣿⾾⣿⢯⣿⡧
⣿⣿⢸⣿⣿⣿⣻⡇⠈⠻⣿⠁⠨⡷⣿⣷⣤⣽⣿⣻⠅⠀⠘⡆⣸⠏⡰⠀⡇⡄⠘⡄⠂⠈⢀⠀⠲⣀⠀⣽⠀⡈⡦⡈⠢⢑⠀⣴⠞⢁⡠⢀⡽⠁⢸⠀⠀⢹⣿⣿⡇⢀⣾⣿⣿⠁⢿⣽⣿⣿⣿⠟⢠⠃⡘⢧⠈⢫⠀⠀⠸⣯⣿⣷⣤⣿⣿⡇⠘⣋⠆⢠⣿⣿⣿⣿⠏⣾⣿⡇
`;

const FLAME_CORNER = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⢇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⠀⠀⡆⠀⠀⢀⡏⠘⡆⠀⠀⠀⠀⠀⠀⠀⠀⡼⡄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠀⠀⠀⠀⠀⠀⢠⡧⠀⠀⠀⠀⢀⡰⠁⠀⠀⣾⠁⠀⢹⠀⠀⠀⠀⠀⠀⠀⢠⠃⡃⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢦⡀⠀⠀⠀⠀⠀⠀⠀⢰⡇⠀⠀⠀⠀⠀⢠⣟⣇⠀⠀⠀⠀⢸⡇⠀⠀⠀⢃⠀⠀⢨⠇⠀⠀⠀⠀⠀⢀⡏⡌⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⠀⡾⡏⠙⣦⡀⠀⠀⣿⠃⠀⠀⠀⣬⡂⠀⣸⠀⠀⠀⠀⠀⠀⠘⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⢣⠀⠀⠀⠀⠀⠀⠀⢟⡇⠀⠀⠀⠀⢸⠃⠃⠀⠈⢷⠀⠀⣿⠀⠀⠀⠀⠙⣇⠖⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠀⠀⠀⠀⠀⠀⠀⡇⠈⡇⠀⠀⠀⠀⠀⠀⠈⣇⠀⠀⠀⠀⠘⠀⠀⠀⠀⣸⠀⠀⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀⣷⠀⡇⠀⠀⠀⠀⠀⠀⠀⠙⣷⣤⡀⠀⠀⢠⣴⡀⢠⡏⠀⠀⠘⡏⠻⣆⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠈⠛⠀⠀⠀⠀⠀⣆⠀⠀⠀⢛⣷⠙⢧⡀⠀⠻⣯⠟⠀⠀⠀⠀⡷⠀⠘⣆⠀⠀⠀⢠⠀⠀⠀⢘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠀⠈⢾⡇⠈⣧⠀⠀⠀⠀⠀⠀⠀⣴⢇⠀⠀⢹⠀⠀⠀⢼⠀⠀⠀⡪⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⣾⠁⠀⣽⠀⠀⠀⠀⠀⣠⡼⠋⡜⠀⠀⣼⠀⠀⠀⡇⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢷⠀⠀⠀⠀⠀⠀⠀⠀⠀⡄⠀⠀⠀⠀⢀⣼⠃⠀⣰⠏⠀⠀⣠⣴⠞⠋⠀⡼⠁⠀⣰⠇⠀⠀⣸⠃⠀⠀⣸⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣇⠀⠀⠀⠈⡇⠀⠀⠀⡇⠀⠀⠀⢠⣾⠇⠀⣰⠋⠀⣠⢾⡟⠁⣠⡶⡓⠁⢀⣴⠋⠀⠀⢀⡏⠀⠀⣰⠿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡆⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⢠⡿⡃⠀⠀⢻⣄⢰⣯⠏⢠⢾⢪⠏⠀⣠⠞⠁⠀⠀⢐⣏⡀⠀⢠⡏⠀⢹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡿⣆⠀⠀⠀⠀⠀⢸⠃⠀⠀⣿⡍⠀⠀⠀⠀⠉⠛⠀⢀⣯⠃⢸⠀⠀⡏⠀⠀⢀⡴⠛⡿⠀⠀⢸⠁⠀⠀⣷⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡬⠃⠸⡆⠀⠀⠀⠀⡸⢀⠀⠀⢿⡃⠀⢹⡒⢤⡀⠀⠀⠸⡇⠀⢸⡀⠀⢧⡀⠀⣾⠁⠀⣧⠀⠀⢪⡀⠀⠀⣿⠀⠀⢠⡃⠀⠀⠀⠀⡆⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠖⠀⠀⣿⠀⠀⠀⣠⣗⡏⠀⠀⠘⣇⠀⠈⡇⠀⠙⢦⡀⢸⣧⠀⠀⢧⠀⠈⠳⣄⣿⠀⠀⢹⡄⠀⢸⡂⠀⠀⡿⠀⠀⡞⠀⠀⠀⠀⠘⠄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣮⠅⠀⠀⢠⡏⠀⠀⣼⡏⢸⡇⠀⠀⠀⢹⡆⢀⡇⠀⡄⠀⠱⣼⣺⡀⠀⡌⠳⡄⠀⠈⠙⠃⠀⠀⢻⡄⠈⣿⡄⣼⠃⠀⡰⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡟⠀⠀⣠⠟⠀⠀⠀⣿⠁⠈⣧⠀⠀⠀⢠⡇⢸⠁⢠⡇⠀⠀⢹⣇⠇⠀⢷⢦⠙⢦⠀⠀⣀⠀⠀⠀⢷⠀⠘⠟⠁⢀⣴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣇⠂⢰⡏⠀⠀⠀⠀⣿⢐⡆⠸⣆⢀⣰⠟⢀⡏⠀⣸⢳⠀⠀⠸⠏⠀⠀⣿⠃⡇⠈⢳⡀⡏⢧⠀⠀⢸⡆⠀⣠⣶⡟⠁⠀⠀⠀⠀⠀⠀⣸⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢧⣘⣧⠀⠀⠀⢀⣿⠀⣇⠀⠹⠋⠁⠀⡜⢀⢮⠇⢸⠀⠀⠀⠀⢀⠞⠁⣰⠃⠀⠀⢳⠃⠈⡇⠀⢸⡇⣼⡳⢹⡁⠀⠀⠀⠀⠀⠀⠀⣧⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠆⠀⢀⡾⠁⣰⠟⡆⠀⠀⠀⠞⠀⢨⡏⢠⠏⠀⠀⠀⣴⠃⢀⡞⠁⠀⠀⠀⠀⠀⠀⡇⠀⣸⠁⣇⠇⢸⠀⠀⠀⠀⠀⠀⢀⡎⣸⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⠁⣰⡿⠀⠘⢆⡴⠋⠀⠀⠘⠓⠁⠀⠀⠀⢸⡇⠀⠘⣆⠀⠀⠀⠀⠀⠀⢰⠃⣰⠏⠀⣷⠀⠘⣇⠀⠀⠀⠀⠀⡇⠀⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠠⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠏⠁⡼⣛⡃⠀⠀⠀⠀⠀⠀⢀⡎⣿⠀⠀⠀⠀⠸⣧⠀⠀⠈⢦⡀⠀⠀⠀⠀⣸⢀⡟⠀⠀⢹⡄⡀⠹⡆⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⣄⠀⠀⠀⣸⡻⠀⢸⣟⡊⠀⠀⠀⠀⠀⢀⡔⢕⠝⡹⠀⠈⢻⣖⠦⡽⣆⠀⠀⠀⠙⢦⠀⠀⠀⡏⠸⣇⣀⣀⣼⠃⡇⠀⠹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⠀⠀⢠⣯⠇⠀⣗⠴⠁⠀⠀⠀⣀⢖⣥⠞⣡⠞⢁⡤⢖⢾⢻⠀⣸⠈⢳⡄⠀⠀⠀⠳⡄⠀⢧⠀⠈⠉⠉⢀⣠⣷⡀⠀⠹⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡇⠀⢸⡏⡇⠀⡿⡫⠀⠀⠀⢠⢣⠋⢉⠞⠁⡴⠁⠀⡼⢸⢈⣓⠃⠀⢀⡇⠀⠀⠀⠀⠹⡄⠀⡙⠒⠒⢒⡟⠉⠀⣇⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⡀⠈⣿⣣⠀⢧⢿⠀⠀⠀⣣⠇⠀⢸⠀⢠⠃⠀⠀⢧⢸⡁⠈⠉⠉⠱⡇⠀⠀⠀⠀⢀⠇⢰⣇⠀⠀⢸⠀⠀⠀⢸⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣧⠀⠘⣷⣣⠘⢮⢧⠀⠀⣿⠀⠀⠈⢧⠀⣆⠀⠀⠈⠢⢵⣤⠀⠀⣜⠇⠀⠀⠀⢠⠞⠀⣏⠸⡄⠀⠃⠀⠀⠀⡞⠀⢠⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣽⣆⡈⠻⣵⡈⠻⣷⠀⠻⡄⠀⠀⠀⠑⠿⣆⠀⠀⠀⠀⠀⠀⡠⠏⠀⠀⢀⢔⣁⣀⡀⢸⡀⠹⡄⠀⠀⠀⠠⠇⢀⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⡝⠲⠶⠭⠷⢎⡵⠀⢝⣆⠀⠀⠀⠀⠘⢦⡀⠀⠀⠀⠴⠋⠀⠀⢰⡁⠀⢉⡇⠉⠞⠀⠀⣹⠀⠀⢀⡎⢀⡾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣦⡰⡒⠚⠉⣄⠀⠀⠋⠳⢦⡀⠀⠀⠀⠙⠀⠀⠀⠀⠀⠀⠀⠀⠉⠚⠉⠀⠀⠀⠀⣠⠃⠀⢀⣞⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣝⣦⡀⠹⡍⠒⠒⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠜⢁⣀⣴⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⢦⣼⣦⡄⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⣡⡾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠓⠒⠒⠛⠻⢤⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠞⠛⠓⠒⠚⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠁⠀⠀⠂⠐⠀⠈⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

export default function Lilith() {
  const [keyInput, setKeyInput] = useState('');
  const [decryptedResult, setDecryptedResult] = useState('');
  const combinedRef = useRef(null);

  // Filter input to allow ONLY alphabets (a-z, A-Z) with a strict max length of 19
  const handleKeyChange = (e) => {
    const alphabeticOnly = e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 19);
    setKeyInput(alphabeticOnly);
  };

  // Async Decryption Logic using VITE_LUNA_QUOTE
  useEffect(() => {
    let isMounted = true;

    const runDecrypt = async () => {
      if (!keyInput) {
        if (isMounted) setDecryptedResult('');
        return;
      }

      const cipherText = env.VITE_NEPTUNE_QUOTE || "place holder";

      try {
        if (cipherText) {
          const result = await decrypt(cipherText, keyInput);
          if (isMounted) setDecryptedResult(result);
        } else {
          const result = await decrypt('SampleFallbackEncryptedText', keyInput);
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
  }, [keyInput]);

  // Auto-resize output textarea dynamically
  useEffect(() => {
    if (combinedRef.current) {
      combinedRef.current.style.height = 'auto';
      combinedRef.current.style.height = `${combinedRef.current.scrollHeight}px`;
    }
  }, [decryptedResult]);

  return (
    <div className="demonic-canvas">
      <style>{LILITH_STYLES}</style>

      <div className={`demonic-card theme-lilith`}>

        {/* 19-Alphabet Key Input Box */}
        <div className="lilith-input-container">
          <input
            type="text"
            className="lilith-key-input"
            value={keyInput}
            onChange={handleKeyChange}
            placeholder="Do you remember your vow to me?"
            maxLength={19}
          />
          <span className={`lilith-counter ${keyInput.length === 19 ? 'at-limit' : ''}`}>
            {keyInput.length}/19
          </span>
        </div>

        {/* Decrypted Output Box */}
        <div className="lilith-output-box">
          <textarea
            ref={combinedRef}
            readOnly
            rows={1}
            value={decryptedResult}
            placeholder="If so, please have mine."
            className="lilith-output-textarea"
          />
        </div>

        {/* Hero Braille Flame Header Banner */}
        <pre className="demonic-ascii-flame-banner">
          {"There's no second I've lived you can't call your own."}
        </pre>
      </div>
    </div>
  );
}