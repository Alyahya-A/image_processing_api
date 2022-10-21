import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Routes Index', () => {
  it('should return a message', async () => {
    const response = await request.get('/');
    expect(response.text).toBe('Main Api');
  });

  it('should return a status of 200', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
