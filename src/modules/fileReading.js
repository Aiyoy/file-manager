// cat C:\Users\Public\fileForReading.txt
// cat C:\Users\Public\fileForReing.txt

import fs from 'fs';
import path from 'path';

const { stdout } = process;

const readFileByPath = async (pathToFile) => {
  let newPath = '';

  if (path.isAbsolute(pathToFile)) {
    newPath = pathToFile;
  } else {
    newPath = path.normalize(path.join(process.cwd(), pathToFile));
  }

  fs.access(newPath, (error) => {
    try {
      if (error) throw new Error('\nInvalid input! Try a different path\n');
      const readableStream = fs.createReadStream(newPath, "utf8");
      readableStream.on('data', (data) => { 
        stdout.write(`${data}\n\n`);
      });
    } catch (err) {
      console.log(err);
    }      
  });
};

export {readFileByPath};