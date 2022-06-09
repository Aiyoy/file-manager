// rn C:\Users\Veron\newFile.txt newNewFile.txt

import fs from 'fs';
import path from 'path';
import fsProm from 'fs/promises';

import { convertPath } from './ConvertingPath.js';

const renameFile = async (pathToFile, newFileName) => {
  if (!pathToFile && !newFileName) {
    console.log(new Error('\nYou must enter a path to file and a new file name. Try again\n'));
    return;
  } else if (!pathToFile) {
    console.log(new Error('\nYou must enter a path to file. Try again\n'));
    return;
  } else if (!newFileName) {
    console.log(new Error('\nYou must enter a new file name. Try again\n'));
    return;
  }

  const convertingPath = convertPath(pathToFile);

  const pathToRename = path.join(path.parse(convertingPath).dir, newFileName);

  fs.access(convertingPath, (error) => {
    try {
      if (error) throw new Error(`\nFile does not exist at given path: ${pathToFile}! Try with a different path\n`);
      fs.access(pathToRename, async (error) => {
        try {
          if (!error) throw new Error(`\nA file with the name ${newFileName} already exists! Try with a different name\n`);
          await fsProm.rename(
            convertingPath,
            pathToRename,
            error => {
              try {
                if (error) throw new Error(`\nSomething went wrong... Try again\n`);
              } catch (err) {
                console.log(err);
              }
            }
          );
        } catch (err) {
          console.log(err);
        }   
      });
    } catch (err) {
      console.log(err);
    }      
  });
};

export {renameFile};
