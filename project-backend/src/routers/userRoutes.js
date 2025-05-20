import { Router } from 'express';
import { getBalance, updateProfile } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/balance', authenticate, getBalance);

router.patch('/profile', authenticate, updateProfile);

export default router;
