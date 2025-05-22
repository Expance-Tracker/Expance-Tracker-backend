import { Transaction } from '../db/models/transactionModel.js';
import mongoose from 'mongoose';

export const createTransaction = (data) => {
  return Transaction.create(data);
};

export const getTransactions = (userId) => {
  return Transaction.find({ userId: new mongoose.Types.ObjectId(userId) });
};

export const deleteTransactionByID = (_id, userId) => {
  return Transaction.findOneAndDelete({ _id, userId });
};
