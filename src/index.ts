import express from 'express';
import config from './config/config';
import createThumbDirectory from './features/images/createThumbDirectory';
import loggerMiddleware from './middlewares/logger';
import pageNotFound404Middleware from './middlewares/pageNotFound404';
import routes from './routes/index';

const app = express();
const port: number = config.PORT ?? 3000; // Default port

// Add Logs middlewares
app.use(loggerMiddleware);

// Add routes
app.use(routes);

// Add page not found middleware
app.use(pageNotFound404Middleware);

// Run the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  createThumbDirectory();
});

export default app;
