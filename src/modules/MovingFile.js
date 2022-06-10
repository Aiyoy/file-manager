import fs from 'fs';
import path from 'path';
import fsProm from 'fs/promises';

import { convertPath } from './ConvertingPath.js';

const moveFile = async (pathToFile, newFileDir) => {
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

  const convertingPathToFile = convertPath(pathToFile);
  const convertingPathToNewDir = convertPath(newFileDir);
  const fileName = path.parse(convertingPathToFile).base;
  const pathToCopy = path.join(convertingPathToNewDir, fileName);

  fs.access(pathToCopy, async (error) => {
    try {
      if (!error) throw error;
      await fsProm.rename(
        convertingPathToFile,
        pathToCopy,
        (error) => {
          if (error) throw error;
        }
      );
      console.log(`\nA file with name ${fileName} moved to the ${newFileDir}!\n`);
      console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
    } catch (err) {
      console.log(new Error(`\nOperation failed\n`));
      console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
    }   
  });

  // fs.access(pathToCopy, async (error) => {
  //   try {
  //     if (!error) throw new Error(`\nOperation failed\n`);
  //     await fsProm.copyFile(convertingPathToFile, pathToCopy);
  //     fs.unlink(convertingPathToFile, error => {
  //       if (error) throw error;
  //     });
  //     console.log(`\nA file with name ${fileName} moved to the ${newFileDir}!\n`);
  //     console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
  //   } catch (err) {
  //     console.log(new Error(`\nOperation failed\n`));
  //     console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
  //   }
  // });
};

export {moveFile};
