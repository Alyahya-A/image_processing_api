import { Request } from 'express';
import morgan from 'morgan';

morgan.token('params', (req: Request) => JSON.stringify(req.query));

const loggerMiddleware = morgan(
  ':method :url | :params | :status | :response-time ms'
);

export default loggerMiddleware;
