// npm run start -- --username=aiyoy

import { fileURLToPath } from 'url';
import path from 'path';
import os from 'os';
import readline from 'readline';

const homeDir = os.homedir();
const rootDir = homeDir.slice(0, homeDir.indexOf('\\'));
let userDir = homeDir;
const args = process.argv;

const { stdin, stdout } = process;

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

export const fileManagerStart = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  rl.write(`Welcome to the File Manager, ${args[2].slice(11)}!\n\n`);
  rl.write(`You are currently in ${userDir}\n(If you want to finish: enter "exit" or press Ctrl + C)\n\n`);
  rl.on('line', (input) => chooseCommand(input));

  rl.on('close', () => console.log(`Thank you for using File Manager, ${args[2].slice(11)}!\n`));
};

fileManagerStart();

const chooseCommand = (input) => {
  const commandArr = input.split(' ');
  const command = commandArr[0];

  switch (command) {
    case 'up':
        goUpper();
        break;
    case 'cd':
      console.log('command: cd');
        break;
    case 'ls':
      console.log('command: ls');
        break;
    case 'cat':
      console.log('command: cat');
        break;
    case 'add':
        console.log('command: add');
        break;
    case 'rn':
      console.log('command: rn');
        break;
    case 'cp':
      console.log('command: cp');
        break;
    case 'mv':
      console.log('command: mv');
        break;
    case 'rm':
        console.log('command: rm');
        break;
    case 'os':
      console.log('command: os');
        break;
    case 'hash':
      console.log('command: hash');
        break;
    case 'compress':
      console.log('command: compress');
        break;
    case 'decompress':
      console.log('command: decompress');
        break;
    case 'exit':
      rl.close();
        break;
    default: console.log('Invalid input');
 }
}

const goUpper = () => {
  const upperUserDir = userDir.slice(0, userDir.lastIndexOf('\\'));

  if (upperUserDir !== rootDir) {
    userDir = upperUserDir;
  } else {
    userDir = upperUserDir + '\\';
  }
  console.log(`You are currently in ${userDir}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
};
