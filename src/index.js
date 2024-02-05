import { homedir } from 'os';
import readline from 'readline';

import { 
  parseArgumens,
  displayGreetings,
  displayCurrentDirectory,
  displayInvalidInput,
} from './libs/index.js'
import {
  up,
  cd,
  ls,
  cat,
  add,
  rn,
  cp,
  mv,
  rm,
  os,
  hash,
  compress,
  decompress,
} from './handlers/index.js'

process.chdir(homedir());

const args = parseArgumens();

const username = args['--username'] || 'unknown user';

displayGreetings(username);
displayCurrentDirectory();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const parseInput = async (input) => {
  let [command, ...args] =  input.trim().split(' ');

  switch (command) {
    case '.exit':
      rl.close();
      break;
    case 'up':
      await up();
      break;
    case 'cd':
      await cd(args);
      break;
    case 'ls':
      await ls();
      break;
    case 'cat':
      await cat(args);
      break;
    case 'add':
      await add(args);
      break;
    case 'rn':
      await rn(args);
      break;
    case 'cp':
      await cp(args);
      break;
    case 'mv':
      await mv(args);
      break;
    case 'rm':
      await rm(args);
      break;
    case 'os':
      await os(args);
      break;
    case 'hash':
      await hash(args);
      break;
    case 'compress':
      await compress(args);
      break;
    case 'decompress':
      await decompress(args);
      break;
    default:
      displayInvalidInput();
  }
}

rl
  .on('line', parseInput)
  .on('SIGINT', () => rl.close())
  .on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  });
