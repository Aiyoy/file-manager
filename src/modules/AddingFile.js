import fs from 'fs';
import path from 'path';

const { stdout } = process;

const createFile = async (fileName) => {
  if (!fileName) {
    console.log('\nYou must enter a file name. Try again\n');
    return;
  }

  fs.access(path.join(process.cwd(), fileName), (error) => {
    try {
      if (!error) throw new Error(`\nOperation failed\n`);
      fs.open(fileName, 'a+', (error) => {
        try {
          if (error) throw new Error('\nOperation failed\n');
          console.log(`File ${fileName} created\n`);
          console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);   
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

export {createFile};
