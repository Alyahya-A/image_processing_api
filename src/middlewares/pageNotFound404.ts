import { Request, Response } from 'express';

const pageNotFound404Middleware = (req: Request, res: Response): void => {
  res.status(404);
  res.send('<h1>Left, Right, Opps Lost</h1><br><h3>Page not found :(</3>');
};

export default pageNotFound404Middleware;
