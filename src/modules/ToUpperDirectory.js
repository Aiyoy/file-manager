// let userDir = process.argv[2];

// const goUpper = () => {
//   const upperUserDir = userDir.slice(0, userDir.lastIndexOf('\\'));

//   if (upperUserDir !== process.env.HOMEDRIVE) {
//     userDir = upperUserDir;
//   } else {
//     userDir = upperUserDir + '\\';
//   }
//   console.log(`\nYou are currently in ${userDir}\n(If you want to finish: enter "exit" or press Ctrl + C)\n`);
// };

// goUpper();

// process.send(userDir);
// process.disconnect();

import path from 'path';

const goUpper = (userDir) => path.join(userDir, '..');

export {goUpper};
