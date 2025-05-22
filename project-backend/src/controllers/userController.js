<<<<<<< HEAD
// const User = require('../models/User');
import { User } from '../models/User.js';

// Отримання балансу
export const getBalance = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: 'Користувача не знайдено' });
=======
import { User } from '../db/models/user.js';

export const getBalance = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
>>>>>>> fd6a6a4 (add swagger-statistics)

    res.status(200).json({ balance: user.balance });
  } catch (error) {
    next(error);
  }
};

<<<<<<< HEAD
// Оновлення профілю
=======
>>>>>>> fd6a6a4 (add swagger-statistics)
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true },
    );

    if (!updatedUser)
<<<<<<< HEAD
      return res.status(404).json({ message: 'Користувача не знайдено' });
=======
      return res.status(404).json({ message: 'User not found' });
>>>>>>> fd6a6a4 (add swagger-statistics)

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};
