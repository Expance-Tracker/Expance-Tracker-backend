import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import express from 'express';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import pino from 'pino-http';
import router from './routers/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import statisticsRouter from './routers/statisticsRouter.js'
import transactionsRouter from './routers/transactionsRouter.js';
import userRouter from './routers/userRoutes.js';



const port = Number(getEnvVar('PORT', 3000));

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use('/api-docs', ...swaggerDocs());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Spendy - Expense Tracker backend',
    });
  });


  app.use('/auth', authRouter);
  app.use('/transactions', transactionsRouter);
  app.use('/statistics',statisticsRouter)
  app.use('/user', userRouter);
  app.use('/rates', ratesRouter);



  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(port, () =>
    console.log(`🚀 Server is running on port ${port}`)
  );
};

startServer();


  app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
};

