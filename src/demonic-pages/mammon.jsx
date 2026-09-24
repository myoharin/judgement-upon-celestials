import React, { useState, useEffect, useRef } from 'react';
import '../.components/demonic.css';
import { DemonicPhrase } from '../.components/demonic-phrase';

// Helper: Generates the first N prime numbers
const generatePrimes = (count) => {
  const primes = [];
  let num = 2;
  while (primes.length < count) {
    let isPrime = true;
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(num);
    num++;
  }
  return primes;
};

// Default array of the first 72 prime numbers (2 to 359)
const FIRST_72_PRIMES = generatePrimes(72);

// Helper: Caesar Cipher shift for A-Z
const caesarCipher = (str, shift) => {
  const normShift = ((shift % 26) + 26) % 26;
  return str.replace(/[a-zA-Z]/g, (char) => {
    const code = char.charCodeAt(0);
    const base = code >= 97 ? 97 : 65;
    return String.fromCharCode(((code - base + normShift) % 26) + base);
  });
};

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
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⡄⠀⢠⣿⣿⢯⣳⣿⣿⣦⣄⠘⣿⣿⡿⠁⣴⣿⣿⢯⣽⣿⡟⣿⣷⢯⣿⣿⡇⠀⣿⣿⣽⣻⣿⠀⣿⣷⣿⠇⠀⠀⠀⠀⣀⠀⠀⢀⣼⣿⣿⣳⢿⣿⠁⣰⣿⣇⢸⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣾⠇⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⢿⣷⠀⣿⣿⢯⣟⣼⣿⡇⢻⣿⣧⠘⣿⠃⣼⣿⡿⡽⣞⣿⣿⠁⢸⣿⣟⣮⢿⣿⡇⠀⣿⣿⢶⣻⣿⣇⠘⣿⣿⠀⠀⢀⣴⡿⠁⠀⣠⣿⢱⣿⣯⣽⣻⣿⠀⣿⡿⣿⡄⢻⣧⠀⠀⠀⠀⠀⠀⣴⣾⡟⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣰⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⢿⡇⢰⣿⣯⡟⣼⣿⣿⠁⠘⣿⣽⣧⠈⢰⣿⣯⡷⣛⣿⣿⠃⠀⣼⣿⣿⢼⣻⣿⡇⠀⢺⣿⡿⣼⣻⣿⣦⠘⠇⠀⣠⣿⡿⠁⠀⣰⣿⡟⢸⣿⣳⢾⡽⣿⣇⢸⣿⡿⣿⣆⠙⠀⠀⠀⠀⢀⣾⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⡿⣿⠃⣿⣟⣾⢡⡿⣿⡟⠀⠀⢿⣯⢿⡇⣼⣿⣞⡇⣿⣿⣯⠀⣼⣿⣿⠏⣾⣿⣟⣰⡇⠘⣿⣿⣳⣭⢿⣿⣧⠀⢠⣿⣿⡃⠀⢰⣿⡿⡇⠸⣿⣯⡇⢻⣿⣿⣯⣿⣿⣿⣿⣷⡀⠀⠀⢀⣿⣿⣻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠐⣿⣯⣿⣇⠱⣆⡀⠀⠀⠀⣸⣿⡿⣽⡿⢸⣿⢯⡇⢸⣟⣯⣟⠀⠀⣻⣿⣻⣿⢼⣷⣻⠄⢸⣿⣿⣿⣿⡿⠏⣸⣿⣿⣷⣿⡅⠀⢸⣿⣷⣏⣾⣻⣿⡆⢸⣿⢿⡅⠀⣾⣿⣻⣿⠐⣿⣿⣻⡄⠻⣽⣿⣯⣿⣷⣻⢿⣿⡆⠀⢸⣿⣟⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⣧⡀⠀⢻⣿⣾⣿⣆⠹⣿⣆⠀⢠⣿⣿⡽⣿⡇⢸⣿⢯⡇⢸⣯⢿⣿⡀⣠⣿⣟⡷⣿⢸⣿⡽⣇⠀⡹⠾⠟⠋⢀⣾⣿⣿⣻⣿⢿⡆⠀⢈⣿⣿⢾⡘⣷⣻⣷⣸⣿⢿⣧⠀⣿⣿⣽⣿⡆⠘⣿⣿⣽⡀⢹⡾⣿⣯⢻⣿⣯⢿⣿⡄⢸⣿⣯⢿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣿⣷⡀⠸⣿⣷⣻⣿⡀⣿⣿⡧⢼⣿⢷⣻⣿⡇⢹⣿⣟⡆⠈⣿⣻⢿⣷⣿⡿⣭⣿⡟⠘⣿⣟⣯⠀⠐⡀⢂⢠⣿⣿⣿⠍⣿⣿⢿⣿⣦⣼⣿⣟⣾⠇⢹⣯⢿⡏⣿⡿⣿⡀⢺⣿⣞⣿⣿⣦⣹⣿⣯⠇⠀⣿⣻⣿⠀⣿⣯⣟⣿⣷⠈⣿⣿⢯⡿⣿⣧⡀⠀⠀⠀⢀⣀⣤
⠀⠀⠀⣿⣿⣇⠀⣿⣷⣻⣿⡇⢹⣯⣿⣼⣿⡇⣿⣿⡇⠘⣿⣯⡗⠀⢜⢯⡿⡽⣯⢷⣯⣿⡷⢨⣿⣟⣾⠀⡼⠁⡌⣾⣿⣿⡏⠀⣿⣿⢯⡿⣿⣟⣿⡽⣾⠀⠐⣯⣿⣟⢿⣿⢿⣷⡜⣿⣯⠺⣟⡿⣿⣟⡿⡀⠀⡿⣽⣿⠀⣿⣿⢞⣿⡟⣲⡿⢻⣿⣳⢟⣿⣿⡄⠀⣴⣿⣿⠃
⠀⠀⣼⣿⣯⡇⣼⣿⢷⣻⣿⠀⣽⡿⣽⣿⣿⽽⢸⣿⣿⣤⣿⣯⡟⢧⠈⢢⡙⡿⠁⣾⢿⣿⡇⢸⣿⣟⣾⠰⡇⣸⠱⣟⣿⣷⡀⠀⣿⣿⣳⢻⡽⣿⡳⣽⢣⠇⢈⡷⣿⣏⠸⣿⣯⢿⣿⡹⣿⣷⡈⠙⠳⠟⠐⠀⠀⣿⣿⣇⣼⣿⣯⢿⣿⣷⣿⡇⠘⣿⣯⡛⣾⣿⣟⢰⣿⢿⡟⠀
⠀⣼⣿⣿⣿⣽⣿⡿⣫⣿⡇⢰⣿⣟⣿⡏⣿⣿⣆⠹⢿⡿⣟⣷⡻⢸⡄⠀⢻⠃⠀⣿⣿⣿⣀⣾⣿⣽⡎⢸⠁⡏⠀⣿⣻⣿⣿⾾⣿⡿⣽⠃⢻⡷⣽⢋⡎⠀⣴⡿⣿⡿⢀⣿⣟⢺⣿⣧⠹⣿⣿⣄⠀⠙⡆⠀⠀⣿⣿⣿⣿⡟⣾⣿⣿⣿⡽⣇⠀⣹⣿⣽⠸⣿⣿⢨⣿⣿⣷⠀
⣼⣿⣟⣿⣿⣿⣿⢃⣿⣿⣷⣿⣿⢞⣿⡇⢸⣿⣽⡄⠠⡙⢿⣯⡗⢨⠀⠀⡘⠰⡰⠘⣿⢿⣿⢿⣻⡞⠁⡾⠀⢱⡐⠈⠷⣯⣟⣯⣟⡽⢏⠀⢨⡿⢁⡞⠀⢰⣿⣿⣿⠃⢈⣿⣿⡃⣿⣿⠄⢻⣿⣽⠀⠀⢧⡀⡆⢹⣾⡽⠃⣾⣿⡿⢸⣿⣽⣿⣦⣿⣿⡏⢘⣷⣿⢸⣿⢿⣿⡄
⣿⣿⢽⣿⣿⣿⢾⠀⢿⣻⢿⣯⠏⣾⣿⡇⠘⣿⣯⢿⠀⠙⣆⠹⠇⣤⠇⡄⡃⠀⡇⠀⢈⠙⠙⢋⡁⠀⠠⢹⠀⣄⠑⡌⠀⡀⠉⡈⢀⣰⡾⠀⣼⣣⠋⠇⡀⢺⣯⣿⡟⠀⢀⣿⣟⡇⣿⣿⡇⢸⣿⣾⠁⡆⢸⡇⢸⠈⡻⠀⢸⣟⣿⡇⠸⣿⣷⠻⣿⣿⠟⠀⣸⣿⣿⣾⣿⢯⣿⡧
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
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡇⠀⢸⡏⡇⠀⡿⡫⠀⠀⠀⢠⢣⠋⢉⠞⠁⡴⠁⠀⡼⢸⢈⣓⠃⠀⢀⡇⠀⠀⠀⠀⹡⠀⡙⠒⠒⢒⡟⠉⠀⣇⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
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

