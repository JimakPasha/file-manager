import { displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

export const up = async () => {
  try {
    process.chdir('..');
    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  }
}