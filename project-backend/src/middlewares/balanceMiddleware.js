import { updateBalanceAfterTransaction } from '../services/balanceService.js';

export const validateTransactionType = (req, res, next) => {
  const { type } = req.body;

  if (type && !['income', 'expense'].includes(type)) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid transaction type. Must be "income" or "expense"',
    });
  }

  next();
};

export const validateTransactionAmount = (req, res, next) => {
  const { amount } = req.body;

  if (amount !== undefined) {
    const numAmount = Number(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({
        status: 400,
        message: 'Amount must be a positive number',
      });
    }

    req.body.amount = numAmount;
  }

  next();
};

export const updateBalanceMiddleware = async (req, res, next) => {
  const originalJson = res.json;

  res.json = async function (data) {
    if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
      try {
        const userId = req.user._id || req.user.id;

        if (req.originalUrl.includes('/transactions')) {
          const updatedBalance = await updateBalanceAfterTransaction(userId);

          if (
            data &&
            typeof data === 'object' &&
            !data.balance &&
            !data.data?.updatedBalance
          ) {
            if (data.data) {
              data.data.updatedBalance = updatedBalance;
            } else {
              data.updatedBalance = updatedBalance;
            }
          }
        }
      } catch (error) {
        console.error('Error updating balance in middleware:', error);
      }
    }

    originalJson.call(this, data);
  };

  next();
};
