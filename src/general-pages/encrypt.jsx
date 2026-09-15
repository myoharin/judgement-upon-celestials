import React, { useState, useEffect } from 'react';
import { encrypt, decrypt } from '../.components/encrypt';

export default function Encrypt() {
  const [encryptKey, setEncryptKey] = useState('');
  const [message, setMessage] = useState('');
  const [encryptedResult, setEncryptedResult] = useState('');

  const [decryptKey, setDecryptKey] = useState('');
  const [payloadInput, setPayloadInput] = useState('');
  const [decryptedResult, setDecryptedResult] = useState('');

  // Auto-encrypt instantly as message or key changes
  useEffect(() => {
    const runEncrypt = async () => {
      if (!message || !encryptKey) {
        setEncryptedResult('');
        return;
      }
      const result = await encrypt(message, encryptKey);
      setEncryptedResult(result);
    };
    runEncrypt();
  }, [message, encryptKey]);

  // Auto-decrypt instantly as payload or key changes
  useEffect(() => {
    const runDecrypt = async () => {
      if (!payloadInput || !decryptKey) {
        setDecryptedResult('');
        return;
      }
      const result = await decrypt(payloadInput, decryptKey);
      setDecryptedResult(result);
    };
    runDecrypt();
  }, [payloadInput, decryptKey]);

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <h1>Fast AES-CTR Encryptor</h1>

      {/* Encryption Box */}
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '30px' }}>
        <h2 style={{ marginTop: 0 }}>Encrypt</h2>
        
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Secret Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter short text..."
          style={{ width: '100%', padding: '8px', marginBottom: '15px', boxSizing: 'border-box' }}
        />

        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Long Encryption Key:</label>
        <textarea
          value={encryptKey}
          onChange={(e) => setEncryptKey(e.target.value)}
          placeholder="Paste long key string here..."
          rows={3}
          style={{ width: '100%', padding: '8px', marginBottom: '15px', boxSizing: 'border-box' }}
        />

        {/* Real-time output box (Read-only) */}
        {encryptedResult && (
          <div style={{ marginTop: '5px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', color: '#0066cc' }}>Encrypted Output:</label>
            <textarea
              readOnly
              value={encryptedResult}
              rows={4}
              style={{ 
                width: '100%', 
                padding: '8px', 
                marginTop: '5px', 
                boxSizing: 'border-box', 
                background: '#eef6ff', 
                border: '1px solid #b3d4ff',
                outline: 'none',
                cursor: 'default'
              }}
            />
          </div>
        )}
      </div>

      {/* Decryption Box */}
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
        <h2 style={{ marginTop: 0 }}>Decrypt</h2>

        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Payload Base64:</label>
        <textarea
          value={payloadInput}
          onChange={(e) => setPayloadInput(e.target.value)}
          placeholder="Paste Base64 ciphertext here..."
          rows={4}
          style={{ width: '100%', padding: '8px', marginBottom: '15px', boxSizing: 'border-box' }}
        />

        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Key for Decryption:</label>
        <textarea
          value={decryptKey}
          onChange={(e) => setDecryptKey(e.target.value)}
          placeholder="Enter key (1 character wrong outputs garbage)..."
          rows={3}
          style={{ width: '100%', padding: '8px', marginBottom: '15px', boxSizing: 'border-box' }}
        />

        {/* Real-time output box (Read-only) */}
        {decryptedResult && (
          <div style={{ marginTop: '5px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', color: '#00802b' }}>Decrypted Result:</label>
            <textarea
              readOnly
              value={decryptedResult}
              rows={4}
              style={{ 
                width: '100%', 
                padding: '8px', 
                marginTop: '5px', 
                boxSizing: 'border-box', 
                background: '#efffed',
                border: '1px solid #b3ffb3',
                outline: 'none',
                cursor: 'default'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}