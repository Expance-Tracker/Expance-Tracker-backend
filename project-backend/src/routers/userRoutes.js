import { getBalance, updateProfile } from '../controllers/userController.js';

import authenticate from '../middlewares/authenticate.js';
import express from 'express';

const router = express.Router();

router.get('/balance', authenticate, getBalance);
router.patch('/profile', authenticate, updateProfile);

export default router;
