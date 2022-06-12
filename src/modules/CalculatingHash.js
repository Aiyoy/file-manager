import fs from 'fs';
import crypto from 'crypto';

import { convertPath } from './ConvertingPath.js';

const calcHash = async (pathToFile) => {
  if (!pathToFile) {
    console.log('\nYou must enter a path to file. Try again\n');
    return;
  }
  
  const convertingPath = convertPath(pathToFile);

  fs.access(convertingPath, (error) => {
    try {
      if (error) throw error;
      const readableStream = fs.createReadStream(convertingPath, "utf8");
      const hash = crypto.createHash('sha256');
      hash.setEncoding('hex');

      readableStream.on('end', function() {
        hash.end();
        console.log('Hash: ', hash.read());
        console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter ".exit" or press Ctrl + C)\n`);
      });

      readableStream.on('error', (error) => {
        if (error) throw error;
      });
      
      readableStream.pipe(hash);
    } catch (err) {
      console.log(new Error(`\nOperation failed\n`));
      console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter ".exit" or press Ctrl + C)\n`);
    }      
  });
};

export {calcHash};
