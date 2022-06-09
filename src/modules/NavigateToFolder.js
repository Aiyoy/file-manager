// cd C:\Users\Public
// cd ..\..\Windows\smth
// cd .\Links\smth
// cd D:\Users\Public

const goToFolder = async (pathToFolder) => {
  if (!pathToFolder) {
    console.log(new Error('\nYou must enter a path to folder. Try again\n'));
    return;
  }

  try {
    process.chdir(pathToFolder);
  } catch (error) {
    console.log(new Error('\nInvalid input! Try a different path'));
  }
};

export {goToFolder};
