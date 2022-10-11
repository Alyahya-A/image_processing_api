import express from 'express';
import validateParamsMiddleware from '../middlewares/validateParams';
import images from './api/images';

const routes = express.Router();

// Main page
routes.get('/', (req, res) => {
  // May we return HTML to user (App intro)
  res.send('Main Api');
});

routes.use('/api/images', validateParamsMiddleware, images);

export default routes;
