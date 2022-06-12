import fs from 'fs';
import path from 'path';

import { convertPath } from './ConvertingPath.js';

const { stdout } = process;

const readFileByPath = async (pathToFile) => {
  if (!pathToFile) {
    console.log('\nYou must enter a path to file. Try again\n');
    return;
  }
  
  const convertingPath = convertPath(pathToFile);

  fs.access(convertingPath, (error) => {
    try {
      if (error) throw new Error(`\nOperation failed\n`);
      const readableStream = fs.createReadStream(convertingPath, "utf8");
      console.log(`\nInformation from a file ${path.parse(pathToFile).base}\n`);
      readableStream.on('data', (data) => {
        stdout.write(`${data}\n\n`);
      });
      readableStream.on('end', () => {
        console.log(`You are currently in ${process.cwd()}\n(If you want to finish: enter ".exit" or press Ctrl + C)\n`);
      });
      readableStream.on('error', (error) => {
        console.log(new Error(`\nOperation failed\n`));
      });
      console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter ".exit" or press Ctrl + C)\n`);
    } catch (err) {
      console.log(err);
    }      
  });
};

export {readFileByPath};
