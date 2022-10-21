import path from 'path';
import sharp from 'sharp';
import { Path } from '../../consts/paths';

const resizeImageAsThumb = async (
  imageName: string,
  height: number,
  width: number
): Promise<void> => {
  console.log(`Resizing ${imageName} to ${height}x${width}`);

  const imageThumbName = `${imageName}-${height}x${width}.jpg`;

  const buffer = path.join(Path.imagesFullPath, `${imageName}.jpg`);
  const sharpedImage = sharp(buffer);

  const resizedimage = sharpedImage.resize(width, height);

  await resizedimage.toFile(path.join(Path.imagesThumbPath, imageThumbName));
};

export default resizeImageAsThumb;
