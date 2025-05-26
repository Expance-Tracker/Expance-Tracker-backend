import {
  getUserBalance,
  recalculateUserBalance,
} from '../services/balanceService.js';

export const getBalance = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const balanceData = await getUserBalance(userId);

    res.status(200).json({
      status: 200,
      message: 'Balance fetched successfully',
      data: balanceData,
    });
  } catch (error) {
    next(error);
  }
};

export const recalculateBalance = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const balanceData = await recalculateUserBalance(userId);

    res.status(200).json({
      status: 200,
      message: 'Balance recalculated successfully',
      data: balanceData,
    });
  } catch (error) {
    next(error);
  }
};
