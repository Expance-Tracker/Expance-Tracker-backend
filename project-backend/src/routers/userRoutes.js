import { Router } from 'express';
import { getBalance, updateProfile, getCurrentUser } from '../controllers/userController.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();

// поточний користувач
router.get('/', authenticate, getCurrentUser);

// баланс
router.get('/balance', authenticate, getBalance);

// оновлення профілю
router.patch('/profile', authenticate, updateProfile);

export default router;