export default function Mammon({ 
  notchValues = FIRST_72_PRIMES,
  baseWord = "PINPDD" 
}) {
  const [notchIndex, setNotchIndex] = useState(0);
  const canvasRef = useRef(null);
  const isDraggingRef = useRef(false);

  const totalNotches = notchValues.length;
  const currentShiftValue = notchValues[notchIndex] || 0;
  const decryptedPhrase = caesarCipher(baseWord, currentShiftValue);

  // Rotary Dial Drag/Seek Math
  const handlePointerSeek = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || totalNotches === 0) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Angle relative to 12 o'clock (-Math.PI / 2)
    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2;

    // Map angle cleanly to nearest notch index
    const index = Math.round((angle / (Math.PI * 2)) * totalNotches) % totalNotches;
    setNotchIndex(index);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isDraggingRef.current) {
        handlePointerSeek(e);
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [totalNotches]);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    handlePointerSeek(e);
  };

  // Canvas Render Loop for N-Notch Rotary Lock
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displaySize = 280;

    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    ctx.scale(dpr, dpr);

    const centerX = displaySize / 2;
    const centerY = displaySize / 2;
    const ringRadius = 92;

    ctx.clearRect(0, 0, displaySize, displaySize);

    // 1. Draw Outer Base Vault Ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 255, 102, 0.2)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 2. Draw All Notches Around Circle
    for (let i = 0; i < totalNotches; i++) {
      const angle = (i / totalNotches) * Math.PI * 2 - Math.PI / 2;
      const isSelected = i === notchIndex;

      const innerR = ringRadius - (isSelected ? 14 : 6);
      const outerR = ringRadius + (isSelected ? 6 : 2);

      const x1 = centerX + Math.cos(angle) * innerR;
      const y1 = centerY + Math.sin(angle) * innerR;
      const x2 = centerX + Math.cos(angle) * outerR;
      const y2 = centerY + Math.sin(angle) * outerR;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = isSelected ? '#00ff66' : 'rgba(0, 255, 102, 0.35)';
      ctx.lineWidth = isSelected ? 3.5 : 1.2;
      if (isSelected) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff66';
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
    }

    // 3. Inner Rotary Vault Knob
    ctx.beginPath();
    ctx.arc(centerX, centerY, ringRadius - 26, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(5, 20, 10, 0.9)';
    ctx.strokeStyle = 'var(--theme-primary, #00ff66)';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(0, 255, 102, 0.5)';
    ctx.fill();
    ctx.stroke();

    // 4. Pointer Arrow / Indicator
    const currentAngle = (notchIndex / totalNotches) * Math.PI * 2 - Math.PI / 2;
    const ptrX = centerX + Math.cos(currentAngle) * (ringRadius - 32);
    const ptrY = centerY + Math.sin(currentAngle) * (ringRadius - 32);

    ctx.beginPath();
    ctx.arc(ptrX, ptrY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#00ff66';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00ff66';
    ctx.fill();

    // Display Active Prime Shift inside the dial
    ctx.font = 'bold 15px "Courier New", monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#00ff66';
    ctx.fillText(`P:${currentShiftValue}`, centerX, centerY);

  }, [notchIndex, totalNotches, currentShiftValue]);

  return (
    <div className="demonic-canvas">
      <div className="demonic-card theme-greed">
        {/* ASCII Corner & Edge Flame Decorations */}
        <pre className="ascii-corner top-left">{FLAME_CORNER}</pre>
        <pre className="ascii-corner top-right">{FLAME_CORNER}</pre>
        <pre className="ascii-corner bottom-left">{FLAME_CORNER}</pre>
        <pre className="ascii-corner bottom-right">{FLAME_CORNER}</pre>

        {/* Dynamic Caesar Ciphered Demonic Phrase with Copy Button */}
        <DemonicPhrase phrase={decryptedPhrase} />

        {/* Customizable N-Notch Rotary Vault Lock Wheel */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0 2rem 0' }}>
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            style={{ width: '280px', height: '280px', cursor: 'grab', touchAction: 'none' }}
          />
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.75rem',
              letterSpacing: '2px',
              color: 'var(--theme-primary, #00ff66)',
              marginTop: '0.5rem',
              textTransform: 'uppercase',
              opacity: 0.85
            }}
          >
            
          </span>
        </div>

        {/* Hero Braille Flame Header Banner */}
        <pre className="demonic-ascii-flame-banner">
          {HERO_FLAME_ASCII}
          {"Not even the great Lilium could move me, I guess god favours me. I do wonder, how do you plan to move god?"}
        </pre>
      </div>
    </div>
  );
}