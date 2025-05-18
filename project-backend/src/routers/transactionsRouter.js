// import { Router } from 'express';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { getTransactionsController } from '../controllers/transactionsController.js';

// const transactionsRouter = Router();

// export default transactionsRouter;

// transactionsRouter.get('/', ctrlWrapper(getTransactionsController));



// routers/transactionsRouter.js
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getTransactionsController,
  createTransactionController,
} from '../controllers/transactionsController.js';
import { updateTransactionController } from '../controllers/updateTransactionController.js';
import { validateTransaction } from '../middlewares/validateTransaction.js'; 

const transactionsRouter = Router();

transactionsRouter.get('/', ctrlWrapper(getTransactionsController));
transactionsRouter.post(
  '/',
  validateTransaction,
  ctrlWrapper(createTransactionController),
);
transactionsRouter.put(
  '/:id',
  validateTransaction,
  ctrlWrapper(updateTransactionController),
);

export default transactionsRouter;

