// cd C:\Users\Public
// cd ..\..\Windows\smth
// cd .\Links\smth
// cd D:\Users\Public

import fs from 'fs';
import path from 'path';

import { goUpper } from './ToUpperDirectory.js';

const goToFolder = async (pathToFolder) => {
  try {
    process.chdir(pathToFolder);
  } catch (error) {
    console.log(new Error('\nInvalid input! Try a different path'));
  }
};

export {goToFolder};
