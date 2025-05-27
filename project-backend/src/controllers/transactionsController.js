import createHttpError from 'http-errors';
import {
  createTransaction,
  deleteTransactionByID,
  getTransactions,
} from '../services/transactionsService.js';

import { updateBalanceAfterTransaction } from '../services/balanceService.js';
import { updateTransaction } from '../services/updateTransactionService.js';

export const getTransactionsController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      type: req.query.type,
      category: req.query.category,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      sortBy: req.query.sortBy || 'createdAt',
      sortOrder: req.query.sortOrder || 'desc',
    };

    const data = await getTransactions(userId, options);

    res.json({
      status: 200,
      message: 'Transactions fetched successfully!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createTransactionController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const newTransaction = await createTransaction({
      ...req.body,
      userId,
      amount: Number(req.body.amount),
    });

    const updatedBalance = await updateBalanceAfterTransaction(userId);

    res.status(201).json({
      status: 201,
      message: 'Transaction created successfully',
      data: {
        transaction: newTransaction,
        updatedBalance,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransactionsContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const deletedTransaction = await deleteTransactionByID(id, userId);

    if (!deletedTransaction) {
      throw createHttpError(404, 'Transaction not found');
    }

    const updatedBalance = await updateBalanceAfterTransaction(userId);

    res.status(200).json({
      status: 200,
      message: 'Transaction deleted successfully',
      data: {
        deletedTransaction,
        updatedBalance,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransactionController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const updatedTransaction = await updateTransaction(id, userId, {
      ...req.body,
      amount: req.body.amount ? Number(req.body.amount) : undefined,
    });

    if (!updatedTransaction) {
      throw createHttpError(404, 'Transaction not found');
    }

    const updatedBalance = await updateBalanceAfterTransaction(userId);

    res.status(200).json({
      status: 200,
      message: 'Transaction updated successfully',
      data: {
        transaction: updatedTransaction,
        updatedBalance,
      },
    });
  } catch (error) {
    next(error);
  }
};
