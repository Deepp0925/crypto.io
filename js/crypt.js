function convertWordArrayToUint8Array(wordArray) {
  var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
  var length = wordArray.hasOwnProperty("sigBytes")
    ? wordArray.sigBytes
    : arrayOfWords.length * 4;
  var uInt8Array = new Uint8Array(length),
    index = 0,
    word,
    i;
  for (i = 0; i < length; i++) {
    word = arrayOfWords[i];
    uInt8Array[index++] = word >> 24;
    uInt8Array[index++] = (word >> 16) & 0xff;
    uInt8Array[index++] = (word >> 8) & 0xff;
    uInt8Array[index++] = word & 0xff;
  }
  return uInt8Array;
}
/**
 * encrypt a given file in AES
 * @param {*} file the file (it only accepts one file, folder or multiple files don't work)
 * @param {*} password password to encrypt
 * @param {*} progressCB this function will be called everytime the progress updated
 * @param {*} cb this function will called when there is an error or the compression is success
 */
function encryptAES(file, password, progressCB, cb) {
  try {
    if (
      !(file instanceof File) ||
      typeof progressCB !== "function" ||
      typeof cb !== "function" ||
      !password
    )
      return;

    const fileReader = new FileReader();

    fileReader.onprogress = (evt) => {
      progressCB(Math.floor(evt.loaded / evt.total) * 100);
    };

    fileReader.onload = (evt) => {
      const data = evt.target.result;
      console.log(data);

      const wordArray = CryptoJS.lib.WordArray.create(data); // Convert: ArrayBuffer -> WordArray
      const encryptedData = CryptoJS.AES.encrypt(
        wordArray,
        password
      ).toString();

      const fileEnc = new Blob([encryptedData]); // Create blob from string

      download(file.name + ".aes", fileEnc);

      cb();
    };

    fileReader.readAsArrayBuffer(file);
  } catch (error) {
    console.error("an error occurred while encrypting in catch", error);
  }
}

/**
 * decrypts a given file in AES
 * @param {*} file the file (it only accepts one file, folder or multiple files don't work)
 * @param {*} password password to encrypt
 * @param {*} progressCB this function will be called everytime the progress updated
 * @param {*} cb this function will called when there is an error or the compression is success
 */
function decryptAES(file, password, progressCB, cb) {
  try {
    if (
      !(file instanceof File) ||
      typeof progressCB !== "function" ||
      typeof cb !== "function" ||
      !password
    )
      return;

    const fileReader = new FileReader();

    fileReader.onprogress = (evt) => {
      progressCB(Math.floor(evt.loaded / evt.total) * 100);
    };

    fileReader.onload = (evt) => {
      const data = evt.target.result;

      const decrypted = CryptoJS.AES.decrypt(data, password); // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
      const typedArray = convertWordArrayToUint8Array(decrypted); // Convert: WordArray -> typed array

      const fileDec = new Blob([typedArray]); // Create blob from typed array

      const filename = getFileName(file.name, "aes", "aes_decrypted");

      download(filename, fileDec);

      cb();
    };

    fileReader.readAsText(file);
  } catch (error) {
    console.error("an error occurred while decrypting in catch", error);
  }
}

/**
 * encrypt a given file in AES
 * @param {*} file the file (it only accepts one file, folder or multiple files don't work)
 * @param {*} password password to encrypt
 * @param {*} progressCB this function will be called everytime the progress updated
 * @param {*} cb this function will called when there is an error or the compression is success
 */
function encryptDES(file, password, progressCB, cb) {
  try {
    if (
      !(file instanceof File) ||
      typeof progressCB !== "function" ||
      typeof cb !== "function" ||
      !password
    )
      return;

    const fileReader = new FileReader();

    fileReader.onprogress = (evt) => {
      progressCB(Math.floor(evt.loaded / evt.total) * 100);
    };

    fileReader.onload = (evt) => {
      const data = evt.target.result;
      console.log(data);

      const wordArray = CryptoJS.lib.WordArray.create(data); // Convert: ArrayBuffer -> WordArray
      const encryptedData = CryptoJS.TripleDES.encrypt(
        wordArray,
        password
      ).toString();

      const fileEnc = new Blob([encryptedData]); // Create blob from string

      download(file.name + ".des", fileEnc);

      cb();
    };

    fileReader.readAsArrayBuffer(file);
  } catch (error) {
    console.error("an error occurred while encrypting in catch", error);
  }
}

