// import fsProm from 'fs/promises';

// let userDir = process.argv[2];

// const showList = async () => {
//   console.log(`\nList of files and folders in a directory ${userDir}\n`);

//   const files = await fsProm.readdir(userDir);
//   files.forEach(async (file) => {
//     // const filePath = path.join(userDir, `${file}`);
//     // const fileInf = path.parse(filePath);
//     // console.log(fileInf.name);
//     console.log(file);
//   })
// };

// showList();
// process.disconnect();

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
