// add newFile.txt

import fs from 'fs';
import path from 'path';

const { stdout } = process;

const createFile = async (fileName) => {
  if (!fileName) {
    console.log(new Error('\nYou must enter a file name. Try again\n'));
    return;
  }

  fs.access(path.join(process.cwd(), fileName), (error) => {
    try {
      if (!error) throw new Error(`\nA file with the name ${fileName} already exists! Try with a different name\n`);
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
