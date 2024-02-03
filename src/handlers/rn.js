import { rename } from 'fs/promises';
import { join } from 'path';

import { getCurrentPath, displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

export const rn = async ([currentFileName, newFileName]) => {
  try {
    const pathToFile = join(getCurrentPath(), currentFileName);
    const newPathToFile = join(getCurrentPath(), newFileName);

    await rename(pathToFile, newPathToFile);
    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  }
}
