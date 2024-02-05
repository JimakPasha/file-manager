import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { join, parse, resolve } from 'path';

import { getCurrentPath, displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

export const compress = async ([filePath, rawPathToNewDirectory]) => {
  try {
    const readableFilePath = join(getCurrentPath(), filePath);
    const { base } = parse(readableFilePath);
    const archiveFilePath = resolve(rawPathToNewDirectory, `${base}.br`);

    const readStream = createReadStream(readableFilePath);
    const writeStream = createWriteStream(archiveFilePath);

    const gzip = createBrotliCompress();

    readStream.pipe(gzip).pipe(writeStream);
    
    writeStream.on('error', () => {
        throw new Error();
    });

    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  }
}
