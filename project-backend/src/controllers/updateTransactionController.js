import { updateTransaction } from '../services/updateTransactionService.js';

export const updateTransactionController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTransaction = await updateTransaction(id, updatedData);

    if (!updatedTransaction) {
      return res
        .status(404)
        .json({ status: 404, message: 'Transaction not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Transaction updated successfully',
      data: updatedTransaction,
    });
  } catch (error) {
    next(error);
  }
};
