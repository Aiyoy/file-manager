// cp C:\Users\Public\fileForReading.txt C:\Users\Veron

import fs from 'fs';
import path from 'path';
import fsProm from 'fs/promises';

import { convertPath } from './ConvertingPath.js';

const copyFileByPath = async (pathToFile, newFileDir) => {
  if (!pathToFile && !newFileDir) {
    console.log(new Error('\nYou must enter a path to file and a new file directory. Try again\n'));
    return;
  } else if (!pathToFile) {
    console.log(new Error('\nYou must enter a path to file. Try again\n'));
    return;
  } else if (!newFileDir) {
    console.log(new Error('\nYou must enter a new file directory. Try again\n'));
    return;
  }

  const convertingPath = convertPath(pathToFile);
  const fileName = path.parse(convertingPath).base;
  const pathToCopy = path.join(newFileDir, fileName);

  fs.access(convertingPath, (error) => {
    try {
      if (error) throw new Error(`\nFile does not exist at given path: ${pathToFile}! Try with a different path\n`);
      fs.access(pathToCopy, async (error) => {
        try {
          if (!error) throw new Error(`\nA file with name ${fileName} already exists in the ${newFileDir}! Try with a different path\n`);
          await fsProm.copyFile(convertingPath, pathToCopy);
          console.log(`\nA file with name ${fileName} copied to the ${newFileDir}!\n`);
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }      
  });
};

export {copyFileByPath};
