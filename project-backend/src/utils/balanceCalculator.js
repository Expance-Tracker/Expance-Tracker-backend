import { Transaction } from '../db/models/transactionModel.js';
import { User } from '../db/models/user.js';

export const calculateUserBalanceSimple = async (userId) => {
  const transactions = await Transaction.find({ userId });

  let balance = 0;
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      balance += transaction.amount;
      totalIncome += transaction.amount;
    } else if (transaction.type === 'expense') {
      balance -= transaction.amount;
      totalExpense += transaction.amount;
    }
  });

  return {
    balance,
    totalIncome,
    totalExpense,
    transactionsCount: transactions.length,
  };
};

export const updateCachedBalance = async (userId) => {
  const { balance } = await calculateUserBalanceSimple(userId);

  await User.findByIdAndUpdate(userId, {
    balance,
    balanceUpdatedAt: new Date(),
  });

  return balance;
};

export const shouldRecalculateBalance = async (userId) => {
  const user = await User.findById(userId);
  if (!user || !user.balanceUpdatedAt) return true;

  const lastTransaction = await Transaction.findOne({ userId }).sort({
    createdAt: -1,
  });

  return lastTransaction && lastTransaction.createdAt > user.balanceUpdatedAt;
};
