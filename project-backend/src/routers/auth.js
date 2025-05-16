import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validBody } from '../middlewares/validBody.js';
import { registerUserSchema } from '../validation/auth.js';

import {
  registerUserController,
  // loginUserController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

export default authRouter;
