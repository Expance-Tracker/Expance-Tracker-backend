import Joi from 'joi';
import { transactionList } from '../constants/transactions.js';

const transactionSchema = Joi.object({
  type: Joi.string()
    .valid(...transactionList)
    .required(),
  amount: Joi.number().positive().max(1000000).required(),
  category: Joi.string().required(),
  date: Joi.date().iso().required(),
  comment: Joi.string().min(2).max(192).optional().allow(''),
});

export const validateTransaction = (req, res, next) => {
  const { error } = transactionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
  next();
};
