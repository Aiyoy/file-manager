// cat C:\Users\Public\fileForReading.txt
// cat C:\Users\Public\fileForReing.txt

import fs from 'fs';
import path from 'path';

import { convertPath } from './ConvertingPath.js';

const { stdout } = process;

const readFileByPath = async (pathToFile) => {
  if (!pathToFile) {
    console.log(new Error('\nYou must enter a path to file. Try again\n'));
    return;
  }
  
  const convertingPath = convertPath(pathToFile);

  fs.access(convertingPath, (error) => {
    try {
      if (error) throw new Error('\nInvalid input! Try a different path\n');
      const readableStream = fs.createReadStream(convertingPath, "utf8");
      readableStream.on('data', (data) => {
        console.log(`\nInformation from a file ${path.parse(pathToFile).base}\n`);
        stdout.write(`${data}\n\n`);
      });
    } catch (err) {
      console.log(err);
    }      
  });
};

export {readFileByPath};