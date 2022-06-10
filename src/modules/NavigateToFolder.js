import { convertPath } from './ConvertingPath.js';

const goToFolder = async (pathToFolder) => {
  if (!pathToFolder) {
    console.log('\nYou must enter a path to folder. Try again\n');
    return;
  }

  const convertingPathToFile = convertPath(pathToFolder);

  try {
    process.chdir(convertingPathToFile);
    console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
  } catch (error) {
    console.log(new Error('\nOperation failed'));
  }
};

export {goToFolder};
