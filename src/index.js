// npm run start -- --username=aiyoy

import os from 'os';
import readline from 'readline';
// import child_process from 'child_process';

import { goUpper } from './modules/ToUpperDirectory.js';
import { showList } from './modules/ShowList.js';
import { goToFolder } from './modules/NavigateToFolder.js';
import { readFileByPath } from './modules/FileReading.js';
import { createFile } from './modules/AddingFile.js';
import { renameFile } from './modules/RenamingFile.js';
import { copyFileByPath } from './modules/CopyingFile.js';
import { moveFile } from './modules/MovingFile.js';
import { removeFile } from './modules/DeletingFile.js';
import { getSystemInformation } from './modules/SystemInformation.js';
import { calcHash } from './modules/CalculatingHash.js';

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

const chooseCommand = (input) => {
  const commandArr = input.split(' ');
  const command = commandArr[0];

  switch (command) {
    case 'up':
        process.chdir(goUpper(process.cwd()));
        break;
    case 'cd':
      goToFolder(commandArr[1]);
        break;
    case 'ls':
      showList(process.cwd());
        break;
    case 'cat':
      readFileByPath(commandArr[1]);
        break;
    case 'add':
        createFile(commandArr[1]);
        break;
    case 'rn':
      renameFile(commandArr[1], commandArr[2]);
        break;
    case 'cp':
      copyFileByPath(commandArr[1], commandArr[2]);
        break;
    case 'mv':
      moveFile(commandArr[1], commandArr[2]);
        break;
    case 'rm':
        removeFile(commandArr[1]);
        break;
    case 'os':
      getSystemInformation(commandArr[1]);
        break;
    case 'hash':
      calcHash(commandArr[1]);
        break;
    case 'compress':
      console.log('command: compress');
        break;
    case 'decompress':
      console.log('command: decompress');
        break;
    case '.exit':
      rl.close();
        break;
    default: console.log('Invalid input');
 }
 console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
}
