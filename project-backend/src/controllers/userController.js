import { User } from '../db/models/user.js';

export const getBalance = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ balance: user.balance });
  } catch (error) {
    next(error);
  }
};

// Оновлення профілю

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true },
    );

    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

// Отримання поточного користувача

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      status: 200,
      message: 'User info fetched successfully',
      data: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      data: { message: error.message }
    });
  }
};
