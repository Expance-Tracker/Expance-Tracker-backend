// const User = require('../models/User');
import { User } from '../models/User.js';

// Отримання балансу
export const getBalance = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: 'Користувача не знайдено' });

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
      return res.status(404).json({ message: 'Користувача не знайдено' });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};
