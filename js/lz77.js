var output = LZUTF8.compress("hello world");
console.log(output);
var decompressed = LZUTF8.decompress(output);
console.log(decompressed);
/**
 * deflates a given file
 * @param {*} file the file deflate (it only accepts one file, folder or multiple files don't work)
 * @param {*} progressCB this function will be called everytime the progress updated
 * @param {*} cb this function will called when there is an error or the compression is success
 */
function lz77Compress(file, progressCB, cb) {
  try {
    if (
      !(file instanceof File) ||
      typeof progressCB !== "function" ||
      typeof cb !== "function"
    )
      return;

    const fileReader = new FileReader();

    fileReader.onprogress = (evt) => {
      progressCB(Math.floor(evt.loaded / evt.total) * 100);
    };

    fileReader.onload = (evt) => {
      const data = evt.target.result;

      console.log(new Uint8Array(data));

      const compressed = LZUTF8.compress(new Uint8Array(data));

      console.log(compressed);
      const fileStream = streamSaver.createWriteStream(`${file.name}.lz77`, {
        size: compressed.byteLength, // (optional filesize) Will show progress
        writableStrategy: undefined, // (optional)
        readableStrategy: undefined, // (optional)
      });

      const writer = fileStream.getWriter();
      writer.write(compressed);
      writer.close();

      cb();
    };

    fileReader.readAsArrayBuffer(file);
  } catch (error) {
    console.error("an error occurred while compressing Lz77 in catch", error);
  }
}

/**
 * Inflates a given file
 * @param {*} file the file deflate (it only accepts one file, folder or multiple files don't work)
 * @param {*} progressCB this function will be called everytime the progress updated
 * @param {*} cb this function will called when there is an error or the compression is success
 */
function lz77Decompress(file, progressCB, cb) {
  try {
    if (
      !(file instanceof File) ||
      typeof progressCB !== "function" ||
      typeof cb !== "function"
    )
      return;

    const fileReader = new FileReader();

    fileReader.onprogress = (evt) => {
      progressCB(Math.floor(evt.loaded / evt.total) * 100);
    };

    fileReader.onload = (evt) => {
      const data = evt.target.result;

      const filename = getFileName(file.name, "lz77", "lz77_decompressed");

      const decompressed = LZUTF8.decompress(new Uint8Array(data), {
        outputEncoding: "ByteArray",
      });

      const fileStream = streamSaver.createWriteStream(filename, {
        size: decompressed.byteLength, // (optional filesize) Will show progress
        writableStrategy: undefined, // (optional)
        readableStrategy: undefined, // (optional)
      });

      const writer = fileStream.getWriter();
      writer.write(decompressed);
      writer.close();

      cb();
    };

    fileReader.readAsArrayBuffer(file);
  } catch (error) {
    console.error("an error occurred while decompression in catch", error);
  }
}
