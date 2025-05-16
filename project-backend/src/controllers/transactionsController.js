import {
  // addTransaction,
  getTransactions,
} from '../services/transactionsService.js';

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
// -----
// export const addTransactionsController = async (req, res, next) => {
//   const { _id: userId } = req.user;

//   const data = await addTransaction({ ...req.body, userId });

//   res.status(201).json({
//     status: 201,
//     message: 'Successfully created a contact!',
//     data,
//   });
// };
