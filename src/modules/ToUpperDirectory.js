import path from 'path';

const goUpper = (userDir) => {
  console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
  return path.join(userDir, '..');
};

export {goUpper};
