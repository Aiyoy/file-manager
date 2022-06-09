import fsProm from 'fs/promises';
import path from 'path';

const showList = async (userDir) => {
  console.log(`\nList of files and folders in a directory ${userDir}\n`);

  const files = await fsProm.readdir(userDir, {withFileTypes: true});
  files.forEach(async (file) => {
    // const filePath = path.join(userDir, `${file}`);
    // const fileInf = path.parse(filePath);
    // console.log(file.isDirectory());
    console.log(`${file.name} - ${file.isDirectory ? 'directory' : 'file'}`);
  })
};

export {showList};
