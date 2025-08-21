// routers/userRoutes.js
// Маршрути для роботи з поточним користувачем (/me)

import { Router } from 'express';
import { getCurrentUser } from '../controllers/userController.js';

const router = Router();

router.get('/me', getCurrentUser);

export default router;
