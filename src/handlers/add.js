import { open } from 'fs/promises';
import { join } from 'path';

import { getCurrentPath, displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

export const add = async ([newFileName]) => {
  let fileHandle;
  try {
    const pathToFile = join(getCurrentPath(), newFileName);
    fileHandle = await open(pathToFile, 'w');

    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  } finally {
    fileHandle?.close();
  }
}
