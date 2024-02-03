import { createReadStream, createWriteStream } from 'fs';
import { join, parse, resolve } from 'path';
import { pipeline } from 'stream/promises';

import { getCurrentPath, displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

export const cp = async ([fileName, rawPathToNewDirectory]) => {
  try {
    const pathToFile = join(getCurrentPath(), fileName);
    const { base } = parse(pathToFile);
    const pathToNewDirectory = resolve(rawPathToNewDirectory, base);

    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToNewDirectory);

    await pipeline(readableStream, writableStream);
    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  }
}
