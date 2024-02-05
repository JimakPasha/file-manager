import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { join, parse, resolve } from 'path';

import { getCurrentPath, displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

export const decompress = async ([filePath, rawPathToNewDirectory]) => {
  try {
    const readableFilePath = join(getCurrentPath(), filePath);
    const { name, ext } = parse(readableFilePath);
    if (!ext.includes('.br')) {
      throw new Error();
    }
    const archiveFilePath = resolve(rawPathToNewDirectory, name);

    const readStream = createReadStream(readableFilePath);
    const writeStream = createWriteStream(archiveFilePath);

    const unzip = createBrotliDecompress();

    readStream.pipe(unzip).pipe(writeStream);	

    writeStream.on('error', () => {
      throw new Error();
    });

    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  }
}
