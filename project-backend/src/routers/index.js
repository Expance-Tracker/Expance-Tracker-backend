import { Router } from 'express';
import authRouter from './auth.js';
import categoriesRouter from './categories.js';

const router = Router();

router.use('/', authRouter);
router.use('/categories', categoriesRouter);

export default router;
