import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';

import { getCurrentPath, displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

export const hash = async ([path]) => {
  try {
    const newHash = createHash('sha256');

    const filePath = join(getCurrentPath(), path);

    const readableStream = createReadStream(filePath);
    readableStream.on('data', (chunk) => {
      newHash.update(chunk);
    });

    readableStream.on('end', () => {
      console.log(newHash.digest('hex'));
      displayCurrentDirectory();
    });

    readableStream.on('error', () => {
      displayErrorOperation();
    });

  } catch {
    displayErrorOperation();
  }
}
