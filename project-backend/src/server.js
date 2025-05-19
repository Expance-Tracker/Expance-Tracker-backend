import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';

import router from './routers/index.js';
import authRouter from './routers/auth.js';
import transactionsRouter from './routers/transactionsRouter.js';
import userRouter from './routers/userRoutes.js'; 

const port = Number(getEnvVar('PORT', 3000));

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Spendy - Expense Tracker backend',
    });
  });

  app.use('/auth', authRouter);
  app.use('/transactions', transactionsRouter);
  app.use('/user', userRouter); // 🔥 твій маршрут для балансу й профілю

  // Основні маршрути (включно з /auth, /transactions, /user)
  app.use(router);

  // Обробка помилок
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(port, () =>
    console.log(`🚀 Server is running on port ${port}`)
  );
};
