import fs from 'fs';
import path from 'path';
import fsProm from 'fs/promises';

import { convertPath } from './ConvertingPath.js';

const copyFileByPath = async (pathToFile, newFileDir) => {
  if (!pathToFile && !newFileDir) {
    console.log('\nYou must enter a path to file and a new file directory. Try again\n');
    return;
  } else if (!pathToFile) {
    console.log('\nYou must enter a path to file. Try again\n');
    return;
  } else if (!newFileDir) {
    console.log('\nYou must enter a new file directory. Try again\n');
    return;
  }

  const convertingPrewiousPath = convertPath(pathToFile);
  const convertingPathToNewDirrectory = convertPath(newFileDir);
  const fileName = path.parse(convertingPrewiousPath).base;
  const pathToCopy = path.join(convertingPathToNewDirrectory, fileName);

  fs.access(pathToCopy, async (error) => {
    try {
      if (!error) throw error;
      await fsProm.copyFile(convertingPrewiousPath, pathToCopy);
      console.log(`\nA file with name ${fileName} copied to the ${newFileDir}!\n`);
      console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
    } catch (err) {
      console.log(new Error(`\nOperation failed\n`));
      console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
    }
  });
};

export {copyFileByPath};
