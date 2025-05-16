import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validBody } from '../middlewares/validBody.js';
import { validateBody } from '../utils/validateBody.js';

import { registerUserSchema, authLoginSchema } from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
