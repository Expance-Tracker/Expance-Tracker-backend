import { getBalance, updateProfile } from '../controllers/userController.js';

import { Router } from 'express';
import  authenticate  from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.get('/balance', authenticate, getBalance);

userRouter.patch('/profile', authenticate, updateProfile);

export default userRouter;
