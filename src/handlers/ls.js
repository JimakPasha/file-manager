import fs from 'fs/promises';

import { getCurrentPath, displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

export const ls = async () => {
  try {
    const currentPath = getCurrentPath();
    const data = await fs.readdir(currentPath, { withFileTypes: true });

    const output = data.map((el) => {
      const type = el[Object.getOwnPropertySymbols(el)[0]] === 1 ? 'file' : 'directory';
      return {name: el.name, type};
    })
    
    const sortedOutput = output.sort((a, b) => a.type.localeCompare(b.type));

    console.table(sortedOutput);
    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  }
}
