/* 
Reads a file in tiny chunks
options are:
 * - progressCB: a function that accepts the read chunk
                          as its only argument. If binary option
                          is set to true, this function will receive
                          an instance of ArrayBuffer, otherwise a String
 * - errorCB:      an optional function that accepts an object of type
                          FileReader.error
 */
function parseFile(file, options) {
  // providing a default options
  const opts = typeof options === "undefined" ? {} : options;
  // determince the size of the file
  const fileSize = file.size;

  // each file will be read in this much of chunk
  const chunkSize = 64 * 1024;

  let offset = 0;

  const chunkReadCallback =
    typeof opts["progressCB"] === "function"
      ? opts["progressCB"]
      : function () {};
  const chunkErrorCallback =
    typeof opts["errorCB"] === "function" ? opts["errorCB"] : function () {};

  function onLoadHandler(evt) {
    if (evt.target.error === null) {
      offset += evt.target.result.byteLength;
      // checking if the file read entirely
      const isFinishedReading = offset >= fileSize;
      chunkReadCallback({
        data: evt.target.result,
        isFinished: isFinishedReading,
        progress: Math.round((offset / fileSize) * 100),
      });

      if (isFinishedReading) return;
    } else {
      // an error occurred read the file
      chunkErrorCallback(evt.target.error);
      return;
    }

    readBlock(offset, chunkSize, file);
  }

  function readBlock() {
    var r = new FileReader();
    var blob = file.slice(offset, chunkSize + offset);
    r.onload = onLoadHandler;
    r.readAsArrayBuffer(blob);
  }

  readBlock(offset, chunkSize, file);
}

function getFileName(string, ext, defaultName) {
  defaultName = `${defaultName || "file"}.txt`;

  const hasExt = string.includes(`.${ext}`);
  let filename;
  if (!hasExt) filename = defaultName;
  else filename = string.replace(`.${ext}`, "");

  return filename;
}

function download(filename, data) {
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(data);
  a.href = url;
  a.download = filename;
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
