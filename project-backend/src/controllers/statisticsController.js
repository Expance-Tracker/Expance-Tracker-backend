import { getPeriodSummary } from '../services/statisticsService.js';

export const getPeriodSummaryController = async (req, res, next) => {
  try {
    const { month, type } = req.query; // додали type
    const userId = req.user._id;

    if (!month || !/^\d{2}-\d{4}$/.test(month)) {
      return res.status(400).json({ message: 'Invalid month format. Use MM-YYYY.' });
    }
    // (додатково можна перевіряти type на 'expenses' або 'income')
    if (type && !['expenses', 'income'].includes(type)) {
      return res.status(400).json({ message: 'Invalid type. Use "expenses" or "income".' });
    }

    const [monthNum, year] = month.split('-');
    const data = await getPeriodSummary({
      userId,
      year: Number(year),
      month: Number(monthNum),
      type, // передаємо тип у сервіс, якщо треба
    });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
