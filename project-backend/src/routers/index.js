import { Router } from 'express';
import authRouter from './auth.js';
import transactionsRouter from './transactionsRouter.js';
import categoriesRouter from './categories.js';
import userRouter from './userRoutes.js';
import ratesRrouter from './rates.routes.js';

const router = Router();

// Роути аутентифікації
router.use('/', authRouter);

// Роут категорій
router.use('/categories', categoriesRouter);

// Роут транзакцій
router.use('/transactions', transactionsRouter);

// Роут інформації про юзера
router.use('/user', userRouter);

// Роут інформації відзнак
router.use('/rates', ratesRrouter);

export default router;
