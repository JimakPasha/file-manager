import { unlink } from 'fs/promises';
import { join } from 'path';

import { getCurrentPath, displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

export const rm = async ([fileName]) => {
  try {
    const pathToFile = join(getCurrentPath(), fileName);

    await unlink(pathToFile);
    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  }
}
