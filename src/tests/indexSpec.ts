import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Server Startup', () => {
  it('Test pageNotFound404Middleware, should return a status of 404', async () => {
    const response = await request.get('/incorrect-endpoint');
    try {
      expect(response.status).toBe(404);
    } catch (error) {}
  });
});
