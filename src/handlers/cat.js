import { createReadStream  } from 'fs';
import { join } from 'path';

import { getCurrentPath, displayCurrentDirectory, displayErrorOperation } from '../libs/index.js'

const getResult = (stream) => {
  const data = [];

  return (
    new Promise((resolve, reject) => {
      stream.on('data', (chunk) => data.push(Buffer.from(chunk)));
      stream.on('error', (error) => reject(error));
      stream.on('end', () => {
        resolve(Buffer.concat(data).toString('utf-8'))
      });
    })
  );
};


export const cat = async ([rawPath]) => {
  try {
    const filePath = join(getCurrentPath(), rawPath);
    const stream = createReadStream(filePath);

    const result = await getResult(stream);

    console.log(result);
    displayCurrentDirectory();
  } catch {
    displayErrorOperation();
  }
}
