import fs from 'fs';
import { Path } from '../../consts/paths';

/**
 * Create Thumb directory if it's not exists
 */
const createThumbDirectory = async (): Promise<void> => {
  fs.access(Path.imagesThumbPath, (err) => {
    if (err) {
      fs.mkdir(Path.imagesThumbPath, (err) => {
        if (err) console.error('Could not create Thumb directory');
        else console.log('Thumb directory created successfully!');
      });
    } else {
      console.log('Thumb directory is already exists');
    }
  });
};

export default createThumbDirectory;