/**
 * decrypts a given file in AES
 * @param {*} file the file (it only accepts one file, folder or multiple files don't work)
 * @param {*} password password to encrypt
 * @param {*} progressCB this function will be called everytime the progress updated
 * @param {*} cb this function will called when there is an error or the compression is success
 */
function decryptDES(file, password, progressCB, cb) {
  try {
    if (
      !(file instanceof File) ||
      typeof progressCB !== "function" ||
      typeof cb !== "function" ||
      !password
    )
      return;

    const fileReader = new FileReader();

    fileReader.onprogress = (evt) => {
      progressCB(Math.floor(evt.loaded / evt.total) * 100);
    };

    fileReader.onload = (evt) => {
      const data = evt.target.result;

      const decrypted = CryptoJS.TripleDES.decrypt(data, password); // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
      const typedArray = convertWordArrayToUint8Array(decrypted); // Convert: WordArray -> typed array

      const fileDec = new Blob([typedArray]); // Create blob from typed array

      const filename = getFileName(file.name, "des", "des_decrypted");

      download(filename, fileDec);

      cb();
    };

    fileReader.readAsText(file);
  } catch (error) {
    console.error("an error occurred while decrypting in catch", error);
  }
}

/**
 * encrypt a given file in Rabbit
 * @param {*} file the file (it only accepts one file, folder or multiple files don't work)
 * @param {*} password password to encrypt
 * @param {*} progressCB this function will be called everytime the progress updated
 * @param {*} cb this function will called when there is an error or the compression is success
 */
function encryptRabbit(file, password, progressCB, cb) {
  try {
    if (
      !(file instanceof File) ||
      typeof progressCB !== "function" ||
      typeof cb !== "function" ||
      !password
    )
      return;

    const fileReader = new FileReader();

    fileReader.onprogress = (evt) => {
      progressCB(Math.floor(evt.loaded / evt.total) * 100);
    };

    fileReader.onload = (evt) => {
      const data = evt.target.result;

      const wordArray = CryptoJS.lib.WordArray.create(data); // Convert: ArrayBuffer -> WordArray

      const encryptedData = CryptoJS.Rabbit.encrypt(
        wordArray,
        password
      ).toString();

      const fileEnc = new Blob([encryptedData]); // Create blob from string

      download(file.name + ".rabbit", fileEnc);

      cb();
    };

    fileReader.readAsArrayBuffer(file);
  } catch (error) {
    console.error("an error occurred while encrypting in catch", error);
  }
}

/**
 * decrypts a given file in AES
 * @param {*} file the file (it only accepts one file, folder or multiple files don't work)
 * @param {*} password password to encrypt
 * @param {*} progressCB this function will be called everytime the progress updated
 * @param {*} cb this function will called when there is an error or the compression is success
 */
function decryptRabbit(file, password, progressCB, cb) {
  try {
    if (
      !(file instanceof File) ||
      typeof progressCB !== "function" ||
      typeof cb !== "function" ||
      !password
    )
      return;

    const fileReader = new FileReader();

    fileReader.onprogress = (evt) => {
      progressCB(Math.floor(evt.loaded / evt.total) * 100);
    };

    fileReader.onload = (evt) => {
      const data = evt.target.result;

      const decrypted = CryptoJS.Rabbit.decrypt(data, password); // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
      const typedArray = convertWordArrayToUint8Array(decrypted); // Convert: WordArray -> typed array

      const fileDec = new Blob([typedArray]); // Create blob from typed array

      const filename = getFileName(file.name, "rabbit", "rabbit_decrypted");

      download(filename, fileDec);

      cb();
    };

    fileReader.readAsText(file);
  } catch (error) {
    console.error("an error occurred while decrypting in catch", error);
  }
}
