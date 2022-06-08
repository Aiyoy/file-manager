// npm run start -- --username=aiyoy

import { fileURLToPath } from 'url';
import path from 'path';
import os from 'os';
import readline from 'readline';
import fsProm from 'fs/promises';
import child_process from 'child_process';

import { goUpper } from './modules/ToUpperDirectory.js';
import { showList } from './modules/ShowList.js';
import { goToFolder } from './modules/NavigateToFolder.js';

const homeDir = process.env.HOME;
const rootDir = process.env.HOMEDRIVE;
process.env.USERDIR = homeDir;
const args = process.argv;

const { stdin, stdout } = process;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

export const fileManagerStart = () => {
  rl.write(`Welcome to the File Manager, ${args[2].slice(11)}!\n\n`);
  rl.write(`You are currently in ${process.env.USERDIR}\n(If you want to finish: enter "exit" or press Ctrl + C)\n\n`);
  rl.on('line', (input) => chooseCommand(input));

  rl.on('close', () => console.log(`Thank you for using File Manager, ${args[2].slice(11)}!\n`));
};

fileManagerStart();

const createChildrenProcess = (path, args) => {
  const childProcess = child_process.fork(path, args);

  childProcess.on('message', (msg) => process.env.USERDIR = msg);
};

const chooseCommand = (input) => {
  const commandArr = input.split(' ');
  const command = commandArr[0];

  switch (command) {
    case 'up':
        // createChildrenProcess(path.join(__dirname, 'modules', 'ToUpperDirectory'), [process.env.USERDIR]);
        goUpper(process.env.USERDIR);
        break;
    case 'cd':
      // process.env.USERDIR = goToFolder(process.env.USERDIR, commandArr[1]);
      goToFolder(commandArr[1]);
        break;
    case 'ls':
      // createChildrenProcess(path.join(__dirname, 'modules', 'ShowList'), [process.env.USERDIR]);
      showList(process.env.USERDIR);
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
 console.log(`\nYou are currently in ${process.env.USERDIR}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
}
