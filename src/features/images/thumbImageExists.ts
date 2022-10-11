import fs from 'fs';
import sharp from 'sharp';

const checkThumbImageExists = async (
  imagePath: string,
  height: number,
  width: number
): Promise<boolean> => {
  if (!fs.existsSync(imagePath)) {
    return false;
  }

  const metadata = await sharp(imagePath).metadata();

  if (metadata.height == height && metadata.width == width) {
    console.log(
      `Thumb image is already exists. MetaData: ${metadata.height}x${metadata.width}`
    );
    return true;
  }

  return false;
};

export default checkThumbImageExists;
