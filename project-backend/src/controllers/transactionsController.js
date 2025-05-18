import { getTransactions } from '../services/transactionsService.js';

export const getTransactionsController = async (req, res) => {
  const { _id: userId } = req.user;
  // const userId = '507f1f77bcf86cd799439011';
  console.log('Fetching for userId:', userId);
  const data = await getTransactions(userId);
  console.log('Found transactions:', data);

  res.json({
    status: 200,
    message: 'Transactions fetched successfully!',
    data,
  });
};
