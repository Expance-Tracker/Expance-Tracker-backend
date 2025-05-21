import express from 'express';
import { fetchRates } from '../controllers/ratesController.js';

const ratesRrouter = express.Router();

ratesRrouter.get('/', fetchRates);

export default ratesRrouter;
