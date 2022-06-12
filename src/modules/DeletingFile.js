import fs from 'fs';
import path from 'path';

import { convertPath } from './ConvertingPath.js';

const removeFile = async (pathToFile) => {
  if (!pathToFile) {
    console.log('\nYou must enter a path to file. Try again\n');
    return;
  }
  
  const convertingPath = convertPath(pathToFile);

  fs.unlink(convertingPath, error => {
    try {
      if (error) throw error;
      console.log(`\nFile ${path.parse(pathToFile).base} removed\n`);
      console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter ".exit" or press Ctrl + C)\n`);
    } catch (err) {
      console.log(new Error(`\nOperation failed\n`));
      console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter ".exit" or press Ctrl + C)\n`);
    }
  });
};

export {removeFile};
