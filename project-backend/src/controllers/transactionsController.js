import { getTransactions } from '../services/transactionsService.js';

export const getTransactionsController = async (req, res) => {
  const { _id: userId } = req.user;
  // const userId = '507f1f77bcf86cd799439011';
  const data = await getTransactions(userId);

  res.json({
    status: 200,
    message: 'Transactions fetched successfully!',
    data,
  });
};
