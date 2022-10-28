import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Routes Index', () => {
  it('should return welcoming message', async () => {
    const response = await request.get('/');
    expect(response.text).toBe('Welcome to Image Processing API');
  });

  it('should return a status of 200', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
