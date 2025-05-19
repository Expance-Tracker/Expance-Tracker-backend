import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCategoriesController } from '../controllers/categoryController.js';

const categoriesRouter = Router();

categoriesRouter.get('/', ctrlWrapper(getCategoriesController));

export default categoriesRouter;
