import { getPeriodSummary } from '../services/statisticsService.js';

export const getPeriodSummaryController = async (req, res, next) => {
  try {
    const { month } = req.query; // формат: MM-YYYY
    const userId = req.user._id;

    if (!month || !/^\d{2}-\d{4}$/.test(month)) {
      return res.status(400).json({ message: 'Invalid month format. Use MM-YYYY.' });
    }

    const [monthNum, year] = month.split('-');
    const data = await getPeriodSummary({ userId, year: Number(year), month: Number(monthNum) });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
