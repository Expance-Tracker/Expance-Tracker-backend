import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getTransactionsController } from '../controllers/transactionsController.js';
import { authenticate } from '../middlewares/authenticate.js';

const transactionsRouter = Router();

export default transactionsRouter;

transactionsRouter.use(authenticate);

transactionsRouter.get('/', ctrlWrapper(getTransactionsController));
