import { User } from '../db/models/user.js';
import { getUserBalance } from '../services/balanceService.js';

export const getBalance = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const balanceData = await getUserBalance(userId);

    res.status(200).json({
      balance: balanceData.balance,
      breakdown: balanceData.breakdown,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id || req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Profile updated successfully',
      data: { user: updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      status: 200,
      message: 'User info fetched successfully',
      data: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
