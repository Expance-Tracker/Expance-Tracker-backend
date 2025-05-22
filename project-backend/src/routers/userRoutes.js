<<<<<<< HEAD
import { Router } from 'express';
import { getBalance, updateProfile } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.get('/balance', authenticate, getBalance);

userRouter.patch('/profile', authenticate, updateProfile);

=======
import { getBalance, updateProfile } from '../controllers/userController.js';

import { Router } from 'express';
import  authenticate  from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.get('/balance', authenticate, getBalance);

userRouter.patch('/profile', authenticate, updateProfile);

>>>>>>> fd6a6a4 (add swagger-statistics)
export default userRouter;
