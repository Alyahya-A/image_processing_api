import express from 'express';
import { StatusCode } from '../consts/statusCodes';
import images from './api/images';

const routes = express.Router();

// Main page
routes.get('/', (req, res) => {
  // May we return HTML to user (App intro)
  res.status(StatusCode.ok).send('Welcome to Image Processing API');
});

routes.use('/api/images', images);

export default routes;
