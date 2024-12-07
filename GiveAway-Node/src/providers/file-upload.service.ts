import path = require('path');
import url = require('url');
import { unlink, createWriteStream, createReadStream } from 'fs';

import { fsRoot } from '../server-config';

export const filesRoot = () => {
  const fs_root_path = fsRoot() + '/drive';
  return fs_root_path.toString();
};

export const imageFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const songFileFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(mp3|wav|aac|m4a|flac|wma)$/)) {
    return callback(new Error('Only song files are allowed!'), false);
  }
  callback(null, true);
}

export const editFileName = (req: any, file: any, callback: any) => {
  const filename = file.originalname.replace(/[^A-Z0-9.]+/gi, '_');
  callback(null, Date.now() + filename);
};

export const fileName = (src: any) => {
  return path.basename(src);
};

/*** Profile Picture */
export const profileDestDir = () => {
  return filesRoot() + '/profile';
};

/*** Multiple File */
export const multiFileDestDir = () => {
  return filesRoot() + '/files';
};

export const copyFile = (src: any, dest: any) => {
  src = filesRoot() + url.parse(src).pathname;

  // src = fsRoot() + '/' + url.parse(src).pathname;
  const readStream = createReadStream(src);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  readStream.once('error', (err) => {
    // Logger.debug(err);
  });

  readStream.once('end', () => {
    // Logger.debug("done copying");
  });

  readStream.pipe(createWriteStream(dest));

  unlink(src, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

export const removeFile = (userPath: any) => {
  const absPath = path.join(filesRoot(), userPath);

  unlink(absPath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
