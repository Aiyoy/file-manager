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

const goUpper = () => {
  const userDir = process.env.USERDIR;
  const rootDir = process.env.HOMEDRIVE;
  const upperUserDir = userDir.slice(0, userDir.lastIndexOf('\\'));

  if (userDir !== rootDir) {
    process.env.USERDIR = upperUserDir;
  } else {
    console.log('\nYou cannot go above the root directory!');
  }
};

export {goUpper};
