import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const checkThumbImageExists = async (imagePath: string): Promise<boolean> => {
  if (!fs.existsSync(imagePath)) {
    return false;
  }

  const metadata = await sharp(imagePath).metadata();

  console.log(
    `Thumb image is already exists. MetaData: ${metadata.height}x${metadata.width}`
  );

  return true;
};

export default checkThumbImageExists;
