import {
  createTransactionController,
  deleteTransactionsContactController,
  getTransactionsController,
} from '../controllers/transactionsController.js';

import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { updateTransactionController } from '../controllers/updateTransactionController.js';
import { validateTransaction } from '../middlewares/validateTransaction.js';

const transactionsRouter = Router();

transactionsRouter.use(authenticate);

transactionsRouter.get('/', ctrlWrapper(getTransactionsController));

transactionsRouter.post(
  '/',
  validateTransaction,
  ctrlWrapper(createTransactionController),
);

transactionsRouter.put(
  '/:id',
  isValidId,
  validateTransaction,
  ctrlWrapper(updateTransactionController),
);

transactionsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(deleteTransactionsContactController),
);

export default transactionsRouter;
