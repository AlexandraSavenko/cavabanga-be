import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import router from './routers/index.js';
import authRoutes from './routers/authRoutes.js';
import recipeRoutes from './routers/recipeRoutes.js';

const PORT = process.env.PORT || 3000;

export function setupServer() {
  const app = express();



  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use('/api/auth', authRoutes);
  app.use('/api/recipes', recipeRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
