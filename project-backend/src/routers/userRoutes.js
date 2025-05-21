import express from 'express';
import { getBalance, updateProfile } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/balance', auth, getBalance);
router.patch('/profile', auth, updateProfile);

export default router;
