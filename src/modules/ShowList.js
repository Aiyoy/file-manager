import fsProm from 'fs/promises';

const showList = async (userDir) => {
  try {
    console.log(`\nList of files and folders in a directory ${userDir}\n`);

    const files = await fsProm.readdir(userDir, {withFileTypes: true});
    files.forEach(async (file) => {
      console.log(`${file.name} - ${file.isDirectory() ? 'directory' : 'file'}`);
    })
    console.log(`\nYou are currently in ${process.cwd()}\n(If you want to finish: enter ".exit" or press Ctrl + C)\n`);
  } catch (err) {
    console.log(new Error('\nOperation failed'));
  }
};

export {showList};
