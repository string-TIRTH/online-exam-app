import CryptoJS from "crypto-js";

const decryptData = (encryptedData) => {
  try {
    const AES_SECRET = process.env.REACT_APP_AES_SECRET;

    if (!AES_SECRET) {
      throw new Error("AES_SECRET is missing from the environment.");
    }
    const secretKey = CryptoJS.enc.Utf8.parse(AES_SECRET);


    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey, {
      mode: CryptoJS.mode.ECB, 
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    if (decryptedData) {
      return decryptedData;
    } else {
      console.error("Decryption failed: Resulting string is empty.");
      return null;
    }
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};

export default decryptData;
