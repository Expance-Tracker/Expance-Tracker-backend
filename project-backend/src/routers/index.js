import { Router } from 'express';
import authRouter from './auth.js';
import transactionsRouter from './transactionsRouter.js';
import categoriesRouter from './categories.js';

const router = Router();

// Роути аутентифікації
router.use('/', authRouter);

// Роут категорій
router.use('/categories', categoriesRouter);

// Роут транзакцій
router.use('/transactions', transactionsRouter);

export default router;
