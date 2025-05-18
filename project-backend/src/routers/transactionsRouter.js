import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  deleteTransactionsContactController,
  getTransactionsController,
} from '../controllers/transactionsController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

const transactionsRouter = Router();

export default transactionsRouter;

transactionsRouter.use(authenticate);

transactionsRouter.get('/', ctrlWrapper(getTransactionsController));

transactionsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(deleteTransactionsContactController),
);
