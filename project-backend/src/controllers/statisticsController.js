import { getPeriodSummary } from '../services/statisticsService.js';

export const getPeriodSummaryController = async (req, res, next) => {
  try {
    const { month } = req.query; // формат: YYYY-MM
    const userId = req.user._id;

    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({ message: 'Invalid month format. Use YYYY-MM.' });
    }

    const [year, monthNum] = month.split('-');
    const data = await getPeriodSummary({ userId, year: Number(year), month: Number(monthNum) });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
