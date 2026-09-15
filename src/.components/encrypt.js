// Helper functions for safe Base64 string conversions
function bytesToBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// SHA-256 hashes every character of longKey into a 256-bit AES key
async function deriveKey(longKey) {
  const sanitizedKey = longKey.toLowerCase().replace(/[^a-z]/g, '');
  
  const keyBytes = new TextEncoder().encode(sanitizedKey);
  const hash = await crypto.subtle.digest('SHA-256', keyBytes);
  return crypto.subtle.importKey('raw', hash, { name: 'AES-CTR' }, false, ['encrypt', 'decrypt']);
}

async function encrypt(message, longKey) {
  const key = await deriveKey(longKey);
  // Static 16-byte zero array removes the need for dynamic counter generation
  const counter = new Uint8Array(16);
  const encodedMessage = new TextEncoder().encode(message);

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-CTR', counter, length: 64 },
    key,
    encodedMessage
  );

  // Returns a single Base64 ciphertext string
  return bytesToBase64(new Uint8Array(encryptedBuffer));
}

async function decrypt(ciphertextBase64, longKey) {
  try {
    const key = await deriveKey(longKey);
    const counter = new Uint8Array(16);
    const ciphertext = base64ToBytes(ciphertextBase64);

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-CTR', counter, length: 64 },
      key,
      ciphertext
    );

    const bytes = new Uint8Array(decryptedBuffer);

    // Map bytes strictly to printable ASCII characters (32 to 126)
    const asciiChars = Array.from(bytes).map(b => {
      // Preserve valid printable ASCII, newlines (\n), and tabs (\t)
      if (b === 10 || b === 13) return ' '; // Replaces \n and \r with a space
      if ((b >= 32 && b <= 126) || b === 9) {
        return String.fromCharCode(b);
      }
      // Wrap non-ASCII/garbage bytes into printable ASCII range (32 to 126)
      return String.fromCharCode(32 + (b % 95));
    });

    return asciiChars.join('');
  } catch (err) {
    return "DecryptError: Invalid payload format";
  }
}

export { encrypt, decrypt };