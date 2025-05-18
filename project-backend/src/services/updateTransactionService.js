import { Transaction } from '../db/models/transactionModel.js';

export const updateTransaction = async (id, data) => {
  return Transaction.findByIdAndUpdate(id, data, { new: true });
};
