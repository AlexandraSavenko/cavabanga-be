// routers/orderRoutes.js
// Маршрути для роботи із замовленнями

import { Router } from 'express';
import { getAllOrders, getOrderById } from '../controllers/orderController.js';

const router = Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);

export default router;
