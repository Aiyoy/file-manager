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
import { readFileByPath } from './modules/fileReading.js';
import { createFile } from './modules/AddingFile.js';

const { stdin, stdout } = process;

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

export const fileManagerStart = () => {
  const args = process.argv;

  process.chdir(os.homedir());
  rl.write(`Welcome to the File Manager, ${args[2].slice(11)}!\n\n`);
  rl.write(`You are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n\n`);
  rl.on('line', (input) => chooseCommand(input));

  rl.on('close', () => console.log(`Thank you for using File Manager, ${args[2].slice(11)}!\n`));
};

fileManagerStart();

// const createChildrenProcess = (path, args) => {
//   const childProcess = child_process.fork(path, args);

//   childProcess.on('message', (msg) => process.env.USERDIR = msg);
// };

const chooseCommand = (input) => {
  const commandArr = input.split(' ');
  const command = commandArr[0];

  switch (command) {
    case 'up':
        // createChildrenProcess(path.join(__dirname, 'modules', 'ToUpperDirectory'), [process.env.USERDIR]);
        process.chdir(goUpper(process.cwd()));
        break;
    case 'cd':
      // process.env.USERDIR = goToFolder(process.env.USERDIR, commandArr[1]);
      goToFolder(commandArr[1]);
        break;
    case 'ls':
      // createChildrenProcess(path.join(__dirname, 'modules', 'ShowList'), [process.env.USERDIR]);
      showList(process.cwd());
        break;
    case 'cat':
      readFileByPath(commandArr[1]);
        break;
    case 'add':
        createFile(commandArr[1]);
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
 console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
}
