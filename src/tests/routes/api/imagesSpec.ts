import path from 'path';
import supertest from 'supertest';
import { Path } from '../../../consts/paths';
import { StatusCode } from '../../../consts/statusCodes';
import resizeImageAsThumb from '../../../features/images/resizeImage';
import checkThumbImageExists from '../../../features/images/thumbImageExists';
import app from '../../../index';
import fs from 'fs';

const request = supertest(app);

describe('Images Apis', () => {
  it('/api/images should return a status of 400 (Bad request)', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(StatusCode.badRequest);
  });

  it('should return a message when one parameter is missing', async () => {
    const response = await request.get('/api/images?width=1000&height=1000');
    expect(response.text).toContain('<h3>The following param is');
    expect(response.status).toBe(StatusCode.badRequest);
  });

  it('should return 404 image not found', async () => {
    const response = await request.get(
      '/api/images?imageName=noImage&width=1000&height=1000'
    );

    expect(response.text).toEqual(
      '<h1>noImage.jpg image is not found.</h1><br>'
    );
    expect(response.status).toBe(StatusCode.notFound);
  });

  it('should return 201 images created successfully!', async () => {
    const imageThumbPath = path.join(
      Path.imagesThumbPath,
      'encenadaport-100x100.jpg'
    );

    // to remove 100X100 if exists. so that we can create new
    if (await checkThumbImageExists(imageThumbPath)) {
      fs.unlink(imageThumbPath, (err) => {
        console.error('Could not remove image');
      });
    }
    const response = await request.get(
      '/api/images?imageName=encenadaport&width=100&height=100'
    );

    expect(response.status).toBe(StatusCode.created);
  });

  it('should return 200 Ok images (Thumb image is already exists!)', async () => {
    const response = await request.get(
      '/api/images?imageName=encenadaport&width=100&height=100'
    );

    expect(response.status).toBe(StatusCode.ok);
  });
});
