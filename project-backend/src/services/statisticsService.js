import mongoose from 'mongoose';
import { Transaction } from '../db/models/transactionModel.js';

export const getPeriodSummary = async ({ userId, year, month }) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const result = await Transaction.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: { category: '$category', type: '$type' },
        total: { $sum: '$amount' },
      },
    },
    {
      $group: {
        _id: '$_id.type',
        categories: {
          $push: {
            category: '$_id.category',
            total: '$total',
          },
        },
        totalAmount: { $sum: '$total' },
      },
    },
    {
      $project: {
        _id: 0,
        type: '$_id',
        totalAmount: 1,
        categories: 1,
      },
    },
  ]);

  return result;
};

