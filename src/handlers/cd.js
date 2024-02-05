import { displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

export const cd = async ([path]) => {
  try {
    process.chdir(path);
    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  }
}
