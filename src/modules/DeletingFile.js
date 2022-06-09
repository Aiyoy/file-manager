// rm C:\Users\Public\fileForReading.txt

import fs from 'fs';
import path from 'path';

import { convertPath } from './ConvertingPath.js';

const removeFile = async (pathToFile) => {
  if (!pathToFile) {
    console.log(new Error('\nYou must enter a path to file. Try again\n'));
    return;
  }
  
  const convertingPath = convertPath(pathToFile);

  fs.access(convertingPath, (error) => {
    try {
      if (error) throw new Error(`\nThe specified file does not exist: ${convertingPath}! Try a different path\n`);
      fs.unlink(convertingPath, error => {
        try {
          if (error) throw new Error(`\nSomething went wrong... Try again\n`);
        } catch (err) {
          console.log(err);
        }
      });
      console.log(`\nFile ${path.parse(pathToFile).base} removed\n`);
    } catch (err) {
      console.log(err);
    }      
  });
};

export {removeFile};
