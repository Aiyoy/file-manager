import fs from 'fs';
import path from 'path';
import fsProm from 'fs/promises';

import { convertPath } from './ConvertingPath.js';

const renameFile = async (pathToFile, newFileName) => {
  if (!pathToFile && !newFileName) {
    console.log('\nYou must enter a path to file and a new file name. Try again\n');
    return;
  } else if (!pathToFile) {
    console.log('\nYou must enter a path to file. Try again\n');
    return;
  } else if (!newFileName) {
    console.log('\nYou must enter a new file name. Try again\n');
    return;
  }

  const convertingPath = convertPath(pathToFile);
  const pathToRename = path.join(path.parse(convertingPath).dir, newFileName);

  fs.access(pathToRename, async (error) => {
    try {
      if (!error) throw error;
      await fsProm.rename(
        convertingPath,
        pathToRename,
        (error) => {
          if (error) throw error;
        }
      );
      console.log(`File renamed to ${newFileName}`);
      console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter ".exit" or press Ctrl + C)\n`);
    } catch (err) {
      console.log(new Error(`\nOperation failed\n`));
      console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter ".exit" or press Ctrl + C)\n`);
    }   
  });
};

export {renameFile};
