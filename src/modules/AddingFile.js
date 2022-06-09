// add newFile.txt

import fs from 'fs';
import path from 'path';

const { stdout } = process;

const createFile = async (fileName) => {

  fs.access(path.join(process.cwd(), fileName), (error) => {
    try {
      if (!error) throw new Error('\nA file with the same name already exists! Try with a different name\n');
      fs.open(fileName, 'a+', (err) => {
        if (err) throw new Error('\nSomething went wrong... Try again\n');
        console.log(`File ${fileName} created\n`);
      });
    } catch (err) {
      console.log(err);
    }      
  });
};

export {createFile};