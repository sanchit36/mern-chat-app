import CryptoJS from "crypto-es";

const keySize = 256;
const ivSize = 128;
const iterations = 100;

const secret_key = process.env.KEY;

export const toEncrypt = (msg) => {
  const salt = CryptoJS.lib.WordArray.random(128 / 8);

  const key = CryptoJS.PBKDF2(secret_key, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });

  const iv = CryptoJS.lib.WordArray.random(128 / 8);

  const encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
  return transitmessage;
};

export const toDecrypt = (transitmessage, username) => {
  if (transitmessage.startsWith("Welcome")) return transitmessage;

  if (transitmessage.startsWith(username)) return transitmessage;

  const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
  const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
  const encrypted = transitmessage.substring(64);

  const key = CryptoJS.PBKDF2(secret_key, salt, {
    keySize: keySize / 32,
    iterations: iterations,
  });

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
