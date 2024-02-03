import { cpus, userInfo, EOL } from 'os';

import { displayCurrentDirectory, displayErrorOperation, displayInvalidInput } from '../libs/index.js'

export const os = ([arg]) => {
  try {
    switch(arg) {
      case '--EOL':
        console.log(JSON.stringify(EOL));
      break;
      case '--cpus':
        const cpusInfo = cpus().map(({ model, speed }) => ({
          model,
          speed: `${speed / 1000}GHz`
        }));
        console.table(cpusInfo);
      break;
      case '--homedir':
        console.log(userInfo().homedir);
      break;
      case '--username':
        console.log(userInfo().username);
      break;
      case '--architecture':
        console.log(process.arch);
      break;
      default:
        throw new Error();
    }
  
    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  }
} 