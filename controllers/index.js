import express from 'express';
import apiRoutes from './api/index.js';
import homesRoutes from './home-routes.js';
import dashboardRoutes from './dashboard-routes.js';

const router = express.Router();

router.use('/', homesRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

export default router;