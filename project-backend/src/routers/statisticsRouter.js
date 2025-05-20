import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getPeriodSummaryController } from '../controllers/statisticsController.js';

const router = express.Router();

router.get('/summary', authenticate, getPeriodSummaryController);

export default router;
