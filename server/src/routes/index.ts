import express from 'express';
import questionRoutes from './api/questionRoutes.js';

const router = express.Router();

// Mount question routes at /api
router.use('/api', questionRoutes);

export default router;
