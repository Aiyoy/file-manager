import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream';

import { convertPath } from './ConvertingPath.js';

const decompressFile = async (pathToFile, pathToDestination) => {
  if (!pathToFile && !pathToDestination) {
    console.log('\nYou must enter a path to file and a path to destination. Try again\n');
    return;
  }
  if (!pathToFile) {
    console.log('\nYou must enter a path to file. Try again\n');
    return;
  }
  if (!pathToDestination) {
    console.log('\nYou must enter a path to destination. Try again\n');
    return;
  }
  
  const convertingPathToFile = convertPath(pathToFile);
  const convertingPathToDestination = convertPath(pathToDestination);
  const fileName = path.parse(convertingPathToFile).base;
  const newFileName = fileName.slice(0, fileName.lastIndexOf('.'));
  const pathToCopy = path.join(convertingPathToDestination, newFileName);

  fs.access(convertingPathToFile, (error) => {
    try {
      if (error) throw new Error(`\nOperation failed\n`);
      fs.access(convertingPathToDestination, (error) => {
        try {
          if (error) throw new Error(`\nOperation failed\n`);
          
          const brot = zlib.createBrotliDecompress();
          const source = fs.createReadStream(convertingPathToFile);
          const destination = fs.createWriteStream(pathToCopy);
          
          pipeline(source, brot, destination, (err) => {
            if (err) {
              console.log(new Error(`\nOperation failed\n`));
              console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
              return;
            }
            console.log(`\nFile ${path.parse(pathToFile).base} decompressed\n`);

            fs.unlink(convertingPathToFile, error => {
              try {
                if (error) throw new Error(`\nOperation failed\n`);
              } catch (err) {
                console.log(err);
                console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
              }
            });
            console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
          });
        } catch (err) {
          console.log(err);
          console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
        }
      });
    } catch (err) {
      console.log(err);
      console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
    }      
  });
};

export {decompressFile};
