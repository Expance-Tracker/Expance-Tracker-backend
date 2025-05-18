// import mongoose from 'mongoose';
// import { Transaction } from '../db/models/transactionModel.js';

// export const getTransactions = (userId) => {
//   return Transaction.find({ userId: new mongoose.Types.ObjectId(userId) });
// };




// services/transactionsService.js
import { Transaction } from '../db/models/transactionModel.js';
import mongoose from 'mongoose';

export const createTransaction = (data) => {
  return Transaction.create(data);
};

export const getTransactions = (userId) => {
  return Transaction.find({ userId: new mongoose.Types.ObjectId(userId) });
};
