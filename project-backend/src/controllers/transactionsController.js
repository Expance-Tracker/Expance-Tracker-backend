import createHttpError from 'http-errors';
import {
  createTransaction,
  deleteTransactionByID,
  getTransactions,
} from '../services/transactionsService.js';

export const getTransactionsController = async (req, res) => {
  const { _id: userId } = req.user;
  console.log('Fetching for userId:', userId);

  const data = await getTransactions(userId);

  res.json({
    status: 200,
    message: 'Transactions fetched successfully!',
    data,
  });
};

export const createTransactionController = async (req, res) => {
  const { _id: userId } = req.user;

  const newTransaction = await createTransaction({
    ...req.body,
    userId,
    amount: Number(req.body.amount),
  });

  res.status(201).json({
    status: 201,
    message: 'Transaction created successfully',
    data: newTransaction,
  });
};

export const deleteTransactionsContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const data = await deleteTransactionByID(id, userId);

  if (!data) {
    throw createHttpError(404, 'Transaction not found');
  }

  res.status(204).send();
};
