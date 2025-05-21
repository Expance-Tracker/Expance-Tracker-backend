import createHttpError from 'http-errors';
import {
  deleteTransactionByID,
  getTransactions,
} from '../services/transactionsService.js';

export const getTransactionsController = async (req, res) => {
  const { _id: userId } = req.user;
  console.log('Fetching for userId:', userId);
  const data = await getTransactions(userId);
  console.log('Found transactions:', data);

  res.json({
    status: 200,
    message: 'Transactions fetched successfully!',
    data,
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
