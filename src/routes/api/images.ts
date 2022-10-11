import express from 'express';
const images = express.Router();

images.get('/', (req: express.Request, res) => {
  res.send('Image main API');
});

export default images;
