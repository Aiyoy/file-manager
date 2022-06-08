// cd C:\Users\Public
// cd ..\..\Windows\smth
// cd .\Links\smth
// cd D:\Users\Public

import fs from 'fs';

import { goUpper } from './ToUpperDirectory.js';

const goToFolder = async (pathToFolder) => {
  const previousLink = process.env.USERDIR;
  let newPath = process.env.HOMEDRIVE;

  try {
    const pathArr = pathToFolder.split('\\');    
    
    if (pathArr[0] === process.env.HOMEDRIVE) {
      newPath = pathToFolder;
    } else if (pathArr[0] === '.') {
      let pathEnd = '';
      for (let i = 1; i < pathArr.length; i++) {
        pathEnd += '\\' + pathArr[i];
      }
      newPath = process.env.USERDIR + pathEnd;
    } else if (pathArr[0] === '..') {
      let pathEnd = '';
      pathArr.forEach((pathEl) => {      
        if (pathEl === '..') {
          goUpper(process.env.USERDIR);
        } else {
          pathEnd += '\\' + pathEl;
        }           
      });
      newPath = process.env.USERDIR + pathEnd; 
    } else {
      throw new Error('\nInvalid input! Try a different address');
    }

    if (!fs.existsSync(newPath)) {
      throw new Error('\nDirectory does not exist! Try a different address');
    }

    process.env.USERDIR = newPath;
  } catch (error) {
    process.env.USERDIR = previousLink;
    console.log(error);
  }
};

export {goToFolder};
