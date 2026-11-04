import { Router } from 'express';
import { CITIES, CATEGORIES } from '../data/constants.js';

const router = Router();

router.get('/cities', (req, res) => res.json({ data: CITIES }));
router.get('/categories', (req, res) => res.json({ data: CATEGORIES }));

export default router;
