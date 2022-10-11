import express from 'express';
import fs from 'fs';
import path from 'path';
import { Path } from '../../consts/paths';
import { StatusCode } from '../../consts/statusCodes';
import resizeImageAsThumb from '../../features/images/resizeImage';
import checkThumbImageExists from '../../features/images/thumbImageExists';

const images = express.Router();

// images.get('/', (req: express.Request, res) => {
//   res.send('Image main API');
// });

images.get('/', async (req: express.Request, res: express.Response) => {
  const height: number = Number(req.query.height) as number;
  const width: number = Number(req.query.width) as number;
  const imageThumb: string = `${req.query.imageName as string}.jpg`;

  if (!fs.existsSync(path.join(Path.imagesFullPath, imageThumb))) {
    res
      .status(StatusCode.notFound)
      .send(`<h1>${imageThumb} image is not found.</h1><br>`);
  } else {
    const imageThumbPath = path.join(Path.imagesThumbPath, imageThumb);

    if (await checkThumbImageExists(imageThumbPath, height, width)) {
      res.status(StatusCode.ok).sendFile(imageThumbPath);
    } else {
      try {
        await resizeImageAsThumb(imageThumb, height, width);

        res.status(StatusCode.created).sendFile(imageThumbPath);
      } catch (error) {
        res.status(StatusCode.badRequest).send(error);
      }
    }
  }
});

export default images;
