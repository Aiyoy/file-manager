// decompress C:\Users\Veron\newFile.txt.gz C:\Users\Veron

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { pipeline } from 'stream';

import { convertPath } from './ConvertingPath.js';

const decompressFile = async (pathToFile, pathToDestination) => {
  if (!pathToFile && !pathToDestination) {
    console.log(new Error('\nYou must enter a path to file and a path to destination. Try again\n'));
    return;
  }
  if (!pathToFile) {
    console.log(new Error('\nYou must enter a path to file. Try again\n'));
    return;
  }
  if (!pathToDestination) {
    console.log(new Error('\nYou must enter a path to destination. Try again\n'));
    return;
  }
  
  const convertingPathToFile = convertPath(pathToFile);
  const convertingPathToDestination = convertPath(pathToDestination);

  fs.access(convertingPathToFile, (error) => {
    try {
      if (error) throw new Error(`\nThe specified file does not exist: ${convertingPathToFile}! Try a different path\n`);
      fs.access(convertingPathToDestination, (error) => {
        try {
          if (error) throw new Error(`\nThe specified directory does not exist: ${convertingPathToDestination}! Try a different path\n`);
          
          const brot = zlib.createBrotliDecompress();
          const source = fs.createReadStream(convertingPathToFile);
          const destination = fs.createWriteStream(path.join(convertingPathToDestination, `\\${path.parse(convertingPathToFile).name}`));
          
          pipeline(source, brot, destination, (err) => {
            if (err) {
              console.log(new Error(`\nSomething went wrong... Try again\n`));
              return;
            }
            console.log(`\nFile ${path.parse(pathToFile).base} decompressed\n`);

            fs.unlink(convertingPathToFile, error => {
              try {
                if (error) throw new Error(`\nSomething went wrong... Try again\n`);
              } catch (err) {
                console.log(err);
              }
            });
          });
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }      
  });
};

export {decompressFile};
