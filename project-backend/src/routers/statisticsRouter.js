import authenticate from '../middlewares/authenticate.js';
import express from 'express';
import { getPeriodSummaryController } from '../controllers/statisticsController.js';

const router = express.Router();

router.get('/summary', authenticate, getPeriodSummaryController);

export default router;
