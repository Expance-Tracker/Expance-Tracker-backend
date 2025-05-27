import { User } from '../db/models/user.js';
import {
  calculateUserBalanceSimple,
  updateCachedBalance,
  shouldRecalculateBalance,
} from '../utils/balanceCalculator.js';

export const getUserBalance = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const needsUpdate = await shouldRecalculateBalance(userId);

  if (needsUpdate) {
    const balanceData = await calculateUserBalanceSimple(userId);
    await updateCachedBalance(userId);

    return {
      balance: balanceData.balance,
      breakdown: {
        totalIncome: balanceData.totalIncome,
        totalExpense: balanceData.totalExpense,
      },
    };
  }

  return {
    balance: user.balance || 0,
  };
};

export const recalculateUserBalance = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const balanceData = await calculateUserBalanceSimple(userId);
  await updateCachedBalance(userId);

  return {
    balance: balanceData.balance,
    breakdown: {
      totalIncome: balanceData.totalIncome,
      totalExpense: balanceData.totalExpense,
    },
  };
};

export const updateBalanceAfterTransaction = async (userId) => {
  return await updateCachedBalance(userId);
};
