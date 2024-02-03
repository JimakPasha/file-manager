import { createReadStream, createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { join, parse, resolve } from 'path';
import { pipeline } from 'stream/promises';

import { getCurrentPath, displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

export const mv = async ([fileName, rawPathToNewDirectory]) => {
  try {
    const pathToFile = join(getCurrentPath(), fileName);
    const { base } = parse(pathToFile);
    const pathToNewDirectory = resolve(rawPathToNewDirectory, base);

    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToNewDirectory);

    await pipeline(readableStream, writableStream);
    await unlink(pathToFile);

    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  }
}
