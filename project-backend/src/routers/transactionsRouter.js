import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addTransactionsController,
  getTransactionsController,
} from '../controllers/transactionsController.js';
import { transactionsAddSchema } from '../validation/transactions.js';
import { validateBody } from '../utils/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const transactionsRouter = Router();

export default transactionsRouter;

transactionsRouter.use(authenticate);

transactionsRouter.get('/', ctrlWrapper(getTransactionsController));

// transactionsRouter.post(
//   '/',
//   validateBody(transactionsAddSchema),
//   ctrlWrapper(addTransactionsController),
// );
