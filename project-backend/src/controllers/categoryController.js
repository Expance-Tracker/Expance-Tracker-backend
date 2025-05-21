import Category from '../db/models/category.js';

export const getCategoriesController = async (req, res) => {
  await ensureCategoriesExist();
  const categories = await Category.find({});

  const incomeCategories = categories
    .filter((cat) => cat.type === 'income')
    .map((cat) => ({ id: cat._id, name: cat.name }));

  const expenseCategories = categories
    .filter((cat) => cat.type === 'expense')
    .map((cat) => ({ id: cat._id, name: cat.name }));
  res.json({
    status: 200,
    message: 'Categories fetched successfully',
    incomeCategories,
    expenseCategories,
  });
};

const initialCategories = [
  { name: 'Incomes', type: 'income' },
  { name: 'Main expenses', type: 'expense' },
  { name: 'Products', type: 'expense' },
  { name: 'Car', type: 'expense' },
  { name: 'Self care', type: 'expense' },
  { name: 'Child care', type: 'expense' },
  { name: 'Household products', type: 'expense' },
  { name: 'Education', type: 'expense' },
  { name: 'Leisure', type: 'expense' },
  { name: 'Other expenses', type: 'expense' },
  { name: 'Entertainment', type: 'expense' },
];

const ensureCategoriesExist = async () => {
  const count = await Category.countDocuments();
  if (count === 0) {
    await Category.insertMany(initialCategories);
  }
};
