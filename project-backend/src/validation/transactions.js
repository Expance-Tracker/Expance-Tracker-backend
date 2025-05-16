import Joi from 'joi';
import { transactionList } from '../constants/transactions.js';

export const transactionsAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  amount: Joi.number().required(),
  email: Joi.string().min(3).max(20).optional(),
  category: Joi.string().optional(),
  type: Joi.string()
    .valid(...transactionList)
    .required(),
});
