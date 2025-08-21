// routers/paymentRoutes.js
// Маршрути для роботи з оплатами

import { Router } from 'express';
import {
  createPayment,
  getPaymentStatus,
} from '../controllers/paymentController.js';

const router = Router();

router.post('/', createPayment);
router.get('/:id/status', getPaymentStatus);

export default router;
