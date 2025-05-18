// import { getTransactions } from '../services/transactionsService.js';

// export const getTransactionsController = async (req, res) => {
//   // const { _id: userId } = req.user;
//   const userId = '507f1f77bcf86cd799439011';
//   console.log('Fetching for userId:', userId);
//   const data = await getTransactions(userId);
//   console.log('Found transactions:', data);

//   res.json({
//     status: 200,
//     message: 'Transactions fetched successfully!',
//     data,
//   });
// };




// src/controllers/transactionsController.js

import { createTransaction, getTransactions } from '../services/transactionsService.js';

export const getTransactionsController = async (req, res) => {
  const userId = '507f1f77bcf86cd799439011';
  const data = await getTransactions(userId);

  res.json({
    status: 200,
    message: 'Transactions fetched successfully!',
    data,
  });
};

export const createTransactionController = async (req, res) => {
  const userId = '507f1f77bcf86cd799439011';
  const newTransaction = await createTransaction({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Transaction created successfully',
    data: newTransaction,
  });
};
