import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getTransactionsController,
  createTransactionController,
  deleteTransactionsContactController,
} from '../controllers/transactionsController.js';
import { updateTransactionController } from '../controllers/updateTransactionController.js';
import { validateTransaction } from '../middlewares/validateTransaction.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

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
