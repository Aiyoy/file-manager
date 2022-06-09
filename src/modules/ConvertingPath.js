import path from 'path';

const convertPath = (previousPpath) => {
  if (path.isAbsolute(previousPpath)) {
    return previousPpath;
  } else {
    return path.normalize(path.join(process.cwd(), previousPpath));
  }
};

export {convertPath};
