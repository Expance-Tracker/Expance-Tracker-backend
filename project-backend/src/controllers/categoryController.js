import {
  incomeCategories,
  expenseCategories,
} from '../constants/categories.js';

export const getCategoriesController = (req, res) => {
  res.json({
    status: 200,
    message: 'Categories fetched successfully',
    incomeCategories: incomeCategories,
    expenseCategories: expenseCategories,
  });
};
