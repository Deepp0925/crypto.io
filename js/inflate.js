/**
 * deflates a given file
 * @param {*} file the file deflate (it only accepts one file, folder or multiple files don't work)
 * @param {*} progressCB this function will be called everytime the progress updated
 * @param {*} cb this function will called when there is an error or the compression is success
 */
function deflate(file, progressCB, cb) {
  try {
    if (
      !(file instanceof File) ||
      typeof progressCB !== "function" ||
      typeof cb !== "function"
    )
      return;
    const deflatedFile = new pako.Deflate();

    parseFile(file, {
      progressCB: (results) => {
        progressCB(results.progress);
        deflatedFile.push(results.data, results.isFinished);

        if (!results.isFinished) return;

        if (deflatedFile.err > 0) {
          console.log(deflatedFile.msg);
          return;
        }

        const fileStream = streamSaver.createWriteStream(
          `${file.name}.deflate`,
          {
            size: deflatedFile.result.byteLength, // (optional filesize) Will show progress
            writableStrategy: undefined, // (optional)
            readableStrategy: undefined, // (optional)
          }
        );

        cb();

        const writer = fileStream.getWriter();
        writer.write(deflatedFile.result);
        writer.close();
      },
      errorCB: (err) => {
        console.error(
          "an error occurred while reading the file - defalting",
          err
        );
      },
    });
  } catch (error) {
    console.error("an error occurred while deflating in catch", error);
  }
}

/**
 * Inflates a given file
 * @param {*} file the file deflate (it only accepts one file, folder or multiple files don't work)
 * @param {*} progressCB this function will be called everytime the progress updated
 * @param {*} cb this function will called when there is an error or the compression is success
 */
function inflate(file, progressCB, cb) {
  try {
    if (
      !(file instanceof File) ||
      typeof progressCB !== "function" ||
      typeof cb !== "function"
    )
      return;

    const inflatedFile = new pako.Inflate();

    parseFile(file, {
      progressCB: (results) => {
        progressCB(results.progress);
        inflatedFile.push(results.data, results.isFinished);

        if (!results.isFinished) return;

        if (inflatedFile.err > 0) {
          console.error(inflatedFile.msg);
          return;
        }

        const filename = getFileName(file.name, "deflate", "inflated");

        const fileStream = streamSaver.createWriteStream(filename, {
          size: inflatedFile.result.byteLength, // (optional filesize) Will show progress
          writableStrategy: undefined, // (optional)
          readableStrategy: undefined, // (optional)
        });

        cb();

        const writer = fileStream.getWriter();
        writer.write(inflatedFile.result);
        writer.close();
      },
      errorCB: (err) => {
        console.error(
          "an error occurred while reading the file - inflating",
          err
        );
      },
    });
  } catch (error) {
    console.error("an error occurred while inflating in catch", error);
  }
}
