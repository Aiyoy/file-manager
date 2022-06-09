// hash C:\Users\Veron\newFile.txt

import fs from 'fs';
import crypto from 'crypto';

import { convertPath } from './ConvertingPath.js';

const calcHash = async (pathToFile) => {
  if (!pathToFile) {
    console.log(new Error('\nYou must enter a path to file. Try again\n'));
    return;
  }
  
  const convertingPath = convertPath(pathToFile);

  fs.access(convertingPath, (error) => {
    try {
      if (error) throw new Error(`\nThe specified file does not exist: ${convertingPath}! Try a different path\n`);
      const readableStream = fs.createReadStream(convertingPath, "utf8");
      const hash = crypto.createHash('sha256');
      hash.setEncoding('hex');

      readableStream.on('end', function() {
        hash.end();
        console.log('Hash: ', hash.read());
      });    
      readableStream.pipe(hash);
    } catch (err) {
      console.log(err);
    }      
  });
};

export {calcHash};
