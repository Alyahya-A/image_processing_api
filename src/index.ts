import express from 'express';
import config from './config/config';
import loggerMiddleware from './middlewares/logger';
import routes from './routes/index';

const app = express();
const port: number = config.PORT ?? 3000; // Default port

// Add routes
app.use(routes);

// Add middlewares
app.use(loggerMiddleware);

// Run the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
