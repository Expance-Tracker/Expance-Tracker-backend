import { Router } from 'express';
import authRouter from './auth.js';
import transactionsRouter from './transactionsRouter.js';

const router = Router();

// Роути аутентифікації
router.use('/', authRouter);

// Роут транзакцій
router.use('/transactions', transactionsRouter);

export default router;
