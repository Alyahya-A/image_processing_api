import express from 'express';
import fs from 'fs';
import path from 'path';
import { Path } from '../../consts/paths';
import { StatusCode } from '../../consts/statusCodes';
import resizeImageAsThumb from '../../features/images/resizeImage';
import checkThumbImageExists from '../../features/images/thumbImageExists';
import validateParamsMiddleware from '../../middlewares/validateParams';

const images = express.Router();

// images.get('/', (req: express.Request, res) => {
//   res.send('Image main API');
// });

images.get(
  '/',
  validateParamsMiddleware,
  async (req: express.Request, res: express.Response) => {
    const height: number = Number(req.query.height) as number;
    const width: number = Number(req.query.width) as number;
    const imageName: string = `${req.query.imageName as string}`;
    const imageThumb: string = `${imageName}.jpg`;

    if (!fs.existsSync(path.join(Path.imagesFullPath, imageThumb))) {
      res
        .status(StatusCode.notFound)
        .send(`<h1>${imageThumb} image is not found.</h1><br>`);
    } else {
      const imageThumbPath = path.join(
        Path.imagesThumbPath,
        `${imageName}-${height}x${width}.jpg`
      );

      if (await checkThumbImageExists(imageThumbPath)) {
        res.status(StatusCode.ok).sendFile(imageThumbPath);
      } else {
        try {
          await resizeImageAsThumb(imageName, height, width);

          res.status(StatusCode.created).sendFile(imageThumbPath);
        } catch (error) {
          res.status(StatusCode.badRequest).send(error);
        }
      }
    }
  }
);

images.get(
  '/deleteThumbs',
  async (req: express.Request, res: express.Response) => {
    try {
      // check if the directory is exists
      if (fs.existsSync(Path.imagesThumbPath)) {
        // read all files then for each we'll delete the file
        fs.readdirSync(Path.imagesThumbPath).forEach((f) =>
          // delete the image
          fs.rmSync(`${Path.imagesThumbPath}/${f}`)
        );

        res.status(StatusCode.ok).send('Thumb directory removed successfully!');
      } else {
        // not found
        res.status(StatusCode.notFound).send('Thumb directory not found!');
      }
    } catch (error) {
      res.status(StatusCode.badRequest).send(error);
    }
  }
);

export default images;
