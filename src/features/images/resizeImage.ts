import path from 'path';
import sharp from 'sharp';
import { Path } from '../../consts/paths';

const resizeImageAsThumb = async (
  imageThumb: string,
  height: number,
  width: number
): Promise<void> => {
  console.log('Resizing');

  const buffer = path.join(Path.imagesFullPath, imageThumb);
  const sharpedImage = sharp(buffer);
  const resizedimage = sharpedImage.resize(width, height);

  await resizedimage.toFile(path.join(Path.imagesThumbPath, imageThumb));
};

export default resizeImageAsThumb;
