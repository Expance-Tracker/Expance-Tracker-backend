import mongoose from 'mongoose';
import { Transaction } from '../db/models/transactionModel.js';

export const getTransactions = (userId) => {
  return Transaction.find({ userId: new mongoose.Types.ObjectId(userId) });
};

// export const addTransaction = (payload) => Transaction.create(payload);
