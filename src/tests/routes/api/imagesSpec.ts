import path from 'path';
import supertest from 'supertest';
import { Path } from '../../../consts/paths';
import { StatusCode } from '../../../consts/statusCodes';
import resizeImageAsThumb from '../../../features/images/resizeImage';
import app from '../../../index';

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
    // to remove 1000x1000 if exists. so that we can create new
    await resizeImageAsThumb('encenadaport.jpg', 1, 1);

    const response = await request.get(
      '/api/images?imageName=encenadaport&width=1000&height=1000'
    );

    expect(response.status).toBe(StatusCode.created);
  });

  it('should return 200 Ok images (Thumb image is already exists!)', async () => {
    // to make sure that we have created 1000x1000 thum image
    await resizeImageAsThumb('encenadaport.jpg', 100, 100);

    const response = await request.get(
      '/api/images?imageName=encenadaport&width=100&height=100'
    );

    expect(response.status).toBe(StatusCode.ok);
  });
});
