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
  let [command, ...arg] =  input.trim().split(' ');

  switch (command) {
    case '.exit':
      rl.close();
      break;
    case 'up':
      await up();
      break;
    case 'cd':
      await cd(arg);
      break;
    case 'ls':
      await ls();
      break;
    case 'cat':
      await cat(arg);
      break;
    case 'add':
      await add(arg);
      break;
    case 'rn':
      await rn(arg);
      break;
    case 'cp':
      await cp(arg);
      break;
    case 'mv':
      await mv(arg);
      break;
    case 'rm':
      await rm(arg);
      break;
    case 'os':
      await os(arg);
      break;
    case 'hash':
      await hash(arg);
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



// let username = '';

// process.on('beforeExit', () => {
//   if (username) {
//     console.log(`Thank you for using File Manager, ${username}, goodbye!`);
//   }
// });

// process.on('SIGINT', () => {
//   process.exit();
// });

// const args = process.argv.slice(2);
// const usernameArg = args.find(arg => arg.startsWith('--username='));

// if (usernameArg) {
//   username = usernameArg.split('=')[1];
//   console.log(`Welcome to the File Manager, ${username}!`);
// } else {
//   console.log('Welcome to the File Manager!');
// }

// process.stdin.on('data', input => {
//   const userInput = input.toString().trim();
//   if (userInput === '.exit') {
//     process.exit();
//   }
// });